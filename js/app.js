const API = "https://script.google.com/macros/s/AKfycbwQCMCPesfyR2kDZ2oBlHgWec0GVvGHTyKobkRgBP8XJZ0Ca83XnvhUE4kCHUti-hCz/exec";

let lat="", lng="";

navigator.geolocation.getCurrentPosition(pos=>{
  lat = pos.coords.latitude;
  lng = pos.coords.longitude;
});

// Toast
function showToast(msg){
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.display = "block";
  setTimeout(()=>t.style.display="none",3000);
}

// Loading
function showLoading(){
  document.getElementById("loadingOverlay").style.display="flex";
}

function hideLoading(){
  document.getElementById("loadingOverlay").style.display="none";
}

// Kirim
document.getElementById("btnKirim").onclick = function(){

  const btn = this;

  if(!document.getElementById("petugas").value){
    alert("Petugas belum dipilih!");
    return;
  }

  btn.disabled = true;
  showLoading();

  const metode = [...document.querySelectorAll("input[type=checkbox]:checked")]
    .map(e=>e.value);

  const file = document.getElementById("foto").files[0];
  const reader = new FileReader();

  reader.onloadend = function(){

    const base64 = reader.result ? reader.result.split(",")[1] : "";

    fetch(API,{
      method:"POST",
      body: JSON.stringify({
        petugas: document.getElementById("petugas").value,
        nama_usaha: document.getElementById("nama_usaha").value,
        nama_pemilik: document.getElementById("nama_pemilik").value,
        no_hp: document.getElementById("no_hp").value,
        kategori: document.getElementById("kategori").value,
        platform: document.getElementById("platform").value,
        metode: metode,
        lat: lat,
        lng: lng,
        foto: base64
      })
    })
    .then(()=> showToast("✅ Berhasil"))
    .catch(()=> showToast("❌ Gagal"))
    .finally(()=>{
      btn.disabled=false;
      hideLoading();
    });
  };

  if(file) reader.readAsDataURL(file);
  else reader.onloadend();
};

// Load petugas
fetch(API+"?petugas=true")
.then(res=>res.json())
.then(data=>{
  const s=document.getElementById("petugas");
  s.innerHTML="";
  data.forEach(p=>{
    const o=document.createElement("option");
    o.value=p[0];
    o.innerText=p[0];
    s.appendChild(o);
  });
});
