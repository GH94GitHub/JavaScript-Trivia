/*============================
; Title: Index.html JS
; Author: George Henderson
; Date: 25 January 2021
; Modified By: Perry Fulfs
; Description: Creates/populates question data structure and communicates to index via 
; a Knockout view model.
;============================*/

var currentQuestion = 1;

// 10 questions, each has {title, text, correctAnswer, multipleChoice{1-4}}
var questionBank = {
  1: {
    title: "Question #1",
    text: "Inside which HTML element do we put JavaScript code?",
    getCorrectAnswer: function () {
      return this.multipleChoice[3];
    },
    multipleChoice: {
      1: "<javascript>",
      2: "<js>",
      3: "<script>",
      4: "<scripting>",
    },
  },
  2: {
    title: "Question #2",
    text: "What is the output of typeof null in JavaScript?",
    getCorrectAnswer: function () {
      return this.multipleChoice[3];
    },
    multipleChoice: {
      1: '"string"',
      2: '"undefined"',
      3: '"object"',
      4: '"null"',
    },
  },
  3: {
    title: "Question #3",
    text: "Which attribute holds the JavaScript version?",
    getCorrectAnswer: function () {
      return this.multipleChoice[1];
    },
    multipleChoice: {
      1: "LANGUAGE",
      2: "SCRIPT",
      3: "VERSION",
      4: "None of the above",
    },
  },
  4: {
    title: "Question #4",
    text: 'What is the correct syntax for embedding js code from file "abc.js" inside html code?',
    getCorrectAnswer: function () {
      return this.multipleChoice[3];
    },
    multipleChoice: {
      1: '<script href="abc.js">',
      2: '<script name="abc.js">',
      3: '<script src="abc.js">',
      4: "None of the above",
    },
  },
  5: {
    title: "Question #5",
    text: "Which function is used to convert a string to an integer in JavaScript?",
    getCorrectAnswer: function () {
      return this.multipleChoice[4];
    },
    multipleChoice: {
      1: "intConvert()",
      2: "stringToInt()",
      3: "toInteger()",
      4: "parseInt()",
    },
  },
  6: {
    title: "Question #6",
    text: "Which of the following is NOT considered a JavaScript operator?",
    getCorrectAnswer: function () {
      return this.multipleChoice[2];
    },
    multipleChoice: {
      1: "new",
      2: "this",
      3: "delete",
      4: "typeof",
    },
  },
  7: {
    title: "Question #7",
    text: 'What is the correct JavaScript method to write "Hello World" to the DOM?',
    getCorrectAnswer: function () {
      return this.multipleChoice[3];
    },
    multipleChoice: {
      1: 'System.out.println("Hello World")',
      2: 'println("Hello World")',
      3: 'document.write("Hello World")',
      4: 'response.write("Hello World")',
    },
  },
  8: {
    title: "Question #8",
    text: "JavaScript is interpreted by _________",
    getCorrectAnswer: function () {
      return this.multipleChoice[1];
    },
    multipleChoice: {
      1: "Client",
      2: "Server",
      3: "Object",
      4: "None of the above",
    },
  },
  9: {
    title: "Question #9",
    text: 'What is the result of 10 + "5" in JavaScript?',
    getCorrectAnswer: function () {
      return this.multipleChoice[2];
    },
    multipleChoice: {
      1: "15",
      2: '"105"',
      3: "Error",
      4: "105",
    },
  },
  10: {
    title: "Question #10",
    text: "Which of the following is NOT a JavaScript data type?",
    getCorrectAnswer: function () {
      return this.multipleChoice[4];
    },
    multipleChoice: {
      1: "string",
      2: "boolean",
      3: "array",
      4: "float",
    },
  },
};

var storedAnswers = {

};

