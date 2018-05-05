app = {};

// Get user input 

app.answersArray = [];
app.answer = $('input[type=radio');
app.getAnswer = function() {
  app.answer.on('click', function () {
    const answer = $('input[type=radio]:checked').val();
    app.answersArray.push(answer);
  });
  }

app.body = {
  hair: ['facial hair', 'chest hair', 'leg hair', 'back hair'],
  piercings: ['pierced ears', 'pierced nipples'],
  presentation: ['a strong brow', 'painted nails', 'bright lips'],
  physicalTraits: ['broad shoulders', 'long fingers', 'a small waist', 'large feet', 'a flat chest']
}
app.ordered = ['Can I only start calling mine a lady waist when it was small','Does growing out my nails mean the creature I’m becoming has claws','Am I  a coward for not shaving my beard and rocking a statement lip',`Is  my body an “other” now`,`Do you expect me to say I “identify” as nonbinary`,'Do you know how long I’ve resented my body for being male','Does my gender have a history now',`Will you tell our friends that I’m nonbinary?`,`Would you notice if I said my name is Ky like it’s the name you’ve always called me`,'Am I coward for not correcting you every time you call me Kyle','Do you worry you don’t know me now','Do you think I’ll change my mind tomorrow','Do you feel hurt that I didn’t tell you sooner','How about I  tell you about the night I sobbed that you wouldn’t love me anymore','Would you believe me if I told you that the day I called it as nonbinary was the first day I actually loved my body']

app.hairQuestions = $('.hair');
app.piercingsQuestions = $('.piercings');
app.presentationQuestions = $('.presentation');
app.physicalTraitsQuestions = $('.physicalTraits');
app.orderedQuestions = $('.orderedQuestion');

// Function to shuffle elements in Array
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

  // Function to randomly populate questions onto page.
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
// Number the pages
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
app.number = 25;

app.movePages = function() {app.answer.on('click', function(){
  if (app.number === 29){
    $('.card.question30').html()
    app.positiveAnswers = app.answersArray.reduce(function (allAnswers, answer) {
      if (answer in allAnswers) {
        allAnswers[answer]++;
      }
      else {
        allAnswers[answer] = 1;
      }
      return allAnswers;
    }, []);
    $('.final-answers').append(`<li class='list__final question'>At some point in my life I have answered negatively to each of these questions in relation to my body</li>`);    
    $('.final-answers').append(`<li class='list__final question'>You are <span class="hl"> ${Math.floor((app.positiveAnswers.yes)/30 * 100)}% </span> kinder than I was to myself in the months before I came out as nonbinary </li>`);    
  }
    $(`.question${app.number}`).css('right', '-100%').hide('');  
    app.number = app.number + 1;
    $(`.question${app.number}`).css('right', '0');
  });
}
// Function to replace other 
// When a user clicks on "other"
$('#other').on('click', function(e){
  e.preventDefault();
  $('.other').css('left',0);
  $('.other').on('submit', function(e){
    e.preventDefault();
    $('label[for=other]').text($('input[type=text]').val());
    console.log($('label[for=other]').text());
    $('.other').css('left','100%');
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
$(app.init);


// If user picks "No" provide random question. 
// If user picks "Yes" compare to "Me" object
// If matches, ignore
// If it doesnt match, append to list for results page and add one to total number of differences

// Repeat for first 19 questions

// For queston 20 add "Other"
// If user picks "Other" produce screen that asks what they mean. On submission of that form change option 3 to whatever they selected. 
// Give the user the number of times they said Other and what they said when they said it.
