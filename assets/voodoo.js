'use strict';

const createGrid = (rows, cols, container) => {
  for (let i = 0; i < (rows * cols); i++) {
    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    container.appendChild(gridItem);
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
  const params = new URLSearchParams(window.location.search);

  if (params.get("full_screen") === "true") {
    document.querySelector(".text-container").hidden = true;
  } else {
    document.querySelector(".text-container").hidden = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-hover').forEach(element => {
    const rectangles = Number(element.dataset.rectangles);

    element.addEventListener('mouseenter', () => {
      document.querySelectorAll('.grid-container .grid-item').forEach((element, index) => {
        if (index + 1 <= rectangles) {
          element.classList.remove('bg-time-passed');
          element.classList.add('bg-time-selected');
        }
      });
    });

    element.addEventListener('mouseleave', () => {
      const minutesPassed = minutesSinceMidnight();
      const fullBlocks = Math.floor(minutesPassed / 10);

      document.querySelectorAll('.grid-container .grid-item').forEach((element, index) => {
        if (index + 1 <= fullBlocks) {
          element.style = "background: transparent"
          element.classList.add('bg-time-passed');
          element.classList.remove('bg-time-selected');
        }
        else if (index + 1 > fullBlocks) {
          element.classList.remove('bg-time-selected');
          element.classList.remove('bg-time-passed');
        }
      });
    });
  });

  createGrid(12, 12, document.querySelector('.grid-container'));

  enableFullScreen();
  fillGrid();
  setInterval(fillGrid, 4000);
});
