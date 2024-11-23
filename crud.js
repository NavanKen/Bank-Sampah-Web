let selectedRow = null;
const jenisSampah = getURLParameter("jenis_sampah");

const buyButtons = document.querySelectorAll(".buy");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const jenisSampah = button.getAttribute("data-sampah");

    window.location.href = `crud.html?jenis_sampah=${encodeURIComponent(
      jenisSampah
    )}`;
  });
});

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  document.querySelector(".container").prepend(div);
  setTimeout(() => div.remove(), 3000);
}

function getURLParameter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

if (jenisSampah) {
  const jenisSampahInput = document.querySelector("#jenissampah");
  if (jenisSampahInput) {
    jenisSampahInput.value = jenisSampah;
  }
}

function clearFields() {
  document.querySelector("#yourname").value = "";
  document.querySelector("#alamat").value = "";
  document.querySelector("#nomorhp").value = "";
  document.querySelector("#jenissampah").value = "";
  document.querySelector("#tanggal").value = "";
}

document.querySelector("#student-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const yourname = document.querySelector("#yourname").value;
  const alamat = document.querySelector("#alamat").value;
  const nomorhp = document.querySelector("#nomorhp").value;
  const jenissampah = document.querySelector("#jenissampah").value;
  const tanggal = document.querySelector("#tanggal").value;

  if (!yourname || !alamat || !nomorhp || !jenissampah || !tanggal) {
    showAlert("Please fill in all fields", "danger");
    return;
  }

  if (selectedRow === null) {
    const list = document.querySelector("#student-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${yourname}</td>
            <td>${alamat}</td>
            <td>${nomorhp}</td>
            <td>${jenissampah}</td>
            <td>${tanggal}</td>
            <td>
                <button class="btn btn-warning btn-sm edit">Edit</button>
                <button class="btn btn-danger btn-sm delete">Delete</button>
                 <a href="#" class="btn btn-info btn-sm view-receipt" data-bs-toggle="modal" data-bs-target="#receiptModal">Struk</a>
            </td>`;
    list.appendChild(row);
    showAlert("Data added", "success");
  } else {
    selectedRow.children[0].textContent = yourname;
    selectedRow.children[1].textContent = alamat;
    selectedRow.children[2].textContent = nomorhp;
    selectedRow.children[3].textContent = jenissampah;
    selectedRow.children[4].textContent = tanggal;
    showAlert("Data updated", "info");
    selectedRow = null;
  }

  clearFields();
});

document.querySelector("#student-list").addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#yourname").value =
      selectedRow.children[0].textContent;
    document.querySelector("#alamat").value =
      selectedRow.children[1].textContent;
    document.querySelector("#nomorhp").value =
      selectedRow.children[2].textContent;
    document.querySelector("#jenissampah").value =
      selectedRow.children[3].textContent;
    document.querySelector("#tanggal").value =
      selectedRow.children[4].textContent;
  } else if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Data deleted", "danger");
  }
});

document.querySelector("#student-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("view-receipt")) {
    const row = e.target.parentElement.parentElement;

    const name = row.children[0].textContent;
    const address = row.children[1].textContent;
    const phone = row.children[2].textContent;
    const type = row.children[3].textContent;
    const date = row.children[4].textContent;

    document.querySelector("#receipt-name").textContent = name;
    document.querySelector("#receipt-address").textContent = address;
    document.querySelector("#receipt-phone").textContent = phone;
    document.querySelector("#receipt-type").textContent = type;
    document.querySelector("#receipt-date").textContent = date;
  }
});

document.getElementById("cetak").addEventListener("click", () => {
  const modalContent = document.querySelector(".modal-content").innerHTML;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
          <html>
          <head>
              <title>Struk Transaksi</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 20px; }
                  h5 { text-align: center; }
              </style>
          </head>
          <body>${modalContent}</body>
          </html>
      `);
  printWindow.document.close();
  printWindow.print();
});
