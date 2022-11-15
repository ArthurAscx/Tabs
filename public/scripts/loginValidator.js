window.addEventListener('load', function () {
    let mail = false;
    let pwd = false;

    let registro = document.getElementById("ingresador");
    let formulario = document.querySelector("#loginForm")
    let correo = document.querySelector("#email");
    let correoLabel = document.querySelector("#cErr");
    let contra = document.querySelector("#password");
    let contraLabel = document.querySelector("#pwdErr");

    
    let originalCorreo = correoLabel.innerHTML
    let originalContra = contraLabel.innerHTML

    correo.addEventListener("blur", async (e) => {
        correoLabel.innerHTML = originalCorreo
        let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
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
        if (contra.value == "") {
            contraLabel.innerHTML += "<p>La contraseña no puede estar vacía</p>"
            contra.style.borderColor = "red"
            contra.style.backgroundColor = "orange"
        }
        else {
            contraLabel.innerHTML = originalContra;
            contra.style.borderColor = "green"
            contra.style.backgroundColor = "lightgreen"
            pwd = true
        }
    })

    registro.addEventListener("click", async (e)=>{
        e.preventDefault();
         if (correo.value) {
            correoLabel.innerHTML = originalCorreo
        try {
            emailVsDb = await axios.get("http://127.0.0.1:3000/api/users/mailing/" + correo.value)
            console.log(emailVsDb);
            if (emailVsDb.data.data == null) {
                correoLabel.innerHTML += "<p>El correo no esta registrado en la base de datos</p>"
                correo.style.borderColor = "red"
                correo.style.backgroundColor = "orange"
                mail = false;
            }
        } catch (error) {
            console.log("Pasa algo con el axios");
        }
    }
        mail&&pwd ? formulario.submit() : ""
    })
    
})