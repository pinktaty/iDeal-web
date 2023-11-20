// Servicios Buttons
document.getElementById("tintorería-btn").onclick = () => {
	location.href = "servicios.html#title";
}
document.getElementById("lavandería-btn").onclick = () => {
	location.href = "servicios.html#lavandería";
}
document.getElementById("planchaduría-btn").onclick = () => {
	location.href = "servicios.html#planchaduría";
}
document.getElementById("servicios-especiales-btn").onclick = () => {
	location.href = "servicios.html#serviciosEspeciales";
}

// Validate form
let form = document.querySelector('.needs-validation')
form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }
    form.classList.add('was-validated')
}, false)
