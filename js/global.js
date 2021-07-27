const setCookie = (cname, cvalue) => {
  document.cookie = `${cname}=${cvalue};SameSite=None; Secure;`;
};

const getCookie = (cname, hname) => {
  const name = `${cname}=`;
  const score = `${hname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

// init game data fields
let playingfield; let showPot; let data;
let isMuted = false;

// init gameplay function buttons
let gameOver;
let betUp; let betamt; let betDown;
let handOne; let handTen; let handamt;
let deal; let swap;

const toggleSounds = (type) => {
  if (isMuted) {
    return false;
  }
  if (type == 'issue') {
    const issue_aud = document.querySelector('#issue5');
    issue_aud.preload = 'auto';
    issue_aud.load();
    issue_aud.loop = false;
    issue_aud.play();
  }

  if (type == 'token') {
    const token_aud = document.querySelector('#token');
    token_aud.preload = 'auto';
    token_aud.load();
    token_aud.loop = false;
    token_aud.play();
  }

  if (type == 'winning') {
    const winning_aud = document.querySelector('#winninghand');
    winning_aud.preload = 'auto';
    winning_aud.load();
    winning_aud.loop = false;
    winning_aud.play();
  }

  if (type == 'losing') {
    const losing_aud = document.querySelector('#losinghand');
    losing_aud.preload = 'auto';
    losing_aud.load();
    losing_aud.loop = false;
    losing_aud.play();
  }

  if (type == 'flick') {
    const flick_aud = document.querySelector('#flick');
    flick_aud.preload = 'auto';
    flick_aud.load();
    flick_aud.loop = false;
    flick_aud.play();
  }

  if (type == 'flip') {
    const flip_aud = document.querySelector('#flip');
    flip_aud.preload = 'auto';
    flip_aud.load();
    flip_aud.loop = false;
    flip_aud.play();
  }

  if (type == 'error') {
    const error_aud = document.querySelector('#error');
    error_aud.preload = 'auto';
    error_aud.load();
    error_aud.loop = false;
    error_aud.play();
  }

  if (type == 'hand') {
    const hand_aud = document.querySelector('#hand');
    hand_aud.preload = 'auto';
    hand_aud.load();
    hand_aud.loop = false;
    hand_aud.play();
  }
};

// async loading to ensure html is parsed before DOM selection occurs
window.addEventListener('load', () => {
  // splash intro
  const logoheader = document.querySelectorAll('.logo-header');
  const intro = document.querySelector('.intro');
  setTimeout(() => {
    logoheader.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add('active');
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      logoheader.forEach((span, index) => {
        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (index + 1) * 2000);
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = '-100vh';
    }, 2000);
  });

  const base = document.getElementById('base');
  const title = document.getElementById('title');
  const btn = document.getElementById('btn');

  // dynamically change the behaviour of the hero header based on scroll behaviour
  window.addEventListener('scroll', () => {
    const value = window.scrollY;
    base.style.top = `${value * 0.5}px`;
    title.style.margintop = `${value * 1.5}px`;
    btn.style.marginTop = `${value * 1.5}px`;
  });

  // input listener for player name
  btn.addEventListener('click', () => {
    playername = document.getElementById('name').value;
    const input = document.getElementById('name');
    if (playername == '') {
      input.style.borderColor = 'red';
      input.style.borderWidth = '5px';
      input.placeholder = 'Need a name!';
    } else {
      input.style.borderColor = 'black';
      input.style.borderWidth = '1px';
      window.location.href = '#how';
      const displayname = document.getElementById('player');
      displayname.innerHTML = playername;
      setCookie('player', playername);
      setCookie('highscore', highest);
      // if cookie exists, set highscore accordingly
      // if not, set highest as 1000
      highscore.innerHTML = `<i class="fas fa-user"></i> ${playername} <p>High-Score: ${highest}</p>`;
    }
  });

  // determine if background audio should play or not
  const toggleBGAudio = document.getElementById('audiobtn');
  toggleBGAudio.addEventListener('click', () => {
    const bgaudio = document.querySelector('#bgaudio');
    bgaudio.preload = 'auto';
    bgaudio.loop = true;
    if (toggleBGAudio.classList.contains('fa-play-circle')) {
      // audio
      bgaudio.play();
      toggleBGAudio.classList.remove('fa-play-circle');
      toggleBGAudio.classList.add('fa-stop-circle');
    } else {
      bgaudio.pause();
      toggleBGAudio.classList.remove('fa-stop-circle');
      toggleBGAudio.classList.add('fa-play-circle');
    }
  });

  // determine if game sounds should be played or not
  const toggleGameSounds = document.getElementById('gameaudio');

  toggleGameSounds.addEventListener('click', () => {
    if (toggleGameSounds.classList.contains('fa-volume-up')) {
      // audio
      isMuted = false;
      toggleSounds('error');
      toggleGameSounds.classList.remove('fa-volume-up');
      toggleGameSounds.classList.add('fa-volume-mute');
    } else {
      isMuted = true;
      toggleGameSounds.classList.remove('fa-volume-mute');
      toggleGameSounds.classList.add('fa-volume-up');
    }
  });

  // initialise the play area
  playingfield = document.getElementById('playingfield');

  // gameOver = document.getElementById('gameOver');
  // gameOver.addEventListener('click', () => {
  //   // end the game and input highscore
  // });

  // limits bet number to $5 and prevents sub-zero input
  const changeBet = (direction) => {
    if (direction == 'up') {
      if (bet < 5) {
        bet += 1;
        toggleSounds('token');
        betamt.innerHTML = `$${bet}`;
      }
    } else if (direction == 'down') {
      if (bet > 0) {
        bet -= 1;
        toggleSounds('token');
        betamt.innerHTML = `$${bet}`;
      }

      if (bet == 0) {
        toggleSounds('error');
      }
    }
  };

  betUp = document.getElementById('betup');
  betUp.addEventListener('click', () => { changeBet('up'); });
  betamt = document.getElementById('betamt');
  betamt.innerHTML = '$0';
  betDown = document.getElementById('betdown');
  betDown.addEventListener('click', () => { changeBet('down'); });

  // limits number of turns to 50 and prevents sub-zero input
  const changeTurns = (scale) => {
    if (scale == 'ones') {
      if (numberOfHands < 50) {
        numberOfHands += 1;
      } else {
        numberOfHands = 1;
      }
    } else if (scale == 'tens') {
      if (numberOfHands == 50) {
        numberOfHands = 1;
      } else if (numberOfHands + 10 < 50) {
        numberOfHands += 10;
      } else if (numberOfHands + 10 > 50) {
        numberOfHands = 50;
      }
    }
    handamt.innerHTML = `${numberOfHands}`;
  };

  handOne = document.getElementById('plusonehand');
  handOne.addEventListener('click', () => { changeTurns('ones'); toggleSounds('hand'); });
  handamt = document.getElementById('handamt');
  handamt.innerHTML = 1;
  handTen = document.getElementById('plustenhand');
  handTen.addEventListener('click', () => { changeTurns('tens'); toggleSounds('hand'); });

  deal = document.getElementById('deal');
  deal.addEventListener('click', initGame);

  swap = document.getElementById('swap');
  swap.addEventListener('click', () => { handIterator(numberOfHands); });

  // initialise the scrolling pot counter
  showPot = document.getElementById('odometer');
  showPot.innerHTML = `${pot}`;

  // handconfig = document.getElementById('handconfig');
  // initialise data fields
  data = document.getElementById('data');
  data.innerHTML = 'Use the arrows to increase bet amount, then submit the bet.';

  // initialise highscore
  highscore = document.getElementById('highscore');
});
