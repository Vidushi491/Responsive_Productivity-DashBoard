// Open full pages like tabs
function openFeatures() {
    var elem = document.querySelectorAll(".elem")
    var fullElem = document.querySelectorAll(".fullElem")
    var fullelemback = document.querySelectorAll(".fullElem .back")

    elem.forEach(function(elem){
        elem.addEventListener("click", function(){
            fullElem.forEach(f => f.style.display = "none");
            document.querySelector('#main').style.display = "none";
            fullElem[elem.id].style.display = "block";
        })
    });

    fullelemback.forEach(function(back){
        back.addEventListener("click", function(){
            fullElem[back.id].style.display = "none";
            document.querySelector('#main').style.display = "block";
        })
    });
}
openFeatures();

// Theme changer
function theme(){
    var theme = document.querySelector('.theme')
    var root = document.documentElement
    var flag = 0
    theme.addEventListener('click', function(){
        if(flag == 0){
            root.style.setProperty('--pri','#EDDFB3')
            root.style.setProperty('--sec','#B09B71')
            root.style.setProperty('--tri1','#B09B71')
            root.style.setProperty('--tri2','#B09B71')
            flag = 1
        }else if(flag == 1){
            root.style.setProperty('--pri','#828181ff')
            root.style.setProperty('--sec','#494949')
            root.style.setProperty('--tri1','#494949')
            root.style.setProperty('--tri2','#494949')
            flag = 2
        }else{
            root.style.setProperty('--pri','#0C0C0C')
            root.style.setProperty('--sec','#4a3834ff')
            root.style.setProperty('--tri1','#4a3834ff')
            root.style.setProperty('--tri2','#4a3834ff')
            flag = 0
        }
    })
}
theme();
function weather(){
  var apiKey = 'fc2153f650d2456fa7c185200250409';
  var city = 'Indore';

  var header1Time = document.querySelector('.header1 h1');
  var header1Date = document.querySelector('.header1 h2');
  var header2Temp = document.querySelector('.header2 h2');
  var header2Condition = document.querySelector('.header2 h4');
  var Precipitation = document.querySelector('.header2 .Precipitation');
  var Humidity = document.querySelector('.header2 .Humidity');
  var Wind = document.querySelector('.header2 .Wind');

  async function weatherAPICall(){
      var response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      var data = await response.json();

      header2Temp.innerHTML = `${data.current.temp_c}°C`;
      header2Condition.innerHTML = `${data.current.condition.text}`;
      Wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
      Humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
      Precipitation.innerHTML = `Precipitation: ${data.current.precip_mm} mm`;   
  }
  weatherAPICall();

  function timeDate(){
      const totalDaysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

      var date = new Date();
      var dayOfWeek = totalDaysOfWeek[date.getDay()];
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var tarik = date.getDate();
      var month = monthNames[date.getMonth()];
      var year = date.getFullYear();

      header1Date.innerHTML = `${tarik} ${month}, ${year}`;

      if(hours > 12){
          header1Time.innerHTML = `${dayOfWeek}, ${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} pm`;
      }else{
          header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} am`;
      }
  }
  setInterval(timeDate, 1000);
}
weather();
