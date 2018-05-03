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
  app.shuffle(array);
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
app.questionPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
app.shuffledPages = app.shuffle(app.questionPages);
app.cards = [...$('.question-card')];
app.numberQuestions = function(array1, array2) {
  for (i = 0; i < array1.length; i++) {
    array1[i].classList.add(`question${array2[i]}`);
  }
}
// Function to number all pages
app.pageNumbers = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
app.pageHeadings = [...$('.main-header')];
app.numberPages = function(array, object) {
  for (i = 0; i < array.length; i++) {
    object[i].innerHTML= `${array[i]}`;
  }
}
// Function to call up next question 

app.number = 0;

app.movePages = function() {app.answer.on('click', function(){
    $(`.card.question-card.question${app.number}`).css('right', '-100%');  
    app.number = app.number + 1;
    $(`.card.question-card.question${app.number}`).css({'right': 0, 'top':0});
    console.log(`$('.card.question${app.number}')`);
  });
}

// One function to rule them all
app.init = function() {
  app.replaceQuestion(app.hairQuestions, app.body.hair);
  app.replaceQuestion(app.piercingsQuestions, app.body.piercings);
  app.replaceQuestion(app.presentationQuestions, app.body.presentation);
  app.replaceQuestion(app.physicalTraitsQuestions, app.body.physicalTraits);  
  app.replaceOrderedQuestion(app.orderedQuestions, app.ordered);
  app.numberPages(app.pageNumbers, app.pageHeadings);
  app.numberQuestions(app.cards, app.shuffledPages);
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
