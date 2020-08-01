//
let isDrawing = false;
let x = 0;
let y = 0;
let shape = "rectangle";
let color = document.getElementById("input-color");
let clearBtn = document.getElementById('clear');
// let form = document.getElementById('form');

const myPics = document.getElementById('pic');
const context = myPics.getContext('2d');

// add event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener('mousedown', event=>{
  x = event.offsetX;
  y = event.offsetY;
  console.log(x, y);
  isDrawing = true;
});

myPics.addEventListener('mousemove', event=>{
  if(isDrawing === true){
    drawLine(context, x, y, event.offsetX, event.offsetY);
    x = event.offsetX;
    y = event.offsetY;
  }
});

window.addEventListener('mouseup', event=>{
  if(isDrawing === true){
    drawLine(context, x, y, event.offsetX, event.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
})

//
function drawLine(context, x1, y1, x2, y2){
  // console.log(color.value);
  context.beginPath();
  context.strokeStyle = color.value;
  context.lineWidth = 1;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

clearBtn.addEventListener('click', event=>{
  context.clearRect(0, 0, myPics.width, myPics.height);
})
