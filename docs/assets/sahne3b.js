/* ============================================================
   3B KAPSAM SAHNESİ — DASK ile konut poliçesinin farkı

   NE ANLATIR: sahne iki evrede döner.
     Evre 1 — DASK: bina kabuğu yeşil (karşılanıyor), içerideki eşya
              KIRMIZI (açıkta kalıyor). Kamera eve yaklaşır: mesaj
              "DASK yalnızca şu dört duvarı öder".
     Evre 2 — + Konut poliçesi: eşya kehribara döner (karşılanıyor) ve
              kamera geri çekilerek bahçedeki çadırı — alternatif
              konaklamayı — kadraja alır.
   Renkler afişin lejantıyla birebir aynı: yeşil #0A6E6B "DASK öder",
   kırmızı #8E1B12 "açıkta kalan", kehribar #855100 "konut poliçesi öder".
   Kamera hareketi süs değil; anlatının parçası.

   KADRAJ KURALI: kamera mesafesi elle verilmez. Her karede, o karenin
   bakış açısına göre modelin sekiz sınır köşesi kamera eksenlerine
   izdüşürülür ve hepsini görüş piramidine sokan EN KÜÇÜK mesafe
   çözülür. Böylece model hiçbir açıda taşmaz ama gereksiz de küçülmez.
   (Önceki sürüm sınır KÜRESİ kullanıyordu: küre kutuya göre çok
   büyük olduğu için model kadrajın ancak üçte birini dolduruyordu.)

   NEDEN ÜSTE BİNEN KATMAN:
   PROJE-AKIS.md §11 tam 3B'yi "mobilde ağır, erişilebilirlik sorunlu"
   diye işaretlemiş. three.js yerele gömülü olsa bile ~190 KB gzip.
   Bu yüzden 3B varsayılan DEĞİL: etiketli SVG afiş taban katman olarak
   sayfada durur, bu modül ancak şu şartlar birlikte sağlanırsa yüklenir:
     1. WebGL2 var
     2. prefers-reduced-motion: reduce KAPALI
     3. Save-Data açık DEĞİL ve bağlantı 2G/3G değil

   Dış istek yok: three.js docs/vendor altından gelir.
   ============================================================ */

const KOSUL_YOK = "3B atlandı";

export function uygunMu() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const b = navigator.connection;
  if (b) {
    if (b.saveData) return false;
    if (/^(slow-2g|2g|3g)$/.test(b.effectiveType || "")) return false;
  }
  try {
    if (!document.createElement("canvas").getContext("webgl2")) return false;
  } catch { return false; }
  return true;
}

function renk(ad, varsayilan) {
  const d = getComputedStyle(document.documentElement).getPropertyValue(ad).trim();
  return d || varsayilan;
}

const yumusat = (t) => t * t * (3 - 2 * t);

const EVRELER = [
  {
    ad: "DASK",
    yazi: "DASK yalnızca binayı öder",
    alt: "Eşyanız, barınmanız ve enkaz kaldırma teminat dışıdır.",
    icerik: 0,      // 0 = kırmızı (açıkta), 1 = kehribar (poliçe öder)
    uzaklik: 0,     // 0 = eve yakın kadraj, 1 = çadır dâhil geniş kadraj
  },
  {
    ad: "+ Konut poliçesi",
    yazi: "Konut poliçesi eklendiğinde",
    alt: "Ev eşyası ve alternatif konaklama da teminat altına girer.",
    icerik: 1,
    uzaklik: 1,
  },
];
const EVRE_SURESI = 5600;
const GECIS_SURESI = 1500;

