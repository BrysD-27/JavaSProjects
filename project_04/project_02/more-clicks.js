$('.task-input button').click(function(event) {
    const inputVal = $('.task-input input').val();

    if (inputVal.length !== 0) {
        $('.task-list').append('<li>' + inputVal + '</li>');

        $('.task-input input').val('');
    }
});

$('.decider button').click(function(e) {
    $('.status').toggleClass('active');
    if ($('span.status').hasClass('active')) {
        $('.status').text('on');
        $('.decider button').html('Turn Off');
        $('.decider img').attr('src', 'https://media.giphy.com/media/szmSyB2PnehgY/giphy.gif');
    } else {
        $('.status').text('off');
        $('.decider button').html('Turn On');
        $('.decider img').attr('src', 'https://si.wsj.net/public/resources/images/BN-WB523_1109RO_12S_20171109172506.jpg');
    }
});

$('.cool-kids button').click(function(e) {
    const bgColor = $(e.target).css('background-color');
    $('.cool-kids main').css('background-color', bgColor);
});