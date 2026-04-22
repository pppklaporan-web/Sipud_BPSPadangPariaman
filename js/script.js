const API = "https://script.google.com/macros/s/AKfycbwQCMCPesfyR2kDZ2oBlHgWec0GVvGHTyKobkRgBP8XJZ0Ca83XnvhUE4kCHUti-hCz/exec";

const warna = {
  "Perdagangan Online Rumahan":"#3b82f6",
  "Perdagangan Online Berbangunan":"#22c55e",
  "Usaha Transaksi Digital":"#f59e0b",
  "Transportasi Online":"#ef4444"
};

fetch(API)
.then(res=>res.json())
.then(data=>{

  const rows = data.slice(1);

  // KPI
  document.getElementById("total").innerText = rows.length;

  const petugasSet = new Set(rows.map(r=>r[11]));
  document.getElementById("petugas").innerText = petugasSet.size;

  // CHART PETUGAS
  const petugasCount = {};
  rows.forEach(r=>{
    const p = r[11] || "Tidak diketahui";
    petugasCount[p] = (petugasCount[p]||0)+1;
  });

  new Chart(document.getElementById("chartPetugas"),{
    type:"bar",
    data:{
      labels:Object.keys(petugasCount),
      datasets:[{
        data:Object.values(petugasCount),
        backgroundColor:"#3b82f6"
      }]
    },
    options:{
      plugins:{legend:{display:false}}
    }
  });

  // CHART KATEGORI
  const kategoriCount = {};
  rows.forEach(r=>{
    const k = r[5];
    kategoriCount[k] = (kategoriCount[k]||0)+1;
  });

  new Chart(document.getElementById("chartKategori"),{
    type:"doughnut",
    data:{
      labels:Object.keys(kategoriCount),
      datasets:[{
        data:Object.values(kategoriCount),
        backgroundColor:Object.keys(kategoriCount).map(k=>warna[k])
      }]
    }
  });

  // MAP (FIX)
  setTimeout(() => {

    const map = L.map('map').setView([-0.55, 100.28], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 300);

    let adaMarker = false;

    rows.forEach(r => {

      const lat = parseFloat(r[8]);
      const lng = parseFloat(r[9]);

      if (!isNaN(lat) && !isNaN(lng) &&
          lat >= -1 && lat <= -0.2 &&
          lng >= 99.8 && lng <= 100.7) {

        adaMarker = true;

        L.marker([lat, lng]).addTo(map)
          .bindPopup(`<b>${r[2]}</b><br>${r[3]}`);
      }

    });

    if (!adaMarker) {
      L.marker([-0.55, 100.28]).addTo(map)
        .bindPopup("Belum ada data lokasi")
        .openPopup();
    }

  }, 300);

});
