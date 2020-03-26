const errorField = document.getElementById('error');
const imageEl = document.getElementById('image');
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
      console.log("the drag function")
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    console.log('the drop function');
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  function onSVGDrop(event){
      event.preventDefault();
      name = event.dataTransfer.files[0].name;
      if(!name.includes('.svg')){
          errorField.innerText = "not a svg file";
      }else{
      imageEl.src = name;
      }
  }