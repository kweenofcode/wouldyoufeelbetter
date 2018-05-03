app = {};

// Get user input 

app.getAnswer = function() {
  $('input[type=radio]').on('click', function () {
    const answer = $('input[type=radio]:checked').val();
  });
}; 

app.body = {
  hair: ['facial hair', 'chest hair', 'leg hair', 'back hair'],
  piercings: ['pierced ears', 'pierced nipples'],
  presentation: ['a strong brow', 'painted nails', 'bright lips'],
  physicalTraits: ['broad shoulders', 'long fingers', 'a small waist', 'large feet', 'a flat chest']
}
app.ordered = ['Why did I only start calling mine a lady waist when it was small?','Am I  a coward for not shaving my beard and rocking a statement lip?',`Is  my body as an “other” now`,`Do you expect me to say I “identify” as nonbinary`,'Do you know how long I’ve resented my body for being male','Does my gender have a history now',`Will you tell our friends that I’m nonbinary?`,`Would you notice if I said my name is Ky like it’s the name you’ve always called me`,'Am I coward for not correcting you every time you call me Kyle','Do you worry you don’t know me now','Do you think I’ll change my mind tomorrow','Do you feel hurt that I didn’t tell you sooner','How about I  tell you about the night I sobbed that you wouldn’t love me anymore','Would you believe me if I told you that the day I called it as nonbinary was the first day I actually loved my body']

app.hairQuestions = $('.hair');
app.piercingsQuestions = $('.piercings');
app.presentationQuestions = $('.presentation');
app.physicalTraitsQuestions = $('.physicalTraits');
app.orderedQuestions = $('.orderedQuestion');

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

app.replaceQuestion = function (object, array) {
  app.shuffle(array);
  for (i = 0; i < object.length; i++) {
    object[i].innerHTML = `Do they have ${array[i]}?`;
  }
}


app.replaceOrderedQuestion = function (object, array) {
  for (i = 0; i < object.length; i++) {
    object[i].innerHTML = `${array[i]}?`;
  }
}

app.questionPages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
app.shuffledPages = app.shuffle(app.questionPages);


app.init = function() {
  app.replaceQuestion(app.hairQuestions, app.body.hair);
  app.replaceQuestion(app.piercingsQuestions, app.body.piercings);
  app.replaceQuestion(app.presentationQuestions, app.body.presentation);
  app.replaceQuestion(app.physicalTraitsQuestions, app.body.physicalTraits);  
  app.replaceOrderedQuestion(app.orderedQuestions, app.ordered);
  app.getAnswer();
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
