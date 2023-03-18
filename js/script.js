const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".text h2");

let currentShotterIndex = 517;
let width = 22;
let direction = 1;
let invadersID;
let goingRight = true;

let aliensRemove = [];

for (let i = 0; i < 528; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 22, 23, 24, 25, 26, 27, 28, 29,
  30, 31, 32, 33, 34, 35, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  57,
];

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemove.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
}

draw();

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
}

squares[currentShotterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[currentShotterIndex].classList.remove("shooter");

  switch (e.key) {
    case "ArrowLeft":
      if (currentShotterIndex % width !== 0) currentShotterIndex -= 1;
      break;

    case "ArrowRight":
      if (currentShotterIndex % width < width - 1) currentShotterIndex += 1;
      break;
  }
  squares[currentShotterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  remove();

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + -1;
      direction = -1;
      goingRight = false;
    }
  }

  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - -1;
      direction = 1;
      goingRight = true;
    }
  }

  draw();

  if (squares[currentShotterIndex].classList.contains("invader", "shooter")) {
    resultDisplay.innerHTML = "Nooooo!";
    clearInterval(invadersID);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      resultDisplay.innerHTML = "Nooooo!";
      clearInterval(invadersID);
    }
  }

  if (aliensRemove.length === alienInvaders.length) {
    resultDisplay.innerHTML = "Yeaaaaa!";
    clearInterval(invadersID);
  }
}

invadersID = setInterval(moveInvaders, 100);

function shoot(e) {
  let laserID;
  let currentLaserIndex = currentShotterIndex;

  function moveLaser() {
    squares[currentLaserIndex].classList.remove("laser");
    currentLaserIndex -= width;
    squares[currentLaserIndex].classList.add("laser");

    if (squares[currentLaserIndex].classList.contains("invader")) {
      squares[currentLaserIndex].classList.remove("laser");
      squares[currentLaserIndex].classList.remove("invader");
      squares[currentLaserIndex].classList.add("boom");

      setTimeout(
        () => squares[currentLaserIndex].classList.remove("boom"),
        300
      );
      clearInterval(laserID);

      const alienRemove = alienInvaders.indexOf(currentLaserIndex);
      aliensRemove.push(alienRemove);
    }
  }
  switch (e.key) {
    case "ArrowUp":
      laserID = setInterval(moveLaser, 50);
      break;
  }
}

document.addEventListener("keydown", shoot);