// ViewModel
var ViewModel = {
    question: {
        title: ko.observable(questionBank[1].title),
        text: ko.observable(questionBank[1].text),
        multipleChoice: {
            a1: ko.observable(questionBank[1].multipleChoice[1]),
            a2: ko.observable(questionBank[1].multipleChoice[2]),
            a3: ko.observable(questionBank[1].multipleChoice[3]),
            a4: ko.observable(questionBank[1].multipleChoice[4])
        }
    },
    grade: {
        graded: ko.observable(false),
        showGrade: ko.observable(false),
        summary: ko.observable(),
        rank: ko.observable(),
        score: ko.observable()
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

    /**
     * Checks given question and returns boolean depending on correct/incorrect.
     * Param (integer 1-10)
     */
    function checkAnswer(questionNum) {
        if (storedAnswers[questionNum] && storedAnswers[questionNum].answer === questionBank[questionNum].getCorrectAnswer()) {
            return true;
        }
        return false;
    }

window.addEventListener("load", function() {
    ko.applyBindings(ViewModel);

    /* Event Listeners */
    $('#left_in_div div').bind("click", function() { // Jump to desired question
        if (!ViewModel.grade.showGrade) {
            storeAnswer();
        }
        else { ViewModel.grade.showGrade(false); }

        currentQuestion = $(this).text();
        updateQuestion();

        // If quiz is already graded
        if (ViewModel.grade.graded()) {
            let radioButtons = $('input[name=question]');
            radioButtons.parent().parent().css('background-color', 'transparent');

            // if the desired question was correct
            if (storedAnswers[$(this).text()] && storedAnswers[$(this).text()].answer === questionBank[$(this).text()].getCorrectAnswer()) {
                //loop through radio buttons
                for (let i = 0; i < 4; i++) {
                    //make user choice background green
                    if (radioButtons.next()[i].innerText === storedAnswers[$(this).text()].answer) {
                        radioButtons.parent().parent()[i].style.backgroundColor = 'green';
                    }
                }
            }
            // user choice was incorrect
            else { 
                //loop through radio buttons
                for (let i = 0; i < 4; i++) {
                    // make user choice red
                    if (storedAnswers[$(this).text()] && radioButtons.next()[i].innerText === storedAnswers[$(this).text()].answer) {
                        radioButtons.parent().parent()[i].style.backgroundColor = 'red';
                    }
                    // make correct answer green
                    if (radioButtons.next()[i].innerText === questionBank[$(this).text()].getCorrectAnswer()) {
                        radioButtons.parent().parent()[i].style.backgroundColor = 'green';
                    }
                    
                }
            }
            
        }
    });

    $('input[name=question]').change(function() { // When user checks radio button
        storeAnswer();
    })

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
            currentQuestion++;
            updateQuestion();
        }
        else {
            // If user are on question 10 do something
        }
        
    });

    $('#finishBtn').bind("click", function() { // Turn-in-Paper/Back to summary Button
        if (ViewModel.grade.graded()) { 
            ViewModel.grade.showGrade(true);
            return;
        }
        var proceed = false;
        if (Object.keys(storedAnswers).length !== 10) {  
            proceed = confirm('You have not answered all the questions. Would you like to continue?');
        }
        else { proceed = true; }

        if (proceed) {
            let summary, rank, score, correctAnswers = 0;
            
            ViewModel.grade.graded(true);
            $('input[type=radio]').prop('disabled', 'disabled');

            for (let i = 1; i <= 10; i++) {
                if (checkAnswer(i)) {
                    correctAnswers++;
                    //change background color to green
                    $('#quickNav' + i).css('background-color', 'rgba(0, 255, 0, .5)')
                }
                else {
                    // change background color to red
                    $('#quickNav' + i).css('background-color', 'rgba(255, 0, 0, .5)')
                }
            }
            ViewModel.grade.summary('You got ' + correctAnswers + '/10 questions correct.');
            if (correctAnswers < 6) { ViewModel.grade.rank('Beginner'); }
            else if (correctAnswers >= 6 && correctAnswers <= 8) { ViewModel.grade.rank('Novice'); }
            else if (correctAnswers > 8) { ViewModel.grade.rank('Expert'); }
            ViewModel.grade.score(correctAnswers + '0%');
            ViewModel.grade.showGrade(true);
        }
    });

    $('#backBtn').bind("click", function() { // Reset Game
        window.location.reload(); 
    });
});