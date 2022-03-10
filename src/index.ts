function expect(expectation: boolean, fn: Function) {
  if (expectation !== fn()) {
    throw Error(`Falsy`);
  }
}

// Engine rule

// From Blue, you can go with Green
// From Blue, you can go with Yellow
// From Green, you can only go to Blue
// From Yellow, you can only go to Blue
// You cannot visit Yellow consecutively

// engine(["blue"]) -> ok
// engine(["blue", "yellow", "blue"]) -> ok
// engine(["blue", "green", "blue", "green"]) -> ok
// engine(["blue", "green", "blue", "yellow"]) -> ok
// engine(["blue", "yellow", "blue", "green", "blue", "yellow"]) -> ok
// engine(["yellow", "green"]) -> not ok
// engine(["blue", "green", "blue", "yellow", "blue", "yellow"]) -> not ok

var gameState: string[] = [];

const pallete = {
  blue: "#406C90",
  green: "#17F3B2",
  yellow: "#FFCB77",
  white: "#FFFFFF",
  red: "#FE6D73",
}

function gameOver(): void {
  var gameOverTag = document.getElementById("game-over");
  gameOverTag!.style.display = "flex";
}

function setUp(): void {
  gameState = [];
  var appTag = document.getElementById("app");
  appTag!.innerHTML = `
    <div id="game-zone" style="
      width: 100%;
      min-width = 453px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
      color: `+ pallete.white +`;
    ">
      <div id="button-field" style="
        width: 453px;
        height: 500px;
        display: flex;
        justify-content: space-between;
      ">
        <div id="left-side" style="
          height: 100%;
          width: 120px;
          display: flex;
          align-items: center;
        ">
          <div id="blue-btn" style="
            width: 120px;
            height: 120px;
            background-color: ` + pallete.blue +`;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          ">Blue</div>
        </div>
        <div id="right-side" style="
          height: 100%;
          width: 120px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        ">
          <div id="green-btn" style="
            width: 120px;
            height: 120px;
            background-color: `+ pallete.green +`;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          ">Green</div>
          <div id="yellow-btn" style="
            width: 120px;
            height: 120px;
            background-color: `+ pallete.yellow +`;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
          ">Yellow</div>
        </div>
      </div>
      <div id="game-over" style="
        display: none;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.7);
        font-size: 40px;
        padding-top: 46vh;
        align-items: center;
        flex-direction: column;
      ">
        Game Over
        <div id="play-again-btn" style="
          width: 160px;
          height: 40px;
          background-color: `+ pallete.green +`;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 20px;
          font-weight: normal
        ">Play Again</div>
      </div>
    </div> 
  `;

  var btns = [
    document.getElementById("blue-btn"),
    document.getElementById("green-btn"),
    document.getElementById("yellow-btn"),
    document.getElementById("play-again-btn"),
  ];

  btns.forEach((btn, i) => {
    btn!.onmouseover = () => {
      btn!.style.cursor = "pointer";
      btn!.style.opacity = "0.8";
    }
    btn!.onmouseout = () => {
      btn!.style.opacity = "1";
    }
    if (i != 3) {
      btn!.onclick = () => {
        btns[0]!.style.outline = "none";
        btns[1]!.style.outline = "none";
        btns[2]!.style.outline = "none";
        btn!.style.outline = "double "+ pallete.red +" 10px";
  
        var colors = ["blue", "green", "yellow"];
        gameState.push(colors[i]);
        if (!engine(gameState)) {
          gameOver();
        }
      }
    }
    else {
      btn!.onclick = setUp;
    }
  });
}


function engine(input: string[]): boolean {
  var n: number = input.length;
  if (n == 0) return false;

  var isYellow: boolean = false;
  for (var i: number = 1; i < n; i+=1) {
    if (input[i] == "blue") {
      if (input[i - 1] == "blue") return false;
    }
    else if (input[i] == "yellow") {
      if (input[i - 1] != "blue" || isYellow) return false;
      isYellow = true;
    }
    else if (input[i] == "green") {
      if (input[i - 1] != "blue") return false;
      isYellow = false;
    }
    else {
      console.log(input[i] + ' ')
      return false;
    }
  }
  return true;
}

function cases() {
  expect(true, () => engine(["blue"]));
  expect(true, () => engine(["blue", "yellow", "blue"]));
  expect(true, () => engine(["blue", "green", "blue", "green"]));
  expect(true, () => engine(["blue", "green", "blue", "yellow"]));
  expect(true, () =>
    engine(["blue", "yellow", "blue", "green", "blue", "yellow"])
  );
  expect(false, () => engine(["yellow", "green"]));
  expect(false, () =>
    engine(["blue", "green", "blue", "yellow", "blue", "yellow"])
  );
  expect(false, () => engine([]));
}
cases();
setUp();
