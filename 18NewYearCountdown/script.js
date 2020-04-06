const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const secounds = document.getElementById('secounds');
const countdown = document.getElementById('countdown');
const year = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();//get current year
const newYearTime = new Date(`january 01 ${currentYear +1} 00:00:00`);

//set brackground year
year.innerHTML = currentYear + 1;

//function to update countdown
function updateCountDown(){
    const currentTime = new Date();
    const diff = newYearTime -currentTime;
    //calculate days hours and minutes
    //get days from diff secounds
    const d = Math.floor(diff / 1000 /60/ 60/ 24);
    const h = Math.floor(diff / 1000/ 60/ 60 )%24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) %60;

    //add the days hours, minutes and secounds to dom
    days.innerHTML = d;
    hours.innerHTML = h< 10 ? '0'+h : h;
    minutes.innerHTML = m < 10 ? '0'+m : m;
    secounds.innerHTML = s < 10? '0'+s : s;
    
}

//show spinner before countdown
setTimeout(()=>{
    loading.remove();
    countdown.style.display = 'flex';
},1000);

//update contdown every 1 s
setInterval(updateCountDown,1000);


