// api key : 82005d27a116c2880c8f0fcb866998a0

//SELECT ELEMENTS
const iconElement=document.querySelector(".weather-icon");
const tempElement=document.querySelector(".temperature-value p");
const descElement=document.querySelector(".temperature-description p");
const locationElement=document.querySelector(".location p");
const notificationElement=document.querySelector(".notification");

//App data
const weather={};
weather.temperature={
	unit:"celsius"
}
//App CONST AND VARS
const KELVIN=273;
//API KEY
const key="b22f2e9d4695a712a2ede0144d5693b8";
//checks if browser suppots geolaocation
if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
	notificationElement.style.display="block";
	notificationElement.innerHTML="<p>Browser doesn't Support Geolocation</p>";
}
//SET USER POSITION
function setPosition(position){
	let latitude=position.coords.latitude;
	let longitude=position.coords.longitude;

	getWeather(latitude,longitude);
}
//show error when there is an issue with geoloaction service
function showError(error){
    notificationElement.style.display="block"
    notificationElement.innerHTML='<p>${error.message}</p>';
}

//get weather from api provider
function getWeather(latitude,longitude){
	let api='https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=b22f2e9d4695a712a2ede0144d5693b8';
	
    console.log(api);
}