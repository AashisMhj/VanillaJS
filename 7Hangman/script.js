const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
//array of the man parts
const figureParts = document.querySelectorAll('.figure-parts');
//words 
const words = ['timestamp','document','abstract','lockdown','covid'];
//randomly selected word form words array
let selectedWord = words[Math.floor(Math.random() * words.length)];
console.log(selectedWord);
const correctLetters = [];//array to store all the correct letters intered by the user
const wrongLetters = [];//array to store wrong leters entered by the user

function displayWord(){
    wordEl.innerHTML = `
    ${selectedWord
        .split('').map(letter=>{
            return (`<span class="letter">
                    ${correctLetters.includes(letter) ? letter: ''}
                </span>`)
        }).join('')
    }
    `;
    enterWord = wordEl.innerText.replace(/\n/g,'');
    if(enterWord === selectedWord){
        finalMessage.innerText = 'Congratulation';
        popup.style.display = 'flex';
    }
}
//update wrong letters
function updateWrongLetterEl(){
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>':''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    console.log(figureParts);
    figureParts.forEach((part,index)=>{
        const error = wrongLetters.length;
        if(index <error){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    });
    //check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'You lost';
        popup.style.display = 'flex';
    }
}
//show notification
function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },1000)
}
//key listner
document.addEventListener('keydown',e=>{
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLetterEl();
            }else{
               showNotification();
            }
        }
    }
})

//restart game
playAgainBtn.addEventListener('click',()=>{
    //empty array
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetterEl();
    popup.style.display = 'none';
})

displayWord();