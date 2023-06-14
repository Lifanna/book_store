$(document).ready(() => {
    $("#addToCartBtn").click((event) => {
        let name = $("#bookName").attr('data-book-name');
        let bookId = $("#bookId").val();
        let bookPrice = parseInt($("#bookPrice").attr('data-price'));
        let bookImage = $("#bookImage").attr('src');

        let cartItems = localStorage.getItem('cartItems');

        if (cartItems === null) {
            cartItems = [];
            cartItems.push({
                name: name,
                bookId: bookId,
                price: bookPrice,
                totalPrice: bookPrice,
                image: bookImage,
                quantity: 1
            })
        }
        else {
            let bookIndex = -1;
            cartItems = JSON.parse(cartItems);

            for (let i = 0; i < cartItems.length; i++) {
                if (cartItems[i].bookId == bookId) {
                    bookIndex = i;
                    break;
                }
            }

            if (bookIndex !== -1) {
                cartItems[bookIndex].quantity += 1
                cartItems[bookIndex].totalPrice += bookPrice
            }
            else {
                cartItems.push({
                    name: name,
                    bookId: bookId,
                    price: bookPrice,
                    totalPrice: bookPrice,
                    image: bookImage,
                    quantity: 1,
                })
            }
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        $('#addedToCartModal').modal();
    });

    $("#setRatingBtn").click(() => {
        $('#setRatingModal').modal();
    })

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);

                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    $(".submitRatingBtn").click((event) => {
        $.ajax({
            url: '/set_rating',
            method: 'POST',
            headers: {
                "X-CSRFToken": getCookie('csrftoken')
            },
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                book: event.currentTarget.attributes['data-bookid'].value,
                rating: event.currentTarget.attributes['data-rating'].value,
            }),
            success: (response) => {
                $('#ratingModalContent').html('');
                $('#ratingModalContent').append('Спасибо за Вашу оценку!');

                $("#bookRating").html(`${response.new_rating}/10`);
                $("#setRatingBtn").remove();
            },
            error: (error) => {

            }
        });
    })
});
