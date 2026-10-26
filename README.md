# NusaAcademy.ID — Frontend (GitHub Pages)

Frontend statis (HTML/CSS/JS vanilla). Backend: Google Apps Script sebagai REST API (JSON).

```
index.html      ← harus berada di ROOT repository
css/style.css
js/config.js    ← isi GAS_URL (URL /exec dari Apps Script) sebelum push
js/api.js       ← fetch ke GAS
js/app.js       ← logika landing page + dashboard
```

Update setelah mengubah file: `git add .` → `git commit -m "pesan"` → `git push`.
Lihat `PANDUAN-INSTALASI.md` untuk langkah lengkap.
