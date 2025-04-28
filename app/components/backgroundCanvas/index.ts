import { DotType } from "~/types/backgroundCanvas.type";
import { isMobile } from "~/utility/utils";

export const canvasDots = () => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  if (!canvas || !ctx) return () => {};

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = "block";

  const dots: DotType[] = [];
  const NUM_DOTS = isMobile() ? 200 : 600;
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

  let mouseX = -9999;
  let mouseY = -9999;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  if (!isMobile()) {
    window.addEventListener("mousemove", handleMouseMove);
  }

  let animationFrameId: number;

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let dot of dots) {
      dot.x += dot.vx;
      dot.y += dot.vy;

      if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
      if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;

      if (isMobile()) {
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      } else {
        const dx = dot.x - mouseX;
        const dy = dot.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REVEAL_RADIUS) {
          const alpha = Math.pow(1 - dist / REVEAL_RADIUS, 2);
          ctx.beginPath();
          ctx.globalAlpha = alpha;
          ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1;
    animationFrameId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    cancelAnimationFrame(animationFrameId);
    if (!isMobile()) {
      window.removeEventListener("mousemove", handleMouseMove);
    }
  };
};
