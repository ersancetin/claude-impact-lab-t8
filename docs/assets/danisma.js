/* ============================================================
   DANIŞMA — sunucusuz soru/cevap penceresi

   NE DEĞİLDİR: dil modeli değildir, üretken değildir, tahmin etmez.
   NE YAPAR:    soruyu sitedeki doğrulanmış içerik künyeleriyle
                eşleştirir ve ilgili rehbere/araca yönlendirir.

   Neden böyle: platformun çekirdek taahhüdü "girdiğiniz hiçbir bilgi
   cihazdan çıkmaz". Dış bir API'ye soru göndermek, kullanıcının hukuki
   durumunu üçüncü bir tarafa aktarmak demektir; üstelik statik bir
   sitede anahtar saklanamaz. Bu yüzden arama tamamen tarayıcıda çalışır.

   Uydurmama kuralı: cevap metni ASLA burada üretilmez. Yalnızca
   bilgi-tabani.js içindeki, üreteçten gelen künye metinleri gösterilir.
   Eşleşme yoksa "bulamadım" denir — yaklaştırma yapılmaz.
   ============================================================ */
import { BILGI } from "./bilgi-tabani.js";
import { el, kaydet, oku } from "./app.js";

/* --- Metin normalleştirme --------------------------------- */
/* Türkçe: 'I' -> 'ı', 'İ' -> 'i'. Ardından aksan katlama, böylece
   "sure" yazan da "süre" kaydını bulur. */
const KATLA = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };

