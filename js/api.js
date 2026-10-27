<<<<<<< HEAD
// ============================================
// API CLIENT — pengganti google.script.run (fetch ke GAS)
// POST wajib text/plain agar tidak memicu CORS preflight yang diblok GAS.
// Mengembalikan objek {success, data|message}. Khusus 'getKontenPublik' (GET) langsung mengembalikan data.
// ============================================
async function run(f, ...a) {
  if (!GAS_URL || GAS_URL.indexOf('ISI_') === 0) throw new Error('GAS_URL belum diisi di js/config.js');
  const get = f === 'getKontenPublik';
  let res;
  try {
    res = get
      ? await fetch(GAS_URL + '?action=getKontenPublik')
      : await fetch(GAS_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: f, args: a }) });
  } catch (e) { throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet.'); }
  let j;
  try { j = await res.json(); } catch (e) { throw new Error('Respons server tidak valid. Pastikan deployment Web App: akses "Anyone" dan versi terbaru.'); }
  if (get) { if (!j.success) throw new Error(j.message); return j.data; }
  return j;
}
=======
// Jembatan ke backend Apps Script: pengganti google.script.run (fetch + JSON).
// POST wajib text/plain agar tidak memicu preflight CORS yang diblokir GAS.
const run = async (f, ...a) => {
  if (!/^https:\/\/script\.google\.com\//.test(GAS_URL)) throw new Error('GAS_URL belum diisi di js/config.js');
  let r;
  try {
    r = f === 'getKontenPublik'
      ? await fetch(GAS_URL + '?action=getKontenPublik')
      : await fetch(GAS_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ fn: f, args: a }) });
  } catch (e) { throw new Error('Tidak dapat terhubung ke server. Periksa koneksi Anda.'); }
  let j;
  try { j = await r.json(); } catch (e) { throw new Error('Respons server tidak valid. Pastikan deployment Web App diakses oleh "Anyone".'); }
  if (j && j.__err) throw new Error(j.message);
  return j;
};
>>>>>>> 2f2faa1 (Upload pertama)
