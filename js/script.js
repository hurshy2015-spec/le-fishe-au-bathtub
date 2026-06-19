

const bathtubStage = document.querySelector('#bathtubStage');
const fish = document.querySelector('#fish');
const deadFish = document.querySelector('#deadFish');
const food = document.querySelector('#food');
const bgm = document.querySelector('#bgm');

let feedCount = 0;
let isDead = false;

const overfeedLink = 'https://www.instagram.com/hur._.gal_l/?hl=ko';

const deadFishArt = String.raw`|\    \ \ \ \ \ \ \     __
| \    \ \ \ \ \ \    | X~_
|   >----|-|-|-|-|--|   __/
| /    / / / / /    |__\
|/    / / / / /`;

function renderDeadFish() {
  const chars = deadFishArt.split('');
  const html = chars
    .map((char, index) => {
      if (char === '\n') return '\n';
      const safeChar = char === ' ' ? '&nbsp;' : char;
      return `<span style="--char-index: ${index}">${safeChar}</span>`;
    })
    .join('');

  deadFish.innerHTML = `<pre>${html}</pre>`;
}

if (bathtubStage && fish && deadFish && food) {
  renderDeadFish();

  bathtubStage.addEventListener('click', (event) => {
    if (isDead) return;

    if (bgm) {
      bgm.volume = 0.45;
      bgm.currentTime = 0;
      bgm.play();
    }

    const rect = bathtubStage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const centerX = rect.width / 2;
    const isLeftSide = x < centerX;

    const arcOffset = rect.width * 0.12;
    const smallOffset = rect.width * 0.05;

    const foodX = x;
    const startX = isLeftSide ? x + arcOffset : x - arcOffset;
    const peakX = isLeftSide ? x + smallOffset : x - smallOffset;
    const endX = isLeftSide ? x - arcOffset : x + arcOffset;

    bathtubStage.style.setProperty('--food-x', `${foodX}px`);
    bathtubStage.style.setProperty('--fish-start-x', `${startX}px`);
    bathtubStage.style.setProperty('--fish-peak-x', `${peakX}px`);
    bathtubStage.style.setProperty('--fish-end-x', `${endX}px`);
    bathtubStage.style.setProperty('--dead-fish-x', `${foodX}px`);

    if (isLeftSide) {
      bathtubStage.style.setProperty('--fish-scale-x', '1');
      bathtubStage.style.setProperty('--dead-fish-scale-x', '1');
      bathtubStage.style.setProperty('--fish-start-rotate', '16deg');
      bathtubStage.style.setProperty('--fish-peak-rotate', '18deg');
      bathtubStage.style.setProperty('--fish-eat-rotate', '-18deg');
      bathtubStage.style.setProperty('--fish-end-rotate', '-22deg');
    } else {
      bathtubStage.style.setProperty('--fish-scale-x', '-1');
      bathtubStage.style.setProperty('--dead-fish-scale-x', '-1');
      bathtubStage.style.setProperty('--fish-start-rotate', '-16deg');
      bathtubStage.style.setProperty('--fish-peak-rotate', '-18deg');
      bathtubStage.style.setProperty('--fish-eat-rotate', '18deg');
      bathtubStage.style.setProperty('--fish-end-rotate', '22deg');
    }

    feedCount += 1;

    fish.classList.remove('is-jumping');
    food.classList.remove('is-dropping');
    deadFish.classList.remove('is-floating');

    void fish.offsetWidth;
    void food.offsetWidth;
    void deadFish.offsetWidth;

    food.classList.add('is-dropping');

    if (feedCount >= 7) {
      isDead = true;
      fish.classList.remove('is-jumping');
      deadFish.classList.add('is-floating');

      setTimeout(() => {
        window.location.href = overfeedLink;
      }, 2800);

      return;
    }

    fish.classList.add('is-jumping');
  });
}