/* ============================================================
   ORTAK YARDIMCILAR
   Bağımlılık yok. Hiçbir veri sunucuya gönderilmez.
   ============================================================ */

/* --- Tema ------------------------------------------------- */
const TEMA_ANAHTAR = "dh-tema";

export function temaBaslat() {
  const kayitli = localStorage.getItem(TEMA_ANAHTAR);
  if (kayitli) document.documentElement.dataset.tema = kayitli;
}

export function temaDegistir() {
  const kok = document.documentElement;
  const su = kok.dataset.tema ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "koyu" : "acik");
  const yeni = su === "koyu" ? "acik" : "koyu";
  kok.dataset.tema = yeni;
  localStorage.setItem(TEMA_ANAHTAR, yeni);
  temaEtiketiYenile();
}

function temaEtiketiYenile() {
  const d = document.querySelector(".tema-dugme");
  if (!d) return;
  const koyuMu = document.documentElement.dataset.tema === "koyu" ||
    (!document.documentElement.dataset.tema &&
      matchMedia("(prefers-color-scheme: dark)").matches);
  d.textContent = koyuMu ? "Açık tema" : "Koyu tema";
}

/* --- Tema düğmesi bağlama --------------------------------- */
/* Başlık ve alt bilgi artık statik HTML olarak üretiliyor
   (scripts/site-uret.py). Burada yalnızca tema düğmesi bağlanır. */
export function temaBagla() {
  const d = document.querySelector(".tema-dugme");
  if (!d) return;
  d.addEventListener("click", temaDegistir);
  temaEtiketiYenile();
}

/* --- Tarih ------------------------------------------------ */
const GUN_MS = 86400000;

export function bugun() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function tarihOku(deger) {
  if (!deger) return null;
  const d = new Date(deger + "T00:00:00");
  return isNaN(d) ? null : d;
}

export function gunEkle(tarih, gun) {
  return new Date(tarih.getTime() + gun * GUN_MS);
}

/* Takvim süresi ekler: { gun } | { ay } | { yil }.
 *
 * NEDEN AYRI BİR İŞLEV: "iki ay" 60 gün DEĞİLDİR — takvime göre 59 ile 62
 * gün arasında değişir. Ayı 30 günle çarpmak, kullanıcıya olmayan bir gün
 * vaat edebilir; hak düşürücü sürede bu doğrudan hak kaybıdır.
 *
 * Ay sonu taşması: 31 Ocak + 1 ay JS'te 3 Mart'a taşar. Süre hesabında
 * kabul edilen çözüm, hedef ayda o gün yoksa AYIN SON GÜNÜdür (TBK m.92
 * ile aynı mantık). Aşağıda bu kırpma açıkça yapılır.
 */
export function sureEkle(tarih, sure) {
  if (sure.gun != null) return gunEkle(tarih, sure.gun);

  const d = new Date(tarih.getTime());
  const gun = d.getDate();
  if (sure.ay != null) d.setMonth(d.getMonth() + sure.ay, 1);
  else if (sure.yil != null) d.setFullYear(d.getFullYear() + sure.yil, d.getMonth(), 1);
  else return new Date(tarih.getTime());

  /* Hedef ayın gün sayısı: bir sonraki ayın 0. günü */
  const ayinSonu = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(gun, ayinSonu));
  return d;
}

export function gunFarki(a, b) {
  return Math.round((a.getTime() - b.getTime()) / GUN_MS);
}

export function tarihYaz(d) {
  if (!d) return "—";
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" });
}

/* --- Sayı ------------------------------------------------- */
export function paraYaz(n) {
  if (!isFinite(n)) return "—";
  return Math.round(n).toLocaleString("tr-TR") + " TL";
}

/* --- DOM -------------------------------------------------- */
export function el(etiket, ozellik = {}, ...cocuk) {
  const d = document.createElement(etiket);
  for (const [k, v] of Object.entries(ozellik)) {
    if (k === "class") d.className = v;
    else if (k === "html") d.innerHTML = v;
    else if (k.startsWith("on")) d.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v !== null && v !== undefined && v !== false) d.setAttribute(k, v);
  }
  for (const c of cocuk.flat()) {
    if (c === null || c === undefined || c === false) continue;
    d.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return d;
}

/* --- Yerel kayıt (yalnızca tarayıcıda) -------------------- */
export function kaydet(anahtar, deger) {
  try { localStorage.setItem("dh-" + anahtar, JSON.stringify(deger)); }
  catch (_) { /* özel sekme veya dolu depolama */ }
}

export function oku(anahtar, varsayilan = null) {
  try {
    const h = localStorage.getItem("dh-" + anahtar);
    return h ? JSON.parse(h) : varsayilan;
  } catch (_) { return varsayilan; }
}

export function sil(anahtar) {
  try { localStorage.removeItem("dh-" + anahtar); } catch (_) {}
}

/* --- Metin indirme (sunucusuz) ---------------------------- */
export function metniIndir(dosyaAdi, metin) {
  const blob = new Blob(["﻿" + metin], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = dosyaAdi;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function panoyaKopyala(metin) {
  try {
    await navigator.clipboard.writeText(metin);
    return true;
  } catch (_) {
    return false;
  }
}

/* --- Doğrulama rozeti ------------------------------------- */
export function dogrulamaRozeti(durum) {
  if (durum === "resmi") return el("span", { class: "rozet iyi" }, "doğrulandı");
  if (durum === "coklu") return el("span", { class: "rozet notr" }, "çoklu kaynak");
  return el("span", { class: "rozet dogrulanmamis" }, "doğrulanmadı");
}
