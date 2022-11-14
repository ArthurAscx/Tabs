window.addEventListener('load', function () {


    let registro = document.querySelector("form");
    let nombre = document.querySelector("#firstName");
    let apellido = document.querySelector("#lastName");
    let correo = document.querySelector("#email");
    let contra = document.querySelector("#password");
    let profileImg = document.querySelector("#avatar");

    nombre.addEventListener("blur", (e) => {
        if (nombre.value == "") {
            console.log("El nombre no puede estar vacío")
            nombre.style.borderColor = "red"
            nombre.style.backgroundColor = "orange"
        }
        if (nombre.value.length <= 2) {
            console.log("El nombre no puede ser menor a dos caractéres")
            nombre.style.borderColor = "red"
            nombre.style.backgroundColor = "orange"
        }
    })

    apellido.addEventListener("blur", (e) => {
        if (apellido.value == "") {
            console.log("El apellido no puede estar vacío")
            apellido.style.borderColor = "red"
            apellido.style.backgroundColor = "orange"

        }
        if (apellido.value.length <= 2) {
            console.log("El apellido no puede ser menor a dos caractéres")
            apellido.style.borderColor = "red"
            apellido.style.backgroundColor = "orange"
        }
    })

    correo.addEventListener("blur", async (e) => {
        let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
        let emailVsDb = null
        if (correo.value == "") {
            console.log("El email no puede estar vacío")
        }
        if (!regExp.test(correo.value)) {
            console.log("El email debe contener un formato válido")
        }
        try {
            emailVsDb = await axios.get("http://127.0.0.1:3000/api/users/mailing/"+correo.value)
        } catch (error) {
            console.log("Pasa algo con el axios");
        }
        if ((emailVsDb != null)&&(emailVsDb.data.data != null)) {
            console.log("Este mail ya esta registrado en la base de datos");
        }
    })

    contra.addEventListener("blur", (e) => {
        let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
        if (contra.value == "") {
            console.log("La contraseña no puede estar vacío")
        }
        if (contra.value.length < 8) {
            console.log("La contraseña no puede ser menor a ocho caractéres")
        }
        if (!regularExpression.test(contra.value)) {
            console.log("La contraseña deberá tener letras mayúsculas, minúsculas, un número y un carácter especial.")
        }
    })

    profileImg.addEventListener("blur", (e)=>{
        let extFile = profileImg.value.split("."); // (JPG, JPEG, PNG, GIF).
        let iValue = (extFile.length) - 1;
        console.log(extFile);
        console.log(extFile[iValue])
        if((extFile[iValue]!="jpeg")&&(extFile[iValue]!="png")&&(extFile[iValue]!="jpg")&&extFile[iValue]!="gif"){
            console.log("El tipo de extensión del archivo no es valido")
        }
    })

    registro.addEventListener("submit", function (e) {

    });
})