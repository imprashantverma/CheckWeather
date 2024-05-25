const myWeather = document.querySelector('.your-weather');
const searchWeather = document.querySelector('.search-weather');
const searchCity = document.querySelector('.search-city');
const searchBtn = document.querySelector('.search-btn');
const form = document.querySelector('.form-container');
const info = document.querySelector('.info-container');
const locationContainer = document.querySelector('.location-container');

var flag = false;
let openTab = myWeather;
openTab.classList.add('current-tab');
form.classList.add('hidden');
info.classList.add('hidden');
getByCoordinate();

function set(data){
    locationContainer.style.display= 'none';
    const cityName = document.querySelector('.city');
    const flag = document.querySelector('.flag');
    const desc = document.querySelector('.description');
    const temp = document.querySelector('.temp');
    const weatherImg = document.querySelector('.weather-image');
    const humidity = document.querySelector('.humidity');
    const speed = document.querySelector('.speed');
    const cloud = document.querySelector('.cloud');
    cityName.innerText = data?.name;
    flag.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0].description;
    weatherImg.src=`https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = data?.main?.temp +' C';
    speed.innerText = data?.wind?.speed; 
    humidity.innerText = data?.main?.humidity;
    cloud.innerText = data?.clouds?.all;
}; 


async function informtaion() {
   try {
    let content = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=66293b26c6c59e0d60f6044af7696343`);
    let data =  await content.json();
    if(content.ok == false)
        throw new "";
    set(data);
   }
   catch (error) {
        locationContainer.style.display= 'none';
        searchCity.value=""
        flag  = true;
        console.log(flag);
        alert(' Invailed City');
   }
}
async function getData( lati ,long) {
    try {
        let content = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=66293b26c6c59e0d60f6044af7696343`);
        let data =  await content.json();
        set(data);
        info.classList.remove('hidden');
       }
       catch (error) {
            locationContainer.style.display= "none";
            alert('Invailed Location');
       }  
}
function showPosition(position){
    let lati =  position.coords.latitude;
    let long = position.coords.longitude;
    getData(lati,long);
}
function getByCoordinate(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);   
    }
    else
        alert('not supported location service');
}
function switchTab(currentTab){
    if(openTab != currentTab) {
        openTab.classList.remove('current-tab');
        openTab = currentTab;
        openTab.classList.add('current-tab');
    }
};

myWeather.addEventListener('click',()=>{
    searchCity.value ="";
    form.classList.add('hidden');
    info.classList.remove('hidden');
    locationContainer.style.display= 'auto';
    switchTab(myWeather);
    getByCoordinate();
    info.classList.add('hidden');
});

searchWeather.addEventListener('click',()=>{
    form.classList.remove('hidden');
    info.classList.add('hidden');
    switchTab(searchWeather);
});

searchBtn.addEventListener('click', ()=>{
    locationContainer.style.display= 'flex';
    info.classList.add('hidden');
    informtaion().then(()=>{
        if(flag == false)
            info.classList.remove('hidden');
        else
            flag = false;
    });
    
    searchBtn.value='';
   
    
})
    
