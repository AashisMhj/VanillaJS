const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus  = document.getElementById('money-minus');
const list = document.getElementById('list');
const form  = document.getElementById('form');
const text  = document.getElementById('text');
const  amount = document.getElementById('amount');
// const dummyTransactions = [
//     {id:1,text:'flower',amount:-30},
//     {id:2,text:'cash',amount:-20},
//     {id:3,text:'salary',amount:+40},
//     {id:4,text:'sales',amount:+20}

// ];
// const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let localStorageTransactions = localStorage.getItem('transactions');
// console.log(localStorageTransactions);
localStorageTransactions = JSON.parse(localStorageTransactions);

let transactions = localStorage.getItem('transactions') === null ? []:localStorageTransactions;
//add transaction function
function addTransaction(event){
    event.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() === '' ){
        alert('field empty');
    }else{
        const data = {
            id:generateID(),
            text:text.value,
            amount:+amount.value
        };
        transactions.push(data);
        addTransactionDom(data);
        updateValues();
        updateLocalStorage();
        //clear form
        text.value = '';
        amount.value = '';
    }
}
//function to generate ramdom id
function generateID(){
    return Math.floor(Math.random() * 1000);
}
//function to add transaction to the list
function addTransactionDom(transaction){
    console.log(transaction);
    //get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    //add class based on value
    item.classList.add(transaction.amount < 0 ?'minus' :'plus');

    item.innerHTML = `
        ${transaction.text}<span>${sign} ${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id}) >X</button>
    `;
    list.appendChild(item);
}



//function to update local storage
function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions));;
}
//update the balance income and expenss
function updateValues(){
    //get all the amounts of income and expenses form transaciton
    const amounts = transactions.map(transaction => transaction.amount);
    //get the total balance
    const total = amounts.reduce((acc,item)=>(acc+= item),0).toFixed(2);
    //calculate the total income by filtering the amount which are positive and then adding it
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc,item)=> (acc += item),0);

    const expense = (amounts
        .filter(item => item < 0)
        .reduce((acc,item)=>(acc += item ),0) * -1
    ).toFixed(2);

    balance.innerText = `Rs ${total}`;
    money_plus.innerText = `Rs ${income}`;
    money_minus.innerText = `Rs ${expense}`;
}
//remove transaction by id
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}
//init app function
function init(){
    list.innerHTML = '';
    transactions.forEach(addTransactionDom);
    updateValues();
}

init();

//event listners
form.addEventListener('submit',addTransaction);