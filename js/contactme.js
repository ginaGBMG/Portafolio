let txtNombre = document.getElementById("txtNombre");
let txtEmail = document.getElementById("txtEmail");
let txtPhone = document.getElementById("txtPhone");
let asunto = document.getElementById("asunto");
let btnEnviar = document.getElementById("btnEnviar");
let txtMensaje = document.getElementById("txtMensaje");
let listAsunto = document.getElementById("listAsunto");
let checkrecibirInfo = document.getElementById("checkrecibirInfo");

let formContacto = document.getElementById("formContacto");

//Alertas //
let alertNombre = document.getElementById("alertNombre");
let alertEmail = document.getElementById("alertEmail");
let alertPhone = document.getElementById("alertPhone");
let alertMensaje = document.getElementById("alertMensaje");

const btnEnviarAnima = document.querySelector("btn btn-primary btn-contacto");

//Alertas en validaciones 
let alertValidacionesTextoNombre = document.getElementById("alertValidacionesTextoNombre");
let alertValidacionesTextoEmail = document.getElementById("alertValidacionesTextoEmail");
let alertValidacionesTextoPhone = document.getElementById("alertValidacionesTextoPhone");
let alertValidacionesTextoMensaje = document.getElementById("alertValidacionesTextoMensaje");
let alertValidacionesListAsunto = document.getElementById("alertValidacionesListAsunto");

let index = [];

