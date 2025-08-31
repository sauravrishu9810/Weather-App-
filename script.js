const inputBox = document.querySelector(".input-box"); // input box // 

const button = document.querySelector("#search-button"); // button // 

const weatherImg = document.querySelector(".weather-img"); // weather Img // 

const temperaTure = document.querySelector(".temperature"); // temperature // 

const descriPtion = document.querySelector(".description"); // text-description //

const humidity = document.querySelector("#humidity"); // humidity span-text // 

const windSpeed = document.querySelector("#wind-speed"); // wind-speed // 

const location_not_found = document.querySelector(".location-not-found"); 

const weather_body = document.querySelector(".weather-body"); 


button.addEventListener("click",()=>{
    checkWeather(inputBox.value);
});

// API CALLING // ~ Most Important Concept 

async function checkWeather(city){
    const api_key = "93537017a01e440c869912febeff8a50";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    // `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`; // accesing the api with city name and user api_key//

    const weather_data = await fetch(`${url}`).then(response=> 
        response.json());      
        
        // we are here fetching the value by using json() method and then it will return promises and then to get the value in next step we use  the response.json() to//convert the api response in object / human-undertandable form . //

        if(weather_data.cod === '404' ){
            console.log("Error");
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            return;
        }

        weather_body.style.display = "flex";

        location_not_found.style.display = "none";

        console.log(weather_data); // data history in console //  

        // temperaTure.innerHTML = ` ${Math.round(weather_data.main.temp)} °C ` - 273.15 ; // Getting weather_data main .temp to fetch the weather data //

        const tempCelsius = Math.round(weather_data.main.temp - 273.15);
        temperaTure.innerHTML = `${tempCelsius} °C`;


        descriPtion.innerHTML = `${weather_data.weather[0].description}`; // Description of the data // 

        humidity.innerHTML = `${weather_data.main.humidity} % `; // humidity //

        windSpeed.innerHTML = `${weather_data.wind.speed} kmph `;  // wind speed // 

        // NOW , we will use switch case for adding and switching images btw values // 

        switch(weather_data.weather[0].main){
            case 'Clouds':
                weatherImg.src = "Images/cloud.png";

                break;
            case 'Clear':
                weatherImg.src = "Images/clear.png";
                break;
            case 'Rain':
                weatherImg.src = "Images/rain.png";
                break;
            case 'Mist':
                weatherImg.src = "Images/mist.png";
                break;
            case 'Snow':
                weatherImg.src = "Images/snow.png";
                break;
            default:
            weatherImg.src = "Images/clear.png";
        }

};
