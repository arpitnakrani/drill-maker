export function drawStraightLine() {
  let startX = 0; // Initial X position
  let startY = 0; // Initial Y position
  let isDrawing = false;
  const canvas = document.getElementById("drill_Canvas");
  console.log(canvas ,'canvas')
  const ctx = canvas?.getContext("2d");
  if (canvas) {
    canvas.addEventListener("mousedown", (event) => {
      startX = event.clientX;
      startY = event.clientY;
      isDrawing = true;
    });

    canvas.addEventListener("mousemove", (event) => {
      if (isDrawing) {
        // Clear the canvas before drawing the new line
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Begin a new path for the new line
        ctx.beginPath();
        // Move to the initial point
        ctx.moveTo(startX, startY);
        // Draw a line to the current mouse position
        ctx.lineTo(event.clientX, event.clientY);
        // Actually draw the line
        ctx.stroke();
      }
    });

    canvas.addEventListener("mouseup", () => {
      isDrawing = false;
    });
  }
}