let regexName = /^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ' ']{6,100}[\d]{0}$/;
function validarNombre(nombre) {
  if (nombre.length >= 6 && nombre.length < 100) {
    if (regexName.test(nombre)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//Regex Email
let regexEmail = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
function validarEmail(email) {
  if (email != "") {
    if (regexEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function validarMensaje(mensaje) {
  if (!isNumeric(mensaje)) {
    if (mensaje.length >= 3 && mensaje.length <= 200) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

let regextel = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
function validarNumTel(numTel) {
  if (numTel != "") {
    if (numTel.substr(0, 3) != "000") {
      if (regextel.test(numTel)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}


function validarListAsunto(asunto) {
  if (asunto != "Asunto") {
    return true;
  } else {
    return false;
  }
}

function cambiaColor(){
  var elemento = document.querySelector('.elemento');
      elemento.style.backgroundColor = 'green';
}
function restauraColor() {
  var elemento = document.querySelector('.elemento');
  elemento.style.backgroundColor = 'blue';
}


btnEnviar.addEventListener("click", function (event) {
  //btnEnviarAnima.style.color = "green";
  event.preventDefault();
  if (!validarNombre(txtNombre.value)) {
    if (!index.includes("nombre")) {
      alertValidacionesTextoNombre.insertAdjacentHTML(
        "afterbegin", ` El <strong> Nombre </strong> no es correcto. <br/> `);
      alertValidacionesTextoNombre.style.color = "red";
      txtNombre.style.border = "solid thin red";
      isValid = false;
      index.push("nombre");
    }
  }
  if (!validarEmail(txtEmail.value.trim())) {
    if (!index.includes("email")) {
      alertValidacionesTextoEmail.insertAdjacentHTML("afterbegin", `El <strong> Correo </strong> no es correcto. <br/> `);
      alertValidacionesTextoEmail.style.color = "red";
      txtEmail.style.border = "solid thin red";
      index.push("email");
    }
  }

  if (!validarNumTel(txtPhone.value.trim())) {
    if (!index.includes("phone")) {
      alertValidacionesTextoPhone.insertAdjacentHTML("afterbegin", `El <strong> Teléfono </strong> no es correcto. <br/> `);
      alertValidacionesTextoPhone.style.color = "red";
      txtPhone.style.border = "solid thin red";
      index.push("phone");
    }
  }

  if (!validarListAsunto(listAsunto.value)) {
    if (!index.includes("listAsunto")) {
      alertValidacionesListAsunto.insertAdjacentHTML("afterbegin", `Selecciona un <strong> Asunto </strong> por favor. <br/> `);
      alertValidacionesListAsunto.style.color = "red";
      listAsunto.style.border = "solid thin red";
      isValid = false;
      index.push("listAsunto");
    }
  }

  if (validarEmail(txtEmail.value) && validarEmail(txtEmail.value) && validarNumTel(txtPhone.value) && validarListAsunto(listAsunto.value) && politicasPrivIsChecked()) {
    if (recibirInfoIsChecked()) {
      checkrecibirInfo.value = "Si";
    } else {
      checkrecibirInfo.value = "No";
    }
    enviarEmail();
    checkrecibirInfo.value = "";
    checkPoliticasPriv.value = "";
    index = [];
  }
});

function enviarEmail() {
  const serviceID = 'service_9r31h4b';
  const templateID = 'template_o4c2eck';
  emailjs.sendForm(serviceID, templateID, formContacto)
    .then(() => {
      Toast.fire({
        icon: 'success',
        title: '¡Gracias por comunicarte con nosotros!'
      });
      limpiarTodo();
    }, (err) => {
      alert(JSON.stringify(err));
    });
}

txtNombre.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (!validarNombre(txtNombre.value.trim())) {
    if (!index.includes("nombre")) {
      alertValidacionesTextoNombre.insertAdjacentHTML(
        "afterbegin", ` El <strong> Nombre </strong> no es correcto. <br/> `);
      alertValidacionesTextoNombre.style.color = "red";
      txtNombre.style.border = "solid thin red";
      index.push("nombre");
    }
  }
  else {
    //quitar alertas
    alertValidacionesTextoNombre.innerHTML = "";
    alertNombre.style.display = "none";
    txtNombre.style.border = "";
    removeAllInstances(index, "nombre");
  }
});
txtEmail.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (!validarEmail(txtEmail.value.trim())) {
    if (!index.includes("email")) {
      alertValidacionesTextoEmail.insertAdjacentHTML("afterbegin", `El <strong> Correo </strong> no es correcto. <br/> `);
      alertValidacionesTextoEmail.style.color = "red";
      txtEmail.style.border = "solid thin red";
      index.push("email");
    }
  }//if email no cumple las validaciones
  else {
    //quitar alertas
    alertValidacionesTextoEmail.innerHTML = "";
    alertEmail.style.display = "none";
    txtEmail.style.border = "";
    removeAllInstances(index, "email");
  }

});

txtPhone.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (!validarNumTel(txtPhone.value.trim())) {
    if (!index.includes("phone")) {
      alertValidacionesTextoPhone.insertAdjacentHTML("afterbegin", `El <strong> Teléfono </strong> no es correcto. <br/> `);
      alertValidacionesTextoPhone.style.color = "red";
      txtPhone.style.border = "solid thin red";
      index.push("phone");
    }

  }//if phone no cumple las validaciones 
  else {
    //quitar alertas
    alertValidacionesTextoPhone.innerHTML = "";
    alertPhone.style.display = "none";
    txtPhone.style.border = "";
    removeAllInstances(index, "phone");
  }

});

txtMensaje.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (!validarMensaje(txtMensaje.value.trim())) {
    if (!index.includes("mensaje")) {
      alertValidacionesTextoMensaje.insertAdjacentHTML("afterbegin", `El <strong> Mensaje</strong> no es correcto. <br/> `);
      alertValidacionesTextoMensaje.style.color = "red";
      txtMensaje.style.border = "solid thin red";
      index.push("mensaje");
    }
  }//if mensaje no cumple las validaciones 
  else {
    //quitar alertas
    alertValidacionesTextoMensaje.innerHTML = "";
    alertMensaje.style.display = "none";
    txtMensaje.style.border = "";
    removeAllInstances(index, "mensaje");
  }
});

listAsunto.addEventListener("change", function (event) {
  event.preventDefault();
  //quitar alertas
  alertValidacionesListAsunto.innerHTML = "";
  listAsunto.style.border = "";
  removeAllInstances(index, "listAsunto");
});

function removeAllInstances(arr, item) { //Arreglo index

  for (var i = arr.length; i--;) {
    if (arr[i] === item) arr.splice(i, 1);
  }
}

function limpiarTodo() { //clear
  index = [];
  checkrecibirInfo.checked = false;
  checkPoliticasPriv.checked = false;
  txtNombre.value = "";
  txtEmail.value = "";
  txtPhone.value = "";
  txtMensaje.value = "";
  listAsunto.value = "Asunto";
  removeAllInstances(index, "nombre");
  removeAllInstances(index, "email");
  removeAllInstances(index, "phone");
  removeAllInstances(index, "mensaje");
  btnEnviar.disabled = false;
  btnEnviar.textContent = "Enviar";
  btnEnviar.style.fontWeight = "bold";
}