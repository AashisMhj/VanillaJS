const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillonairiesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const showMale = document.getElementById('show-male');
const showFemale = document.getElementById('show-female');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
//function to fetch data from the api
async function getRandomUser(){
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    
    const user = data.results[0];
    const {first:firstName,last:lastName} = user.name;
    const {gender} = user;

    const newUser = {
        name:`${firstName} ${lastName}`,
        gender,
        money:Math.floor(Math.random() * 1000000)
    };
    console.log(newUser);
    addData(newUser);
}
//function to double the money of user
function doubleMoney(){
    data = data.map(user=>{
        return {...user,money:user.money * 2};
    })
    updateDom();
}
//function to show only millonare
//function to sort user by richest
function sortByRichest(){
    data.sort((a,b)=>{
        return b.money - a.money;
    })
    updateDom();
}
function showMillonairies(){
    data = data.filter((aUser)=> aUser.money > 1000000);
    updateDom();
}
//function to calculate method
function calculateWealth(){
    // const total = array.reduce((acc,num) => (acc + num),0);//acc is the accumulated number and the last parameter is the starting number
    const wealth = data.reduce((acc,aUser)=> (acc += aUser.money),0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth:<strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
//function to add fetched user to the data array
getRandomUser();
function addData(obj){
    data.push(obj);
    updateDom();
}
//function to update the list
function updateDom(providedDate = data){
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedDate.forEach((aUser)=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${aUser.name}</strong>${formatMoney(aUser.money)}`;
        main.appendChild(element);
    })
}
//simple function which adds $ sign and commas to the number and give the format of monay
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

  //event listners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sort.addEventListener('click',sortByRichest);
showMillonairiesBtn.addEventListener('click',showMillonairies);
calculateWealthBtn.addEventListener('click',calculateWealth);