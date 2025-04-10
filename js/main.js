// Texts Areas
const txtName = document.getElementById("Name");//nombre
const txtNumber = document.getElementById("Number");//Cantidad
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const alertValidaciones = document.getElementById("alertValidaciones");
// Btns
const btnAgregar = document.getElementById("btnAgregar");
//Tabla
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
//Contadores
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

//Numeracion de la primera columna de la tabla 
let cont = 0;

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
    let costoTotal = 0;
    let totalProductos = 0;

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
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        costoTotal += precio * Number(txtNumber.value)
        precioTotal.innerText= "$" + costoTotal.toFixed(2);
        totalProductos += Number(txtNumber.value);
        productosTotal.innerText = totalProductos
        contadorProductos.innerText = cont;


        txtName.value = "";
        txtNumber.value = "";
        txtName.focus();
    }//if isvalid

    
});//btnAgregar

