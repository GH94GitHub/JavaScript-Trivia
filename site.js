var currentQuestion = 1;

// 10 questions, each has {title, text, correctAnswer, multipleChoice{1-4}}
var questionBank = { 
'1': {
    title: 'Question #1',
    text: 'Inside which HTML element do we put the JavaScript?',
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
    text: 'Which of the following are capabilities of functions in JavaScript?',
    getCorrectAnswer: function() { return this.multipleChoice[3] },
    multipleChoice: {
        '1': 'Return a value',
        '2': 'Accept parameters and Return a value',
        '3': 'Accept parameters',
        '4': 'None of the above'
    }
},
'3': {
    title: 'Question #3',
    text: 'Which of the following attribute can hold the JavaScript version?',
    getCorrectAnswer: function() { return this.multipleChoice[1] },
    multipleChoice: {
        '1': 'LANGUAGE',
        '2': 'SCRIPT',
        '3': 'VERSION',
        '4': 'None of the above'
    }
},
'4': {
    title: 'Question #4',
    text: 'What is the correct syntax for referring to an external script called " abc.js"?',
    getCorrectAnswer: function() { return this.multipleChoice[3] },
    multipleChoice: {
        '1': '<script href=" abc.js">',
        '2': '<script name=" abc.js">',
        '3': '<script src=" abc.js">',
        '4': 'None of the above'
    }
},
'5': {
    title: 'Question #5',
    text: 'Which of the following best describes JavaScript?',
    getCorrectAnswer: function() { return this.multipleChoice[4] },
    multipleChoice: {
        '1': 'a low-level programming language.',
        '2': 'a scripting language precompiled in the browser.',
        '3': 'a compiled scripting language.',
        '4': 'an object-oriented scripting language.'
    }
},
'6': {
    title: 'Question #6',
    text: 'Which of the following is not considered a JavaScript operator?',
    getCorrectAnswer: function() { return this.multipleChoice[2] },
    multipleChoice: {
        '1': 'new',
        '2': 'this',
        '3': 'delete',
        '4': 'typeof'
    }
},
'7': {
    title: 'Question #7',
    text: 'What is the correct JavaScript syntax to write "Hello World"?',
    getCorrectAnswer: function() { return this.multipleChoice[3] },
    multipleChoice: {
        '1': 'System.out.println("Hello World")',
        '2': 'println ("Hello World")',
        '3': 'document.write("Hello World")',
        '4': 'response.write("Hello World")'
    }
},
'8': {
    title: 'Question #8',
    text: 'JavaScript is interpreted by _________',
    getCorrectAnswer: function() { return this.multipleChoice[1] },
    multipleChoice: {
        '1': 'Client',
        '2': 'Server',
        '3': 'Object',
        '4': 'None of the above'
    }
},
'9': {
    title: 'Question #9',
    text: 'To automatically open the console when a JavaScript error occurs which of the following is added to prefs.js?',
    getCorrectAnswer: function() { return this.multipleChoice[4] },
    multipleChoice: {
        '1': 'user_pref(" javascript.console.open_on_error", false);',
        '2': 'user_pref("javascript.console.open_error ", true);',
        '3': 'user_pref("javascript.console.open_error ", false);',
        '4': 'user_pref("javascript.console.open_on_error", true);'
    }
},
'10': {
    title: 'Question #10',
    text: 'Which is the correct way to write a JavaScript array?',
    getCorrectAnswer: function() { return this.multipleChoice[3] },
    multipleChoice: {
        '1': 'var txt = new Array(1:"tim",2:"kim",3:"jim")',
        '2': 'var txt = new Array:1=("tim")2=("kim")3=("jim")',
        '3': 'var txt = new Array("tim","kim","jim")',
        '4': 'var txt = new Array="tim","kim","jim"'
    }
}
};

var storedAnswers = {

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

// Functions
    /**
     * Updates the question
     * Note: Make sure to change "currentQuestion" to desired question to be output before calling this function
     */
     function updateQuestion() {
        var questionTitle = ViewModel.question.title;
        var questionText = ViewModel.question.text;
        var questionMultipleChoice = ViewModel.question.multipleChoice;

        questionTitle(questionBank[currentQuestion].title);
        questionText(questionBank[currentQuestion].text);
        questionMultipleChoice.a1(questionBank[currentQuestion].multipleChoice[1]);
        questionMultipleChoice.a2(questionBank[currentQuestion].multipleChoice[2]);
        questionMultipleChoice.a3(questionBank[currentQuestion].multipleChoice[3]);
        questionMultipleChoice.a4(questionBank[currentQuestion].multipleChoice[4]);

        //re-check the stored answer
        if (storedAnswers[currentQuestion]) {
            $.each($('input[name=question]'), function() {
                if ($(this).next().text() === storedAnswers[currentQuestion].answer) {
                    $(this).prop('checked', true);
                }
            });
        }
        else {
            // uncheck checked radio if there is no saved answer
            $('input[name=question]:checked').prop('checked', false);
        }  

    }

    /**
    * If a radio button is checked store it's value and change background of quickNav item to let the user know it's completed
    * Note: Call this before you change the "currentQuestion"
    */
    function storeAnswer() {
        if ($('input[name=question]:checked')[0]) {
            //store answer 
            storedAnswers[currentQuestion] = {
                answer: $('input[name=question]:checked').next().text()
            }
            //update quick nav background
            $('#quickNav' + currentQuestion).css('background-color', 'rgba(0, 0, 0, .5)');
        }
    }

window.addEventListener("load", function() {
    ko.applyBindings(ViewModel);

    /* Event Listeners */
    $('#left_in_div div').bind("click", function() { // Jump to desired question
        storeAnswer();
        currentQuestion = $(this).text();
        updateQuestion();
    });

        //Buttons
    $('#prevBtn').bind("click", function() { // Previous Button
        if (currentQuestion > 1) {
            storeAnswer();
            currentQuestion--;
            updateQuestion();
        }
        else {
            // If user is on question 1 do something
        }
    });

    $('#nextBtn').bind("click", function() { // Next Button
        if (currentQuestion < 10) {
            storeAnswer();           
            currentQuestion++;
            updateQuestion();
        }
        else {
            // If user are on question 10 do something
        }
        
    });

    $('#finishBtn').bind("click", function() { // Turn-in-Paper Button
        ViewModel.done(true);
    });

    $('#backBtn').bind("click", function() { // Back to questions button //? Should we make this a reset trivia button?
        ViewModel.done(false);      
    });

});