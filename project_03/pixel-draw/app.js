/* color plllette */
const PALETTE = [
        'red',
        'blue',
        'orange',
        'yellow',
        'green',
        'purple',
        'pink',
        'white',
        'black'
    ]
    /* add color to buttons */
function makePalette() {
    for (let index = 0; index < PALETTE.length; index++) {
        const nextColor = PALETTE[index];
        let newButton = $('<button></button>').css('background-color', nextColor);
        $('.palette').append(newButton);
    }
    $('.palette button').first().addClass('active');
}
makeGrid();
makePalette();
$('.grid .cell').click(onGridClick);
$('.palette button').click(onPaletteClick);
$('.controls .fill-empty').click(onFillEmptyClick);
$('.controls .clear').click(onClearClick);
$('.controls .fill-all').click(onFillAllClick);

/* create cells for the grid */
function makeGrid() {
    for (let index = 0; index < 64; index++) {
        $('.grid').append('<div class="cell"></div>');
    }
}

function onPaletteClick() {
    const colorClick = $('.palette button');
    colorClick.removeClass('active');
    $(this).addClass('active');
}

function onGridClick() {
    const colorPalette = $('.palette .active').css('background-color');
    if ($(this).css('background-color') != colorPalette) {
        $(this).css('background-color', colorPalette);
    } else if ($(this).css('background-color') === colorPalette) {
        $(this).css('background-color', "");
    }
}

function onClearClick() {
    $('.grid .cell').css('background-color', '');
}

function onFillAllClick() {
    const colorFill = $('.palette .active').css('background-color');
    $('.grid .cell').css('background-color', colorFill);
}

function onFillEmptyClick() {
    const paletteColor = $('.palette .active').css('background-color');
    const elements = $('.grid .cell');
    for (let index = 0; index < elements.length; index = index + 1) {
        let nextElement = $(elements[index]);
        if (nextElement.css('background-color') === 'rgba(0, 0, 0, 0)') {
            nextElement.css('background-color', paletteColor);
        }
    }
}