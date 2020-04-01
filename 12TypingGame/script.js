const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
//
text.focus;
let words = [
    "tradeable",
    "womanliest",
    "limiters",
    "phials",
    "retroactively",
    "quoining",
    "dogcatchers",
    "inset",
    "brawl",
    "renotified"
    ];
// function to get words from a api
// async function getRandomWords(){
//     let res = await fetch('https://random-word-api.herokuapp.com/word?number=10');
//     let data = await res.json();
//     return data;
// }

let randomWord;
let score = 0;
let time = 10;
var timeInterval = setInterval(updateTime,1000);
let difficulty = 'medium';
function getWord(){
    // words = await getRandomWords();
    return words[Math.floor(Math.random() * words.length)];
}

//
function addWordDom(){
    randomWord = getWord();
    word.innerHTML = randomWord;
}
function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}
//
function updateTime(){
    console.log(time);
    time--;
    timeEl.innerHTML = time+'s';
    if(time === 0){
        clearInterval(timeInterval);
        gameOver();
    }
}
//function to end game and show end screen
function gameOver(){
    endgameEl.innerHTML = `<h1>Time ran out</h1>
        <p>your final score is ${score}</P>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}
addWordDom();

//event listeners
text.addEventListener('input',e =>{
    const inseertedText = e.target.value;
    if(inseertedText === randomWord){
        addWordDom();
        updateScore();
        e.target.value = '';
        time += 5;
        updateTime();
    }
})
settingsBtn.addEventListener('click',()=> settings.classList.toogle('hide'))
settingsForm.addEventListener('change',e =>{
    difficulty = e.target.value;
    console.log(difficulty);
    // localStorage.setItem('difficulty',difficulty);
})
