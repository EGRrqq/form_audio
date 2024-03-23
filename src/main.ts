import "./style.css";

window.addEventListener("load", function () {
  const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement;

    usernameInput.checkValidity() ? playSuccess() : playError();
  });
});

const ctx = new AudioContext();

function playSuccess() {
  const successNoise = ctx.createOscillator();
  successNoise.frequency.value = 600;
  successNoise.type = "triangle";
  successNoise.frequency.exponentialRampToValueAtTime(
    800,
    ctx.currentTime + 0.05
  );
  successNoise.frequency.exponentialRampToValueAtTime(
    1000,
    ctx.currentTime + 0.15
  );

  const successGain = ctx.createGain();
  successGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  const successFilter = ctx.createBiquadFilter();
  successFilter.Q.value = 0.05;

  successNoise
    .connect(successFilter)
    .connect(successGain)
    .connect(ctx.destination);
  successNoise.start();
  successNoise.stop(ctx.currentTime + 0.2);
}

function playError() {
  let errorNoise = ctx.createOscillator();
  errorNoise.frequency.value = 400;
  errorNoise.type = "triangle";
  errorNoise.frequency.exponentialRampToValueAtTime(
    200,
    ctx.currentTime + 0.05
  );
  errorNoise.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);

  const errorGain = ctx.createGain();
  errorGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

  errorNoise.connect(errorGain).connect(ctx.destination);
  errorNoise.start();
  errorNoise.stop(ctx.currentTime + 0.3);
}
