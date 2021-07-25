const h3El = $('<h3>');
$('body').append(h3El);
const pEl = $('<p>');
$('body').append(pEl);
const imgEl = $('<img>');
$('body').append(imgEl);
$('h3').text('Hello, World');
$('p').html('<b>This</b> is my text');
$('img').attr('src', 'http://placeimg.com/640/480/nature?1');
$('.slo-mo').append(h3El, pEl, imgEl);

$('.normal-speed').append(
    $('<h3>').text('Hello, World'),
    $('<p>').html('<b>This</b> is my text'),
    $('<img>').attr('src', 'http://placeimg.com/640/480/nature?1')
)

$('.rewind')
    .prepend($('<img>').attr('src', 'http://placeimg.com/640/480/nature?1'))
    .prepend($('<p>').html('<b>This</b> is my text'))
    .prepend($('<h3>').text('Hello, World'));


$('.turbo').html('<h3>Hello, World</h3><b>This</b> is my text<br><br><img src="http://placeimg.com/640/480/nature?1">');