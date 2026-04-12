// SPEECH FUNCTION
function speak(textToSay) {
    const message = new SpeechSynthesisUtterance(textToSay);
    message.pitch = 1.2;
    message.rate = 1.0;
    window.speechSynthesis.speak(message);
}


// GET ELEMENTS
const menu = document.getElementById("wordSelect");
const display = document.getElementById("sentenceBox");


// SHOW SENTENCE WHEN WORD IS SELECTED
menu.addEventListener("change", function () {
    if (menu.selectedIndex > 0) {
        const selectedOption = menu.options[menu.selectedIndex];
        display.value = selectedOption.dataset.sentence;
    } else {
        display.value = "";
    }
});


// SPEAK WORD
function speakWord() {
    if (menu.selectedIndex > 0) {
        speak(menu.value);
    }
}


// SPEAK SENTENCE
function speakSentence() {
    if (display.value !== "") {
        speak(display.value);
    }
}