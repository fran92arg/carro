//import fetch from "node-fetch"
//Solicitud GET (Request).
// fetch('http://localhost:3000/productos')
//     // Exito
//     .then(response => response.json())  // convertir a json
//     .then(json => console.log(json))    //imprimir los datos en la consola
//     .catch(err => console.log('Solicitud fallida', err)); // Capturar errores.


const lista=document.getElementById('lista')//el row donde van los productos
const template=document.getElementById('boxProducto').content//el template de cada producto
const productoHTML=document.createDocumentFragment()// ver
//console.log(template)
 document.addEventListener('DOMContentLoaded', ()=>{ //no sirve usar onload
   traerDatos() 
 })
const traerDatos = async ()=>{
  try {
    const resConsulta= await fetch('http://localhost:3000/productos')
    const datos= await resConsulta.json()
    muestraElem(datos)
    //console.log(datos)
  }
  catch (error){
    alert("Error fetch")
  }

}
const muestraElem=datosDOM =>{
  datosDOM.forEach(producto => {
    //console.log(producto)
    template.querySelector('h5').textContent = producto.nombre
    template.querySelector('p').textContent = producto.precio
    const prodTemporal=template.cloneNode(true)
    productoHTML.appendChild(prodTemporal)
  });
  lista.appendChild(productoHTML)
}