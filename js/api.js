/**
 * Gif Magic lets you search for GIF in real time!
 */

$(document).ready(function () {


    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            $("#btnSearch").attr('value');
            //add more buttons here
            return false;
        }
    });

    var searchInput = $('#search');

    function loadGiphy(term) {

        if (term) {
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + term + "&api_key=dc6zaTOxFJmzC&limit=24";
        } else {
            var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=24";
        }

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                var results = response.data;
                console.log(results);
                $('#gifsAppearHere').empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="col s6 m3">');
                    var cardDiv = $('<div class="card">');
                    var cardImgDiv = $('<div class="card-image">');


                    var rating = results[i].rating;

                    var p = $('<div class="card-content">').text("Rating: " + rating);

                    var personImage = $('<img>');
                    personImage.attr('src', results[i].images.original_still.url);
                    personImage.attr('data-animated', results[i].images.original.url);
                    personImage.attr('data-still', results[i].images.original_still.url);
                    personImage.addClass('gif-toggle');

                    cardImgDiv.append(personImage);
                    cardDiv.append(cardImgDiv);
//                      cardDiv.append(p)
                    gifDiv.append(cardDiv);

                    $('#gifsAppearHere').prepend(gifDiv);
                }
            });
    }

    function addChip(name) {


        var queryURL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=' + name;

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                var results = response.data;
                console.log(results.image_original_url);


                var chipDiv = $('<div class="chip grey darken-3 white-text waves-effect waves-light">');
                chipDiv.attr('data-person', name);
                chipDiv.text(name);


                var chipImg = $('<img />');
                chipImg.attr('src', results.image_original_url);
                chipDiv.append(chipImg);


                var chipDivClose = $('<i class="close material-icons">');
                chipDivClose.text('close');
                chipDiv.append(chipDivClose);

                searchInput.val("");
                $('#buttons').prepend(chipDiv);


            });



    }


    $(document).on('click', '.chip', function () {

        var gif = $(this).data('person');
        loadGiphy(gif);

    } );

    $(document).on('click', '.gif-toggle', function () {

        var gifStill = $(this).data('still');
        var gifAnimated = $(this).data('animated');
        var gifSrc = $(this).attr('src');

        if ( gifSrc == gifStill ){
            $(this).attr('src', gifAnimated);
        }else{
            $(this).attr('src', gifStill);
        }

    } );


    searchInput.submit(function () {
        addChip(gifTyped);
        return false;
    });

    searchInput.keyup(function (event) {

        var key = event.keyCode || event.which;
        var gifTyped = searchInput.val();

        if (key === 13) {
            addChip(gifTyped);
        }

        loadGiphy(gifTyped);
        return false;
    });


    loadGiphy();


});