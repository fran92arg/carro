//import fetch from "node-fetch"
//Solicitud GET (Request).
// fetch('http://localhost:3000/productos')
//     // Exito
//     .then(response => response.json())  // convertir a json
//     .then(json => console.log(json))    //imprimir los datos en la consola
//     .catch(err => console.log('Solicitud fallida', err)); // Capturar errores.
//console.log(productos)
//funcion para hacer fetch del json
// const traerDatos = async ()=>{
//   try {
//     const resConsulta= await fetch('http://localhost:3000/productos')
//     const datos= await resConsulta.json()
//     muestraElem(datos)
//     console.log(datos)
//   }
//   catch (error){
//     alert("Error fetch")
//   }
// }
// //invoco el fetch de datos apenas se acrga la pagina
// document.addEventListener('DOMContentLoaded', ()=>{ //no sirve usar onload
//   traerDatos() 
// })

const lista=document.getElementById('lista')//el row donde van los productos
const plantillaCard=document.getElementById('boxProducto').content//el plantillaCard de cada producto
const plantillaFondo=document.getElementById('fondoTabla').content
const plantillaFila=document.getElementById('filaProd').content
console.log(plantillaFila)
const fila=document.getElementById('prodCarro')
const fondo=document.getElementById('fondo')
const productoHTML=document.createDocumentFragment()// creo un fragmento vacío donde puedo insertar nodos
const filaHTML=document.createDocumentFragment()
var carro={}
//console.log(plantillaCard)

const muestraElem=datosDOM =>{
  datosDOM.forEach(producto => {
    //console.log(producto)
    plantillaCard.querySelector('h5').textContent = producto.nombre//al h5 de la plantilla le pongo el nombre
    plantillaCard.querySelector('h6').textContent = producto.marca//al h5 de la plantilla le pongo el nombre
    plantillaCard.querySelector('p').textContent = producto.precio
    plantillaCard.querySelector('img').setAttribute('src',producto.img)
    plantillaCard.querySelector('button').dataset.id=producto.id//le agrego al div del boton el id producto
    const prodTemporal=plantillaCard.cloneNode(true)//se clona el arbol de nodos del objeto
    productoHTML.appendChild(prodTemporal)
  })
  lista.appendChild(productoHTML)
}
muestraElem(productos)
//funciones del carrito
lista.addEventListener('click',objetoClickeado =>{
  pasoAlCarro(objetoClickeado)
 })
//detecto si el elemento clikeado es un boton de agregar
//le paso al carro toda la card
const pasoAlCarro = objClck =>{
//console.log(objClck.target.tagName)
//console.log(objClck.target.tagName==="BUTTON")
  if(objClck.target.tagName==="BUTTON"){
    meterCarro (objClck.target.parentElement)
  }
  objClck.stopPropagation()
}
//saco los datos desde la card
const meterCarro = objetoRecibido =>{
  const prod={
    id:objetoRecibido.querySelector('button').dataset.id,
    marca:objetoRecibido.querySelector('h6').textContent,
    nombre:objetoRecibido.querySelector('h5').textContent,
    precio:objetoRecibido.querySelector('p').textContent,
    cantidad:1
  }
  //console.log(prod)
  if(carro.hasOwnProperty(prod.id)){
    prod.cantidad=carro[prod.id].cantidad + 1
  }
  // console.log(prod)
  carro[prod.id]={...prod}
  //console.log(carro)
  muestraProd()
}

//variable carrito

//escribir info en tabla
const muestraProd = ()=> {
  console.log(carro)
  fila.innerHTML=''
  Object.values(carro).forEach(producto =>{
    plantillaFila.querySelectorAll('td')[0].textContent=producto.nombre
    plantillaFila.querySelectorAll('td')[1].textContent=producto.marca
    plantillaFila.querySelectorAll('td')[2].textContent=producto.precio
    plantillaFila.querySelectorAll('td')[3].textContent=producto.cantidad
    plantillaFila.querySelectorAll('td')[5].textContent=producto.cantidad*producto.precio
    const clonFila=plantillaFila.cloneNode(true)
    filaHTML.appendChild(clonFila)
  })
  fila.appendChild(filaHTML)
  //console.log(plantillaFila)
}