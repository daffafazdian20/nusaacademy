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
