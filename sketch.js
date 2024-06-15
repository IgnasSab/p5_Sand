function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

let grid;
let w = 10;
let cols, rows;
let hueValue = 0;


function setup() {
  createCanvas(1000, 500);
  colorMode(HSB, 360, 100, 100);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = 0;
    }
  }

}

function mouseDragged() {
  if (mouseX < width && mouseY < width) {
    let col = floor(mouseX / w);
    let row = floor(mouseY / w);
    if (grid[col][row] == 0) {
      grid[col][row] = hueValue;
    }
    hueValue = 50 + (hueValue + 0.2) % 50;
  }
}

function draw() {

  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      stroke(33, grid[i][j], 100);
      if (grid[i][j] > 0) {
        fill(33, grid[i][j], 100)
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0 && j < rows - 1) {
        let below = grid[i][j + 1];
        let left = grid[i][j];
        let right = grid[i][j];
        if (i >= 1) {
          left = grid[i - 1][j + 1];
        }
        if (i < rows - 1) {
          right = grid[i + 1][j + 1];
        }
        if (below === 0) {
          nextGrid[i][j] = 0;
          nextGrid[i][j + 1] = grid[i][j];
        } else {
          if (left > 0 && right === 0) {
            nextGrid[i + 1][j + 1] = grid[i][j];
          } else if (left === 0 && right > 0) {
            nextGrid[i - 1][j + 1] = grid[i][j];            
          } else if (left === 0 && right === 0) {
            if (random(1) < 0.5) {
              nextGrid[i + 1][j + 1] = grid[i][j];
            } else {
              nextGrid[i - 1][j + 1] = grid[i][j];
            }
          } else { 
            nextGrid[i][j] = grid[i][j];
          }
        }
        
      } else if (state > 0) {
        nextGrid[i][j] = grid[i][j];
      }
    }
  }
  grid = nextGrid;

}
