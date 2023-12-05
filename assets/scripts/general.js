// To fix that bothering nav problem
const navbarButton = document.querySelector(".navbar-principal-button");
const navbarCollapse = document.querySelector(".navbar-principal");
const navbarLinks = document.querySelectorAll(".nav-link");
const navbarItems = document.querySelectorAll(".nav-item");
var isItFixed = navbarCollapse.classList.contains("navbar-fixit");

navbarButton.addEventListener("click", () => {
	if(isItFixed){
		navbarCollapse.classList.remove("navbar-fixit");
		navbarLinks.forEach(navbarLink => navbarLink.classList.remove("navbar-link-fixit"));
		navbarItems.forEach(navbarItem => navbarItem.classList.add("nav-fix"));
	} else if (!isItFixed){
		navbarCollapse.classList.add("navbar-fixit");
		navbarLinks.forEach(navbarLink => navbarLink.classList.add("navbar-link-fixit"));
		navbarItems.forEach(navbarItem => navbarItem.classList.remove("nav-fix"));
	}
});
window.addEventListener("resize", () => {
	if(window.innerWidth > 991){
		navbarCollapse.classList.remove("navbar-fixit");
		navbarLinks.forEach(navbarLink => navbarLink.classList.remove("navbar-link-fixit"));
		navbarItems.forEach(navbarItem => navbarItem.classList.add("nav-fix"));
	} else if(window.innerWidth < 992 && !isItFixed){
		navbarCollapse.classList.add("navbar-fixit");
		navbarLinks.forEach(navbarLink => navbarLink.classList.add("navbar-link-fixit"));
		navbarItems.forEach(navbarItem => navbarItem.classList.remove("nav-fix"));
	}
});
