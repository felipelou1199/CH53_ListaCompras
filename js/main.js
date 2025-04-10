// Texts Areas
const txtName = document.getElementById("Name");//nombre
const txtNumber = document.getElementById("Number");//Cantidad
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
// Btns
const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
//Tabla
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
//Contadores
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeracion de la primera columna de la tabla 
let cont = 0;
let costoTotal = 0;
let totalProductos = 0;
let datos =  []

function validarCantidad(){
    if(txtNumber.value.trim().length <= 0)return false;
    //length<=0

    if(isNaN(txtNumber.value) ) return false;//isNAN
    //numero

    if(Number(txtNumber.value) <= 0) return false;//mayor de 0
    return true;
}//validarcantidad

function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}//getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    //bandera al ser tru permite agregar los datos a la tabla
    let isValid = true;
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML=""
    alertValidaciones.style.display = "none"

    txtName.value = txtName.value.trim().replace(/\s+/g, ' ');
    txtNumber.value = txtNumber.value.trim().replace(/\s+/g, ' ');

    if(txtName.value.length < 3){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML="<strong> El Nombre del producto no es correcto</strong>"
        alertValidaciones.style.display = "block"
        isValid = false;
    }

    if(! validarCantidad()){
        txtNumber.style.border="solid medium red";
        alertValidacionesTexto.innerHTML +="<br/><strong> La cantidad no es correcta no es correcto</strong>"
        alertValidaciones.style.display = "block"
        isValid = false;
    }

    if(isValid){
        cont++;

        let precio = getPrecio();
        let row= `<tr>
                    <td>${cont}</td>
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;
        //Objeto para mandar a local Stroage
        let elemento = {
            "cont": cont,
            "nombre": txtName.value,
            "cantidad": txtNumber.value,
            "precio" : precio
        }
        datos.push(elemento);
        localStorage.setItem("datos",JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        costoTotal += precio * Number(txtNumber.value)
        precioTotal.innerText= "$" + costoTotal.toFixed(2);
        totalProductos += Number(txtNumber.value);
        productosTotal.innerText = totalProductos
        contadorProductos.innerText = cont;
        
        let resumen = {
                "cont": cont,
                "totalProductos": totalProductos,
                "costoTotal": costoTotal
        }
        localStorage.setItem("resumen", JSON.stringify(resumen));

        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isvalid

    
});//btnAgregar


window.addEventListener("load", function(event){
    event.preventDefault();

    if(this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }//datos != null
    datos.forEach(d => {
        let row = ` <tr>
                        <td>${d.cont}</td>
                        <td>${d.nombre}</td>
                        <td>${d.cantidad}</td>
                        <td>${d.precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);  
    });
    if(this.localStorage.getItem("resumen") != null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal += resumen.costoTotal;
        totalProductos += resumen.totalProductos;
        cont = resumen.cont;
    }//resumen != null

    //Variables para mostrar los productos
    precioTotal.innerText= "$" + costoTotal.toFixed(2);
    productosTotal.innerText = totalProductos
    contadorProductos.innerText = cont;
    
});


//Agregar la funcionalidad del boton limpiar todo
btnClear.addEventListener("click", function(event){
    event.preventDefault();
    //Resumen
    contadorProductos.innerText = "0";
    precioTotal.innerText= "$0.00";
    productosTotal.innerText = "0";
    
//Tabla
    cuerpoTabla.innerHTML="";

//campos
    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();    
//alerta
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML=""
    alertValidaciones.style.display = "none"
// localStorage
    localStorage.clear();

});