export async function sahneKur(kap, yaziEl) {
  if (!kap || !uygunMu()) return KOSUL_YOK;

  const T = await import("../vendor/three.module.min.js");

  /* --- Renkler: afiş lejantıyla aynı aile, açılmış tonlar -----
     Lejant jetonları (#8E1B12 / #855100) düz zeminde okunsun diye
     koyu seçilmiş. Aynı iki değeri 3B'de kullanınca ikisi de kahverengi
     bir kütleye dönüşüyor ve evre değişimi fark edilmiyordu. Bu yüzden
     3B'de aynı ailenin açık tonları kullanılır: kırmızı belirgin
     kırmızı, kehribar belirgin altın kalır. Bilgi yine renge
     bırakılmıyor — canlı alt yazı her evrede metni değiştiriyor. */
  const YESIL = new T.Color(renk("--turkuaz", "#0A6E6B"));
  const KEHRIBAR = new T.Color("#D9A13F");
  const ACIKTA = new T.Color("#C43A2C");

  /* --- Sahne ------------------------------------------------- */
  const sahne = new T.Scene();
  const kamera = new T.PerspectiveCamera(34, 1, 0.1, 200);

  const cizer = new T.WebGLRenderer({ antialias: true, alpha: true });
  cizer.setPixelRatio(Math.min(devicePixelRatio, 2));
  cizer.shadowMap.enabled = true;
  cizer.shadowMap.type = T.PCFSoftShadowMap;
  cizer.toneMapping = T.ACESFilmicToneMapping;
  cizer.toneMappingExposure = 1.05;
  kap.replaceChildren(cizer.domElement);
  cizer.domElement.setAttribute("aria-hidden", "true");

  /* Ortam haritası: metal ve verniğin yansıyacağı bir şey olmadan
     buzdolabı siyah, cam kabuk düz görünür. Küçük bir studyo sahnesi
     PMREM ile bir kez pişirilir — dış dosya yok. */
  const pmrem = new T.PMREMGenerator(cizer);
  const studyo = new T.Scene();
  studyo.add(new T.Mesh(
    new T.SphereGeometry(14, 20, 14),
    new T.MeshBasicMaterial({ color: 0xdde4ec, side: T.BackSide })));
  const isikPanel = (renkH, ebat, konum) => {
    const m = new T.Mesh(new T.PlaneGeometry(...ebat),
      new T.MeshBasicMaterial({ color: renkH }));
    m.position.set(...konum);
    m.lookAt(0, 0, 0);
    studyo.add(m);
  };
  isikPanel(0xffffff, [11, 11], [4, 9, 5]);
  isikPanel(0xf3f6fa, [9, 9], [-7, 4, -5]);
  const ortam = pmrem.fromScene(studyo, 0.03).texture;
  sahne.environment = ortam;
  pmrem.dispose();

  sahne.add(new T.HemisphereLight(0xffffff, 0xdde3ea, 0.85));
  const ana = new T.DirectionalLight(0xffffff, 2.1);
  ana.position.set(5, 8.5, 5.5);
  ana.castShadow = true;
  ana.shadow.mapSize.set(1024, 1024);
  ana.shadow.camera.near = 1;
  ana.shadow.camera.far = 34;
  Object.assign(ana.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 });
  ana.shadow.camera.updateProjectionMatrix();
  ana.shadow.radius = 3;
  ana.shadow.bias = -0.0012;
  sahne.add(ana);
  const dolgu = new T.DirectionalLight(0xffffff, 0.45);
  dolgu.position.set(-6, 3, -4);
  sahne.add(dolgu);

  const ZEMIN_Y = -1.3;
  const golge = new T.Mesh(new T.PlaneGeometry(40, 40),
    new T.ShadowMaterial({ opacity: 0.16 }));
  golge.rotation.x = -Math.PI / 2;
  golge.position.y = ZEMIN_Y - 0.005;
  golge.receiveShadow = true;
  sahne.add(golge);

  /* --- Malzemeler -------------------------------------------
     Eşyaya ait her malzeme listeye girer; her karede hepsi birlikte
     kırmızıdan kehribara döner. Pürüz/metal değerleri malzemeye göre
     ayrışır (kumaş mat, buzdolabı parlak) — tek tip plastik görüntü
     "gerçekçi olsun" isteğini karşılamıyordu. */
  const esyaMalzemeleri = [];
  function esya({ ton = 1, puruz = 0.7, metal = 0.02, vernik = 0 } = {}) {
    const m = new T.MeshPhysicalMaterial({
      color: ACIKTA.clone(), roughness: puruz, metalness: metal,
      clearcoat: vernik, clearcoatRoughness: 0.25, envMapIntensity: 0.5,
    });
    m.userData.ton = ton;
    esyaMalzemeleri.push(m);
    return m;
  }
  const KUMAS = esya({ puruz: 0.95, ton: 1.0 });
  const KUMAS_KOYU = esya({ puruz: 0.95, ton: 0.68 });
  const AHSAP = esya({ puruz: 0.55, ton: 0.9, vernik: 0.35 });
  const AHSAP_KOYU = esya({ puruz: 0.6, ton: 0.6 });
  const METAL = esya({ puruz: 0.26, metal: 0.68, ton: 1.25 });
  const METAL_KOYU = esya({ puruz: 0.35, metal: 0.6, ton: 0.55 });
  const CAM_KOYU = esya({ puruz: 0.12, ton: 0.28, vernik: 0.9 });
  const BEZ = esya({ puruz: 0.98, ton: 1.0 });
  const BEZ_KOYU = esya({ puruz: 0.98, ton: 0.6 });

  const kabukMalzeme = new T.MeshPhysicalMaterial({
    color: YESIL, transparent: true, opacity: 0.12,
    roughness: 0.08, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.1,
    side: T.DoubleSide, depthWrite: false, envMapIntensity: 1.1,
  });
  const telMalzeme = new T.LineBasicMaterial({ color: YESIL });
  /* Yapı elemanları — duvar dolgusu saydam kalırken çerçeve, kapı,
     saçak, baca gibi parçalar mat: bina ancak bu parçalarla "ev" gibi
     okunuyor. Hepsi DASK yeşilinin tonları — bina teminatı bir bütün. */
  const AC_YESIL = YESIL.clone().lerp(new T.Color(0xffffff), 0.30);
  const yapiMalzeme = new T.MeshPhysicalMaterial({
    color: AC_YESIL, roughness: 0.45, metalness: 0.05,
    clearcoat: 0.35, clearcoatRoughness: 0.3, envMapIntensity: 0.9,
  });
  const yapiKoyu = new T.MeshPhysicalMaterial({
    color: YESIL.clone().multiplyScalar(0.78), roughness: 0.55, metalness: 0.06,
    envMapIntensity: 0.8,
  });
  const catiMalzeme = new T.MeshPhysicalMaterial({
    color: YESIL, transparent: true, opacity: 0.48,
    roughness: 0.3, metalness: 0, clearcoat: 0.7, clearcoatRoughness: 0.2,
    side: T.DoubleSide, envMapIntensity: 1.1,
  });
  const camMalzeme = new T.MeshPhysicalMaterial({
    color: 0xE9F3F5, transparent: true, opacity: 0.17,
    roughness: 0.03, metalness: 0, side: T.DoubleSide,
    depthWrite: false, envMapIntensity: 1.5,
  });

  /* --- Geometri yardımcıları --------------------------------
     Köşesi keskin kutu "mobilya" gibi okunmuyordu. Yuvarlatılmış kutu
     (kenar pahı + köşe yarıçapı) tek başına en büyük gerçekçilik
     kazancı: ışık kenarda kırılıyor ve nesne hacim kazanıyor. */
  const geoBellek = new Map();
  function yuvarlakGeo(g, y, d, r = 0.05) {
    const anahtar = `${g}|${y}|${d}|${r}`;
    const hazir = geoBellek.get(anahtar);
    if (hazir) return hazir;
    const b = Math.min(r, g / 2.05, y / 2.05, d / 2.05);
    const gg = g - 2 * b, yy = y - 2 * b, dd = d - 2 * b;
    const rr = Math.max(0.0001, Math.min(r - b, gg / 2.05, yy / 2.05));
    const s = new T.Shape();
    const x0 = -gg / 2, y0 = -yy / 2, x1 = gg / 2, y1 = yy / 2;
    s.moveTo(x0 + rr, y0);
    s.lineTo(x1 - rr, y0); s.quadraticCurveTo(x1, y0, x1, y0 + rr);
    s.lineTo(x1, y1 - rr); s.quadraticCurveTo(x1, y1, x1 - rr, y1);
    s.lineTo(x0 + rr, y1); s.quadraticCurveTo(x0, y1, x0, y1 - rr);
    s.lineTo(x0, y0 + rr); s.quadraticCurveTo(x0, y0, x0 + rr, y0);
    const geo = new T.ExtrudeGeometry(s, {
      depth: dd, bevelEnabled: true, bevelSize: b, bevelThickness: b,
      bevelSegments: 2, curveSegments: 5, steps: 1,
    });
    geo.translate(0, 0, -dd / 2);
    geo.computeVertexNormals();
    geoBellek.set(anahtar, geo);
    return geo;
  }

  function parca(ana_grup, geo, malzeme, konum, donus) {
    const m = new T.Mesh(geo, malzeme);
    if (konum) m.position.set(...konum);
    if (donus) m.rotation.set(...donus);
    m.castShadow = true;
    m.receiveShadow = true;
    ana_grup.add(m);
    return m;
  }
  const blok = (grup_, ebat, konum, malzeme, r = 0.05, donus) =>
    parca(grup_, yuvarlakGeo(ebat[0], ebat[1], ebat[2], r), malzeme, konum, donus);
  const silindir = (grup_, r, h, konum, malzeme, donus) =>
    parca(grup_, new T.CylinderGeometry(r, r, h, 12), malzeme, konum, donus);

  /* --- Bina: kutu değil, ev ---------------------------------
     Önceki sürüm tek bir saydam kutu + koni çatıydı; "ev" değil
     "kutu" gibi okunuyordu. Bina artık gerçek yapı elemanlarından
     kuruluyor: temel, dört ayrı duvar paneli, duvarlarda GERÇEK
     pencere ve kapı boşlukları (delikli şekil), çerçeve ve cam,
     eşik, saçak, kırma çatı, baca.
     Duvar dolgusu saydam kalıyor: kesit anlatımı bozulmasın, eşya
     içeriden görünmeye devam etsin. */
  const grup = new T.Group();
  sahne.add(grup);
  const ev = new T.Group();          // bina + içindeki eşya (yakın kadraj)
  grup.add(ev);

  const EN = 4.2, BOY = 2.3, DERINLIK = 3.1, KAL = 0.13, TEMEL = 0.24;
  const TABAN = ZEMIN_Y + TEMEL;     // eşyaların üstünde durduğu döşeme

  /* Temel + döşeme */
  blok(ev, [EN + 0.26, TEMEL, DERINLIK + 0.26],
       [0, ZEMIN_Y + TEMEL / 2, 0], yapiKoyu, 0.02);

  /* Duvar paneli: delikli şekilden çıkarılır, boşluklar gerçek boşluktur */
  function duvarGeo(w, h, delikler) {
    const s = new T.Shape();
    s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0);
    s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.lineTo(-w / 2, 0);
    for (const d of delikler) {
      const p = new T.Path();
      p.moveTo(d.cx - d.hw, d.cy - d.hh); p.lineTo(d.cx + d.hw, d.cy - d.hh);
      p.lineTo(d.cx + d.hw, d.cy + d.hh); p.lineTo(d.cx - d.hw, d.cy + d.hh);
      p.lineTo(d.cx - d.hw, d.cy - d.hh);
      s.holes.push(p);
    }
    const g = new T.ExtrudeGeometry(s, { depth: KAL, bevelEnabled: false });
    g.translate(0, 0, -KAL / 2);
    return g;
  }

  /* Boşluğu saran çerçeve — dört kenar + isteğe bağlı orta kayıt */
  function cerceve(g, hw, hh, kayit) {
    const k = 0.055, der = KAL + 0.05;
    blok(g, [hw * 2 + k * 2, k, der], [0, hh + k / 2, 0], yapiMalzeme, 0.015);
    blok(g, [hw * 2 + k * 2, k, der], [0, -hh - k / 2, 0], yapiMalzeme, 0.015);
    blok(g, [k, hh * 2, der], [-hw - k / 2, 0, 0], yapiMalzeme, 0.015);
    blok(g, [k, hh * 2, der], [hw + k / 2, 0, 0], yapiMalzeme, 0.015);
    if (kayit) {
      blok(g, [k * 0.6, hh * 2, der * 0.6], [0, 0, 0], yapiMalzeme, 0.01);
      blok(g, [hw * 2, k * 0.6, der * 0.6], [0, 0, 0], yapiMalzeme, 0.01);
    }
  }

  function pencere(d) {
    const g = new T.Group();
    g.position.set(d.cx, d.cy, 0);
    cerceve(g, d.hw, d.hh, true);
    const cam = new T.Mesh(new T.PlaneGeometry(d.hw * 2, d.hh * 2), camMalzeme);
    g.add(cam);
    /* Denizlik: pencerenin dışa taşan alt tablası */
    blok(g, [d.hw * 2 + 0.20, 0.05, KAL + 0.16], [0, -d.hh - 0.09, 0.02], yapiKoyu, 0.015);
    return g;
  }

  function kapi(d) {
    const g = new T.Group();
    g.position.set(d.cx, d.cy, 0);
    cerceve(g, d.hw, d.hh, false);
    const der = KAL * 0.7;
    blok(g, [d.hw * 2 - 0.03, d.hh * 2 - 0.03, der], [0, 0, 0], yapiMalzeme, 0.02);
    for (const y of [d.hh * 0.42, -d.hh * 0.42])          // kapı panoları
      blok(g, [d.hw * 1.15, d.hh * 0.62, der + 0.02], [0, y, 0], yapiKoyu, 0.02);
    silindir(g, 0.028, 0.11, [d.hw * 0.62, -0.02, der * 0.9], yapiKoyu,
             [Math.PI / 2, 0, 0]);                        // kol
    return g;
  }

  const DUVARLAR = [
    { w: EN, don: 0, konum: [0, TABAN, DERINLIK / 2 - KAL / 2], delikler: [
      { t: "kapi", cx: -1.12, cy: 1.00, hw: 0.42, hh: 0.95 },
      { t: "pencere", cx: 1.10, cy: 1.42, hw: 0.55, hh: 0.42 },
    ] },
    { w: EN, don: Math.PI, konum: [0, TABAN, -DERINLIK / 2 + KAL / 2], delikler: [
      { t: "pencere", cx: -1.15, cy: 1.42, hw: 0.50, hh: 0.42 },
      { t: "pencere", cx: 1.15, cy: 1.42, hw: 0.50, hh: 0.42 },
    ] },
    { w: DERINLIK, don: Math.PI / 2, konum: [EN / 2 - KAL / 2, TABAN, 0], delikler: [
      { t: "pencere", cx: 0, cy: 1.42, hw: 0.58, hh: 0.42 },
    ] },
    { w: DERINLIK, don: -Math.PI / 2, konum: [-EN / 2 + KAL / 2, TABAN, 0], delikler: [
      { t: "pencere", cx: 0, cy: 1.42, hw: 0.58, hh: 0.42 },
    ] },
  ];
  for (const d of DUVARLAR) {
    const g = new T.Group();
    g.position.set(...d.konum); g.rotation.y = d.don;
    ev.add(g);
    const geo = duvarGeo(d.w, BOY, d.delikler);
    const m = new T.Mesh(geo, kabukMalzeme);
    m.receiveShadow = true;
    g.add(m);
    g.add(new T.LineSegments(new T.EdgesGeometry(geo), telMalzeme));
    for (const h of d.delikler) g.add(h.t === "kapi" ? kapi(h) : pencere(h));
  }

  /* Eşik: kapının önünde iki basamak */
  blok(ev, [1.30, 0.10, 0.42], [-1.12, ZEMIN_Y + TEMEL - 0.05, DERINLIK / 2 + 0.19],
       yapiKoyu, 0.02);
  blok(ev, [1.52, 0.11, 0.34], [-1.12, ZEMIN_Y + 0.055, DERINLIK / 2 + 0.36],
       yapiKoyu, 0.02);

  /* Saçak: duvar üstünde, çatının oturduğu bilezik */
  const CATI_Y = TABAN + BOY;
  blok(ev, [EN + 0.36, 0.12, DERINLIK + 0.36], [0, CATI_Y + 0.06, 0], yapiMalzeme, 0.02);

  /* Kırma çatı: 4 kenarlı koni 45° döndürülünce eksenlere paralel bir
     kare olur; z ekseninde derinlik oranında sıkıştırılıp saçağa oturur. */
  const catiGeo = new T.ConeGeometry(((EN + 0.36) / 2) * Math.SQRT2, 1.02, 4);
  const cati = new T.Mesh(catiGeo, catiMalzeme);
  cati.rotation.y = Math.PI / 4;
  cati.scale.z = (DERINLIK + 0.36) / (EN + 0.36);
  cati.position.y = CATI_Y + 0.12 + 1.02 / 2;
  cati.castShadow = true;
  ev.add(cati);
  const catiTel = new T.LineSegments(new T.EdgesGeometry(catiGeo), telMalzeme);
  catiTel.rotation.copy(cati.rotation);
  catiTel.scale.copy(cati.scale);
  catiTel.position.copy(cati.position);
  ev.add(catiTel);

  /* İç aydınlatma: çatı ve saçak gölge düşürdüğü için oda kararıyor,
     eşya —anlatının asıl öznesi— seçilemiyordu. Odanın ortasındaki
     yumuşak ışık yalnızca içeriyi kaldırır, gölge üretmez. */
  const icIsik = new T.PointLight(0xfff6ea, 9, 7.5, 2);
  icIsik.position.set(0, TABAN + 1.75, 0.1);
  ev.add(icIsik);

  /* Baca: çatıdan çıkar, evi silüetten tanıtan parça */
  const baca = new T.Group(); ev.add(baca);
  blok(baca, [0.30, 1.00, 0.30], [0, 0.50, 0], yapiKoyu, 0.02);
  blok(baca, [0.42, 0.09, 0.42], [0, 1.02, 0], yapiMalzeme, 0.02);
  baca.position.set(EN * 0.26, CATI_Y, -DERINLIK * 0.20);

  /* --- Eşya yerleşimi ---------------------------------------
     Oda dört çeyreğe bölünür ve her çeyreğe tek bir büyük parça
     düşer: kamera dar bir yayda gezindiği için üst üste binen eşya
     okunmuyordu. Ön: koltuk (sol) · televizyon (sağ).
     Arka: buzdolabı (sol) · masa ve sandalyeler (sağ). */

  /* --- Koltuk: taban + sırtlık + kolçak + minder + ayak ------ */
  const koltuk = new T.Group(); ev.add(koltuk);
  blok(koltuk, [1.78, 0.30, 0.86], [0, 0.34, 0], KUMAS_KOYU, 0.07);
  blok(koltuk, [1.78, 0.66, 0.18], [0, 0.72, -0.34], KUMAS, 0.08);
  blok(koltuk, [0.20, 0.52, 0.86], [-0.79, 0.55, 0], KUMAS, 0.09);
  blok(koltuk, [0.20, 0.52, 0.86], [0.79, 0.55, 0], KUMAS, 0.09);
  blok(koltuk, [0.72, 0.17, 0.68], [-0.39, 0.575, 0.05], KUMAS, 0.07);
  blok(koltuk, [0.72, 0.17, 0.68], [0.39, 0.575, 0.05], KUMAS, 0.07);
  for (const [dx, dz] of [[-0.75, 0.34], [0.75, 0.34], [-0.75, -0.34], [0.75, -0.34]])
    silindir(koltuk, 0.045, 0.19, [dx, 0.095, dz], AHSAP_KOYU);
  koltuk.position.set(-1.02, TABAN, 0.86);
  koltuk.rotation.y = 0.14;

  /* --- Buzdolabı: gövde + iki kapak + kulplar --------------- */
  const buzdolabi = new T.Group(); ev.add(buzdolabi);
  blok(buzdolabi, [0.76, 1.62, 0.68], [0, 0.81, 0], METAL_KOYU, 0.05);
  blok(buzdolabi, [0.74, 0.52, 0.05], [0, 1.33, 0.335], METAL, 0.03);  // dondurucu
  blok(buzdolabi, [0.74, 1.02, 0.05], [0, 0.53, 0.335], METAL, 0.03);  // soğutucu
  silindir(buzdolabi, 0.022, 0.30, [0.30, 1.33, 0.40], METAL_KOYU);
  silindir(buzdolabi, 0.022, 0.52, [0.30, 0.62, 0.40], METAL_KOYU);
  buzdolabi.position.set(-1.52, TABAN, -1.03);

  /* --- Masa + iki sandalye ---------------------------------- */
  const masa = new T.Group(); ev.add(masa);
  blok(masa, [1.34, 0.08, 0.84], [0, 0.74, 0], AHSAP, 0.03);
  for (const [dx, dz] of [[-0.58, -0.34], [0.58, -0.34], [-0.58, 0.34], [0.58, 0.34]])
    silindir(masa, 0.045, 0.74, [dx, 0.37, dz], AHSAP_KOYU);
  for (const yon of [-1, 1]) {
    const s = new T.Group(); masa.add(s);
    blok(s, [0.46, 0.07, 0.44], [0, 0.45, 0], AHSAP, 0.03);
    blok(s, [0.44, 0.50, 0.06], [0, 0.73, yon * 0.19], AHSAP, 0.03);
    for (const [dx, dz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]])
      silindir(s, 0.028, 0.45, [dx, 0.225, dz], AHSAP_KOYU);
    s.position.set(0, 0, yon * 0.70);
  }
  masa.position.set(1.02, TABAN, -0.46);
  masa.rotation.y = -0.10;

  /* --- Televizyon: sehpa + ayak + ekran ---------------------- */
  const tv = new T.Group(); ev.add(tv);
  blok(tv, [1.18, 0.36, 0.40], [0, 0.18, 0], AHSAP, 0.04);
  blok(tv, [1.14, 0.04, 0.36], [0, 0.20, 0.01], AHSAP_KOYU, 0.02);
  blok(tv, [0.24, 0.10, 0.16], [0, 0.41, 0], METAL_KOYU, 0.03);
  blok(tv, [1.00, 0.60, 0.05], [0, 0.76, 0], CAM_KOYU, 0.02);
  tv.position.set(1.34, TABAN, 0.92);
  tv.rotation.y = Math.PI * 0.82;   // koltuğa dönük

  /* --- Çadır: binanın DIŞINDA -------------------------------
     Alternatif konaklama, DASK'ın kapsamadığı ama konut poliçesinin
     kapsadığı kalem. Bina dışında durması farkı mekânsal olarak da
     anlatıyor; evre 2'de kamera geri çekilip bunu kadraja alır.

     Piramit koni "çadır" gibi okunmuyordu. Şimdi afet barınma çadırı
     kurgusu: yer örtüsü, düşey bez duvarlar, beşik çatı (üçgen prizma),
     iki ucundan çıkan mahya direği, kemerli giriş kapağı ve yere
     kazıklarla gerilen ipler. */
  const cadir = new T.Group(); grup.add(cadir);
  const CE = 2.05, CD = 1.62, CDUVAR = 0.78, CCATI = 0.62, CSACAK = 0.10;

  blok(cadir, [CE + 0.30, 0.05, CD + 0.30], [0, 0.025, 0], BEZ_KOYU, 0.02);  // yer örtüsü
  blok(cadir, [CE, CDUVAR, CD], [0, CDUVAR / 2 + 0.04, 0], BEZ, 0.06);       // bez duvarlar

  /* Beşik çatı: XY düzlemindeki üçgen Z boyunca ötelenir; mahya Z
     ekseninde uzanır, saçak duvarların biraz dışına taşar. */
  const ucgen = new T.Shape();
  ucgen.moveTo(-CE / 2 - CSACAK, 0);
  ucgen.lineTo(CE / 2 + CSACAK, 0);
  ucgen.lineTo(0, CCATI);
  ucgen.lineTo(-CE / 2 - CSACAK, 0);
  const cadirCatiGeo = new T.ExtrudeGeometry(ucgen, {
    depth: CD + CSACAK * 2, bevelEnabled: false,
  });
  cadirCatiGeo.translate(0, 0, -(CD + CSACAK * 2) / 2);
  parca(cadir, cadirCatiGeo, BEZ, [0, CDUVAR + 0.04, 0]);

  /* Mahya direği: iki uçtan dışarı taşar — çadırı çadır yapan detay */
  silindir(cadir, 0.026, CD + 0.26, [0, CDUVAR + CCATI + 0.02, 0], BEZ_KOYU,
           [Math.PI / 2, 0, 0]);

  /* Giriş: kemerli kapak + iki yandan toplanmış bez */
  const giris = new T.Group(); cadir.add(giris);
  giris.position.set(0, 0, CD / 2 + 0.02);
  const kemer = new T.Shape();
  kemer.moveTo(-0.34, 0);
  kemer.lineTo(-0.34, 0.62);
  kemer.quadraticCurveTo(-0.34, 0.98, 0, 0.98);
  kemer.quadraticCurveTo(0.34, 0.98, 0.34, 0.62);
  kemer.lineTo(0.34, 0);
  kemer.lineTo(-0.34, 0);
  const kapakGeo = new T.ExtrudeGeometry(kemer, {
    depth: 0.05, bevelEnabled: false, curveSegments: 8,
  });
  kapakGeo.translate(0, 0.05, 0);
  parca(giris, kapakGeo, BEZ_KOYU);
  for (const yon of [-1, 1])                       // toplanmış kapak bezi
    blok(giris, [0.13, 0.86, 0.10], [yon * 0.41, 0.47, 0.02], BEZ, 0.05);

  /* Gergi ipleri ve kazıklar */
  for (const yx of [-1, 1])
    for (const yz of [-1, 1]) {
      silindir(cadir, 0.011, 0.92,
               [yx * (CE / 2 + 0.30), 0.44, yz * (CD / 2 + 0.24)], BEZ_KOYU,
               [yz * Math.PI / 6, 0, -yx * Math.PI / 5]);
      silindir(cadir, 0.022, 0.16,
               [yx * (CE / 2 + 0.46), 0.06, yz * (CD / 2 + 0.36)], BEZ_KOYU);
    }

  cadir.position.set(3.55, ZEMIN_Y, 1.55);
  cadir.rotation.y = -0.42;

  /* --- Kadraj: tam çözüm, kürelemeden ------------------------
     Kamera hedefi H, bakış birim vektörü Y (hedeften kameraya) olsun.
     Bir köşe noktası q = p − H için kamera eksenlerindeki bileşenler
     (sağ, üst, Y) alınır. Kamera H + Y·d konumundayken noktanın
     derinliği d − q·Y'dir; piramide girmesi için
        d ≥ |q·sağ|/tanX + q·Y   ve   d ≥ |q·üst|/tanY + q·Y.
     Sekiz köşenin maksimumu, o açıda modeli tam sığdıran mesafedir.

     Köşeler tek bir birleşik kutudan değil, her nesnenin KENDİ
     kutusundan toplanır: ev ile çadırın arasındaki ve çadırın
     üstündeki boş hacim tek kutuda sahte bir hacim yaratıp modeli
     gereksiz küçültüyordu. */
  function kosePaketi(nesneler) {
    const k = [];
    const birlesik = new T.Box3();
    for (const n of nesneler) {
      const b = new T.Box3().setFromObject(n);
      birlesik.union(b);
      for (const x of [b.min.x, b.max.x])
        for (const y of [b.min.y, b.max.y])
          for (const z of [b.min.z, b.max.z]) k.push(new T.Vector3(x, y, z));
    }
    return { koseler: k, merkez: birlesik.getCenter(new T.Vector3()) };
  }
  const EVE_YAKIN = kosePaketi([ev]);
  const TUMU = kosePaketi([ev, cadir]);

  const _q = new T.Vector3();
  function sigdir(paket, hedef, yon, sag, ust, tanX, tanY, pay) {
    let d = 0;
    for (const p of paket.koseler) {
      _q.copy(p).sub(hedef);
      const z = _q.dot(yon);
      d = Math.max(d,
        Math.abs(_q.dot(sag)) / tanX + z,
        Math.abs(_q.dot(ust)) / tanY + z);
    }
    return d * pay;
  }

  function boyutla() {
    const g = kap.clientWidth || 480;
    const y = Math.max(300, Math.round(g * 0.76));
    cizer.setSize(g, y, false);
    kamera.aspect = g / y;
    kamera.updateProjectionMatrix();
  }
  boyutla();
  const gozlemci = new ResizeObserver(boyutla);
  gozlemci.observe(kap);

  /* --- Döngü ------------------------------------------------- */
  const YUKARI = new T.Vector3(0, 1, 0);
  const _yon = new T.Vector3(), _sag = new T.Vector3(), _ust = new T.Vector3();
  const _hedef = new T.Vector3();

  let calisiyor = true, kare = 0, gecenToplam = 0, sonEvre = -1;
  let baslangic = performance.now();

  const gorunurluk = () => {
    calisiyor = !document.hidden;
    if (calisiyor) { baslangic = performance.now() - gecenToplam; don(); }
  };
  document.addEventListener("visibilitychange", gorunurluk);

  function yaziyiYaz(i) {
    if (!yaziEl || i === sonEvre) return;
    sonEvre = i;
    const e = EVRELER[i];
    const b = document.createElement("b");
    b.textContent = e.yazi;
    const s = document.createElement("span");
    s.textContent = e.alt;
    yaziEl.replaceChildren(b, s);
    yaziEl.dataset.evre = e.ad;
  }

  function don(su) {
    if (!calisiyor) return;
    kare = requestAnimationFrame(don);
    /* rAF zaman damgası karenin başlangıcını verir ve hemen önce alınan
       performance.now()'dan geride olabilir; kırpılmazsa indis -1'e düşer. */
    gecenToplam = Math.max(0, (su || performance.now()) - baslangic);

    const tur = EVRE_SURESI * EVRELER.length;
    const t = ((gecenToplam % tur) + tur) % tur;
    const i = Math.floor(t / EVRE_SURESI);
    const icinde = t - i * EVRE_SURESI;
    const gecis = icinde < GECIS_SURESI ? yumusat(icinde / GECIS_SURESI) : 1;
    const onceki = (i - 1 + EVRELER.length) % EVRELER.length;
    const karisim = (alan) =>
      EVRELER[onceki][alan] + (EVRELER[i][alan] - EVRELER[onceki][alan]) * gecis;

    /* Eşya rengi: açıkta kırmızısı → poliçe kehribarı */
    const oran = karisim("icerik");
    for (const m of esyaMalzemeleri) {
      m.color.copy(ACIKTA).lerp(KEHRIBAR, oran).multiplyScalar(m.userData.ton);
      m.emissive.copy(KEHRIBAR).multiplyScalar(oran * 0.07);
    }
    yaziyiYaz(icinde > GECIS_SURESI / 2 ? i : onceki);

    /* Yörünge: dar bir salınım. Tam tur atmıyoruz — çadır binanın
       önüne girip kadrajı bozmasın, ev hep aynı okunaklı çeyrekten
       görünsün. Yükseklik de hafifçe nefes alıyor. */
    const s = gecenToplam / 1000;
    const aci = 0.16 + Math.sin(s * 0.20) * 0.40;
    const yuk = 0.31 + Math.sin(s * 0.27) * 0.055;
    _yon.set(Math.sin(aci) * Math.cos(yuk), Math.sin(yuk), Math.cos(aci) * Math.cos(yuk));
    _sag.crossVectors(YUKARI, _yon).normalize();
    _ust.crossVectors(_yon, _sag).normalize();

    const tanY = Math.tan((kamera.fov * Math.PI) / 360);
    const tanX = tanY * kamera.aspect;

    const k = karisim("uzaklik");
    _hedef.lerpVectors(EVE_YAKIN.merkez, TUMU.merkez, k);
    const yakin = sigdir(EVE_YAKIN, _hedef, _yon, _sag, _ust, tanX, tanY, 1.03);
    const uzak = sigdir(TUMU, _hedef, _yon, _sag, _ust, tanX, tanY, 1.05);

    kamera.position.copy(_hedef).addScaledVector(_yon, yakin + (uzak - yakin) * k);
    kamera.lookAt(_hedef);

    cizer.render(sahne, kamera);
  }
  don();

  return () => {
    cancelAnimationFrame(kare);
    calisiyor = false;
    document.removeEventListener("visibilitychange", gorunurluk);
    gozlemci.disconnect();
    ortam.dispose();
    cizer.dispose();
  };
}

export function sahneBaslat() {
  const sar = document.querySelector("[data-sahne3b]");
  const kap = sar && sar.querySelector(".sahne-3b");
  if (!kap || !uygunMu()) return;
  const yazi = sar.querySelector("[data-sahne-yazi]");

  sahneKur(kap, yazi).then((sonuc) => {
    if (sonuc !== KOSUL_YOK) {
      sar.hidden = false;
      const afis = document.querySelector("[data-afis-2b]");
      if (afis) afis.hidden = true;
    }
  }).catch(() => { /* 3B başarısızsa SVG afiş yerinde kalır */ });
}
