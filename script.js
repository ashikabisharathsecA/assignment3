document.addEventListener('DOMContentLoaded', function() {
    const quizData = [
      {
        question: 'Who is the Prime Minister of India?',
        answers: ['Rahul Gandi', 'Narendra Modi', 'Nirmala', 'Chandrashekar'],
        correctAnswer: 'Narendra Modi'
      },
      {
        question: 'what is the famous street food in India?',
        answers: ['Panipuri', 'Alooparatha', 'Kabab', 'Rice'],
        correctAnswer: 'Panipuri'
      },
      {
        question: 'Whos birthday celebrated as Engineers day?',
        answers: ['Mahatma Gandi', 'Sardar Vallabha Bhai Patel', 'Sir M Vishweshwarayya', 'Michelangelo'],
        correctAnswer: 'Sir M Vishweshwarayya'
      }
    ];
  
    let currentQuestion = 0;
    let score = 0;
  
    const quizForm = document.getElementById('quiz-form');
    const questionText = document.getElementById('question-text');
    const optionsDiv = document.getElementById('options');
    const feedbackDiv = document.getElementById('feedback');
    const scoreDiv = document.getElementById('score');
  
    function startQuiz() {
      displayQuestion();
      quizForm.addEventListener('submit', processAnswer);
    }
  
    function displayQuestion() {
      const currentQuizItem = quizData[currentQuestion];
      questionText.textContent = currentQuizItem.question;
      optionsDiv.innerHTML = '';
  
      currentQuizItem.answers.forEach((answer, index) => {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'answer';
        radioBtn.value = answer;
        radioBtn.id = `option${index}`;
        optionsDiv.appendChild(radioBtn);
  
        const label = document.createElement('label');
        label.setAttribute('for', `option${index}`);
        label.textContent = answer;
        optionsDiv.appendChild(label);
  
        optionsDiv.appendChild(document.createElement('br'));
      });
  
      document.getElementById('option0').checked = true;
    }
  
    function processAnswer(event) {
      event.preventDefault();
  
      const selectedOption = document.querySelector('input[name="answer"]:checked');
      if (!selectedOption) {
        alert('Please select an answer!');
        return;
      }
  
      const userAnswer = selectedOption.value;
      const correctAnswer = quizData[currentQuestion].correctAnswer;
  
      if (userAnswer === correctAnswer) {
        feedbackDiv.textContent = 'Correct!';
        feedbackDiv.style.color = 'green';
        score++;
      } else {
        feedbackDiv.textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
        feedbackDiv.style.color = 'red';
      }
  
      currentQuestion++;
  
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  
    function endQuiz() {
      quizForm.removeEventListener('submit', processAnswer);
      questionText.textContent = 'Quiz Completed!';
      optionsDiv.innerHTML = '';
      feedbackDiv.textContent = '';
      scoreDiv.textContent = `Your final score is: ${score} / ${quizData.length}`;
    }
  
    const authenticated = true; 
  
    if (authenticated) {
      startQuiz();
    } else {
      questionText.textContent = 'You are not authenticated to take this quiz.';
    }
  });