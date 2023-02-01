let isDrawing = false;
let lastX = null;
let lastY = null;
const canvas_1 = document.querySelector('#canvas-1');

const ctx = canvas_1.getContext('2d');

canvas_1.addEventListener('mousemove', (event) => {
  if(!isDrawing)
    return;

  const x = event.offsetX;
  const y = event.offsetY;
  let propX = 1;
  let propY = 1;

  if(lastX !== null) {
    const diffX = Math.abs(x - lastX);
    const diffY = Math.abs(y - lastY);

    /* 
      - what happens if diffX or diffY is 0
      - currently works only when both x and y get bigger (drawing in bottom right direction)
     */

    if(diffX > diffY) {
      propY = diffY / diffX;
    } else {
      propX = diffX / diffY;
    }

    let newX = lastX;
    let newY = lastY;

    while(newX < x && newY < y) {
      newX = newX + 1 * propX;
      newY = newY + 1 * propY;
      ctx.fillRect(newX, newY, 5, 5);
    }
  }
  
  ctx.fillRect(x, y, 5, 5);
  
  lastX = x;
  lastY = y;
});

window.addEventListener('mousedown', () => isDrawing = true);
window.addEventListener('mouseup', () => {
  isDrawing = false;
  lastX = null;
  lastY = null;
});