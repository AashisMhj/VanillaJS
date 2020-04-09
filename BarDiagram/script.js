const canvas = document.getElementById('canvas');
const btnAdd = document.getElementById('btn-add');
const btnRemove = document.getElementById('btn-remove');
const tableEl = document.getElementById('expenditure-table');
const form = document.getElementById('form');
const expenditureEl = document.getElementById('expenditure');
const priceEl = document.getElementById('price');
const ctx = canvas.getContext('2d');
//bar data
let rowSize = 10;
let currentValue = 0;
//object to store expenditur and price
let obj =[];

//function to add item from the form
function addItem(event){
    // stop the from from submiting
    event.preventDefault();
    //get expenditure and price from the form
    let expenditure = form.expenditure.value;
    let price = form.price.value;
    addToTable(expenditure,price);
    addToCanvas(expenditure,price);
    form.expenditure.value = '';
    form.price.value = '';
    
}
//functin to add the table dom
function addToTable(expenditure,price){
    let row = document.createElement('tr');
    row.innerHTML = `
        <td>index</td>
        <td>${expenditure}</td>
        <td>${price}</td>
        <td><button class="btn">Delete</button></td>
    `;
    tableEl.appendChild(row);

}
//function to add an item to canvas
function addToCanvas(expenditure,price){
    ctx.beginPath();
    ctx.rect(0,currentValue,price,rowSize);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.closePath();
    currentValue  += 5;
}

//event listeners
btnAdd.addEventListener('click',addItem)