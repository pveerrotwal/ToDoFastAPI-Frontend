const formButton = document.querySelector("#add-todo-button");
const itemsList = document.querySelector('.todo-list');
const statusContainer = document.querySelector('#status');
const todoInput = document.querySelector("#add-todo-bar");
const clearButton = document.querySelector('#clear-todo-button');

function addTodoItem(event) {
    const itemText = todoInput.value;
    if (itemText.length > 0) {
        postData("http://127.0.0.1:8000/api/add", {
            text: itemText
        }).then(response => displayItems(response));
    }
}


async function displayItem(item) {
    const li = document.createElement("li");
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.className = "update";
    updateButton.style.marginLeft = "10px";
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    deleteButton.style.marginLeft = "10px";
    const itemInput = document.createElement("input");
    itemInput.value = item.text;
    itemInput.className = "item-input";
    li.appendChild(itemInput);
    li.appendChild(updateButton);
    li.appendChild(deleteButton);
    return li;
}

async function displayItems(response) {
    statusContainer.textContent = `Status : ${response.status}`;
    itemsList.innerHTML = "";
    for (const item of response.items) {
        itemsList.appendChild(await displayItem(item));
    }
    todoInput.focus();
}

function clearTodoItems() {
    postData("http://127.0.0.1:8000/api/clear", {}, action = 'DELETE')
        .then(response => displayItems(response));
}

function updateOrDelete(e) {
    const clickedItem = e.target.closest("li");
    const idx = Array.from(itemsList.children)
        .indexOf(clickedItem);
    if (e.target.className === "delete") {
        postData(`http://127.0.0.1:8000/api/delete/${idx}`, {}, action = 'DELETE')
            .then(response => displayItems(response));
    } else if (e.target.className === "update") {
        const result = clickedItem.firstChild.value;
        if (result.length > 0) {
            postData(`http://127.0.0.1:8000/api/update/${idx}`, {text: result},
                action = 'PUT')
                .then(response => displayItems(response));
        }

    }

}

async function postData(url, data, action = 'POST') {
    const response = await fetch(url, {
        method: action,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });

    return response.json();
}

fetch("http://127.0.0.1:8000/api/list")
    .then(response => response.json())
    .then(response => {
        displayItems(response)
    });

formButton.addEventListener('click', addTodoItem);
clearButton.addEventListener('click', clearTodoItems);
itemsList.addEventListener('click', updateOrDelete);