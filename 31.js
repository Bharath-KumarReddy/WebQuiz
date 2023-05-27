// Functions
function buildQuiz(){
    // variable to st
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="checkbox" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label> <br>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Jordan Walke"
      },
      correctAnswer: "c"
    }, 
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
        
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }, 
    {
      question: "Which of the following is used in pencils ?",
      answers: {
        a: "Graphite",
        b: "Silicone",
        c: "Charcoal",
        d: "Phosphorous"
      },
      correctAnswer: "a"
    } ,
    {
      question: "Chlorophyll is a naturally occurring chelate compound in which central metal ?",
      answers: {
        a: "Copper",
        b: "Magnesium",
        c: "Iron",
        d: "Calcium"
      },
      correctAnswer: "b"
    }, 
    {
      question: "Which of the following class in Bootstrap is used to create a wel?",
      answers: {
        a: ".wel" ,
        b: ".Well",
        c: ".well-container",
        d: ".container-well"
      },
      correctAnswer: "b"
    } ,
    {
      question: "How to stop an interval timer in Javascript?",
      answers: {
        a: "ClearInterval",
        b: "ClearTimer",
        c: "IntervalOver",
        d: "None of the above"
      },
      correctAnswer: "a"
    } , 
    {
      question: "Which of the following css property is used to describe how the animation will play?",
      answers: {
        a: "animation-timing-function" ,
        b: " css3-timing-function",
        c: "transform-timing-function",
        d: "transition-timing-function"
      },
      correctAnswer: "d"
    } ,
    {
      question: " Identify the correct syntax for declaring arrays in C++?",
      answers: {
        a: "array arr[10]",
        b: "array{10}",
        c: "int arr[10]",
        d: "int arr"
      },
      correctAnswer: "c"
    } 
 
    
     
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);