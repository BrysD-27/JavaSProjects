function reverse(text) {
    return text.split('').reverse().join('');
}

function scream(text) {
    return text.toUpperCase() + "!!!";
}

function drawOut(text) {
    return text.split('').join("...");
}

function updateText() {
    let inputText = $('#user-input').val();
    let updatedText = textFunction(inputText);
    $('#transformed').text(updatedText);
}
let textFunction = reverse;