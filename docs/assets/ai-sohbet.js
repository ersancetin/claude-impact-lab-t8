/* ============================================================
   AI SOHBET — DeepSeek destekli, siteye özel yönlendirme

   FARKI: danisma.js YERİNE GEÇMEZ, ona ek olarak sunulur. Danışma
   penceresi sunucusuz ve verisi cihazdan çıkmaz; bu pencere ise
   sorunuzu DeepSeek API'sine gönderir. Bu yüzden ayrı bir düğme,
   ayrı bir renk ve açık bir uyarı metniyle sunulur — kullanıcı
   hangisini kullandığını her zaman bilmeli.

   Nasıl çalışır: kullanıcının sorusu önce danisma.js'teki yerel
   arama (ara()) ile sitedeki en ilgili künyelere eşlenir. Bu
   künyeler DeepSeek'e "bağlam" olarak verilir ve modelden yalnızca
   bu bağlama dayanarak Türkçe yanıt üretmesi istenir. Yönlendirme
   bağlantıları modelin ürettiği metne değil, aramanın kendisine
   dayanır — böylece model var olmayan bir sayfaya link vermiş olsa
   bile kullanıcının gördüğü "İlgili sayfalar" listesi her zaman
   gerçek ve geçerlidir.
   ============================================================ */
import { ara } from "./danisma.js";
import { el, kaydet, oku } from "./app.js";
import { AI_YAPILANDIRMA } from "./ai-yapilandirma.js";

const SISTEM_ONEK = `Sen "Deprem Haklarım" adlı sitenin yapay zekâ destekli sohbet asistanısın.
Görevin, kullanıcının deprem sonrası hakları, süreleri, DASK, hasar tespiti ve
dilekçe süreçleriyle ilgili sorularını YALNIZCA aşağıda verilen site içeriğine
dayanarak yanıtlamak ve ilgili sayfaya yönlendirmektir.

Kurallar:
- Her zaman Türkçe yanıt ver.
- Yalnızca aşağıdaki "Bağlam" bölümündeki bilgiyi kullan. Bağlamda yer almayan
  hukuki bilgi, süre, tutar veya kanun maddesi UYDURMA.
- Bağlamda sorunun cevabı yoksa bunu açıkça söyle; tahmin yürütme.
- Kısa ve öz yaz (tercihen 3-5 cümle).
- Bu bir hukuki tavsiye değildir; gerektiğinde bunu hatırlat ve somut durumlar
  için bir avukata veya barolar birliği adli yardım birimine başvurulmasını öner.
- Bağlamda verilen sayfa başlıkları ve bağlantılar dışında yeni bağlantı uydurma;
  yönlendirme zaten ayrıca kullanıcıya gösterilecek, sen sadece hangi konunun
  ilgili olduğunu düz metinle belirt.`;

function baglamOlustur(soru, kok) {
  const sonuclar = ara(soru, 4);
  if (!sonuclar.length) return { metin: "", kaynaklar: [] };

  const parcalar = sonuclar.map(({ kayit }) => {
    const govde = kayit.tur === "sure" && kayit.deger
      ? `${kayit.ozet} Süre: ${kayit.deger}.${kayit.dayanak ? " Dayanak: " + kayit.dayanak : ""}`
      : (kayit.metin || kayit.ozet || "");
    return `Başlık: ${kayit.baslik}\nİçerik: ${govde}`;
  });

  const kaynaklar = sonuclar.map(({ kayit }) => ({ baslik: kayit.baslik, url: kok + kayit.url }));
  return { metin: parcalar.join("\n\n"), kaynaklar };
}

