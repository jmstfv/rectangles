'use strict';

const createGrid = () => {
  for (let i = 0; i < (12 * 12); i++) {
    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    document.querySelector('.grid-container').appendChild(gridItem);
  };
};

const minutesSinceMidnight = () => {
  const now = new Date();
  const midnight = new Date().setHours(0, 0, 0, 0);

  return ((now - midnight) / 1000) / 60;
}

const fillGrid = () => {
  const minutesPassed = minutesSinceMidnight();

  const fullBlocks = Math.floor(minutesPassed / 10);

  document.querySelectorAll('.grid-container .grid-item').forEach((element, index) => {
    if (index + 1 <= fullBlocks) {
      element.classList.add('bg-time-passed');
    } else {
      element.classList.remove('bg-time-passed');
      element.style = 'background: transparent'
    }
  });

  const remainderBlock = (minutesPassed % 10) * 10;
  const lastUncoloredGridItem = document.querySelector('.grid-item:not(.bg-time-passed)');

  lastUncoloredGridItem.classList.add('last-grid')

  lastUncoloredGridItem.style = `background: linear-gradient(to right, var(--green) ${remainderBlock}%, transparent 0%)`;
}

const enableFullScreen = () => {
  const isFullScreen = new URLSearchParams(window.location.search).get("full_screen") === "true";
  document.querySelector(".text-container").hidden = isFullScreen;
}

const setFullScreen = () => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set("full_screen", "true");
  window.location.search = urlParams;
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && (event.key == "E" || event.key == "e")) setFullScreen();
  });

  createGrid();

  enableFullScreen();
  fillGrid();
  setInterval(fillGrid, 4000);
});
