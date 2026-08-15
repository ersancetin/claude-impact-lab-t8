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

/* --- Sayfa iskeleti --------------------------------------- */
export function iskelet({ aktif } = {}) {
  const kok = document.body;

  const ust = document.createElement("header");
  ust.className = "ust";
  ust.innerHTML = `
    <div class="ust-ic">
      <a class="marka" href="./index.html">Deprem Haklarım</a>
      <span class="bosluk"></span>
      <button class="tema-dugme" type="button">Koyu tema</button>
    </div>`;
  kok.prepend(ust);

  const atla = document.createElement("a");
  atla.className = "atla";
  atla.href = "#ana";
  atla.textContent = "İçeriğe atla";
  kok.prepend(atla);

  const alt = document.createElement("footer");
  alt.className = "alt";
  alt.innerHTML = `
    <div class="kap">
      <nav>
        <a href="./index.html">Ana sayfa</a>
        <a href="./haklarim.html">Haklarım</a>
        <a href="./sureler.html">Süre takvimi</a>
        <a href="./teminat.html">Sigorta açığı</a>
        <a href="./dilekce.html">Dilekçe</a>
      </nav>
      <p><strong>Bu site hukuki tavsiye vermez.</strong> Buradaki bilgiler genel
      bilgilendirme amaçlıdır ve avukatlık hizmetinin yerine geçmez. Somut
      durumunuz için bir avukata veya bulunduğunuz ilin barosunun
      <strong>adli yardım</strong> birimine başvurun.</p>
      <p>Bilgiler henüz resmî kaynaklardan doğrulanmamıştır; doğrulama
      sürmektedir. Girdiğiniz hiçbir bilgi sunucuya gönderilmez, yalnızca
      tarayıcınızda kalır.</p>
      <p>Kâr amacı gütmeyen açık kaynak çalışma · T8 Hasar Tespiti</p>
    </div>`;
  kok.append(alt);

  ust.querySelector(".tema-dugme").addEventListener("click", temaDegistir);
  temaEtiketiYenile();

  if (aktif) document.title = `${aktif} · Deprem Haklarım`;
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