function normal(metin) {
  return (metin || "")
    .toLocaleLowerCase("tr")
    .replace(/[çğıöşüâîû]/g, (h) => KATLA[h] || h)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const DURAK = new Set([
  "ve", "ile", "icin", "mi", "mu", "mı", "mü", "bir", "bu", "su", "o", "ne",
  "nedir", "nasil", "kac", "kadar", "da", "de", "ki", "ama", "veya", "ya",
  "olan", "olur", "var", "yok", "beni", "benim", "bana", "ben"
]);

function kokler(metin) {
  return normal(metin)
    .split(" ")
    .filter((k) => k.length > 1 && !DURAK.has(k));
}

/* Türkçe eklemeli bir dil: "veri", "verim", "verilerim" aynı kökten.
   Ek listesi tutmak yerine ÖNEK EŞLEŞMESİ yapıyoruz — iki kelimeden
   biri diğeriyle başlıyorsa ve ortak önek yeterince uzunsa eşleşir.
   Böylece "verilerim" sorusu "veri" anahtarını bulur; sabit uzunlukta
   kesmenin ("veril" ≠ "veri") yarattığı kaçırma ortadan kalkar. */
const ASGARI_ONEK = 4;

function esles(havuz, kok) {
  for (const t of havuz) {
    if (t === kok) return true;
    const kisa = Math.min(t.length, kok.length);
    if (kisa >= ASGARI_ONEK && (t.startsWith(kok) || kok.startsWith(t))) return true;
  }
  return false;
}

/* --- Arama ------------------------------------------------- */
/* Ağırlıklar: başlıkta geçmek, gövdede geçmekten çok daha güçlü
   bir sinyaldir. Anahtar kelimeler üreteçte elle işaretlenir. */
const AGIRLIK = { anahtar: 6, baslik: 4, ozet: 2, metin: 1 };

/* Soru "kaç gün / ne zaman" mı, yoksa "nedir / nasıl" mı?
   Bu ayrım cevabın türünü belirler: birinde süre kaydı, diğerinde
   konuyu anlatan rehber doğru cevaptır. */
const ZAMAN_KOK = ["gun", "ay", "yil", "sure", "zaman", "tarih", "kac", "gecti", "kalan", "son"];

function zamanSorusu(sorguKok) {
  return sorguKok.some((k) => ZAMAN_KOK.some(
    (z) => z === k || (Math.min(z.length, k.length) >= 3 && k.startsWith(z))));
}

function puanla(kayit, sorguKok, zamanli) {
  let puan = 0;
  for (const alan of ["anahtar", "baslik", "ozet", "metin"]) {
    const havuz = kayit["_" + alan];
    if (!havuz || !havuz.length) continue;
    for (const kok of sorguKok) {
      if (esles(havuz, kok)) puan += AGIRLIK[alan];
    }
  }
  /* Süre kayıtlarının hepsi aynı araca bağlıdır; konu sorusunu
     gasp etmemeleri için zaman sorusu değilse geri çekilirler. */
  if (kayit.tur === "sure") puan *= zamanli ? 1.5 : 0.5;
  return puan;
}

let DIZIN = null;

function dizinKur() {
  if (DIZIN) return DIZIN;
  DIZIN = BILGI.kayitlar.map((k) => ({
    ...k,
    _anahtar: kokler((k.anahtar || []).join(" ")),
    _baslik: kokler(k.baslik),
    _ozet: kokler(k.ozet),
    _metin: kokler(k.metin || ""),
  }));
  return DIZIN;
}

/* Dışa açık: scripts/danisma-kontrol.mjs bu işlevi doğrudan sınar. */
export function ara(soru, adet = 3) {
  const kok = kokler(soru);
  if (!kok.length) return [];
  const zamanli = zamanSorusu(kok);
  return dizinKur()
    .map((k) => ({ kayit: k, puan: puanla(k, kok, zamanli) }))
    .filter((s) => s.puan > 0)
    .sort((a, b) => b.puan - a.puan)
    .slice(0, adet);
}

/* --- Cevap balonu ------------------------------------------ */
const DOGRULAMA_AD = {
  resmi: ["iyi", "resmî kaynak"],
  coklu: ["notr", "çoklu kaynak"],
  tek: ["dogrulanmamis", "doğrulanmadı"],
  celiskili: ["tehlike", "kaynaklar çelişiyor"],
};

function kaynakBloku(kayit, kok) {
  const [sinif, ad] = DOGRULAMA_AD[kayit.dogrulama] || DOGRULAMA_AD.tek;
  return el("span", { class: "kaynak" },
    el("span", { class: "etiket" }, kayit.turAd || "Kaynak"),
    el("a", { href: kok + kayit.url }, kayit.baslik),
    " ",
    el("span", { class: "rozet " + sinif }, ad));
}

function botCevap(soru, kok) {
  const sonuc = ara(soru);

  if (!sonuc.length) {
    return el("div", { class: "balon bot" },
      el("p", {}, "Bu soruya karşılık gelen bir kayıt bulamadım. ",
        el("strong", {}, "Uydurmuyorum"), " — sitede doğrulanmış bir karşılığı yoksa boş dönerim."),
      el("p", {}, "Konu başlıklarından ilerleyebilirsiniz:"),
      el("span", { class: "kaynak" },
        el("a", { href: kok + "bilgi/index.html" }, "Bilgi Merkezi — tüm konular")));
  }

  const en = sonuc[0].kayit;
  const parcalar = [];

  /* Süre kaydıysa rakamı öne çıkar — kaybedilen hakların çoğu
     süresi kaçtığı için kaybediliyor. */
  if (en.tur === "sure" && en.deger) {
    parcalar.push(el("p", {},
      el("span", { class: "sure-vurgu" }, en.deger), " — ", en.ozet));
    if (en.baslangic) {
      parcalar.push(el("p", {}, el("strong", {}, "Süre ne zaman başlar: "), en.baslangic));
    }
    if (en.dayanak) {
      parcalar.push(el("p", {}, el("strong", {}, "Dayanak: "), en.dayanak));
    }
  } else {
    parcalar.push(el("p", {}, en.ozet));
  }

  parcalar.push(kaynakBloku(en, kok));

  /* İkinci ve üçüncü eşleşmeyi "şunlar da ilgili olabilir" olarak ver */
  const digerleri = sonuc.slice(1).filter((s) => s.puan >= sonuc[0].puan * 0.45);
  if (digerleri.length) {
    parcalar.push(el("span", { class: "kaynak" },
      el("span", { class: "etiket" }, "İlgili olabilir"),
      ...digerleri.flatMap((s, i) => [
        i ? " · " : "",
        el("a", { href: kok + s.kayit.url }, s.kayit.baslik),
      ])));
  }

  return el("div", { class: "balon bot" }, ...parcalar);
}

/* --- Pencere ----------------------------------------------- */
export function danismaBaslat() {
  /* Kök önek: sayfa derinliğine göre. Üreteç data-kok ile basar. */
  const kok = document.body.dataset.kok || "";

  const akis = el("div", { class: "danisma-akis", role: "log", "aria-live": "polite" });

  const pencere = el("aside", {
    class: "danisma", id: "danisma", hidden: "",
    role: "dialog", "aria-label": "Danışma", "aria-modal": "false",
  });

  const kapat = el("button", {
    class: "danisma-kapat", type: "button", "aria-label": "Danışmayı kapat",
  }, "×");

  const bas = el("div", { class: "danisma-bas" },
    el("div", {},
      el("b", {}, "Danışma"),
      el("small", {}, "Sitedeki doğrulanmış içerikte arar")),
    el("span", { class: "bosluk" }),
    kapat);

  const girdi = el("input", {
    type: "text", name: "soru", autocomplete: "off",
    placeholder: "Örn. DASK ihbarı kaç gün?", "aria-label": "Sorunuz",
  });

  const form = el("form", { class: "danisma-form" },
    girdi,
    el("button", { type: "submit" }, "Sor"));

  const alt = el("div", { class: "danisma-alt" },
    form,
    el("p", { class: "danisma-not" },
      "Bu bir yapay zekâ değildir; sorunuzu sitedeki içerikle eşleştirir. ",
      "Sorunuz cihazınızdan çıkmaz. ",
      el("strong", {}, "Hukuki tavsiye değildir.")));

  pencere.append(bas, akis, alt);

  const acDugme = el("button", {
    class: "danisma-ac", type: "button",
    "aria-expanded": "false", "aria-controls": "danisma",
  }, el("span", { class: "nokta", "aria-hidden": "true" }), "Soru sor");

  /* --- akış yardımcıları --- */
  function ekle(dugum) {
    akis.append(dugum);
    akis.scrollTop = akis.scrollHeight;
  }

  function sor(metin) {
    const temiz = (metin || "").trim();
    if (!temiz) return;
    ekle(el("div", { class: "balon siz" }, temiz));
    ekle(botCevap(temiz, kok));
    girdi.value = "";
  }

  function karsilama() {
    ekle(el("div", { class: "balon bot" },
      el("p", {}, "Merhaba. Deprem sonrası haklarınız, süreler ve dilekçeler hakkında soru sorabilirsiniz."),
      el("p", {}, "Sık sorulanlar:"),
      el("span", { class: "danisma-oneri" },
        ...(BILGI.oneriler || []).map((s) =>
          el("button", { type: "button", onclick: () => sor(s) }, s)))));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sor(girdi.value);
  });

  function ac() {
    pencere.hidden = false;
    acDugme.style.display = "none";
    acDugme.setAttribute("aria-expanded", "true");
    if (!akis.childElementCount) karsilama();
    girdi.focus();
    kaydet("danisma-acik", true);
  }

  function kapa() {
    pencere.hidden = true;
    acDugme.style.display = "";
    acDugme.setAttribute("aria-expanded", "false");
    acDugme.focus();
    kaydet("danisma-acik", false);
  }

  acDugme.addEventListener("click", ac);
  kapat.addEventListener("click", kapa);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !pencere.hidden) kapa();
  });

  /* Üst bardaki "Soru sor" düğmesi de aynı pencereyi açar */
  for (const d of document.querySelectorAll("[data-danisma-ac]")) {
    d.addEventListener("click", ac);
  }

  /* acDugme artık hiçbir yere basılmıyor — AI Sohbet tek görünür
     giriş noktası oldu (bkz. ai-sohbet.js). Değişkeni yine de
     oluşturuyoruz çünkü ac()/kapa() ona referans veriyor; kolayca
     geri getirilebilsin diye kaldırılmadı, sadece DOM'a eklenmiyor. */
  document.body.append(pencere);

  /* Sayfalar arasında gezerken pencere açık kalsın */
  if (oku("danisma-acik", false)) ac();
}
