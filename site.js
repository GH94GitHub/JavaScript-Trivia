var questionBank = { // 10 questions, each has {title, text, correctAnswer, multipleChoice{1-4}}
'1': {
    title: 'Question #1',
    text: '1. Inside which HTML element do we put the JavaScript?',
    getCorrectAnswer: function() { return this.multipleChoice[3] },
    multipleChoice: {
        '1': '<javascript>',
        '2': '<js>',
        '3': '<script>',
        '4': '<scripting>'
    }
},
'2': {
    title: 'Question #2',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'3': {
    title: 'Question #3',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'4': {
    title: 'Question #4',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'5': {
    title: 'Question #5',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'6': {
    title: 'Question #6',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'7': {
    title: 'Question #7',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'8': {
    title: 'Question #8',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'9': {
    title: 'Question #9',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
},
'10': {
    title: 'Question #10',
    text: '',
    getCorrectAnswer: function() { return },
    multipleChoice: {
        '1': '',
        '2': '',
        '3': '',
        '4': ''
    }
}
};

// ViewModel
var ViewModel = {
    done: ko.observable(false),
    question: {
        title: ko.observable(questionBank[1].title),
        text: ko.observable(questionBank[1].text),
        multipleChoice: {
            a1: ko.observable(questionBank[1].multipleChoice[1]),
            a2: ko.observable(questionBank[1].multipleChoice[2]),
            a3: ko.observable(questionBank[1].multipleChoice[3]),
            a4: ko.observable(questionBank[1].multipleChoice[4])
        }

        // Holds question information
    }
};
window.addEventListener("load", function() {
    ko.applyBindings(ViewModel);

    /* Event Listeners */
    $('#left_in_div div').bind("click", function() {
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