const rootDiv = document.createElement('div');
rootDiv.className = 'root';
document.body.appendChild(rootDiv);

const clickButton = document.createElement("button");
clickButton.className = "click";
clickButton.textContent = "start";
clickButton.onclick = start;
document.body.appendChild(clickButton);

const contentNames = ["egg", "food", 'fruits'];
let contentArray = [];
let lastPickedContent = "none";
let isPlaying = false;

reset();

function reset() {
    isPlaying = false;
    contentArray = [];
    lastPickedContent = "none";
    rootDiv.replaceChildren();
    
    for (let index = 0; index < 9; index++) {
        const contentIndex = Math.floor(Math.random() * 3);
        contentArray.push(contentNames[contentIndex]);

        const button = document.createElement("button");
        button.className = "content-button";
        button.value = contentNames[contentIndex];
        button.onclick = () => pick(button);
        rootDiv.appendChild(button);

        revealContent(button);
    }

    clickButton.textContent = "start";
    clickButton.onclick = start;
}

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

function revealContent(button) {
    button.replaceChildren();
    button.style.backgroundColor = "white";

    const image = document.createElement("img");
    image.src = `/static/card_app/icons/${button.value}.svg`
    button.appendChild(image);
}

function pick(button) {
    if (!isPlaying) return;

    revealContent(button);

    if (button.value !== lastPickedContent && lastPickedContent !== "none") {
        if (contentArray.filter((entry) => entry === lastPickedContent).length === 1){
            lastPickedContent = button.value;
            return;
        } else {
            reset();
            return;
        }
    } else if (button.value === lastPickedContent) {
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
