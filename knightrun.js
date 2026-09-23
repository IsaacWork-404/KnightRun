let actvPlyr = 0;
let playerHealth = 100;
let monsterHealth = 100;
let playing = true;
let dmg;

let attack = document.querySelector('.attack')
let restart = document.querySelector('.restart');
let good = document.querySelector('.player');
let bad = document.querySelector('.monster');
let sword = document.querySelector('.sword');
let fire = document.querySelector('.fire');
let playerHp = document.querySelector('.player-health');
let monsterHp = document.querySelector('.monster-health');
let winner = document.querySelector('.winner');
let turn = document.querySelector('.turn');

// Move TURN indicator
const moveTurn = function () {
  if (actvPlyr === 0) {
    turn.style.left = `${good.offsetLeft}px`;
    turn.textContent = 'Players Turn'
  } else {
    turn.style.left = `${bad.offsetLeft}px`;
    turn.textContent = 'Monsters Turn'
  }
};

// Switch players
const swap = function () {
  good.classList.toggle('active');
  bad.classList.toggle('active');

  actvPlyr = actvPlyr === 0 ? 1 : 0;

  moveTurn();
};

// Show winner
const showWinner = function (message) {
  winner.textContent = message;
  winner.style.display = 'block';
};

// Attack
attack.addEventListener('click', function () {
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
    turn.classList.add('hidden');
    attack.classList.add('hidden')
    showWinner('✨ Player Wins!✨');
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
        turn.classList.add('hidden');
        attack.classList.add('hidden')
        showWinner('💀 Monster Wins!🦴');
        return;
      }

      // Player survives, so switch back
      swap();

      // Return fire and bring sword back
      fire.style.transform = 'translateX(0)';
      fire.style.display = 'none';
      sword.style.transform = 'translateX(0)';
      sword.style.display = 'block';
    }, 400);
  }, 1100);
});

// Put TURN under Player when the game starts
moveTurn();

const restartGame = function () {
  actvPlyr = 0;
  playerHealth = 100;
  monsterHealth = 100;
  dmg = 0;
  playing = true;

  playerHp.style.width = '100%';
  monsterHp.style.width = '100%';
  winner.style.display = 'none';
  sword.style.display = 'block';
  sword.style.transform = 'translateX(0)';
  fire.style.display = 'none';
  fire.style.transform = 'translateX(0)';
  
  turn.classList.remove('hidden');
  attack.classList.remove('hidden');
  good.classList.add('active');
  bad.classList.remove('active');

  moveTurn();
};

restart.addEventListener('click', function () {
  restartGame();
});

// TODO fix the bug that occurs when restart is clicked mid attack
// TODO add floating damage on attack