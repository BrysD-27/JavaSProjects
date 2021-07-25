let heldValue = null,
    heldOperation = null,
    nextValue = null;

function calcDigits() {
    if (nextValue === null) {
        nextValue = 0;
    }
    nextValue += $(this).text();
    updateDisplay();
}

function showValue(location, value) {
    if (value === null) {
        $(location).text('');
    } else {
        $(location).text(Number(value));
    }
}

function updateDisplay() {
    showValue('.held-value', heldValue);
    showValue('.next-value', nextValue);
}

function setHeldOperation(operation) {
    if (heldOperation !== null) {
        heldValue = heldOperation(heldValue, nextValue);
    } else if (nextValue !== null) {
        heldValue = nextValue;
    }
    nextValue = null;
    heldOperation = operation;

}

function add(x, y) {
    return Number(x) + Number(y);
}

function subtract(x, y) {
    return Number(x) - Number(y);
}

function multiply(x, y) {
    return Number(x) * Number(y);
}

function divide(x, y) {
    return Number(x) / Number(y);
}

function equals(x, y) {
    heldOperation = null;
    setHeldOperation(heldOperation);
    $('.next-operation').text('');
    updateDisplay();
}

function clearAll() {
    heldValue = null,
        heldOperation = null,
        nextValue = null;
    $('.next-operation').text('');
    updateDisplay();
}

function clearEntry() {
    nextValue = null;
    updateDisplay();
}

$('.digits button').click(calcDigits);
$('.add').click(function() {
    setHeldOperation(add);
    $('.next-operation').text('+');
    updateDisplay();
});
$('.subtract').click(function() {
    setHeldOperation(subtract);
    $('.next-operation').text('-');
    updateDisplay();
});
$('.multiply').click(function() {
    setHeldOperation(multiply);
    $('.next-operation').text('*');
    updateDisplay();
});
$('.divide').click(function() {
    setHeldOperation(divide);
    $('next-operation').text('/');
    updateDisplay();
});
$('.equals').click(function() {
    setHeldOperation(null);
    $('.next-operation').text('');
    updateDisplay();
});
$('.clear-all').click(clearAll);
$('.clear-entry').click(clearEntry);