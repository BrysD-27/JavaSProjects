for (let index = 0; index < 10; index = index + 1) {
    let imgEl = $('<img src="http://placeimg.com/640/480/nature?' + index + '">');
    $('body').append(imgEl);
}