// Tarih bilgisi için:
const zaman = new Date() // tarih nesnesi oluşturuldu
const mevcutGun = zaman.getDay() // mevcut gün alındı
const gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
const aylar = ["Ocak", "Subat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
const mevcutTarih = `${zaman.getDate()} ${aylar[zaman.getMonth()]} ${gunler[zaman.getDay()]}` // tarih bilgisi alındı

const simdi = document.getElementById("today")
simdi.textContent = mevcutTarih

// Kullanıcıdan veri almak ve listelemek için bir işlev tanımlanır
function UserData() {
    let data = document.getElementById("veri").value; // input ögesinden veriyi al
    let ulist = document.getElementById("list"); // ul elementini al

    // Verinin boş olup olmadığını kontrol et
    if (data.trim() !== "") {
        // Yeni bir liste öğesi oluştur
        let listitem = document.createElement("li");
        listitem.className = "list-group-item";
        listitem.textContent = data; // liste öğesine veriyi ekle

        // Checkbox oluştur ve sola yerleştir
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input float-start me-3 pt-3 mt-1 shadow-none border-0"; // checkbox'u sola yerleştir
        checkbox.id = "chk_" + Math.random(); // her checkbox için benzersiz bir ID oluştur

        // Silme butonunu oluştur ve başlangıçta gizle
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.className = "btn float-end p-0 btnDelete";
        deleteButton.style.display = "none"; // Silme butonunu gizle

        // Silme butonunu sadece mouse ile öğenin üzerine gelindiğinde görünür hale getir
        listitem.addEventListener("mouseenter", function () {
            deleteButton.style.display = "block";
        });
        listitem.addEventListener("mouseleave", function () {
            deleteButton.style.display = "none";
        });

        deleteButton.onclick = function () {
            ulist.removeChild(listitem); // Liste öğesini sil
        };

        
        // Liste öğesine tıklama olayını ekle
        let isChecked = false; // Checkbox'ın başlangıçta işaretlenmemiş olduğunu saklayan bir değişken
        listitem.addEventListener("click", function() {
            if (!isChecked) {
                listitem.style.backgroundColor = "#5529dc"; // Arka plan rengini değiştir
                listitem.style.color = "white" // yazının rengi değişir
                listitem.style.textDecoration = "line-through"; // Yazının üzerini çiz
                checkbox.checked = true; // Checkbox'ı işaretle
                isChecked = true; // Checkbox işaretlendi olarak işaretle
                checkbox.style.backgroundColor = " #5529dc"
            } else {
                listitem.style.backgroundColor = ""; // Arka plan rengini eski haline getir
                listitem.style.color = "black" // yazının rengi değişir
                listitem.style.textDecoration = ""; // Yazının üzerini çizmeyi kaldır
                checkbox.checked = false; // Checkbox işaretini kaldır
                isChecked = false; // Checkbox işaretlenmedi olarak işaretle
                checkbox.style.backgroundColor = "white"

            }
            deleteButton.style.display = "block";
        });

        deleteButton.onclick = function() {
            ulist.removeChild(listitem); // Liste öğesini sil
            // Silindiğinde yerel depolamadan da kaldır
            removeFromLocalStorage(data);
        };

        listitem.appendChild(checkbox); // checkbox'u liste öğesine ekle
        listitem.appendChild(deleteButton); // Silme butonunu liste öğesine ekle
        ulist.appendChild(listitem); // liste öğesini ul içine ekle
        document.getElementById("veri").value = ""; // input alanını temizle
    }

     // Veriyi yerel depolamaya ayrı bir değer olarak ekle
     addToLocalStorage(data);
     document.getElementById("veri").value = ""; // input alanını temizle
     
}

// Yerel depolamaya veriyi ayrı bir dizi olarak ekler
function addToLocalStorage(data) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(data);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Yerel depolamadan veriyi ayrı bir dizi olarak kaldır
function removeFromLocalStorage(data) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        return;
    }
    todos = JSON.parse(localStorage.getItem("todos"));
    const index = todos.indexOf(data);
    if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

// Enter tuşuna basıldığında girişi de ekler
document.getElementById("veri").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        UserData();
    }
});


// Toast