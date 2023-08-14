const API_KEY = "fa44ae6175de43c685358604c4149418";
const url = "https://newsapi.org/v2/everything?language=en&sortBy=popularity&q=";

window.addEventListener("load", () => fetchNews("India"));
window.addEventListener("load", () => checkWeather());

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDate = cardClone.querySelector("#news-date");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    newsSource.innerHTML = article.source.name;
    const date = new Date(article.publishedAt);
    const formattedDate = date.toLocaleDateString("en-GB", {
        timeZone: "Asia/Jakarta",
    });
    newsDate.innerHTML = formattedDate;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
    searchText.value = "";

}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});


const weatherBody = document.querySelector('#weather-body');
const weatherLocation = document.querySelector('#weather-location');
const weatherImg = document.querySelector('#weather-img');
const temperature = document.querySelector('#temperature');
const description = document.querySelector('#description');

async function checkWeather() {
    const cityName = 'Dahanu';
    const weatherAPI = "ecee6f9e50124b746b3d065af7fb1ba0";
    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPI}`;

    const weatherData = await fetch(weatherURL).then((response) => response.json());

    weatherLocation.innerHTML = `${weatherData.name}`;
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].main}`;

    switch (weatherData.weather[0].main) {
        case "Clouds":
            weatherImg.src = "./assets/cloud.png";
            break;
        case "Thunderstorm":
            weatherImg.src = "./assets/storm.png";
            break;
        case "Clear":
            weatherImg.src = "./assets/clear.png";
            break;
        case "Rain":
        case "Drizzle":
            weatherImg.src = "./assets/rain.png";
            break;
        case "Haze":
        case "Mist":
        case "Fog":
            weatherImg.src = "./assets/mist.png";
            break;
        case "Snow":
            weatherImg.src = "./assets/snow.png";
            break;
        default:
            weatherImg.src = "./assets/clear.png";
    }
}

function formatTime(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const todayDate = document.getElementById("today-date");

    const day = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
  
    todayDate.innerHTML = `${day}, ${dayOfMonth} ${month}`;
}

const currentDate = new Date();
const formattedTime = formatTime(currentDate);
