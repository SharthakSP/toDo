//var form = document.getElementById("form");
var input = document.getElementById("task");
var ul = document.getElementById("list");
var id = 0;
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

    //cb = `<input type="checkbox" id="chkBox"/>`;
    var chkBox = document.createElement("input");
    chkBox.setAttribute("type", "checkbox");
    chkBox.setAttribute("id", `li_${id}`);
    id++;
    //li.insertAdjacentHTML("beforeend", cb);
    ul.appendChild(li);

    li.setAttribute("draggable", true);//making li items draggable
    li.setAttribute("ondragstart", "dragStarted(event)");
    li.setAttribute("ondragover", "draggingOver(event)");
    li.setAttribute("ondrop", "dropped(event)");
    li.setAttribute("contenteditable", true);//making contents editable 
    li.appendChild(chkBox);
}

//event listerner "add" button is clicked
btn.addEventListener('click', function (e) {
    //e.preventDefault();

    itemsArray.push(input.value);//pushing new input value to array
    //setting local storage to new updated value
    localStorage.setItem('items', JSON.stringify(itemsArray));
    // var chkBox = document.getElementById("chkBox");

});

 //eventListener for checkbox
 ul.addEventListener("click", function (e) {
    var elem = e.target;

    //adding linethrough if checkbox is checked
    if (elem.type === "checkbox") {


        elem.parentNode.style.textDecoration = "line-through";
        elem.style.visibility = "hidden";
        
        var a = elem.parentNode;//storing parent element in a
        var b = a.textContent;//retrieving text and storing in b
        var c = itemsArray.indexOf(b);//getting index number
        //console.log(typeof itemsArray);
        
        //removing retrieved item from array
        itemsArray.splice(c,1);
        
        //updating local storage after removing one item
        localStorage.setItem('items', JSON.stringify(itemsArray));
        

        //when checked the item should not be editable
        a.setAttribute("contentEditable",false);

    }
});


//looping through everything inside "data" variable
data.forEach(item => {
    //display all existing stored information every time we open/refresh
    liMaker(item);
});

//eventListener to clear all data from localStorage
btnClr.addEventListener('click', function () {
    localStorage.clear();
    // while (ul.firstChild) {
    //     ul.removeChild(ul.firstChild);
    // }
});




//drag events
let source;

function dragStarted(e) {
    source = e.target;
    e.dataTransfer.setData("text/plain", e.target.innerHTML);
    e.dataTransfer.effectAllowed = "move";
}

function draggingOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function dropped(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.localName === 'li') {
        source.innerHTML = e.target.innerHTML;
        e.target.innerHTML = e.dataTransfer.getData("text/plain");
    }
}


