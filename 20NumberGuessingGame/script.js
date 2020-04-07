const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
//start recognition
recognition.start();
//capture user speak
function onSpeak(event){
    // console.log(event);
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);
}
//function to write what user speaks
function writeMessage(msg){
    msgEl.innerHTML = `
        <div>you said: </div>
        <span class="box">${msg}</span>
    `
}
//check message agains number
function checkNumber(){
    const num = +msg;
    //check if is number
    if(Number.isNaN(msg)){
        msgEl.innerHTML = `<div>That is not a valid number</div>`;
        return;
    }
    //check in range
    if(num > 100 || num < 1){
        msgEl.innerHTML = '<div>Number must be between 1 and 100</div>';
        return;
    }
    if(num === randomNum){
        document.body.innerHTML = `<h2>You have guessed the number<br><br>
            it was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    }else if(num > randomNum){
        msgEl.innerHTML += '<div>Go lower</div>';
    }else{
        msgEl.innerHTML += '<div>Go Higher</div>';
    }

}
function getRandomNumber(){
    return Math.floor(Math.random() * 100) + 1;
}


recognition.addEventListener('result',onSpeak)
recognition.addEventListener('end',()=> recognition.start());

document.body.addEventListener('click',(event)=>{
    if(event.target.id == 'play-again'){
        window.location.reload();
    }
})