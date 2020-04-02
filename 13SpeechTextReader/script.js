const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const data = [
    {image:'./img/drink.jpg',text:'I am thirsty'},
    {image:'./img/food.jpg',text:'I am Hungry'},
    {image:'./img/tired.jpg',text:'I am Tired'},
    {image:'./img/hurt.jpg',text:'I am Hurt'},
    {image:'./img/happy.jpg',text:'I am Happpy'},
    {image:'./img/angry.jpg',text:'I am Angry'},
    {image:'./img/grandma.jpg',text:'I want to go to grandma'},
    {image:'./img/outside.jpg',text:'I want to go outside '},
    {image:'./img/sad.jpg',text:'I am sad '},
    {image:'./img/scared.jpg',text:'I am scared'},
    {image:'./img/school.jpg',text:'I want to go to school'},
    {image:'./img/home.jpg',text:'Home'}

]
//init  speech synth
const message = new SpeechSynthesisUtterance();
data.forEach(createBox);
//function to create div of image and text from the array
function createBox(item){
    const box = document.createElement('div');
    const {image,text} = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;
    box.addEventListener('click',()=>{
        setTextMessage(text);
        speakText();
        box.classList.add('active');
        setTimeout(()=> box.classList.remove('active'),800);
    })
    main.appendChild(box);
}
function setVoice(event){
    message.voice = voices.find(voice => voice.name === event.target.value);

}
//store voices
let voices = [];
function getVoices(){
    voices = speechSynthesis.getVoices()
    console.log(voices);
    voices.forEach(voice =>{
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    })
}
//set the text
function setTextMessage(text){
    message.text = text;
}
//function to speak text
function speakText(){
    speechSynthesis.speak(message);
}

//add event listener
speechSynthesis.addEventListener('voiceschanged',getVoices);
toggleBtn.addEventListener('click',()=> document.getElementById('text-box').classList.toggle('show'));
closeBtn.addEventListener('click',()=> document.getElementById('text-box').classList.toggle('show'));
voicesSelect.addEventListener('change',setVoice);
readBtn.addEventListener('click',() =>{
    setTextMessage(textarea.value);
    speakText();
})

