// Texts Areas
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");
// Btns
let btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    txtName.value = txtName.value.trim().replace(/\s+/g, ' ');
    txtNumber.value = txtNumber.value.trim().replace(/\s+/g, ' ');

    if(txtName.value.length < 3){
        txtName.style.border="solid medium red";
        alertValidacionesTexto.innerHTML="<strong> El Nombre del producto no es correcto</strong>"
        alertValidaciones.style.display = "block"
    }

    // if(txtNumber.value.length <10 && txtNumber.value.length>10){
    //     txtName.style.border="solid medium red";
    //     alertValidacionesTexto.innerHTML="<strong> El Nombre del producto no es correcto</strong>"
    //     alertValidaciones.style.display = "block"
    // }

    
});//btnAgregar

