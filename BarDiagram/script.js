const canvas = document.getElementById('canvas');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const tableEl = document.getElementById('expenditure-table');
const form = document.getElementById('form');
const expenditureEl = document.getElementById('expenditure');
const priceEl = document.getElementById('price');
const ctx = canvas.getContext('2d');
//bar data
let rowSize = 20;
let currentValue = 0;
//object to store expenditur and price
let obj =[
    {id:1,expenditure:"food",price:100,color:"blue"},
    {id:2,expenditure:"clothes",price:150,color:"red"},
    {id:3,expenditure:"rent",price:80,color:"green"},
    {id:4,expenditure:"education",price:130,color:"purple"},
    {id:5,expenditure:"electricity",price:60,color:"black"},
];
//
//function to add item from the form
function addItem(event){
    // stop the from from submiting
    event.preventDefault();
    //get expenditure and price from the form
    let expenditure = form.expenditure.value;
    let price = form.price.value;
    let color = form.color.value;
    let newItem = {
        expenditure,
        price,
        color,
        id:obj.length +1
    }
    addToTable(newItem);
    addToCanvas(newItem);
    obj.push(newItem);
    form.expenditure.value = '';
    form.price.value = '';
    
}
//functin to add the table dom
function addToTable({expenditure,price,color = "red"},index){
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>${index+1}</td>
        <td>${expenditure}</td>
        <td>${price}</td>
        <td style="background-color:${color}"></td>
        <td><button class="btn" onclick="deleteItem(${index})">Delete</button></td>
    `;
    tableEl.appendChild(row);

}
//function to add an item to canvas
function addToCanvas({expenditure,price,color}){
    ctx.beginPath();
    ctx.rect(0,currentValue+4,price,rowSize);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.font = '20px Arial';
    ctx.fillText(expenditure,price+5,currentValue+24);
    currentValue  += 24;
}
//function to delete item
function deleteItem(index){
    obj.splice(index, 1);
    let rows = document.querySelectorAll('tr');
    // console.log(typeof(rows));
    drawCanvas();
}
//function to init all
function drawCanvas(){
    //clear canvas and table
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentValue = 0;
    //drqw diagram from the array
    obj.forEach((item,index) => {
        addToCanvas(item,index);
        addToTable(item,index);
    });
    //event listeners
}
drawCanvas();

btnAdd.addEventListener('click',addItem)