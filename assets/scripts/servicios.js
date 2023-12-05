// Calculadora v2.0

// Make aesthetics of calculator responsive
const serviceColumn = document.querySelector(".serviceColumn");
let adaptedCalculator = serviceColumn.classList.contains("col");

if(window.innerWidth < 800){
	eliminateClass(serviceColumn, "col-6");
	addClass(serviceColumn, "col");
}

window.addEventListener("resize", () => {
	let servicesInCalculator = document.querySelectorAll(".service");

	if(window.innerWidth < 800 && !serviceColumn.classList.contains("col")){
		eliminateClass(serviceColumn, "col-6");
		addClass(serviceColumn, "col");
		if(servicesInCalculator.length > 0){
			servicesInCalculator.forEach(element => {
				eliminateClass(element, "col-6");
				addClass(element, "col");
			});
		}
	 } else if(window.innerWidth > 799 && serviceColumn.classList.contains("col")){
		eliminateClass(serviceColumn, "col");
		addClass(serviceColumn, "col-6");
		if(servicesInCalculator.length > 0){
			servicesInCalculator.forEach(element => {
				eliminateClass(element, "col");
				addClass(element, "col-6");
			});
		}
	}
});


// Add event listener to buttons of services
document.querySelectorAll(".btn-calculator").forEach(btn => {
	btn.addEventListener('click', () => {
		recolectInformation(btn);
	})
});

// Function that will recolect the informacion of the service elected
function recolectInformation(btnClicked){
	const container = btnClicked.parentElement.parentElement;
	const serviceImg = container.querySelector(".card-img-top").src;
	const serviceItem = container.querySelector(".card-title").innerText;
	const servicePrice = container.querySelector(".card-price").innerText;
	checkCalculator(serviceImg, serviceItem, servicePrice);
}

// Function that will add the service to the calculator
function checkCalculator(img, item, price){
	let doesItPass = true;
	const servicesInCalculator = document.querySelectorAll(".calculator-row");
	servicesInCalculator.forEach(service => {
		if(service.querySelector(".cal-service-text").innerText == item){
			alert("Este servicio ya se encuentra en la calculadora.");
			doesItPass = false;
		}
	});
	if(doesItPass){
		addToCalculator(img, item, price);
	}
}

function addToCalculator(img, item, price){
	const calculator = document.querySelector(".cal-services");
	let addService = document.createElement("div");
	addService.classList.add("row", "calculator-row");
	let html = "";
	if(window.innerWidth < 800){
		html = `
		<div class="service cal-row row col">
			<div class="col">
				<img class="cal-service-img" src="${img}">
			</div>
			<div class="cal-box-text col">
				<span class="cal-service-text">${item}</span>
			</div>
		</div>
		<div class="cal-row cal-box-price col">
			<span class="cal-service-price">${price}</span>
		</div>
		<div class="cal-row cal-service-quantity row col">
			<div class="col-lg-6">
				<input class="service-quantity" type="number" value="1">
			</div>
			<div class="col-lg-6">
				<button class="eliminate-btn btn btn-outline-dark" type="button">Eliminar</button>
			</div>
		</div>
		`
	} else {
		html = `
		<div class="service cal-row row col-6">
			<div class="col">
				<img class="cal-service-img" src="${img}">
			</div>
			<div class="cal-box-text col">
				<span class="cal-service-text">${item}</span>
			</div>
		</div>
		<div class="cal-row cal-box-price col">
			<span class="cal-service-price">${price}</span>
		</div>
		<div class="cal-row cal-service-quantity row col">
			<div class="col-lg-6">
				<input class="service-quantity" type="number" value="1">
			</div>
			<div class="col-lg-6">
				<button class="eliminate-btn btn btn-outline-dark" type="button">Eliminar</button>
			</div>
		</div>
		`
	}
	addService.innerHTML = html;

	// Special case of Ropa de diario
	if(item == "Ropa de diario"){
		addService.querySelector(".service-quantity").setAttribute("value", "3");
		addService.querySelector(".cal-service-price").innerText = "$" + 54;
	}
	// Add to calculator
	calculator.append(addService);
	updateTotal();
	// Make the eliminate buttons work
	addService.querySelector(".eliminate-btn").addEventListener('click', e => {
		eliminateService(e);
	});
	// Add event listeners to the inputs
	addService.querySelector(".service-quantity").addEventListener('change', e =>{
		adaptPrice(e);
	});
}

// Function that will update total
function updateTotal(){
	let total = 0;
	const servicesInCalculator = document.querySelectorAll(".cal-service-price");
	servicesInCalculator.forEach(service => {
		const priceText = service.innerText.replace("$", "");
		const price = parseInt(priceText);
		total += price;
	});
	document.querySelector(".cal-total").innerText = "$" + total;
}


// Function that will eliminate service
function eliminateService(e){
		const eventTriggered = e.target;
		eventTriggered.parentElement.parentElement.parentElement.remove();
		updateTotal();
}

// Change total depending of quantity of service
function adaptPrice(e){
	const input = e.target;
	const value = input.value;
	const service = input.parentElement.parentElement.parentElement;
	const serviceText = service.querySelector(".cal-service-text").innerText;
	let adapt = true;
	if(serviceText == "Ropa de diario" && value < 3){
		eliminateService(e);
		adapt = false;
	}
	if(value < 1){
		eliminateService(e);
		adapt = false;
	} 
	if(adapt){
		let beforePrice = 0;
		document.querySelectorAll(".card-body").forEach(card => {
			if(card.querySelector(".card-title").innerText == serviceText){
				beforePrice = parseInt(card.querySelector(".card-price").innerText.replace("$", "")); 
			}
		});
		service.querySelector(".cal-service-price").innerText = "$" + (beforePrice * value); 
		updateTotal();
	}
}

// Auxiliar function to eliminate the class of an object
function eliminateClass(object, classToEliminate) {
	if (object.classList.contains(classToEliminate)) {
        object.classList.remove(classToEliminate);
    }
}

// Auxiliar function to add a class to an object
function addClass(object, classToAdd){
	object.classList.add(classToAdd);
}
