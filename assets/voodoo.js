'use strict';

const createGrid = (rows, cols, container) => {
  for (let i = 0; i < (rows * cols); i++) {
    let gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    let gridFill = document.createElement('span');
    gridItem.appendChild(gridFill);
    container.appendChild(gridItem);
  };
};

const secondsSinceMidnight = () => {
  const now = new Date();
  const midnight = new Date().setHours(0, 0, 0, 0);

  return (now - midnight) / 1000;
}

const fillGrid = () => {
  const secondsPassed = secondsSinceMidnight();
  document.styleSheets[0].insertRule(`:root { --start: -${secondsPassed}s; }`, 1);

  document.querySelectorAll('.grid-container .grid-item span').forEach((element, index, { length }) => {
    const increment = 100 / length;
    const start = index * increment;
    const end = start + increment;
    document.styleSheets[0].insertRule(`@keyframes load${index} {
      0%, ${start}% { transform: translate(-100%); }
      ${end}%, 100% { transform: translate(0%); }
    }`);
    element.style.animationName = `load${index}`;
  });
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
          element.classList.add('bg-time-selected');
        }
      });
    });

    element.addEventListener('mouseleave', () => {
      document.querySelectorAll('.bg-time-selected').forEach((element) => {
        element.classList.remove('bg-time-selected');
      });
    });
  });

  createGrid(12, 12, document.querySelector('.grid-container'));

  enableFullScreen();
  fillGrid();
});
