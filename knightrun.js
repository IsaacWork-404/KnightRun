let actvPlyr = 0;

let playerHealth = 100;
let monsterHealth = 100;

let dmg;

let playing = true;

let good = document.querySelector('.player');
let bad = document.querySelector('.monster');
let sword = document.querySelector('.sword');
let fire = document.querySelector('.fire');
let playerHp = document.querySelector('.player-health');
let monsterHp = document.querySelector('.monster-health');
let winner = document.querySelector('.win');

// Switch players
const swap = function () {
  good.classList.toggle('active');
  bad.classList.toggle('active');

  actvPlyr = actvPlyr === 0 ? 1 : 0;
};

// Show winner
const showWinner = function (message) {
  winner.textContent = message;
  winner.style.display = 'block';
};

// Attack
document.querySelector('.attk').addEventListener('click', function () {
  if (!playing) return;

  // Player attacks monster
  dmg = Math.trunc(Math.random() * 30 + 1);
  
  sword.style.transform = 'translateX(50px)';

  monsterHealth -= dmg;

  if (monsterHealth < 0) {
    monsterHealth = 0;
  }

  monsterHp.style.width = `${monsterHealth}%`;

  // Did the monster die?
  if (monsterHealth === 0) {
    playing = false;
    showWinner('✨ Player Wins!');
    return;
  }

  // Monster survives, so switch to monster
  swap();

  setTimeout(function () {
    sword.style.transform = 'translateX(0)';
  }, 300);

  // Monster attacks after 1 second
  setTimeout(function () {
    if (!playing) return;

    dmg = Math.trunc(Math.random() * 30 + 1);

    sword.style.display = 'none';
    fire.style.display = 'block';

    setTimeout(function () {
      fire.style.transform = 'translateX(-50px)';
    }, 10);

    setTimeout(function () {
      playerHealth -= dmg;

      if (playerHealth < 0) {
        playerHealth = 0;
      }

      playerHp.style.width = `${playerHealth}%`;

      // Did the player die?
      if (playerHealth === 0) {
        playing = false;
        showWinner('💀 Monster Wins!');
        return;
      }

      // Player survives, so switch back
      swap();

      // Return fire and bring sword back
      fire.style.transform = 'translateX(0)';
      fire.style.display = 'none';

      sword.style.display = 'block';
      sword.style.transform = 'translateX(0)';
    }, 300);
  }, 1000);
});
