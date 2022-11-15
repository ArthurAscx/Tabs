window.addEventListener('load', function () {


    let registro = document.getElementById("submitero");
    let formulario = document.querySelector("form")
    let nombre = document.querySelector("#firstName");
    let nombreLabel = document.querySelector("#fNerr");
    let apellido = document.querySelector("#lastName");
    let apellidoLabel = document.querySelector("#lNerr");
    let correo = document.querySelector("#email");
    let correoLabel = document.querySelector("#cErr");
    let contra = document.querySelector("#password");
    let contraLabel = document.querySelector("#pwdErr");
    let profileImg = document.querySelector("#avatar");
    let imgLabel = document.querySelector("#imgErr");

    let originalNombre = nombreLabel.innerHTML
    let originalApellido= apellidoLabel.innerHTML
    let originalCorreo= correoLabel.innerHTML
    let originalContra= contraLabel.innerHTML
    let originalImg= imgLabel.innerHTML

    let name = false;
    let lstName = false;
    let mail = false;
    let pwd = false;
    let img = false;

    nombre.addEventListener("blur", (e) => {
        nombreLabel.innerHTML = originalNombre; 
        if (nombre.value == "") {
            nombreLabel.innerHTML += "<p>El nombre no puede estar vacío</p>"
            nombre.style.borderColor = "red"
            nombre.style.backgroundColor = "orange"
        }
        else if (nombre.value.length <= 2) {
            nombreLabel.innerHTML += "<p>El nombre no puede ser menor a dos caractéres</p>"
            nombre.style.borderColor = "red"
            nombre.style.backgroundColor = "orange"
        }
        else {
        nombreLabel.innerHTML = originalNombre;    
        nombre.style.borderColor = "green"
        nombre.style.backgroundColor = "lightgreen"
        name = true
        }
    })

    apellido.addEventListener("blur", (e) => {
        apellidoLabel.innerHTML = originalApellido;
        if (apellido.value == "") {
            apellidoLabel.innerHTML += "<p>El apellido no puede estar vacío</p>"
            apellido.style.borderColor = "red"
            apellido.style.backgroundColor = "orange"
        }
        else if (apellido.value.length <= 2) {
            apellidoLabel.innerHTML += "<p>El apellido no puede ser menor a dos caractéres</p>"
            apellido.style.borderColor = "red"
            apellido.style.backgroundColor = "orange"
        }
        else {
        apellidoLabel.innerHTML = originalApellido;
        apellido.style.borderColor = "green"
        apellido.style.backgroundColor = "lightgreen"
        lstName = true
        }
    })

    correo.addEventListener("blur", async (e) => {
        correoLabel.innerHTML = originalCorreo
        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
        let emailVsDb = null
        try {
            emailVsDb ? await axios.get("http://127.0.0.1:3000/api/users/mailing/"+correo.value) : ""
            if ((emailVsDb != null)&&(emailVsDb.data.data != null)) {
                correoLabel.innerHTML += "<p>El correo ya esta registrado</p>"
                correo.style.borderColor = "red"
                correo.style.backgroundColor = "orange"
            }
        } catch (error) {
            console.log("Pasa algo con el axios");
        }
        if (correo.value == "") {
            correoLabel.innerHTML += "<p>El correo no puede estar vacío</p>"
            correo.style.borderColor = "red"
            correo.style.backgroundColor = "orange"
        }
        else if (!regExp.test(correo.value)) {
            correoLabel.innerHTML += "<p>El correo debe tener un formato valido</p>"
            correo.style.borderColor = "red"
            correo.style.backgroundColor = "orange"
        }
        else {
            correoLabel.innerHTML = originalCorreo
            correo.style.borderColor = "green"
            correo.style.backgroundColor = "lightgreen"
            mail = true;
            }
        })
    
    contra.addEventListener("blur", (e) => {
        contraLabel.innerHTML = originalContra;
        let regularExpression = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})$/
        if (contra.value == "") {
            contraLabel.innerHTML += "<p>La contraseña no puede estar vacía</p>"
            contra.style.borderColor = "red"
            contra.style.backgroundColor = "orange"
        }
        else if (contra.value.length < 8) {
            contraLabel.innerHTML += "<p>La contraseña no puede ser menor a ocho caractéres</p>"
            contra.style.borderColor = "red"
            contra.style.backgroundColor = "orange"
        }
        else if (!regularExpression.test(contra.value)) {
            contraLabel.innerHTML += "<p>La contraseña deberá tener letras mayúsculas, minúsculas, un número y un carácter especial.</p>"
            contra.style.borderColor = "red"
            contra.style.backgroundColor = "orange"
        }
        else{
        contraLabel.innerHTML = originalContra;
        contra.style.borderColor = "green"
        contra.style.backgroundColor = "lightgreen"
        pwd = true
        }
    })

    profileImg.addEventListener("blur", (e)=>{
        imgLabel.innerHTML = originalImg;
        let extFile = profileImg.value.split("."); // (JPG, JPEG, PNG, GIF).
        let iValue = (extFile.length) - 1;
        if((extFile[iValue]!="jpeg")&&(extFile[iValue]!="png")&&(extFile[iValue]!="jpg")&&extFile[iValue]!="gif"){
            imgLabel.innerHTML += "<p>La imagen debe de contener una extensión jpeg, jpg, png o gif</p>"
            profileImg.style.borderColor = "red"
            profileImg.style.backgroundColor = "orange"
        }
        else{
            imgLabel.innerHTML = originalImg;
            profileImg.style.borderColor = "green"
            profileImg.style.backgroundColor = "lightgreen"
            img = true
        }
    })

    // registro.addEventListener("click", function(event){
    //     event.preventDefault()
    //     if(!name&&!lstName&&!pwd&&!mail&&!img){
    //         document.querySelector("#titulo").innerText = "No se puede mandar formularios con errores"
    //     }
    //     else{
    //         registro.click()
    //     }
    //   });
})