async function deepseekYanitla(mesajlar) {
  const yanit = await fetch(AI_YAPILANDIRMA.ucNokta, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_YAPILANDIRMA.apiAnahtar}`,
    },
    body: JSON.stringify({
      model: AI_YAPILANDIRMA.model,
      messages: mesajlar,
      temperature: 0.3,
      max_tokens: 600,
    }),
  });

  if (!yanit.ok) {
    throw new Error(`DeepSeek isteği başarısız (HTTP ${yanit.status})`);
  }
  const veri = await yanit.json();
  const icerik = veri?.choices?.[0]?.message?.content;
  if (!icerik) throw new Error("DeepSeek boş yanıt döndürdü");
  return icerik.trim();
}

/* --- Cevap balonu ------------------------------------------ */
function kaynaklarBlogu(kaynaklar) {
  if (!kaynaklar.length) return null;
  return el("span", { class: "kaynak" },
    el("span", { class: "etiket" }, "İlgili sayfalar"),
    ...kaynaklar.flatMap((k, i) => [
      i ? " · " : "",
      el("a", { href: k.url }, k.baslik),
    ]));
}

function metinParagraflara(metin) {
  return metin.split(/\n{2,}/).map((p) => el("p", {}, p.trim()));
}

function botBalonYaz(metin, kaynaklar) {
  const parcalar = metinParagraflara(metin);
  const kBlogu = kaynaklarBlogu(kaynaklar || []);
  if (kBlogu) parcalar.push(kBlogu);
  return el("div", { class: "balon bot ai" }, ...parcalar);
}

/* --- Kalıcılık -----------------------------------------------
   Sayfa gezintileri arasında sohbet kaybolmasın diye görüntülenen
   soru/cevap çiftleri localStorage'a yazılır (yalnızca BAŞARILI
   alışverişler — "yapılandırılmamış" veya hata balonları geçici
   sayılır, kalıcı kaydedilmez). API'ye gönderilecek geçmiş de bu
   diziden türetilir, ayrı bir kopya tutulmaz. */
const GECMIS_ANAHTAR = "ai-sohbet-mesajlar";
const GECMIS_SINIR = 20; // 10 soru-cevap çifti

function apiGecmisi(goruntu) {
  return goruntu
    .map((g) => ({ role: g.tip === "kullanici" ? "user" : "assistant", content: g.metin }))
    .slice(-8);
}

/* --- Pencere ----------------------------------------------- */
export function aiSohbetBaslat() {
  const kok = document.body.dataset.kok || "";
  const yapilandirilmis = !!AI_YAPILANDIRMA.apiAnahtar;

  const akis = el("div", { class: "ai-akis", role: "log", "aria-live": "polite" });

  const pencere = el("aside", {
    class: "ai-sohbet", id: "ai-sohbet", hidden: "",
    role: "dialog", "aria-label": "AI Sohbet", "aria-modal": "false",
  });

  const kapat = el("button", {
    class: "ai-kapat", type: "button", "aria-label": "AI sohbeti kapat",
  }, "×");

  const bas = el("div", { class: "ai-bas" },
    el("div", {},
      el("b", {}, el("span", { class: "ai-simge", "aria-hidden": "true" }), " AI Sohbet"),
      el("small", {}, "Yapay zekâ ile sitede arar ve yönlendirir")),
    el("span", { class: "bosluk" }),
    kapat);

  const girdi = el("input", {
    type: "text", name: "soru", autocomplete: "off",
    placeholder: "Sorunuzu yazın…", "aria-label": "Sorunuz",
  });

  const gonder = el("button", { type: "submit" }, "Sor");

  const form = el("form", { class: "ai-form" }, girdi, gonder);

  const alt = el("div", { class: "ai-alt" },
    form,
    el("p", { class: "ai-not" },
      el("strong", {}, "Bu bir yapay zekâ sohbet robotudur."), " ",
      "Danışma penceresinden farklı olarak sorunuz bir yapay zekâ servisine gönderilir. ",
      el("strong", {}, "Hukuki tavsiye değildir.")));

  pencere.append(bas, akis, alt);

  const acDugme = el("button", {
    class: "ai-ac", type: "button",
    "aria-expanded": "false", "aria-controls": "ai-sohbet",
  }, el("span", { class: "ai-simge", "aria-hidden": "true" }), "AI Sohbet");

  /* --- akış yardımcıları --- */
  function ekle(dugum) {
    akis.append(dugum);
    akis.scrollTop = akis.scrollHeight;
    return dugum;
  }

  function yaziyorGoster() {
    return ekle(el("div", { class: "ai-yazi", "aria-label": "Yanıt yazılıyor" },
      el("span", {}), el("span", {}), el("span", {})));
  }

  /* Önceki sayfalardan kalan sohbeti geri oynat. */
  const goruntu = oku(GECMIS_ANAHTAR, []);
  for (const g of goruntu) {
    ekle(g.tip === "kullanici"
      ? el("div", { class: "balon siz" }, g.metin)
      : botBalonYaz(g.metin, g.kaynaklar));
  }

  function turKaydet(tip, metin, kaynaklar) {
    goruntu.push({ tip, metin, kaynaklar });
    if (goruntu.length > GECMIS_SINIR) goruntu.splice(0, goruntu.length - GECMIS_SINIR);
    kaydet(GECMIS_ANAHTAR, goruntu);
  }

  async function sor(metin) {
    const temiz = (metin || "").trim();
    if (!temiz) return;

    ekle(el("div", { class: "balon siz" }, temiz));
    girdi.value = "";

    if (!yapilandirilmis) {
      ekle(el("div", { class: "balon bot ai" },
        el("p", {}, "AI Sohbet şu anda yapılandırılmamış (API anahtarı tanımlı değil). ",
          "Bu bir demo/geliştirme ortamı olabilir.")));
      return;
    }

    girdi.disabled = true;
    gonder.disabled = true;
    const yaziyor = yaziyorGoster();

    try {
      const { metin: baglam, kaynaklar } = baglamOlustur(temiz, kok);
      const sistemMesaji = baglam
        ? `${SISTEM_ONEK}\n\nBağlam:\n${baglam}`
        : `${SISTEM_ONEK}\n\nBağlam: (bu soru için sitede eşleşen bir içerik bulunamadı — bunu kullanıcıya belirt.)`;

      const mesajlar = [
        { role: "system", content: sistemMesaji },
        ...apiGecmisi(goruntu),
        { role: "user", content: temiz },
      ];

      const cevap = await deepseekYanitla(mesajlar);
      turKaydet("kullanici", temiz);
      turKaydet("bot", cevap, kaynaklar);

      yaziyor.remove();
      ekle(botBalonYaz(cevap, kaynaklar));
    } catch (hata) {
      yaziyor.remove();
      ekle(el("div", { class: "balon bot ai" },
        el("p", {}, "Yanıt alınamadı. Bağlantınızı kontrol edip tekrar deneyebilirsiniz.")));
      console.error("[ai-sohbet]", hata);
    } finally {
      girdi.disabled = false;
      gonder.disabled = false;
      girdi.focus();
    }
  }

  function karsilama() {
    ekle(el("div", { class: "balon bot ai" },
      el("p", {}, "Merhaba, ben yapay zekâ destekli sohbet asistanıyım. Sorunuzu sitedeki içerikte arayıp size en ilgili sayfaya yönlendiririm."),
      yapilandirilmis
        ? null
        : el("p", {}, "(Şu an demo modunda — API anahtarı tanımlı değil.)")));
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
    kaydet("ai-sohbet-acik", true);
  }

  function kapa() {
    pencere.hidden = true;
    acDugme.style.display = "";
    acDugme.setAttribute("aria-expanded", "false");
    acDugme.focus();
    kaydet("ai-sohbet-acik", false);
  }

  acDugme.addEventListener("click", ac);
  kapat.addEventListener("click", kapa);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !pencere.hidden) kapa();
  });

  /* Üst bardaki "AI Sohbet" düğmesi de aynı pencereyi açar */
  for (const d of document.querySelectorAll("[data-ai-sohbet-ac]")) {
    d.addEventListener("click", ac);
  }

  document.body.append(acDugme, pencere);

  if (oku("ai-sohbet-acik", false)) ac();
}
