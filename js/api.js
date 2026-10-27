<<<<<<< HEAD
// Lapisan komunikasi ke backend Google Apps Script (pure REST API, tanpa google.script.run).
// GET  ?action=getKontenPublik -> konten landing page (publik, di-cache server)
// POST (text/plain) {fn, args}  -> semua aksi lain. text/plain WAJIB agar tidak memicu CORS preflight.
async function panggil(url, opt) {
  if (!/^https:\/\/script\.google\.com\/.+\/exec$/.test(GAS_URL)) {
    throw new Error('GAS_URL belum diisi. Edit js/config.js lalu tempel URL /exec dari Apps Script.');
  }
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 60000);
  try {
    const res = await fetch(url, Object.assign({ signal: ctl.signal }, opt));
    if (!res.ok) throw new Error('Server tidak merespons (' + res.status + ').');
    let j;
    try { j = await res.json(); }
    catch (e) { throw new Error('Respons server tidak valid. Pastikan deployment Apps Script: Execute as "Me", akses "Anyone".'); }
    if (j && j.__err) throw new Error(j.message || 'Terjadi kesalahan di server.');
    return j;
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('Waktu tunggu habis. Coba lagi.');
    throw e;
  } finally { clearTimeout(t); }
}
const run = (fn, ...args) => fn === 'getKontenPublik'
  ? panggil(GAS_URL + '?action=getKontenPublik')
  : panggil(GAS_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ fn: fn, args: args }) });
=======
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
>>>>>>> 3e3c17698e83f3607cddf7af29ca952a272c2496
