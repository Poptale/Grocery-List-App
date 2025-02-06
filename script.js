import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
    databaseURL: "https://playground-511f2-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const listDB = ref(database, "shoppingList");
const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector(".list");

button.addEventListener("click", () => {
    push(listDB, input.value);
    clearInput();
});

onValue(listDB, function(snapshot) {
    if (snapshot.exists()) {
        let objectArray = Object.entries(snapshot.val());
        clearHtml();
        for (let i = 0; i < objectArray.length; i++) {
            let currentItemID = objectArray[i][0];   // Correctly get the item ID
            let currentItemValue = objectArray[i][1]; // Correctly get the item value
            appendLi(currentItemID, currentItemValue);
        }
    } else {
        clearHtml();
    }
});

function clearHtml() {
    list.innerHTML = "";
};

function clearInput() {
    input.value = "";
};

function appendLi(itemId, itemValue) {
    const newLi = document.createElement("li");
    newLi.textContent = itemValue;
    
    newLi.addEventListener("click", () => {
        let exactLocation = ref(database, `shoppingList/${itemId}`);
        remove(exactLocation);
    });
    list.appendChild(newLi);
};
