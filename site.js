window.addEventListener("load", function() {
    var questionBank = { // 10 questions, each has {text, correctAnswer, multipleChoice{1-4}}
        '1': {
            text: 'Question 1',
            correctAnswer: 'Answer1',
            multipleChoice: {
                '1': 'MC 1',
                '2': 'MC 2',
                '3': 'MC 3',
                '4': 'MC 4'
            }
        },
        '2': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '3': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '4': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '5': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '6': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '7': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '8': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '9': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        },
        '10': {
            text: '',
            correctAnswer: '',
            multipleChoice: {
                '1': '',
                '2': '',
                '3': '',
                '4': ''
            }
        }
    };

    // ViewModel and setup
    var ViewModel = {
        done: ko.observable(false),
        question: {
            title: ko.observable('Question 1'),
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