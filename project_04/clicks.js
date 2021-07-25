$('.one button').click(function() {
    $('.one span').text("Good Job!");
});

$('.two button').click(function() {
    $('.two').slideUp();
});

$('.three button').click(function() {
    $('.three').append('<div>Whats up?</div>');
});

$('.four button').click(function() {
    $('template').clone().appendTo('.template-target');
})

$('.five button').click(function() {
    $('.five').clone().prependTo('.prepend-target');
});

$('.six button').click(function() {
    $('.six').css('transform', 'rotate(180deg)');
});

$('.seven button').click(function() {
    let sevButton = $('<button>CLICK TO DISAPPEAR</button>').css('margin', '8px', 'padding', '5px');
    $('.seven').append(sevButton);
    sevButton.click(function() {
        let clickedElement = $(this);
        clickedElement.fadeOut();
    })
})