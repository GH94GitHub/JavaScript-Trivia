window.addEventListener("load", function() {

    /* Event Listeners */
    $('#quest_cards th').bind("click", function() {
        alert('This jumps you to question ' + $(this).html());
    });
        //Buttons
    $('#prevBtn').bind("click", function() {
        alert('Displays the previous question.')
    });

    $('#nextBtn').bind("click", function() {
        alert('Displays the next question.')
    });

    $('#finishBtn').bind("click", function() {
        switchView();
    });

    $('#backBtn').bind("click", function() {
        switchView();        
    });

    /* Switches to show result summary, or question */ 
        function switchView() {
        var q =$('#question');
        var results = $('#sum_div');

        if (q.is(':visible')) {
            q.css('display', 'none');
            results.css('display', 'block');
        } else {
            results.css('display', 'none');
            q.css('display', 'block');
        }
    }
});