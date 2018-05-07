app = {};

// Get user input 

// Create an empty array for all answers
app.answersArray = [];
// Gather answers from radio buttons as users click and push to answer array
app.answer = $('input[type=radio');
app.getAnswer = function() {
  app.answer.on('click', function () {
    const answer = $('input[type=radio]:checked').val();
    app.answersArray.push(answer);
    console.log(answer);
  });
}
// An object for the traits the eventually populate the unordered questions
app.body = {
  hair: ['facial hair', 'chest hair', 'leg hair', 'back hair'],
  piercings: ['pierced ears', 'pierced nipples'],
  presentation: ['a strong brow', 'painted nails', 'bright lips'],
  physicalTraits: ['broad shoulders', 'long fingers', 'a small waist', 'large feet', 'a flat chest']
}
// Gather the elements to be filled with the unordered questions
app.hairQuestions = $('.hair');
app.piercingsQuestions = $('.piercings');
app.presentationQuestions = $('.presentation');
app.physicalTraitsQuestions = $('.physicalTraits');
app.orderedQuestions = $('.orderedQuestion');
// An array that holds the questions from the ordered questions
app.ordered = [`Can I only call mine a lady waist when it's small`,'Does growing out my nails mean the creature I’m becoming has claws','Am I  a coward for not shaving my beard and rocking a statement lip',`Is  my body an “other” now`,`Do you expect me to say I “identify” as nonbinary`,'Do you know how long I’ve resented my body for being male','Does my gender have a history now',`Will you tell our friends that I’m nonbinary?`,`Would you notice if I said my name is Ky like it’s the name you’ve always called me`,'Am I coward for not correcting you every time you call me Kyle','Do you worry you don’t know me now','Do you think I’ll change my mind tomorrow','Do you feel hurt that I didn’t tell you sooner','How about I  tell you about the night I sobbed that you wouldn’t love me anymore',`Would you believe that I didn't love my body until I called it non-binary`]
// Function to shuffle elements in Array using the Fisher Yates method as explained by Mike Bostock: https://bost.ocks.org/mike/shuffle/
app.shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex--);
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
    return array;
  }
  // Function to randomly populate unordered questions onto page.
app.replaceQuestion = function (object, array) {
  for (i = 0; i < object.length; i++) {
    object[i].innerHTML = `Do they have ${array[i]}?`;
  }
}
// Function to populate ordered answers onto page
app.replaceOrderedQuestion = function (object, array) {
  for (i = 0; i < object.length; i++) {
    object[i].innerHTML = `${array[i]}?`;
  }
}
// Function to randomly number the first 15 questions
app.questionPages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
app.shuffledPages = app.shuffle(app.questionPages);
app.cards = [...$('.question-card')];
app.numberQuestions = function(array1, array2) {
  for (i = 0; i < array1.length; i++) {
    array1[i].classList.add(`question${array2[i]}`);
  }
}
// Function to number the unordered pages to match the first 15 questions
app.pageHeadings = [...$('.unordered-header')];
app.numberPages = function (array, array2) {
  for (i = 0; i < array.length; i++) {
    if(array[i] < 10){
      array2[i].innerHTML = `0${array[i]}`;      
    } else {    
      array2[i].innerHTML = `${array[i]}`;
    }
  }
}
// Function to move between pages
app.number = 0;
app.movePages = function() {app.answer.on('click', function(){
  // Function to populate the final page once user completes the final question
  if (app.number === 29){
    app.positiveAnswers = app.answersArray.reduce(function (allAnswers, answer) {
      if (answer in allAnswers) {
        allAnswers[answer]++;
      }
      else {
        allAnswers[answer] = 1;
      }
      return allAnswers;
    }, []);
    $('.final-answers').append(`<h2 class='form__final question'>At some point in my life I have answered negatively to each of these questions in relation to my body</h2>`);
    $('.final-answers').append(`<h2 class='form__final question'>You are <span class="hl"> ${Math.ceil((app.positiveAnswers.yes + app.positiveAnswers.other)/30 * 100)}% </span> kinder than I was to myself in the months before I came out as nonbinary </h2>`);    
  }
  // Function to move between pages 
    $(`.question${app.number}`).css('right', '-100%').hide('');  
    app.number = app.number + 1;
    $(`.question${app.number}`).css('right', '0');
  });
}
// Function to replace other, when a user clicks on "other" the first time
$('#other').on('click', function(){
  $('.other').css('left',0);
  $('.other').on('submit', function(e){
    e.preventDefault();
    $('.other__header').text(`What do you mean when you say "${$('label[for=other]').text()}"?`);
    $('label[for=other]').text($('input[type=text]').val());
    $('.other').css('display', 'none');
  });
});

// One function to rule them all
app.init = function() {
  app.replaceQuestion(app.hairQuestions, app.body.hair);
  app.replaceQuestion(app.piercingsQuestions, app.body.piercings);
  app.replaceQuestion(app.presentationQuestions, app.body.presentation);
  app.replaceQuestion(app.physicalTraitsQuestions, app.body.physicalTraits);  
  app.replaceOrderedQuestion(app.orderedQuestions, app.ordered);
  app.numberQuestions(app.cards, app.shuffledPages);
  app.numberPages(app.shuffledPages, app.pageHeadings);
  app.getAnswer();
  app.movePages();
}
// Document ready 
$(app.init);