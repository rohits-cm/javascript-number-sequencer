// Get the puzzle grid and buttons
const grid = document.querySelector('.grid');
const buttons = Array.from(grid.getElementsByTagName('button'));

// Set the initial count
let count = 0;
const countSpan = document.getElementById('message');
message.innerHTML = `Count: ${count}`;

// Shuffle the puzzle buttons randomly
function shuffleButtons() {
  for (let i = buttons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [buttons[i].textContent, buttons[j].textContent] = [buttons[j].textContent, buttons[i].textContent];
  }
}
shuffleButtons();

// Handle button click event
function handleClick(event) {
  const button = event.target; 
  const buttonIndex = buttons.indexOf(button);

  // Check if the clicked button is movable
  if (isMovable(buttonIndex)) {
    const emptyIndex = buttons.findIndex(button => button.textContent === '');
    swapButtons(buttonIndex, emptyIndex);
    count++;
    message.innerHTML = `Count: ${count}`;
    checkWinCondition();
  }
}

// Check if a button is movable
function isMovable(buttonIndex) {
  const emptyIndex = buttons.findIndex(button => button.textContent === '');
  const rowDiff = Math.abs(Math.floor(buttonIndex / 3) - Math.floor(emptyIndex / 3));
  const colDiff = Math.abs((buttonIndex % 3) - (emptyIndex % 3));
  return (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0);
}

// Swap the positions of two buttons
function swapButtons(index1, index2) {
  [buttons[index1].textContent, buttons[index2].textContent] = [buttons[index2].textContent, buttons[index1].textContent];
}

// Add click event listener to the grid
grid.addEventListener('click', handleClick);