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
	
	fetch(api)
	   .then(function(response){
	   	 let data=response.json();
	   	 return data;
	   })
       .then(function(data){
       	weather.temperature.value= Math.floor(data.main.temp-KELVIN);
       	weather.description=data.weather[0].description;
       	weather.iconId=data.weather[0].icon;
       	weather.city=data.name;
       	weather.country=data.sys.country;
       })	  
       .then(function(){ 
       	displayWeather();
       });
}

//display weather to UI
function displayWeather(){
	iconElement.innerHTML='<img src="icons/${weather.iconId}.png"/>';
	tempElement.innerHTML="${weather.temperature.value}°<span>C</span>";
	descElement.innerHTML=weather.description;
	locationElement.innerHTML='${weather.city}, ${weather.country}';
}

//c to F conversion
function celsiusToFahrenheit(temperature){
	return(temperature*9/5)+32;
}
//when the user clicks on the temp element
tempElement.addEventListener("click",function(){
	if(weather.temperature.value===undefined) return;

	 if (weather.temperature.unit=="celsius") {
	 	let faherenheit =celsiusToFahrenheit(weather.temperature.value);
	 	faherenheit=Math.floor(faherenheit);

	 	tempElement.innerHTML='${faherenheit}°<span>F</span>';
	 	weather.temperature.unit="faherenheit";

	 }else{
	 	tempElement.innerHTML='${weather.temperature.value}°<span>C</span>';
	    weather.temperature.unit="celcius";
	 }   
});