// Questions Array
const questions = [
  { question: 'Enter your First Name' },
  { question: 'Enter your Last Name' },
  { question: 'Enter your Email', pattern: /\S+@\S+\.\S+/ },
  { question: 'Create A Password', type: 'password' },
]

// Transition Times
const shakeTime = 100; // Shake Transition Time
const switchTime = 200; // Transition Between Questions

// Init Position At First Question
let position = 0;

// Init Dom Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');

// Events

// Get question on DOM load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next button click
nextBtn.addEventListener('click', validate);

// Input field enter click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13) {
    validate();
  }
});

// Functions

// Get Question From Array & Add to Markup
function getQuestion() {
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;
  // Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer
  inputField.value = questions[position].answer || '';
  // Focus On Element
  inputField.focus();

  // Set Progress Bar Width - Variable to the questions length
  progress.getElementsByClassName.width = ( position * 100) / questions.length + '%';

  // Add User Icon or Back Arrow Depending On Question
  prevBtn.className = position ? 'fas fa-arrows-left' : 'fas fa-user';

  showQuestion();
}

// DIsplay question to user
function showQuestion() {
  inputGroup.style.opacity = 1;
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide question from user
function hideQuestion() {
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft= 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform to create shake motion
function transform(x, y) {
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}

// Validate field
function validate() {
  // Make sure pattern matches If there is one
  if(!inputField.value.match(questions[position].pattern || /.+/ ))
  {
    inputFail();
  } else {
    inputPass();
  }
}

// Field Input Fail
function inputFail() {
  formBox.className = 'error';
  // Repeat shake motion - set i to number of shakes
  for(let i  = 0; i < 6; i++) {
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field input passed
function inputPass() {
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Increment Position
  position++;

  // If new question, hide current and get next
  if(questions[position]) {
    hideQuestion();
    getQuestion();
  } else {
    // Remove if no more questions
    hideQuestion();
    formBox.className = 'close';
    progress.style.width = '100%';

    // Form complete
    formComplete();
  }
}

// All fields complete - show h1 end
function formComplete() {
  const h1 = document.createElement('h1');
  h1.classList.add('end');
  h1.appendChild(document.createTextNode(
    `Thanks ${question[0].answer} You are registered and will get an email shortly`));
    setTimeout(() => {
      formBox.parentElement.appendChild(h1);
      setTimeout(() => h1.style.opacity = 1);
    }, 1000);
}