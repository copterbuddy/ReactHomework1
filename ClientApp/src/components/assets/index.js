import $ from 'jquery'

$(document).ready(function(){

    // on pizza item detail toggle
    $(document).on('click', '.pizza-item-card-commands-detail', function(event) {
        var card = $(this).closest('.pizza-item-card');
        if(card.hasClass('pizza-item-card--expanded')) {
            // collapse
            card.removeClass('pizza-item-card--expanded');
            card.find('.pizza-item-card-detail').slideUp();
        } else {
            // expand
            card.addClass('pizza-item-card--expanded');
            card.find('.pizza-item-card-detail').slideDown();
        }
    });

});