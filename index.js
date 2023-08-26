const addToDoButton = document.querySelector("#addToDoButton");
const addingPlace = document.querySelector(".foundToDos");
const addToDoInput = document.querySelector("#addToDoInput");
const clearAllToDo = document.querySelector(".clearAll");
const searchToDo = document.querySelector("#searchInput");
let toDos = [];

// Load existing todos from local storage
loadAll();

addToDoButton.addEventListener('click', function () {
    const todoText = addToDoInput.value.trim();
    if (todoText === "") {
        alert("Zəhmət olmasa ad daxil edin");
    } else {
        createToDo(todoText);
    }
});

clearAllToDo.addEventListener('click', function clearAll() {
    addingPlace.innerHTML = "";
    toDos = [];
    replaceStorage();
});

searchToDo.addEventListener('keyup', search);

function loadAll() {
    toDos = JSON.parse(localStorage.getItem("todos"));
    addingPlace.innerHTML = "";

    // Create todo elements in the DOM
    toDos.forEach(function (todo) {
        createTodoInDOM(todo.text);
    });
}
function createToDo(text) {
    const newElementP = document.createElement("p");
    const newElement = document.createElement("div");
    const newElementI = document.createElement("i");

    newElementI.className = "fa fa-close";

    const newElementB = document.createElement("button");
    newElement.appendChild(newElementP);
    newElementB.appendChild(newElementI);
    newElement.appendChild(newElementB);
    newElementP.textContent = text;

    addingPlace.appendChild(newElement);
    addToDoInput.value = "";

    newElementB.addEventListener('click', function () {
        newElement.remove();
        toDos = toDos.filter(function (todo) {
            return todo.text !== text;
        });
        replaceStorage();
    });

    toDos.push({ text });
    addStorage();
}

function search() {
    const value = searchToDo.value.trim().toUpperCase();
    addingPlace.innerHTML = "";

    toDos.forEach(function (todo) {
        if (todo.text.trim().toUpperCase().includes(value)) {
            createTodoInDOM(todo.text); 
        }
    });

    if (addingPlace.children.length === 0) {
        addingPlace.innerHTML = "To Do tapılmadı.";
    }
}

function addStorage() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function replaceStorage() {
    localStorage.removeItem("todos");
    localStorage.setItem("todos", JSON.stringify(toDos));
}

// Function to create todo elements in the DOM
function createTodoInDOM(text) {
    const newElementP = document.createElement("p");
    const newElement = document.createElement("div");
    const newElementI = document.createElement("i");

    newElementI.className = "fa fa-close";

    const newElementB = document.createElement("button");
    newElement.appendChild(newElementP);
    newElementB.appendChild(newElementI);
    newElement.appendChild(newElementB);
    newElementP.textContent = text;

    addingPlace.appendChild(newElement);

    newElementB.addEventListener('click', function () {
        newElement.remove();
        toDos = toDos.filter(function (item) {
            return item.text !== text;
        });
        replaceStorage();
    });
}