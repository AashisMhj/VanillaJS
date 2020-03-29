//import dom elements
const errorField = document.getElementById('error');
const imageEl = document.getElementById('image');
//this function will allow images and comonents to be droped in the div
function allowDrop(event) {
  event.preventDefault();
}
//function to enable drag   
function drag(event) {
  console.log("the drag function");
  //on drag add data to the event
  event.dataTransfer.setData("text", ev.target.id);
}
//function performed on drop  
function drop(event) {
  event.preventDefault();
  console.log('the drop function');
  let data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}
//function to show droped svg into div
function onSVGDrop(event){
  event.preventDefault();
  name = event.dataTransfer.files[0].name;
  if(!name.includes('.svg')){
    errorField.innerText = "not a svg file";
  }else{
    imageEl.src = name;
    errorField.innerText = "";
    }
}