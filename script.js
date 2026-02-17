document.addEventListener("DOMContentLoaded", () => {

  // === Scenes ===
  const introScene = document.getElementById("introScene");
  const cakeScene = document.getElementById("cakeScene");
  const revealScene = document.getElementById("revealScene");

  // === Intro elements ===
  const introBtn = document.getElementById("introBtn");
  const introTextContainer = document.getElementById("introText");

  // === Cake elements ===
  const lightBtn = document.getElementById("lightBtn");
  const flame = document.getElementById("flame");
  const clickMeBtn = document.getElementById("nextBtn"); // renamed for clarity

  // === Reveal elements ===
  const showBtn = document.getElementById("showBtn");
  const bigReveal = document.getElementById("bigReveal");

  // === Balloon container ===
  const balloonContainer = document.getElementById("balloonContainer");

  // === Intro messages & button flow ===
  const messages = [
    "Today is not just another day.",
    "It's the day someone special entered the world.",
    "i wonder who is this person :O",
    "Some people make ordinary days feel lighter just by being in them."
  ];
  const buttonFlow = ["Click again", "One more time", "Celebrate"];
  let step = 0;

  // === Intro button click ===
  introBtn.addEventListener("click", () => {
    if (!introTextContainer) return;

    if (step < messages.length) {
      const p = document.createElement("p");
      p.textContent = messages[step];
      introTextContainer.appendChild(p);

      if (step < buttonFlow.length) {
        introBtn.textContent = buttonFlow[step];
      } else {
        introBtn.textContent = "Celebrate";
        introBtn.style.transform = "scale(1.15)";
        introBtn.style.background = "#ff5fa2";
      }

      // button jump animation
      introBtn.classList.remove("jump");
      void introBtn.offsetWidth;
      introBtn.classList.add("jump");

      step++;
    } else {
      switchScene(introScene, cakeScene);
    }
  });

  // === Balloon types ===
  const balloonData = [
    {text: "Avni", color: "#ff9cc2"},
    {text: "Happy", color: "#ffd06f"},
    {text: "Birthday", color: "#9cd6ff"}
  ];

  // === Start many balloons continuously ===
  function startManyBalloons() {
    setInterval(() => {
      const count = 3 + Math.floor(Math.random() * 3); // 3–5 balloons per batch
      for (let i = 0; i < count; i++) createBalloon();
    }, 300);
  }

  // === Create a single balloon with string and text above ===
  function createBalloon() {
    const data = balloonData[Math.floor(Math.random() * balloonData.length)];

    const wrapper = document.createElement("div");
    wrapper.className = "balloon-wrapper";

    const text = document.createElement("div");
    text.className = "balloon-text";
    text.textContent = data.text;

    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.background = data.color;

    const stringEl = document.createElement("div");
    stringEl.className = "balloon-string";

    wrapper.appendChild(text);
    wrapper.appendChild(balloon);
    wrapper.appendChild(stringEl);

    const left = Math.random() * (window.innerWidth - 60);
    wrapper.style.left = left + "px";

    const duration = 3 + Math.random() * 2; // faster float
    wrapper.style.animationDuration = duration + "s";

    balloonContainer.appendChild(wrapper);

    setTimeout(() => wrapper.remove(), duration * 1000);
  }

  // === Light cake ===
  lightBtn.addEventListener("click", () => {
    flame.classList.add("active");
    startManyBalloons();
    lightBtn.classList.add("hidden");

    // === Big birthday text ===
    const bigText = document.createElement("div");
    bigText.textContent = "HAPPYYYYY BIRTHDAYYY";
    bigText.style.fontSize = "2.2rem";
    bigText.style.color = "#ff69b4";
    bigText.style.fontWeight = "bold";
    bigText.style.marginBottom = "10px";
    bigText.style.textAlign = "center";
    bigText.style.animation = "fadeIn 1s ease";
    cakeScene.querySelector(".center").prepend(bigText);

    // === Cute, mature one-line message ===
    const smallMessage = document.createElement("div");
    smallMessage.textContent = "May your days always feel as bright and joyful as you make everyone around you.";
    smallMessage.style.fontSize = "1rem";
    smallMessage.style.color = "#444";
    smallMessage.style.textAlign = "center";
    smallMessage.style.marginBottom = "10px";
    smallMessage.style.animation = "fadeIn 1s ease";
    cakeScene.querySelector(".center").prepend(smallMessage);

    // === Show "Click me" button bigger and blue ===
    clickMeBtn.style.background = "#3399ff";
    clickMeBtn.style.color = "#fff";
    clickMeBtn.style.padding = "16px 32px";
    clickMeBtn.style.fontSize = "1.2rem";
    clickMeBtn.classList.remove("hidden");
  });

  // === Next scene ===
  clickMeBtn.addEventListener("click", () => {
    switchScene(cakeScene, revealScene);
  });

  // === Show reveal ===
  showBtn.addEventListener("click", () => {
    document.body.style.filter = "brightness(0.9)";
    bigReveal.classList.add("show");
  });

  // === Switch scene helper ===
  function switchScene(from, to) {
    from.classList.remove("active");
    setTimeout(() => to.classList.add("active"), 500);
  }

});
