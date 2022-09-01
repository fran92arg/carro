//import fetch from "node-fetch"
//Solicitud GET (Request).
// fetch('http://localhost:3000/productos')
//     // Exito
//     .then(response => response.json())  // convertir a json
//     .then(json => console.log(json))    //imprimir los datos en la consola
//     .catch(err => console.log('Solicitud fallida', err)); // Capturar errores.

//funcion para hacer fetch del json
const traerDatos = async ()=>{
  try {
    const resConsulta= await fetch('http://localhost:3000/productos')
    const datos= await resConsulta.json()
    muestraElem(datos)
    console.log(datos)
  }
  catch (error){
    alert("Error fetch")
  }
}
//invoco el fetch de datos apenas se acrga la pagina
document.addEventListener('DOMContentLoaded', ()=>{ //no sirve usar onload
  traerDatos() 
})

const lista=document.getElementById('lista')//el row donde van los productos
const template=document.getElementById('boxProducto').content//el template de cada producto
const productoHTML=document.createDocumentFragment()// creo un fragmento vacío donde puedo insertar nodos
//console.log(template)

const muestraElem=datosDOM =>{
  datosDOM.forEach(producto => {
    //console.log(producto)
    template.querySelector('h5').textContent = producto.nombre//al h5 de la plantilla le pongo el nombre
    template.querySelector('p').textContent = producto.precio
    template.querySelector('button').dataset.id=producto.id//le agrego al div del boton el id producto
    const prodTemporal=template.cloneNode(true)//se clona el arbol de nodos del objeto
    productoHTML.appendChild(prodTemporal)
  })
  lista.appendChild(productoHTML)
}

//funciones del carrito
var carro={

//funcion para agregar al carro??
}
lista.addEventListener('click',evento =>{
  agregoCarro(evento)
 })
 const agregoCarro=ev =>{
  console.log(ev.target.tagName)
  console.log(ev.target.tagName==="BUTTON")
  if(ev.target.tagName==="BUTTON"){
    console.log(ev.target.parentElement)
  }
 }