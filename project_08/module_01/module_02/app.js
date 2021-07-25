const CARD_URL = `https://api.magicthegathering.io/v1/cards?pageSize=20`

function renderCard(card) {}

function renderCardList(cardList) {}

function fetchCardList(url) {
    $('.searching').addClass('active');

    fetch(url)
        .then(data =>
            data.json())
        .then(function(data) {
            $('.searching').removeClass('active');
            renderCardList(data.cards);
        })
        .catch(error => console.log(error))
}

$('#card-search').on('submit', function(event) {

    const cardName = $('#cname').val();
    const cardText = $('#ctext').val();
    $('#cname').val(null);
    $('#ctext').val(null);

});

$('#results').on('click', '.card .set-name', function() {});