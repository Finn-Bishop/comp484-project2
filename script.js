$(function() { // Runs once the DOM is ready

  // Render initial stats
  checkAndUpdatePetInfoInHtml();

  // Wire each button to its handler
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton); // new button
});

// Pet info object — required keys plus a new "energy" stat
var pet_info = { name: "Hound", weight: 30, happiness: 50, energy: 70 };

function clickedTreatButton() {
  // Treat: happier + heavier
  pet_info.happiness += 5;
  pet_info.weight    += 2;
  showPetComment("Yum! Thanks for the treat!");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

function clickedPlayButton() {
  // Play: happier, lighter, uses some energy
  pet_info.happiness += 4;
  pet_info.weight    -= 1;
  pet_info.energy    -= 5;
  showPetComment("Woof! That was fun!");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

function clickedExerciseButton() {
  // Exercise: less happy, lighter, more tired
  pet_info.happiness -= 2;
  pet_info.weight    -= 3;
  pet_info.energy    -= 8;
  showPetComment("Ugh... that was a workout.");
  bouncePet();
  checkAndUpdatePetInfoInHtml();
}

// New button behavior: Nap restores energy and lifts mood a little
function clickedNapButton() {
  pet_info.energy    += 10;
  pet_info.happiness += 1;
  showPetComment("Zzz... that was refreshing.");
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

/* ============================================================
   Two unique jQuery methods (not used in the starter or class)
   ============================================================ */

/*
 * jQuery method #1: .fadeIn() / .fadeOut()
 *
 * .fadeIn(duration) animates the matched element from hidden
 * (display:none, opacity 0) up to fully visible (opacity 1) over
 * `duration` ms. .fadeOut(duration) is the reverse and ends with
 * display:none. Putting .delay() between them lets the bubble stay
 * visible for a moment before fading away.
 *
 * .stop(true, true) clears any animation already in the queue, so
 * mashing buttons doesn't pile up overlapping fades.
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
 *
 * .animate(properties, duration) tweens any numeric CSS property
 * over the given duration. Two chained calls run in sequence: we
 * shift the pet image up 15px and then back to 0px, producing a
 * little bounce on every button press.
 */
function bouncePet() {
  $('.pet-image')
    .animate({ marginTop: '-15px' }, 150)  // hop up
    .animate({ marginTop: '0px'   }, 150); // settle back
}