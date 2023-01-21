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
// //invoco el fetch de datos apenas se carga la pagina
// document.addEventListener('DOMContentLoaded', ()=>{ //no sirve usar onload
//   traerDatos() 
// })

const lista=document.getElementById('lista')//el row donde van los productos
const plantillaCard=document.getElementById('boxProducto').content//el plantillaCard de cada producto
const plantillaFondo=document.getElementById('fondoTabla').content
const plantillaFila=document.getElementById('filaProd').content
const fila=document.getElementById('prodCarro')

const productoHTML=document.createDocumentFragment()// creo un fragmento vacío donde puedo insertar nodos de produco
const filaHTML=document.createDocumentFragment()//fragmento vacio par anodos de fila
const fondoHTML=document.createDocumentFragment()//fragmento vacio para el fondo de la tabla
const fondo=document.getElementById('fondo')
var carro={}
//console.log(plantillaCard)

const muestraElem=datosDOM =>{
  datosDOM.forEach(producto => {
    //console.log(producto)
    plantillaCard.querySelector('h5').textContent = producto.nombre//al h5 de la plantilla le pongo el nombre
    plantillaCard.querySelector('h6').textContent = producto.marca//al h5 de la plantilla le pongo el nombre
    //plantillaCard.querySelector('p').textContent = producto.precio
    plantillaCard.querySelector('span').textContent = producto.precio
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
//para borrar de a un elemento
fila.addEventListener('click',evento=>{
  quitarUnProducto(evento)
})

//detecto si el elemento clikeado es un boton de agregar
//le paso al carro toda la card
const pasoAlCarro = objClck =>{
//console.log(objClck.target.tagName)
//console.log(objClck.target.tagName==="BUTTON")
  if(objClck.target.tagName==="BUTTON"){
    meterCarro (objClck.target.parentElement)
  }
}
//saco los datos desde la card
const meterCarro = objetoRecibido =>{
  const prod={
    id:objetoRecibido.querySelector('button').dataset.id,
    marca:objetoRecibido.querySelector('h6').textContent,
    nombre:objetoRecibido.querySelector('h5').textContent,
    precio:objetoRecibido.querySelector('span').textContent,
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
  //console.log(carro)
  fila.innerHTML=''
  Object.values(carro).forEach(producto =>{
    plantillaFila.querySelectorAll('td')[0].textContent=producto.nombre
    plantillaFila.querySelectorAll('td')[1].textContent=producto.marca
    //plantillaFila.querySelectorAll('td')[2].textContent=producto.precio
    plantillaFila.querySelectorAll('span')[0].textContent=producto.precio
    plantillaFila.querySelectorAll('td')[3].textContent=producto.cantidad
    //plantillaFila.querySelectorAll('td')[5].textContent=producto.cantidad*producto.precio
    plantillaFila.querySelectorAll('span')[1].textContent=producto.cantidad*producto.precio

    plantillaFila.querySelector('button').dataset.id=producto.id
    const clonFila=plantillaFila.cloneNode(true)
    filaHTML.appendChild(clonFila)
  })
  fila.appendChild(filaHTML)
  //console.log(plantillaFila)
  muestraFondo()
}
const muestraFondo = () =>{
  fondo.innerHTML=''
  if(Object.keys(carro).length === 0){
    fondo.innerHTML=`<th scope="row" colspan=7 style="text-align:center;">Carro vacío</th>`
    //carro vacio
    return
  }
    const cantTotalDeProductos=Object.values(carro).reduce((sumador,{cantidad}) => sumador+cantidad,0)
    const precioTotal=Object.values(carro).reduce((sumador,{precio,cantidad}) =>(sumador+(cantidad*precio)),0)
    //console.log(plantillaFondo.querySelectorAll('td'))
    plantillaFondo.querySelectorAll('td')[1].textContent=cantTotalDeProductos
    plantillaFondo.querySelector('span').textContent=precioTotal
    const clonFondo=plantillaFondo.cloneNode(true)
    fondoHTML.appendChild(clonFondo)
    fondo.appendChild(fondoHTML)
  
 

  //boton
  const vaciar=document.getElementById('vaciar')
  vaciar.addEventListener('click', () => {
    carro={}
    muestraProd()
  })

}


const quitarUnProducto = eventoRecibido =>{
const productoDisminuir=carro[eventoRecibido.target.dataset.id]
console.log(productoDisminuir)
productoDisminuir.cantidad--
if(productoDisminuir.cantidad === 0){
  delete carro[eventoRecibido.target.dataset.id]
}
//carro[eventoRecibido.target.dataset.id]={...productoDisminuir}
muestraProd()
}