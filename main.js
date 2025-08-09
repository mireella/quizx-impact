const form = document.getElementById("quizForm");
const steps = document.querySelectorAll(".question-step");
const countdownSection = document.getElementById("countdown");
const timerEl = document.getElementById("timer");
const resultSection = document.getElementById("result");
const summaryEl = document.getElementById("summary");
const restartBtn = document.getElementById("restart");

let currentStep = 0;

document.querySelectorAll(".next").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const radios = steps[index].querySelectorAll("input[type='radio']");
    const checked = Array.from(radios).some(r => r.checked);
    if (!checked) {
      alert("Selecione uma opção para continuar.");
      return;
    }
    steps[index].classList.remove("active");
    steps[index + 1].classList.add("active");
  });
});

const profiles = {
  social: {
    title: "Defensor(a) Social",
    text: "Você é movido(a) por empatia e justiça social. Está sempre buscando formas de melhorar a vida das pessoas."
  },
  cultural: {
    title: "Conector(a) Cultural",
    text: "Você valoriza a diversidade e adora compartilhar e promover expressões culturais únicas."
  },
  ambiental: {
    title: "Guardião(ã) Ambiental",
    text: "Sua missão é proteger o planeta. Sustentabilidade é mais do que um ideal: é um estilo de vida."
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const counts = { social: 0, cultural: 0, ambiental: 0 };
  new FormData(form).forEach((value) => counts[value]++);

  const topCategory = Object.keys(counts).reduce((a, b) =>
    counts[a] > counts[b] ? a : b
  );

  form.classList.add("hidden");
  countdownSection.classList.remove("hidden");

  let time = 3;
  timerEl.textContent = time;
  const countdown = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
      clearInterval(countdown);
      countdownSection.classList.add("hidden");
      const { title, text } = profiles[topCategory];
      summaryEl.innerHTML = `<strong>${title}:</strong> ${text}`;
      resultSection.classList.remove("hidden");
    }
  }, 1000);
});

restartBtn.addEventListener("click", () => {
  form.reset();
  steps.forEach(step => step.classList.remove("active"));
  steps[0].classList.add("active");
  form.classList.remove("hidden");
  resultSection.classList.add("hidden");
});
