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
      element.classList.add('bg-black');
    }
  });

  const remainderBlock = (minutesPassed % 10) * 10;
  const lastUncoloredGridItem = document.querySelector('.grid-item:not(.bg-black)');
  lastUncoloredGridItem.style = `background: linear-gradient(to right, #212426 ${remainderBlock}%, transparent 0%)`;
}

// Abandon hope all ye who enter here
// TODO: refactor - this is needlessly complicated
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-hover').forEach(element => {
    const rectangles = Number(element.dataset.rectangles);

    element.addEventListener('mouseenter', () => {
      document.querySelectorAll('.grid-container .grid-item').forEach((element, index) => {
        if (index + 1 < Math.ceil(rectangles)) {
          // don't use toggle because in some cases grid items might become uncolored (white)
          element.classList.remove('bg-black');
          element.classList.add('bg-light-blue');
        } else if (index + 1 == rectangles) {
          element.classList.remove('bg-black');
          element.classList.add('bg-light-blue');
        } else if (index + 1 == Math.ceil(rectangles)) {
          element.style = `background: linear-gradient(to right, #b4d8fd ${rectangles * 100}%, transparent 0%)`
        }
      });
    });

    element.addEventListener('mouseleave', () => {
      const minutesPassed = minutesSinceMidnight();

      const fullBlocks = Math.floor(minutesPassed / 10);

      document.querySelectorAll('.grid-container .grid-item').forEach((element, index) => {
        if (index + 1 <= fullBlocks) {
          element.style = "background: transparent"
          element.classList.add('bg-black');
          element.classList.remove('bg-light-blue');
        }
        else if (index + 1 > fullBlocks) {
          element.classList.remove('bg-light-blue');
          element.classList.remove('bg-black');

        }
      });
    });
  });

  createGrid(12, 12, document.querySelector('.grid-container'));

  fillGrid();
  setInterval(fillGrid, 5000);
});
