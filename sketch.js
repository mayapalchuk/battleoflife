const width = 600;
const side_len = 8;
let grid = [];
let running = false;
let color = 1;
let colors = ['white', 'black', 'red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'hotpink'];

function setup() {
  for(let i = 0; i < width/side_len; i++) {
    grid[i] = [];
    for(let j = 0; j < width/side_len; j++) {
      grid[i][j] = 0;
    }
  }
  createCanvas(width, width);
}

function draw() {
  background(0);
  stroke(0);
  if(frameCount % 10 == 0 && running) {
    nextGen();
  } 
  drawGrid();
}

function drawGrid() {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      fill(colors[grid[i][j]]);
      square(i*side_len, j*side_len, side_len);
    }
  }
}

function mouseClicked() {
  if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= width) {
    let x = Math.floor(mouseX / side_len);
    let y = Math.floor(mouseY / side_len);
    grid[x][y] = color;
  }
}

function mouseDragged() {
  if(mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= width) {
    let x = Math.floor(mouseX / side_len);
    let y = Math.floor(mouseY / side_len);
    grid[x][y] = color;
  }
}

function keyPressed() {
  if(keyCode >= 49 && keyCode <= 57) {
    color = -1 * (49 - keyCode) + 1;
  }
  
  if(keyCode == 32) {
    running = !running;
  }
  
  if(key == 'r') {
    for(let i = 0; i < grid.length; i++) {
      for(let j = 0; j < grid[0].length; j++) {
        grid[i][j] = 0;
      }
    }
  }
}

function nextGen() {
  for(let i = 1; i < grid.length - 1; i++) {
    for(let j = 1; j < grid[0].length - 1; j++) {
      let sum = 0;
      let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for(let i2 = i-1; i2 <= i+1; i2++) {
        for(let j2 = j-1; j2 <= j+1; j2++) {
          if(!(i2 == i && j2 == j)) {
            if(grid[i2][j2]) sum++;
            counts[grid[i2][j2]]++;
          }
        }
      }
      let max = 1;
      for(let x = 1; x < counts.length; x++) {
        if(counts[x] > counts[max]) {
          max = x;
        }
      }
      if(grid[i][j]) {
        if(sum < 2) {
          grid[i][j] = 0;
        }
        else if(sum > 3) {
          grid[i][j] = 0;
        }
        else {
          grid[i][j] = max;
        }
      } else {
        if(sum == 3) {
          grid[i][j] = max;
        }
      }
    }
  }
}