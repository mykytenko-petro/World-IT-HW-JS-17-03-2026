// створюемо головний div
const rootDiv = document.createElement('div');
rootDiv.className = 'root';
document.body.appendChild(rootDiv);

// створюемо кнопочку старт
const clickButton = document.createElement("button");
clickButton.className = "click";
clickButton.textContent = "start";
clickButton.onclick = start;
document.body.appendChild(clickButton);

// створюемо масив зі всімами нашими картинками
const contentNames = ["egg", "food", 'fruits'];
let contentArray = [];
let lastPickedContent = "none";
let lastPickedIndex = -1;
let isPlaying = false;
// визиваемо ресет
reset();

// створюемо функцію reset в якій ми будемо рестартати всю гру
function reset() {
    isPlaying = false;
    contentArray = [];
    lastPickedContent = "none";
    rootDiv.replaceChildren();
    // створюемо цикл який буде рандомно буде вибирати із масива слова и вставляти в кнопочки
    for (let index = 0; index < 9; index++) {
        const contentIndex = Math.floor(Math.random() * 3);
        contentArray.push(contentNames[contentIndex]);
        // створюемо кнопочки
        const button = document.createElement("button");
        button.className = "content-button";
        button.value = contentNames[contentIndex] + " " + index; 
        button.onclick = () => pick(button);
        rootDiv.appendChild(button);
        // добавляемо картинку на кнопочку
        revealContent(button);
    }
    clickButton.textContent = "start";
    clickButton.onclick = start;
}
// функцыя яка закривае div
function start() {
    isPlaying = true;

    const buttonArray = rootDiv.querySelectorAll("button");
    for (let buttonIndex = 0; buttonIndex < buttonArray.length; buttonIndex++) {
        const button = buttonArray[buttonIndex];
        
        button.style.backgroundColor = "rgb(182, 168, 168)";
        button.replaceChildren();
    }
    
    clickButton.textContent = "reset";
    clickButton.onclick = reset;
}
// зображення
function revealContent(button) {
    const content = button.value.split(" ")[0];

    button.replaceChildren();
    button.style.backgroundColor = "white";

    const image = document.createElement("img");
    image.src = `/static/card_app/icons/${content}.svg`;
    button.appendChild(image);
}

/**
 * функція для натиска и проверки на пару
 * 1.натиск на кнопку 
 * 2.якщо вони вспівпадають відкрити всі схожі картинки
 * 3.якщо вони не збіглеся виклекаемо reset
 * 4.якщо це був леше перший клік то ми просто відкриваемо першу кнопку
 */
function pick(button) {
    const content = button.value.split(" ")[0];
    const buttonIndex = button.value.split(" ")[1];
    
    if (!isPlaying) return;
    if (lastPickedIndex === buttonIndex) {
        
        
        return;
    }
    
    revealContent(button);

    if (content !== lastPickedContent && lastPickedContent !== "none") {
        if (contentArray.filter((entry) => entry === lastPickedContent).length !== 1) {
            reset();
            return;
        }
    }
    else if (content === lastPickedContent) {
        const buttonArray = rootDiv.querySelectorAll("button");
        for (let buttonIndex = 0; buttonIndex < buttonArray.length; buttonIndex++) {
            if (buttonArray[buttonIndex].value === lastPickedContent)
                revealContent(buttonArray[buttonIndex]);
        }

        lastPickedContent = "none";
        return;
    }

    lastPickedContent = button.value;
}
