// Pedido de cotizacion servicio digital
let nombre = prompt('Como te llamas?');
alert(`Hola ${nombre}`);

let continuar = true;
let valorServicio = 0;

const servicios = ["video", "fotografia", "edicion"];
const productos = [];

class Producto {
    constructor(nombre, precio) {
        this.nombre  = nombre.toLowerCase();
        this.precio  = parseFloat(precio);
    }
    
    sumaIva() {
        this.precio = this.precio * 1.21;
    }

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

function mostrarServiciosDisponibles(){
    
    let serviciosDisponibles = "";

    for (const servicio of servicios){
        serviciosDisponibles = serviciosDisponibles+servicio+" ";
    }
        
    alert(`Los servicios disponibles son: ${serviciosDisponibles}" `)
}

const eliminar = (servicioEliminar) => {
    let index = servicios.indexOf(servicioEliminar)
    if (index != -1 ) {
        servicios.splice(index, 1)
    } 
}

productos.push(new Producto("video", "2000"));
productos.push(new Producto("fotografia", "5000"));
productos.push(new Producto("edicion", "30000"));

for (const producto of productos){
    producto.sumaIva();
}

while (continuar) {

    mostrarServiciosDisponibles();
    let opcion = prompt('Que servicio desea?');
    

    if(servicios.includes(opcion)){
        valorServicio = opcionValor(opcion, valorServicio);
        eliminar(opcion);
        let deseaContinuar = prompt('Desea pedir otro servicio? (si/no)');
        
        if(deseaContinuar == "no"){
            continuar = false;    
        }
    }
    else{
        alert('ingrese una opcion correcta');
    }

    console.log(valorServicio);
}

alert(`${nombre}, el costo del servcio que contrataste es de: ${valorServicio}`);
alert('Pronto recibiras un email con mas info.');