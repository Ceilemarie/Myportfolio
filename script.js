document.querySelectorAll('.text-hover-wrap').forEach(wrapper => {
  const text = wrapper.querySelector('.hover-text');
  const canvas = wrapper.querySelector('.hover-canvas');
  const ctx = canvas.getContext('2d');
  let animationId;
  let hue = 0;

  function resizeCanvas() {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
  }

  function drawBlobs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const gradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 150);
    gradient.addColorStop(0, `hsl(${hue}, 100%, 65%)`);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX + Math.sin(hue / 50) * 20, centerY + Math.cos(hue / 60) * 20, 100, 0, Math.PI * 2);
    ctx.fill();

    hue += 2;
    animationId = requestAnimationFrame(drawBlobs);
  }

  wrapper.addEventListener('mouseenter', () => {
    resizeCanvas();
    canvas.style.display = 'block';
    text.style.opacity = '0';
    drawBlobs();
  });

  wrapper.addEventListener('mouseleave', () => {
    text.style.opacity = '1';
    canvas.style.display = 'none';
    cancelAnimationFrame(animationId);
  });
});
