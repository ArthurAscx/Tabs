window.addEventListener('load', function () {

    let registro = document.getElementById("editador");
    let formulario = document.querySelector("#editForm")
    let titulo = document.querySelector("#title");
    let tituloLabel = document.querySelector("#tErr");
    let description = document.querySelector("#description");
    let descLabel = document.querySelector("#descErr");
    let productImg = document.querySelector("#artwork");
    let imgLabel = document.querySelector("#imgErr");

    
    let originalTitulo = tituloLabel.innerHTML
    let originalDesc = descLabel.innerHTML
    let originalImg = imgLabel.innerHTML

    let title = false;
    let desc = false;
    let img = false;


    titulo.addEventListener("blur", (e) => {
        tituloLabel.innerHTML = originalTitulo;
        if (titulo.value == "") {
            tituloLabel.innerHTML += "<p>EL título no puede estar vacío</p>"
            titulo.style.borderColor = "red"
            titulo.style.backgroundColor = "orange"
        }
        else if (titulo.value.length <= 5) {
            tituloLabel.innerHTML += "<p>El título no puede contener menos de cinco caracteres</p>"
            titulo.style.borderColor = "red"
            titulo.style.backgroundColor = "orange"
        }
        else {
            tituloLabel.innerHTML = originalTitulo;
            titulo.style.borderColor = "green"
            titulo.style.backgroundColor = "lightgreen"
            title = true
        }
    })

    description.addEventListener("blur", (e) => {
        descLabel.innerHTML = originalDesc;
        if (description.value.length <= 20) {
            descLabel.innerHTML += "<p>La descripción no puede ser menor a veinte caractéres</p>"
            description.style.borderColor = "red"
            description.style.backgroundColor = "orange"
        }
        else {
            descLabel.innerHTML = originalDesc;
            description.style.borderColor = "green"
            description.style.backgroundColor = "lightgreen"
            desc = true
        }
    })

    productImg.addEventListener("blur", (e) => {
        imgLabel.innerHTML = originalImg;
        let extFile = productImg.value.split("."); // (JPG, JPEG, PNG, GIF).
        let iValue = (extFile.length) - 1;
        if ((extFile[iValue] != "jpeg") && (extFile[iValue] != "png") && (extFile[iValue] != "jpg") && extFile[iValue] != "gif") {
            imgLabel.innerHTML += "<p>La imagen debe de contener una extensión jpeg, jpg, png o gif</p>"
            productImg.style.borderColor = "red"
            productImg.style.backgroundColor = "orange"
        }
        else {
            imgLabel.innerHTML = originalImg;
            productImg.style.borderColor = "green"
            productImg.style.backgroundColor = "lightgreen"
            img = true
        }
    })

    registro.addEventListener("click", (e)=>{
        e.preventDefault()
        if(title&&img&&desc){
            formulario.submit()
        }
    })

})