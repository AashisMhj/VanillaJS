const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');
const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

//store list items
const listItems = [];
let dragStartIndex;
//function to create list of array
function createList(){
    [...richestPeople]
    .map(a =>({value:a, sort:Math.random()}))//create object with person and a random number
    .sort((a,b)=> a.sort - b.sort)//scramble the list by sorting the list on random number
    .map(a => a.value)//get the list array after removing the random number
    .forEach((person,index)=>{
        //create list item for each scrambled array item
        const listItem = document.createElement('li');
        //create custom attibute to keep track
        listItem.setAttribute('data-index',index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItems.push(listItem);
        draggableList.appendChild(listItem);
    })
    addEventListeners();
}
//functions for event listeners
//function to execute on dragging an item
function dragStart(){
    dragStartIndex = this.closest('li').getAttribute('data-index');

}
//function to execute when an item enter another item
function dragEnter(){
    this.classList.add('over');
}
//function toexecute when dragging item is let go
function dragLeave(){
    this.classList.remove('over');
}
//function toexecute when dragging item is over an item
function dragOver(event){
    event.preventDefault()
}
//function toexecute when an item is dropped
function dragDrop(){
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex,dragEndIndex);
    this.classList.remove('over');
}
//function to swap item in the list
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
//function to check order of list
function checkOrder(){
    listItems.forEach((item,index)=>{
        const personName = item.querySelector('.draggable').innerText.trim();
        if(personName !== richestPeople[index]){
            item.classList.add('wrong');
        }else{
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    })
}

createList();

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart',dragStart);
    })

    dragListItems.forEach(item =>{
        item.addEventListener('dragover',dragOver);
        item.addEventListener('drop',dragDrop);
        item.addEventListener('dragenter',dragEnter);
        item.addEventListener('dragleave',dragLeave);
    })
}
check.addEventListener('click',checkOrder);