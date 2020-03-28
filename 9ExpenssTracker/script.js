const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus  = document.getElementById('money-minus');
const list = document.getElementById('list');
const form  = document.getElementById('form');
const text  = document.getElementById('text');
const  amount = document.getElementById('amount');
const dummyTransactions = [
    {id:1,text:'flower',amount:-20},
    {id:1,text:'cash',amount:-20},
    {id:1,text:'salary',amount:+20},
    {id:1,text:'sales',amount:+20}

];

let transaction = dummyTransactions;

function addTransactionDom(transaction){

}