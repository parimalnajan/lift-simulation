
// import { generateSystem } from "./generateSystem.js";
// import { handleGoingDown, handleGoingUp } from "./index";
let floorCount = document.querySelector("#floorsInput");
let liftCount = document.querySelector("#liftsInput");
const building = document.querySelector("#building");

 function generateSystem(x, y) {
  building.innerHTML = "";

  for (let i = 0; i < x; i++) {
    let floorDiv = document.createElement("div");
    floorDiv.classList.add("floor");
    floorDiv.id = `floor${x - 1 - i}`;

    let floorControls = document.createElement("div");
    floorControls.classList.add("floor-controls");

    let floorNumber = document.createElement("div");
    floorNumber.classList.add("floor-number");
    floorNumber.innerText = `${x - 1 - i}`;
    floorControls.appendChild(floorNumber);

    let floorButtonsWrapper = document.createElement("div");
    floorButtonsWrapper.classList.add("floor-buttons-wrapper");
    let upButton = document.createElement("button");
    upButton.classList.add("floor-button");
    upButton.id = `up-button${x - 1 - i}`;
    upButton.innerText = "^";
    let downButton = document.createElement("button");
    downButton.id = `down-button${x - 1 - i}`;
    downButton.classList.add("floor-button");
    downButton.innerText = "v";

    downButton.addEventListener("click", (e) => handleGoingDown(e));
    upButton.addEventListener("click", (e) => handleGoingUp(e));

    floorButtonsWrapper.appendChild(upButton);
    floorButtonsWrapper.appendChild(downButton);
    floorControls.appendChild(floorButtonsWrapper);
    floorDiv.appendChild(floorControls);

    building.appendChild(floorDiv);

    // console.log(floorDiv.id, floorDiv.getBoundingClientRect());
  }

  let liftWrapper = document.createElement("div");
  liftWrapper.classList.add("lift-wrapper");
  for (let j = 0; j < y; j++) {
    let liftDiv = document.createElement("div");
    liftDiv.classList.add("lift");
    liftDiv.id = `lift${j}`;
    liftDiv.setAttribute("data-current-floor", 0);
    liftDiv.setAttribute("data-is-moving", false);
    liftWrapper.appendChild(liftDiv);

    let doorLeft = document.createElement("span");
    let doorRight = document.createElement("span");
    doorLeft.classList.add("door-left", "door");
    doorRight.classList.add("door-right", "door");
    liftDiv.appendChild(doorLeft);
    liftDiv.appendChild(doorRight);
  }

  let firstFloor = document.querySelector("#floor0");
  firstFloor.appendChild(liftWrapper);
}
 const handleGoingUp = (e) => {
  const requestingFloorDiv = e.target.parentNode.parentNode.parentNode;
  var [x, requestedFloorNo] = requestingFloorDiv.id.split("floor");

  console.log(liftCount.value);
  for (var k = 0; k < liftCount.value; k++) {
    const liftIterator = document.querySelector(`#lift${k}`);

    if (liftIterator.dataset.isMoving === "false") {
      let numberOfFloorsTravelled = Math.abs(
        requestedFloorNo - liftIterator.dataset.currentFloor
      );

      let liftTravelDuration = numberOfFloorsTravelled * 3000;

      liftIterator.setAttribute(
        "style",
        `
        transform: translateY(${
          -100 * requestedFloorNo
        }px);transition-duration:${liftTravelDuration}ms;
        `
      );
      liftIterator.dataset.isMoving = true;

      let currentDoorLeft = document.querySelector(`#lift${k} .door-left`);
      let currentDoorRight = document.querySelector(`#lift${k} .door-right`);

      setTimeout(() => {
        currentDoorLeft.setAttribute(
          "style",
          `transform: translateX(-25px);transition-duration:2500ms`
        );
        currentDoorRight.setAttribute(
          "style",
          `transform: translateX(25px);transition-duration:2500ms`
        );

        //----- door animations
        setTimeout(() => {
          currentDoorLeft.setAttribute(
            "style",
            `transform: translateX(0px);transition-duration:2500ms`
          );
          currentDoorRight.setAttribute(
            "style",
            `transform: translateX(0px);transition-duration:2500ms`
          );

          setTimeout(() => {
            liftIterator.dataset.isMoving = false; // after open + close animations
          }, 2500);
        }, 2500);
      }, liftTravelDuration);

      liftIterator.setAttribute("data-current-floor", requestedFloorNo);
      break;
    }
  }
};
 const handleGoingDown = (e) => {
  handleGoingUp(e);
};

const generateButton = document.querySelector("#generate");
generateSystem(4, 5);

generateButton.addEventListener("click", () =>
  generateSystem(floorCount.value, liftCount.value)
);



// floorCount.addEventListener("input", () => generateSystem());
// liftCount.addEventListener("input", () => generateSystem());
