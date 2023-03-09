$(document).ready(function() {
    $('#number').on('change keyup', function() {
        $(this).val(cc_format($(this).val()));
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
