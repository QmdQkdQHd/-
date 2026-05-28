// 데이터 불러오기
let todoData = localStorage.getItem("myTodos");
let todos = [];

if (todoData != null) {
    todos = JSON.parse(todoData);
}

function renderScreen() {
    let ul = document.querySelector("#todo-list");
    let htmlStr = "";

    for (let i = 0; i < todos.length; i++) {
        htmlStr += "<li class='todo-item'>";
        htmlStr += "<span class='todo-text'>" + todos[i].text + "</span> ";
        htmlStr += "<button onclick='finishTodo(" + i + ", this)'>완료</button> ";
        htmlStr += "<button onclick='modifyTodo(" + i + ")'>수정</button> ";
        htmlStr += "<button onclick='removeTodo(" + i + ")'>삭제</button>";
        htmlStr += "</li>";
    }
    
    ul.innerHTML = htmlStr;

    let liElements = document.querySelectorAll(".todo-item");
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].isDone == true) {
            liElements[i].classList.add("completed");
        }
    }
}

// 데이터 저장
function saveData() {
    localStorage.setItem("myTodos", JSON.stringify(todos));
}

// 할일 추가
function addTodo() {
    let input = document.querySelector("#todo-input");
    
    if (input.value == "") {
        alert("할 일을 입력하세요");
        return;
    }

    let newTodo = {
        text: input.value,
        isDone: false
    };

    todos.push(newTodo);
    saveData();
    renderScreen();
    
    input.value = "";
};

// 엔터
document.querySelector("#todo-input").onkeydown = function(event) {
    if (event.key == "Enter") {
        addTodo();
    }
}

document.querySelector("#add-btn").onclick = addTodo;

// 완료 버튼
function finishTodo(index, btnElement) {
    let li = btnElement.parentElement;
    
    li.classList.toggle("completed");

    if (todos[index].isDone == false) {
        todos[index].isDone = true;
    }
    else {
        todos[index].isDone = false;
    }
    saveData();
}

// 수정 버튼
function modifyTodo(index) {
    let newText = prompt("수정할 내용:", todos[index].text);
    if (newText != null && newText != "") {
        todos[index].text = newText;
        saveData();
        renderScreen();
    }
}

// 삭제 버튼
function removeTodo(index) {
    todos.splice(index, 1);
    saveData();
    renderScreen();
}

renderScreen();