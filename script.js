let grid;
let cols;
let rows;
let resolution = 15;
let paused = false;

function setup() {
  createCanvas(windowWidth, windowHeight - 50);

  cols = floor(width / resolution);
  rows = floor(height / resolution);

  grid = make2DArray(cols, rows);
  randomizeGrid();
}

function draw() {
  background(240);

  // Draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      if (grid[i][j] == 1) {
        fill(0);
      } else {
        fill(255);
      }

      stroke(200);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }

  // Calculate next generation
  if (!paused) {

    let next = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {

        let neighbors = countNeighbors(grid, i, j);

        if (grid[i][j] == 1) {

          if (neighbors < 2 || neighbors > 3) {
            next[i][j] = 0;
          } else {
            next[i][j] = 1;
          }

        } else {

          if (neighbors == 3) {
            next[i][j] = 1;
          } else {
            next[i][j] = 0;
          }

        }
      }
    }

    grid = next;
  }
}

function mousePressed() {
  toggleCell();
}

function mouseDragged() {
  toggleCell();
}

function toggleCell() {
  let x = floor(mouseX / resolution);
  let y = floor(mouseY / resolution);

  if (x >= 0 && x < cols && y >= 0 && y < rows) {

    if (grid[x][y] == 1) {
      grid[x][y] = 0;
    } else {
      grid[x][y] = 1;
    }

  }
}


function keyPressed() {

  if (key == ' ') {
    paused = !paused;
  }

  if (key == 'r' || key == 'R') {
    randomizeGrid();
  }

}

// HELPER FUNCTIONS

function make2DArray(cols, rows) {

  let arr = [];

  for (let i = 0; i < cols; i++) {
    arr[i] = [];

    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }

  return arr;
}

function randomizeGrid() {

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }

}

function countNeighbors(grid, x, y) {

  let count = 0;

  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {

      if (i < 0 || i >= cols || j < 0 || j >= rows) {
        continue;
      }

      if (i == x && j == y) {
        continue;
      }

      count += grid[i][j];
    }
  }

  return count;
}