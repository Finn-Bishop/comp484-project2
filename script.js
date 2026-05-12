$(function() { // Runs once the DOM is ready
  checkAndUpdatePetInfoInHtml();

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton); // new button
});

var pet_info = { name: "Hound", weight: 30, happiness: 50, energy: 70 };

function clickedTreatButton() {
  pet_info.happiness += 5;
  pet_info.weight    += 2;
  showPetComment("Yum! Just give me the whole bag.");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  pet_info.happiness += 4;
  pet_info.weight    -= 1;
  pet_info.energy    -= 5;
  showPetComment("Woof! :D");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  pet_info.happiness -= 2;
  pet_info.weight    -= 3;
  pet_info.energy    -= 8;
  showPetComment("I'm tired bruh");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

function clickedNapButton() {
  pet_info.energy    += 10;
  pet_info.happiness += 1;
  showPetComment("Zzzzzz.....");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// Floor every stat at zero so nothing goes negative
function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight    < 0) pet_info.weight    = 0;
  if (pet_info.happiness < 0) pet_info.happiness = 0;
  if (pet_info.energy    < 0) pet_info.energy    = 0;
}

// Push current values into the page
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}

/*
 * jQuery method #1: .fadeIn() / .fadeOut()
 */
function showPetComment(message) {
  $('.pet-comment')
    .stop(true, true)   // cancel queued/active animations
    .text(message)      // set the new comment text
    .fadeIn(200)        // smoothly reveal the bubble
    .delay(1800)        // hold visible for 1.8 seconds
    .fadeOut(400);      // smoothly hide it
}

/*
 * jQuery method #2: .animate()
 */
function bouncePet() {
  $('.pet-image')
    .animate({ marginTop: '-15px' }, 150)  // hop up
    .animate({ marginTop: '0px'   }, 150); // settle back
}