$(function() { // Runs once the DOM is ready
  checkAndUpdatePetInfoInHtml();

  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton); // new button

  wireDevtoolsDemo();
});

/* ---------------- Chrome DevTools demo wiring ---------------- */
function wireDevtoolsDemo() {
  document.getElementById('log-info').addEventListener('click', function () {
    console.info('Info: pet snapshot', pet_info);
  });

  document.getElementById('log-warning').addEventListener('click', function () {
    console.warn('Warning: demo warning — energy is currently ' + pet_info.energy);
  });

  document.getElementById('log-error').addEventListener('click', function () {
    console.error('Error: simulated failure while saving pet state');
  });

  document.getElementById('log-table').addEventListener('click', function () {
    var history = [
      { action: 'treat',    weight: pet_info.weight,    happiness: pet_info.happiness },
      { action: 'play',     weight: pet_info.weight-1,  happiness: pet_info.happiness+4 },
      { action: 'exercise', weight: pet_info.weight-3,  happiness: pet_info.happiness-2 },
      { action: 'nap',      weight: pet_info.weight,    happiness: pet_info.happiness+1 }
    ];
    console.table(history);
  });

  document.getElementById('log-group').addEventListener('click', function () {
    console.group('Pet stats');
      console.log('name: ' + pet_info.name);
      console.log('weight: ' + pet_info.weight);
      console.group('Mood');
        console.log('happiness: ' + pet_info.happiness);
        console.log('energy: ' + pet_info.energy);
      console.groupEnd();
    console.groupEnd();
  });

  document.getElementById('log-custom').addEventListener('click', function () {
    console.log(
      '%cGiga Pet %cstatus update',
      'color:#800000;font-weight:bold;font-size:16px;',
      'color:#404853;font-style:italic;'
    );
  });

  document.getElementById('cause-404').addEventListener('click', function () {
    fetch('does-not-exist.json');
  });

  document.getElementById('cause-typeerror').addEventListener('click', function () {
    var nothing = null;
    nothing.doSomething();
  });

  document.getElementById('cause-violation').addEventListener('click', function () {
    var start = performance.now();
    while (performance.now() - start < 200) { /* busy wait */ }
    console.log('Finished a deliberately long task to provoke a violation message.');
  });

  document.getElementById('filter-demo').addEventListener('click', function () {
    console.log('filter-demo: plain log message');
    console.info('filter-demo: info-level message about pet ' + pet_info.name);
    console.warn('filter-demo: a warning containing the word ALERT');
    console.error('filter-demo: an error containing the word FAILURE');
    console.debug('filter-demo: verbose/debug detail #42');
  });

  document.getElementById('buggy-sum').addEventListener('click', runBuggySum);
}

/*
 * Bug: sums 1..n but loop uses < instead of <=, so it stops one short.
 * Set a breakpoint on `total = total + i;`, inspect `i` and `total` in the
 * Scope pane, add a watch on `total + i`, then change `<` to `<=`.
 */
function runBuggySum() {
  var n = 5;
  var total = 0;
  for (var i = 1; i < n; i++) {   // BUG: should be i <= n
    total = total + i;
  }
  document.getElementById('sum-result').textContent =
    'sum(1..' + n + ') = ' + total + ' (expected 15)';
  console.log('runBuggySum -> ' + total);
}

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