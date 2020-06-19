let imagesDiv = document.getElementById('images');
let output = document.getElementById('output');
let encryptMsg = document.getElementById('input-message');
let encryptBtn = document.getElementById('encrypt-btn');
let decryptBtn = document.getElementById('decrypt-btn');
let clearBtn = document.getElementById('clear');
let select = document.getElementById('selected-image');
//
let encryptOut = document.getElementById('encrypt-output');
let decryptOut = document.getElementById('decrypt-output')

for(let i=65; i< 122; i++){
  if(i>90 && i<97)
    continue;
  btn = document.createElement('div');
  btn.classList = "btn"
  btn.addEventListener('click',(event)=>{
    let img = document.createElement('img');
    img.src = `./images/char(${event.target.id}).png`;
    img.id = event.target.id;
    select.appendChild(img);
  })
  btn.innerHTML = `<img  id="${i}" src="./images/char(${i}).png" /><p id="${i}">${String.fromCharCode(i)}</p>`;
  imagesDiv.appendChild(btn);
}

// event Handlers
encryptBtn.addEventListener('click',(event)=>{
  let message = encryptMsg.value;
  if(message.length === 0){
    encryptOut.innerText = "nothing to encrypt"
  }
  for (let i=0; i < message.length; i++){
    let charValue = message.charCodeAt(i);
    if(charValue>64 && charValue<90 && charValue<96 && charValue>122) continue;
    let img = document.createElement('img');
    img.src = `./images/char(${charValue}).png`;
    encryptOut.appendChild(img);
  }
});
decryptBtn.addEventListener('click',(event)=>{
  let data = select.querySelectorAll('img');
  let message = '';
  data.forEach((item)=>{
    message += String.fromCharCode(item.id);
  })
  decryptOut.innerText = message;
})

clearBtn.addEventListener('click',(event)=>{
  encryptMsg.value = "";
  decryptOut.innerText = "";
  select.innerText = "";
  encryptOut.innerText = "";
})
