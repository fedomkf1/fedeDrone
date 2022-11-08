// Pedido de cotizacion servicio digital
const contenedorServicios = document.getElementById("contenedorServicios")
const btnCotizar = document.getElementById("btnCotizar")
const modalCotizarDetalle = document.getElementById("modalCotizarDetalle")
const btnAceptarCotizar = document.getElementById("btnAceptarCotizar")

let continuar = true;
let valorServicio = 0;

const servicios = ["video", "fotografia", "edicion"];
const productos = [];

class Producto {
    constructor(codigo, precio, nombreServicio) {
        this.nombre  = codigo.toLowerCase();
        this.precio  = parseFloat(precio);
        this.nombreServicio = nombreServicio;
    }
    sumaIva() {
        this.precio = this.precio * 1.21;
    }
}

const iniciarServicios = async () => {
    const resp = await fetch('../data/data.json')
    const data = await resp.json()

    data.forEach((servicio) => {

        
        
        const itemServicio = document.createElement('div')
        itemServicio.classList.add('card', 'm-3')
        itemServicio.style.cssText += 'width: 22rem';

        itemServicio.innerHTML = `
            <div class="card-body text-center">
                <h5 class="card-title">${servicio.detalle}</h5>
            </div>
            <img src="${servicio.imagen}" class="card-img-top" alt="${servicio.altImagen}">
            <div class="card-body">
                <p class="card-text">${servicio.descripcionLarga}
                </p>
            </div>
            <div class="card-body text-center" id="${"tooltip_"+servicio.id}">
                <button type="button" class="btn btn-block" data-bs-toggle="modal" id="${"btnContratar_"+servicio.id}" data-bs-target="#${"staticBackdrop"+servicio.id}">Contratar</button>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="${"staticBackdrop"+servicio.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">${servicio.detalle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="card-text">${servicio.descripcionCorta}</p>
                        <p>Costo del Servicio: ${servicio.precio} +iva </p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="${"pedirServicio_"+servicio.id}">Confirmar Servicio</button>
                    </div>
                </div>
                </div>
            </div>
        `

        contenedorServicios.append(itemServicio)
        const tooltip = document.getElementById("tooltip_"+servicio.id)
        const btnContratar_ = document.getElementById("btnContratar_"+servicio.id)
        const pedirServicio_ = document.getElementById("pedirServicio_"+servicio.id)

        pedirServicio_.addEventListener("click", () => {
            btnContratar_.setAttribute('disabled', '')
            tooltip.setAttribute('data-toggle', 'tooltip')
            tooltip.setAttribute('title', 'Ya Contrataste este Servicio')
            
            productos.push(new Producto(servicio.codigo, servicio.precio, servicio.detalle));
            valorServicio = opcionValor(servicio.codigo, servicio.precio);
        })
        
    })
}


function opcionValor(opcion, valorServicio){

    for (const producto of productos){

        if(producto.nombre == opcion){
            producto.sumaIva();
            valorServicio = valorServicio + producto.precio;
        }
    }
    
    return valorServicio;
}

iniciarServicios()

btnCotizar.addEventListener("click", () => {

    let datosModalCotizarDetalle = ``;

    if (productos.length == 0) {
        modalCotizarDetalle.innerHTML = `<p> No contrato servicios</p>`
        btnAceptarCotizar.setAttribute('disabled', '')
    }
    else{
        btnAceptarCotizar.removeAttribute('disabled', '')
        productos.forEach((producto) => {
            datosModalCotizarDetalle = datosModalCotizarDetalle + `
                <p> ${producto.nombreServicio}: $ ${producto.precio}</p>
            `
            modalCotizarDetalle.innerHTML = datosModalCotizarDetalle;
        })
    }
})


btnAceptarCotizar.addEventListener("click", () => {

    modalCotizarDetalle.innerHTML = `
        <p> Muchas Gracias por contratar nuestros servicios</p>
        <p> El costo total del servicio es:  ${valorServicio}</p>
        <p> Pronto nos pondremos en contatcto por email.</p>
        <p></p>
        <p>Saludos</p>
    `

    setTimeout(function () {location.reload(true)}, 5000)
})
