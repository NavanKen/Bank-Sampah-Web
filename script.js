let search = document.querySelector(".search-box");
let icon = document.getElementById("search-icon");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwQC265aeYFbj22Gr9q6BwaqFduNuFtc3AvdPoJpbY6O14t3CMlegVPkYWWqwPXC2It/exec";
const form = document.forms["pesan-form"];

icon.addEventListener("click", () => {
  search.classList.toggle("active");
  menu.classList.remove("active");
});

let menu = document.querySelector(".navbar");

document.querySelector("#menu-icon").onclick = () => {
  menu.classList.toggle("active");
  search.classList.remove("active");
};

window.onscroll = () => {
  menu.classList.remove("active");
  search.classList.remove("active");
};

function isFormValid() {
  const nama = document.getElementById("namaanda").value.trim();
  const email = document.getElementById("alamat").value.trim();
  const nomorHp = document.getElementById("nomorhp").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  return nama && email && nomorHp && pesan;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isFormValid()) {
    const errorModal = new bootstrap.Modal(
      document.getElementById("errorModal")
    );
    errorModal.show();
    return;
  }

  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then(() => {
      const successModal = new bootstrap.Modal(
        document.getElementById("successModal")
      );
      successModal.show();

      form.reset();
    })
    .catch(() => {
      const errorModal = new bootstrap.Modal(
        document.getElementById("errorModal")
      );
      document.getElementById("errorModalLabel").textContent =
        "Terjadi Kesalahan!";
      document.querySelector("#errorModal .modal-body").textContent =
        "Gagal mengirimkan data. Silakan coba lagi.";
      errorModal.show();
    });
});
