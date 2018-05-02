$(function() {
  $('input[type=radio]').on('click', function(){
    const answer = $('input[type=radio]:checked').val();
    if (answer === 'other'){
    console.log('user chose other')
    }
  });
});