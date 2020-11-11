var resultados = document.querySelector("#resultados");
var resultadosInv = document.querySelector("#resultadosInv");
var busquedaResult = document.querySelector("#busquedaResult");
var acciones = document.querySelector("#acciones");

var btnAgregar = document.querySelector("#btnAgregar");
var btnBorrar = document.querySelector("#btnBorrar");
var btnBuscar = document.querySelector("#btnBuscar");
var btnListar = document.querySelector("#btnListar");
var btnListarInv = document.querySelector("#btnListarInv");
var btnInsertarPos = document.querySelector("#btnInsertarPos");

class Producto{
    constructor(name, id, description, amount, price){
        this.producto = {
            codigo: id,
            nombre: name,
            descripcion: description,
            cantidad: amount,
            precio: price,
            valorM: parseFloat(amount)*parseFloat(price)
        }
        this.siguiente = null;
    }
}
class Inventario{
    constructor(){
        this.productos = null;
    }
    añadirProducto(nuevoProducto){
        if(this.productos === null){
            this.productos = nuevoProducto;
        }else{
            let actual = this.productos;
            while(actual.siguiente !== null){
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoProducto;
        }
    }
    llamadoProductos(){
        return this.productos;
    }
    eliminarProducto(codigo){
        if(this.productos.producto.codigo === codigo){
            let aux = this.productos;
            this.productos = this.productos.siguiente;
            aux.siguiente = null;
            return true;
        }
        else {
            let aux = this.productos;
            while (aux.siguiente.producto.codigo !== codigo) { 
                aux = aux.siguiente;
                if (aux.siguiente === null) break;
            }
            if (aux.siguiente !== null) {
                let temp = aux.siguiente;
                aux.siguiente = temp.siguiente;
                temp.siguiente = null;
                return true;
            }
            else return false;
        }
    }
    buscarProducto(codigo){
        if(this.productos.producto.codigo === codigo){
            return this.productos;
        }
        else {
            let aux = this.productos;
            while (aux.siguiente.producto.codigo !== codigo){ 
                aux = aux.siguiente;
                if (aux.siguiente === null) break;
            }
            if (aux.siguiente !== null) {
                return aux.siguiente;
            }
            else return false;
        }
    }
    verProductosAlReves() {
        let anterior = null;
        let siguiente = null;
        let aux = this.productos;
    
        while (aux.siguiente !== null) {
          siguiente = aux.siguiente;
          aux.siguiente = anterior;
          anterior = aux;
          aux = siguiente;
        }
        aux.siguiente = anterior;
        return aux;
    }
    añadirEn(nuevoProducto, pos) {
        let aux = this.productos;
        let anterior = null;
        if (pos == 0) {
          nuevoProducto.siguiente = aux;
          this.productos = nuevoProducto;
        } else {
          for(let i = 1; i < pos; i++) {
            anterior = aux;
            aux = aux.siguiente;
          }
          nuevoProducto.siguiente = aux;
          anterior.siguiente = nuevoProducto;
          return true;
        }
    }
}
var todosPro = new Inventario();

btnAgregar.addEventListener("click", function(){
    let nom = document.querySelector("#nom").value;
    let cod = document.querySelector("#cod").value;
    let desc = document.querySelector("#desc").value;
    let cant = document.querySelector("#cant").value;
    let cost = document.querySelector("#cost").value;
      
    let productoNuevo = new Producto(nom, cod, desc, cant, cost);
    todosPro.añadirProducto(productoNuevo);
    acciones.innerHTML += "<p>Se agrego un nuevo producto</p>";
    return;
});
btnListar.addEventListener("click", function(){
    resultados.innerHTML = " ";
    let proTotales = todosPro.llamadoProductos();
    while(proTotales.siguiente !== null){
        resultados.innerHTML += "<ul style='border: 1px solid'><li>Nombre: "+ proTotales.producto.nombre +"</li><li>Codigo: "+ proTotales.producto.codigo +"</li>"+
        "<li>Descripcion: "+ proTotales.producto.descripcion +"</li><li>Cantidad: "+ proTotales.producto.cantidad +"</li><li>Costo: "+ proTotales.producto.precio +"</li><li>Valor mercancia: "+ proTotales.producto.valorM +"</li></ul>";
        proTotales = proTotales.siguiente;
    }
    resultados.innerHTML += "<ul style='border: 1px solid'><li>Nombre: "+ proTotales.producto.nombre +"</li><li>Codigo: "+ proTotales.producto.codigo +"</li>"+
        "<li>Descripcion: "+ proTotales.producto.descripcion +"</li><li>Cantidad: "+ proTotales.producto.cantidad +"</li><li>Costo: "+ proTotales.producto.precio +"</li><li>Valor mercancia: "+ proTotales.producto.valorM +"</li></ul>";
});
btnListarInv.addEventListener("click", function(){
    resultadosInv.innerHTML = " ";
    let proTotales = todosPro.verProductosAlReves();
    while(proTotales.siguiente !== null){
        resultadosInv.innerHTML += "<ul style='border: 1px solid'><li>Nombre: "+ proTotales.producto.nombre +"</li><li>Codigo: "+ proTotales.producto.codigo +"</li>"+
        "<li>Descripcion: "+ proTotales.producto.descripcion +"</li><li>Cantidad: "+ proTotales.producto.cantidad +"</li><li>Costo: "+ proTotales.producto.precio +"</li><li>Valor mercancia: "+ proTotales.producto.valorM +"</li></ul>";
        proTotales = proTotales.siguiente;
    }
    resultadosInv.innerHTML += "<ul style='border: 1px solid'><li>Nombre: "+ proTotales.producto.nombre +"</li><li>Codigo: "+ proTotales.producto.codigo +"</li>"+
        "<li>Descripcion: "+ proTotales.producto.descripcion +"</li><li>Cantidad: "+ proTotales.producto.cantidad +"</li><li>Costo: "+ proTotales.producto.precio +"</li><li>Valor mercancia: "+ proTotales.producto.valorM +"</li></ul>";
});
btnBorrar.addEventListener("click", function(){
    let codigoBorrar = document.querySelector("#borrarCodigo").value;
    let fueborrado = todosPro.eliminarProducto(codigoBorrar);
    if(fueborrado){
        acciones.innerHTML += "<p>Se elimino un producto</p>";
    }
    else{
        alert("Codigo no encontrado");
    }
});
btnBuscar.addEventListener("click", function(){ 
    busquedaResult.innerHTML = " ";
    let codigoBuscar = document.querySelector("#buscarPorCodigo").value;
    let proEncontrado = todosPro.buscarProducto(codigoBuscar);
    if(proEncontrado){
        acciones.innerHTML += "<p>Se encontro el producto buscado</p>";
        busquedaResult.innerHTML += "<ul style='border: 1px solid'><li>Nombre: "+ proEncontrado.producto.nombre +"</li><li>Codigo: "+ proEncontrado.producto.codigo +"</li>"+
        "<li>Descripcion: "+ proEncontrado.producto.descripcion +"</li><li>Cantidad: "+ proEncontrado.producto.cantidad +"</li><li>Costo: "+ proEncontrado.producto.precio +"</li><li>Valor mercancia: "+ proEncontrado.producto.valorM +"</li></ul>";
    }
    else{
        alert("Codigo no encontrado");
    }
});
btnInsertarPos.addEventListener("click", function(){
    let nom = document.querySelector("#nom").value;
    let cod = document.querySelector("#cod").value;
    let desc = document.querySelector("#desc").value;
    let cant = document.querySelector("#cant").value;
    let cost = document.querySelector("#cost").value;
    let posicion = document.querySelector("#indicar").value;
      
    let productoNuevo = new Producto(nom, cod, desc, cant, cost);
    let fueInsertado = todosPro.añadirEn(productoNuevo, posicion);
    if(fueInsertado){
        acciones.innerHTML += "<p>Se agrego un nuevo producto con la posicion deseada</p>";
    }
});