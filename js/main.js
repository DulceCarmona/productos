const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const container = document.getElementById("product-container");

function getData() {
     fetch(URLMain) // Llamada a la API
     .then((response) => {
         console.log(response); 
         response.json().then((res)=>{
            //  console.log(res.length);
            //  console.log(res[10].title);
            createCards(res);
            });
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                    ${err.message}
                </div>`);
        });
} // getData

////////////////////////////////////////////////////////////////////////////////////////////

// TARJETAS
function createCards(prods) {
    container.innerHTML = "";

    prods.forEach((prod) => {
        const tarjetaHTML = `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100">
                    <img src="${prod.image}" class="card-img-top p-3" alt="${prod.title}" style="height: 200px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text">${prod.description.substring(0, 50)}...</p>
                        <p class="fw-bold mt-auto">$${prod.price}</p>
                        <button class="btn btn-sm btn-outline-primary mt-3" 
                            data-bs-toggle="modal" 
                            data-bs-target="#productModal"
                            data-title="${prod.title}"
                            data-description="${prod.description}"
                            data-image="${prod.image}"
                            data-price="${prod.price}">
                            Ver más
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", tarjetaHTML);
    });

    enableModalListeners(); 
}
    
//MODAL    

function enableModalListeners() {
    const buttons = document.querySelectorAll('[data-bs-toggle="modal"]');

    buttons.forEach((btnModal) => {
        btnModal.addEventListener("click", () => {
            const titulo = btnModal.getAttribute("data-title");
            const descripcion = btnModal.getAttribute("data-description");
            const imagen = btnModal.getAttribute("data-image");
            const precio = btnModal.getAttribute("data-price");

            document.getElementById("modalTitle").textContent = titulo;
            document.getElementById("modalBody").innerHTML = `
                <img src="${imagen}" alt="${titulo}" class="img-fluid mb-3" style="max-height: 300px; object-fit: contain;">
                <p>${descripcion}</p>
                <p class="fw-bold">$${precio}</p>
            `;
        });
    });
}

getData();