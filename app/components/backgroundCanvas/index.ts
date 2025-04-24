import { DotType } from "~/types/backgroundCanvas.type";
import { debounce, isMobile } from "~/utility/utils";

export const canvasDots = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  if (!canvas || !ctx) return;

  // Initial canvas size setup
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas(); // Set canvas size initially

  const dots: DotType[] = [];
  const NUM_DOTS = isMobile() ? 100 : 600; // Adjust number of dots based on device
  const REVEAL_RADIUS = 500;
  const color = "#228b22";
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  for (let i = 0; i < NUM_DOTS; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: -0.3 + Math.random() * 0.6,
      vy: -0.3 + Math.random() * 0.6,
      radius: Math.random() * 2.5 + 0.5,
    });
  }

  // Mouse move listener for non-mobile
  let mouseX = -9999;
  let mouseY = -9999;
  if (!isMobile()) {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }

  // Main animation loop
  const animate = () => {
    // Redraw only if necessary, otherwise use the existing state
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let dot of dots) {
      // Update dot position
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Bounce off edges
      if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
      if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;

      const dx = dot.x - mouseX;
      const dy = dot.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // For mobile, show the dots normally
      if (isMobile()) {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // For desktop, reveal dots based on mouse proximity
        if (dist < REVEAL_RADIUS) {
          const alpha = Math.pow(1 - dist / REVEAL_RADIUS, 2);
          ctx.beginPath();
          ctx.globalAlpha = alpha;
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1; // Reset alpha for next frame
    requestAnimationFrame(animate); // Continue animation loop
  };

  animate(); // Start the animation loop

  // Resize listener to adjust canvas size only when necessary
  const handleResize = debounce(() => {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Optionally clear canvas on resize
    // You can choose to reset the dots or keep them during resize
    dots.length = 0; // Clear existing dots
    for (let i = 0; i < NUM_DOTS; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: -0.3 + Math.random() * 0.6,
        vy: -0.3 + Math.random() * 0.6,
        radius: Math.random() * 2.5 + 0.5,
      });
    }
  }, 1000); // Delay the resize handler

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    handleResize.cancel(); // Clean up debounce handler on component unmount
  };
};