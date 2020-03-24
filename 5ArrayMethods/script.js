const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillonairiesBtn = document.getElementById('show-millonaries');
const sortBtn = document.getElementById('sort');
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
  doubleBtn.addEventListener('click');
  showMillonairiesBtn.addEventListener('click',)