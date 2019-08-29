

//slider

$(function () {
    $("#slider-range").slider({
        range: true,
        min: 16,
        max: 100,
        values: [16, 100],
        slide: function (event, ui) {
            $("#range1").val(ui.values[0]);
            $("#range2").val(ui.values[1]);
        }
    });
    $("#range1").val($("#slider-range").slider("values", 0))
    $("#range2").val($("#slider-range").slider("values", 1))


});


//navigation bar
function navBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
////password ValidationError
function checkPasswordMatch() {
    var password = $("#id_password").val();
    var confirmPassword = $("#id_re_password").val();

    if (password && confirmPassword)
        if (password != confirmPassword)
            $("#message").html("Passwords do not match!").css('color', 'red');
        else
            $("#message").html("Passwords match.").css('color', 'green');
    else
        $("#message").html(" ");
}

$(document).ready(function () {
    $("#id_password, #id_re_password").keyup(checkPasswordMatch);
});
////////password ValidationError ends
/////////terms and conditions modal


$(document).ready(function () {
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


    // When the user clicks on the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

});


///////terms and conditions modal

$(document).ready(function () {
    $("#id_dob").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "-100:+100",
        dateFormat: 'yy-mm-dd',
        autoclose: true,
        maxDate: '-16y',

        // You can put more options here.

    });
});
///password validation starts
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}



function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;

}


$(document).ready(function () {
    $("#filter-form").submit(function (event) {

            $.ajax({
                type: $(this).attr('method'),
                url: $(this).attr('action'),
                data: {
                    'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
                    'age-min': $('input[name=age-min]').val(),
                    'age-max': $('input[name=age-max]').val(),
                    'gender': $(".gender:checked").val(),
                },
                success: function (data) {
                    var matches = $("#matches")
                    $("#matches").empty();
                    data = JSON.stringify(data)
                    data = JSON.parse(data)
                    var elements = data.split(',')

                    elements.forEach(function (element) {
                        var val = element.replace(/['"]+/g, '')
                        $('#matches').append(val)
                        $('.col-sm-4').addClass("my-4")
                    });

                    let count = matches[0].children.length
                    $(".subtitle").text("You have " + count + " match(es)");
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $("#messageValidation").html("Please fill in the fields to filter the matches");
                }

            });
        
        event.preventDefault();
    });
})


//edit profile
$(document).ready(function () {

    $("#update_button").click(function (event) {
        event.preventDefault();
        email = $('#email').text()
        dob = $('#dob').text()
        gender = $('#gender').text()
        hobbies = $('#hobbies').text()


        $.ajax({
            type: "PUT",
            data:
            {
                email: email,
                dob: dob,
                gender: gender,
                hobbies: hobbies,

            },
            url: "/editProfile/",
            dataType: 'application/json',
            success: function (data) {
                data = JSON.stringify(data)
                data = JSON.parse(data)
                $("#email").html(data.email)
                $("#dob").html(data.dob)
                $("#gender").html(data.gender)
                $("#hobbies").html(data.hobbies)
            }

        })

    });

})

//refresh matches list
$(document).ready(function () {
    $('#reset_button').click(function () {
        $.ajax({
            type: "GET",
            url: "/similarHobbies/",
            success: function () {
                location.reload();
            }

        })
    });

});

$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        function getCookie(name) {
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

$(document).ready(function () {
    $(document).on('click', '.heart', function () {

        event.preventDefault();

        var this_ = $(this)
        var match = $(this, '.card-title')[0].id
        var black = '/static/images/like_1.png'
        var red = '/static/images/like_2.png'


        $.ajax({
            type: 'PUT',
            url: '/liked/' + match + '/',
            success: function (data) {
                data = JSON.stringify(data)
                data = JSON.parse(data)
                if (data.liked) {
                    // if its true then red heart
                    this_.attr('src', red);
                }
                else {
                    //empty heart
                    this_.attr('src', black);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log(xhr)
            }
        })

    });
});


$('#profile-image-upload').click(function () {
    $("#img_file").click();
});
