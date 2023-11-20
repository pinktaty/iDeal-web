// Calculadora v2.0

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
	addService.innerHTML = `
	<div class="cal-row row col-6">
		<div class="col-6">
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
