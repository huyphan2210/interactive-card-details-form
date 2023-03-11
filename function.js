$(document).ready(function() {
    // Prevent users from entering and pasting numbers.
    $('#name').on('keydown paste', function(e) {
        if (preventInvalidLetters(e, /^[a-zA-Z ]+$/) === false) return false;
    });

    // Prevent users from entering and pasting characters that are not numbers.
    $('#number').on('keydown paste', function(e) {
        if (preventInvalidLetters(e, /^[0-9 ]+$/) === false) return false;
        
        const previousVal = $(this).val();

        $(this).val(cc_format(previousVal));

        if (previousVal === '') {
            $('.number').text('0000 0000 0000 0000');
        } else {
            $('.number').text(cc_format(previousVal));
        }
    })

    $('.dateAndCvc input').on('keydown paste', function(e) {
        if (preventInvalidLetters(e, /^[0-9]+$/) === false) return false;
    });

    $('#name, .dateAndCvc input').keyup(function() {
        if (!$('#name').val()) {
            $('.holder .name').text('Jane Appleseed')
        } else {
            $('.holder .name').text($('#name').val());
        }

        if (!$('#expDate input:first-child').val()) {
            $('.holder div span:first-child').text('00');
        } else {
            $('.holder div span:first-child').text($('#expDate input:first-child').val());
        }

        if (!$('#expDate input:last-child').val()) {
            $('.holder div span:last-child').text('00');
        } else {
            $('.holder div span:last-child').text($('#expDate input:last-child').val());
        }

        if (!$('.cvcSection input').val()) {
            $('.cardBack span').text('000');
        } else {
            $('.cardBack span').text($('.cvcSection input').val());
        }
    })
    
    $('form').submit(function(e) {
        e.preventDefault();
    })
})

// Reference: https://www.peterbe.com/plog/cc-formatter
function cc_format(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (i = 0, len = match.length; i < len; i += 4) {
        parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
        return parts.join(' ');
    } else {
        return value;
    }
}

function preventInvalidLetters(e, regexr) {
    e = e || window.event;
    if (e.type === 'paste') {
        const pastedData = e.originalEvent.clipboardData.getData('text');
        if (!regexr.test(pastedData)) {
            return false;
        }
    } else {
        const charCode = (typeof e.which === "undefined") ? e.keyCode : e.which;
        const charStr = String.fromCharCode(charCode);
        if (
            !regexr.test(charStr) &&
            charCode !== 8 &&
            charCode !== 46
        ) {
            return false;
        }      
    }
}
