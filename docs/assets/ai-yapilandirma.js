/* ============================================================
   AI SOHBET — DeepSeek API yapılandırması

   apiAnahtar burada BOŞ tutulur ve asla commit edilmez. Yayın
   derlemesinde (.github/workflows/pages.yml) GitHub Actions
   secret'ı ("DEEPSEEK_API_KEY") build sırasında bu dosyadaki
   boş değerin yerine geçirilir — yalnızca çalıştırıcının
   üzerindeki geçici kopyada, repoya geri yazılmaz.

   ÖNEMLİ GÜVENLİK NOTU: Bu site tamamen statik (backend yok),
   bu yüzden anahtar yine de yayınlanan sayfanın kaynağında
   herkese açık biçimde görünür olacaktır. Bilinçli bir
   hackathon/demo kararıdır — düşük harcama limitli, kolayca
   iptal edilebilir bir anahtar kullanın. Kalıcı/üretim
   kullanımı için anahtarı gizleyen bir proxy (ör. Cloudflare
   Worker) gerekir.
   ============================================================ */
export const AI_YAPILANDIRMA = {
  apiAnahtar: "sk-f0fde9185d1f444d9bf67df7940a10e4",
  ucNokta: "https://api.deepseek.com/chat/completions",
  model: "deepseek-chat",
};
