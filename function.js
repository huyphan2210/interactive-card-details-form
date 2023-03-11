$(document).ready(function() {
    // Prevent users from entering and pasting numbers.
    $('#name').on('keydown paste', function(e) {
        const charCode = (typeof e.which === "undefined") ? e.keyCode : e.which;
        if (
            preventInvalidLetters(e, /^[a-zA-Z ]+$/) === false || (
                charCode >= 96 && charCode <= 105
            )
        ) return false;
    });

    // Prevent users from entering and pasting characters that are not numbers.
    $('#number').on('keydown paste change', function(e) {
        const charCode = (typeof e.which === "undefined") ? e.keyCode : e.which;
        if (
            preventInvalidLetters(e, /^[0-9 ]+$/) === false && !(
                charCode >= 96 && charCode <= 105
            )
        ) return false;
        
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

        if (!$('#expDate input:nth-child(2)').val()) {
            $('.holder div span:nth-child(2)').text('00');
        } else {
            $('.holder div span:nth-child(2)').text($('#expDate input:nth-child(2)').val());
        }

        if (!$('.cvcSection input').val()) {
            $('.cardBack span').text('000');
        } else {
            $('.cardBack span').text($('.cvcSection input').val());
        }
    })
    
    
    $('form').submit(function(e) {
        e.preventDefault();

        let errors = '';

        $('input').each(function() {
            if (!$(this).val()) {
                $(this).parent().find('small').not('#wrongMonth').css('display', 'block');
                $(this).css('border-color', 'var(--red)');
                $(this).css('outline-color', 'var(--red)');
                errors = 'error';
            } else {
                $(this).parent().find('small').not('#wrongMonth').css('display', '');
                $(this).css('border-color', '');
                $(this).css('outline-color', '');
                errors = '';
            }
        })
        console.log(errors)
        if (!errors) {
            $('.cardForm').css('display', 'none');
            $('.thankYou').css('display', 'flex');
        }
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
            charCode !== 8 &&    // Backspace
            charCode !== 46 &&   // Delete
            charCode !== 13  &&  // Enter
            charCode !== 9       // Tab
        ) {
            return false;
        }      
    }
}
