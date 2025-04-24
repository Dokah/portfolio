import { DotType } from "~/types/backgroundCanvas.type";
import { isMobile } from "~/utility/utils"; // For detecting mobile devices

export const canvasDots = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  if (!canvas || !ctx) return;

  // Initialize canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Resize the canvas initially
  resizeCanvas();

  const dots: DotType[] = [];
  const NUM_DOTS = isMobile() ? 100 : 600; // Adjust dots for mobile
  const REVEAL_RADIUS = 500;
  const color = "#228b22";
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  // Function to create the dots
  const createDots = () => {
    for (let i = 0; i < NUM_DOTS; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: -0.3 + Math.random() * 0.6,
        vy: -0.3 + Math.random() * 0.6,
        radius: Math.random() * 2.5 + 0.5,
      });
    }
  };

  // Create the dots initially
  createDots();

  // Mouse move listener (only for non-mobile)
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

  // Animation loop
  const animate = () => {
    // Clear canvas only when necessary, no total clear each time
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

      // Show dots differently for mobile and desktop
      if (isMobile()) {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Desktop: reveal based on mouse position
        if (dist < REVEAL_RADIUS) {
          const alpha = Math.pow(1 - dist / REVEAL_RADIUS, 2);
          ctx.beginPath();
          ctx.globalAlpha = alpha;
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1; // Reset alpha
    requestAnimationFrame(animate);
  };

  animate(); // Start the animation loop

  // Resize handling with throttling
  let resizing = false;

  const handleResize = () => {
    if (!resizing) {
      resizing = true;
      setTimeout(() => {
        resizeCanvas(); // Resize the canvas
        dots.length = 0; // Clear the existing dots
        createDots(); // Recreate the dots based on the new canvas size
        resizing = false;
      }, 200); // Throttle resize with a delay
    }
  };

  // Attach the resize event handler
  window.addEventListener("resize", handleResize);

  // Cleanup resize event listener on unmount
  return () => {
    window.removeEventListener("resize", handleResize);
  };
};
