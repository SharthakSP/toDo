//var form = document.getElementById("form");
var input = document.getElementById("task");
var ul = document.getElementById("list");
var btn = document.getElementById("btn");
var btnClr = document.getElementById("clear");
//ternary operators && declaring empty array
//localstorage key is stored as items
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//converting data array to string
localStorage.getItem('items', JSON.stringify(itemsArray));
//convrting contents of local storage back to object
//stroing in data
var data = JSON.parse(localStorage.getItem('items'));

//creating function
var liMaker = (text) => {
    var li = document.createElement("li");//creating new element
    li.textContent = text;
    cb = `<input type="checkbox" />`;
    li.insertAdjacentHTML("beforeend",cb);
    ul.appendChild(li);  
}

//event listerner "add" button is clicked
btn.addEventListener('click', function (e) {
    //e.preventDefault();

    itemsArray.push(input.value);//pushing new input value to array
    //setting local storage to new updated value
    localStorage.setItem('items', JSON.stringify(itemsArray));
});

//looping through everything inside "data" variable
data.forEach(item => {
    //display all existing stored information every time we open/refresh
    liMaker(item);
});

//eventListener to clear all data from localStorage
btnClr.addEventListener('click', function () {
    localStorage.clear();
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
});
