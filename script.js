document.addEventListener("DOMContentLoaded", () => {

  // === Pages Config ===
  const totalPages = 4;
  let currentPage = 1;
  let isAnimating = false;

  // === DOM Elements ===
  const frontPage = document.getElementById("frontPage");
  const cardPages = document.getElementById("cardPages");
  const pageNumber = document.getElementById("pageNumber");
  const pageContent = document.getElementById("pageContent");
  const cardContent = document.querySelector("#regularContent");
  const cakePage = document.getElementById("cakePage");
  const balloonContainer = document.getElementById("balloonContainer");

  // === Buttons ===
  const openCardBtn = document.getElementById("openCardBtn");
  const turnPageBtn = document.getElementById("turnPageBtn");
  const nextPageBtn = document.getElementById("nextPageBtn");
  const prevPageBtn = document.getElementById("prevPageBtn");
  const closeCardBtn = document.getElementById("closeCardBtn");
  const lightBtn = document.getElementById("lightBtn");
  const celebrateBtn = document.getElementById("celebrateBtn");
  const prevPageBtn2 = document.getElementById("prevPageBtn2");
  const closeCardBtn2 = document.getElementById("closeCardBtn2");
  const flame = document.getElementById("flame");
  const giftMessage = document.getElementById("giftMessage");
  const starsEffect = document.getElementById("starsEffect");
  const darkOverlay = document.getElementById("darkOverlay");
  const byeText = document.getElementById("byeText");
  const errorMessage = document.getElementById("errorMessage");
  const fullScreenBlack = document.getElementById("fullScreenBlack");

  // === Balloon colors ===
  const balloonColors = ["#ff6b9d", "#ffd06f", "#9cd6ff", "#b19cd9", "#ff9cc2"];

  // === Initialize ===
  renderPage(1);

  // === Generate Lines for a Page ===
  function generateLines(pageNum = 1) {
    pageContent.innerHTML = "";
    
    // Special content for page 1
    if (pageNum === 1) {
      const texts = [
        "This is the day someone special joined the world.",
        "Not just any player — this one stands out.",
        "There's something different about them, something unique.",
        "I wonder who this amazing player could be."
      ];
      
      texts.forEach((text, index) => {
        const p = document.createElement("p");
        p.textContent = text;
        p.style.fontSize = "1.1rem";
        p.style.color = "#c44569";
        p.style.fontWeight = "bold";
        p.style.lineHeight = "1.8";
        p.style.marginBottom = "15px";
        p.style.animation = `fadeInText 0.8s ease-out forwards`;
        p.style.animationDelay = `${index * 0.2}s`;
        pageContent.appendChild(p);
      });
    } else if (pageNum === 2) {
      const texts = [
        "remember the time u asked me that how do i know everything abt that one first house changing story? well lets just say when i have a serious conversation with someone i remember every part of it",
        "in 2019-20 friendship started with \"hello\" but in 2025 it started with \"im your uber driver\", unique way bro. even albert eistien take lessons from me",
        "my brain was stuck in loading mode when the school reopened after corona hahahaha"
      ];
      
      texts.forEach((text, index) => {
        const p = document.createElement("p");
        p.textContent = text;
        p.style.fontSize = "1rem";
        p.style.color = "#764ba2";
        p.style.fontWeight = "bold";
        p.style.lineHeight = "1.8";
        p.style.marginBottom = "20px";
        p.style.animation = `fadeInText 0.8s ease-out forwards`;
        p.style.animationDelay = `${index * 0.2}s`;
        pageContent.appendChild(p);
      });
    } else if (pageNum === 3) {
      const texts = [
        "i know i gave this to you one day late and its my bad, these things take alot of time to make and publsh.",
        "i think i have some chocolates in my bags, i will mail them to you through gmail trust me"
      ];

      texts.forEach((text, index) => {
        const p = document.createElement("p");
        p.textContent = text;
        p.style.fontSize = "1rem";
        p.style.color = "#444";
        p.style.fontWeight = "600";
        p.style.lineHeight = "1.8";
        p.style.marginBottom = "18px";
        p.style.animation = `fadeInText 0.8s ease-out forwards`;
        p.style.animationDelay = `${index * 0.2}s`;
        pageContent.appendChild(p);
      });

    } else {
      // Regular lines for other pages
      for (let i = 0; i < 10; i++) {
        const lineDiv = document.createElement("div");
        lineDiv.className = "line";
        pageContent.appendChild(lineDiv);
      }
    }
  }

  // === Create a balloon ===
  function createBalloon() {
    const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const wrapper = document.createElement("div");
    wrapper.className = "balloon-wrapper";
    
    const text = document.createElement("div");
    text.className = "balloon-text";
    text.textContent = ["Happy", "Birthday", "avni", "avni"][Math.floor(Math.random() * 4)];
    
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.background = color;
    
    const string = document.createElement("div");
    string.className = "balloon-string";
    
    wrapper.appendChild(text);
    wrapper.appendChild(balloon);
    wrapper.appendChild(string);
    
    const left = Math.random() * 100;
    wrapper.style.left = left + "%";
    const duration = 4 + Math.random() * 2;
    wrapper.style.setProperty("--tx", (Math.random() - 0.5) * 100 + "px");
    wrapper.style.animationDuration = duration + "s";
    
    balloonContainer.appendChild(wrapper);
    
    setTimeout(() => wrapper.remove(), duration * 1000);
  }

  // === Start balloons ===
  function startBalloons() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createBalloon(), i * 300);
    }
    const balloonInterval = setInterval(() => {
      for (let i = 0; i < 2; i++) {
        createBalloon();
      }
    }, 400);
    
    setTimeout(() => clearInterval(balloonInterval), 15000);
  }

  // === Render Page ===
  function renderPage(pageNum) {
    currentPage = pageNum;
    
    if (pageNum === 4) {
      // Show cake page
      cardContent.classList.add("hidden");
      cardContent.style.display = "none";
      cakePage.classList.remove("hidden");
      cakePage.style.display = "flex";
      flame.classList.remove("burning");
      lightBtn.classList.remove("hidden");
      celebrateBtn.classList.add("hidden");
      balloonContainer.innerHTML = "";
      prevPageBtn2.disabled = false;
    } else {
      // Show text pages
      cakePage.classList.add("hidden");
      cakePage.style.display = "none";
      cardContent.classList.remove("hidden");
      cardContent.style.display = "flex";
      pageNumber.textContent = pageNum;
      generateLines(pageNum);
      nextPageBtn.disabled = pageNum === totalPages;
      prevPageBtn.disabled = pageNum === 1;
    }
  }

  // === Page Turn Animation ===
  function turnPageWithAnimation(newPageNum) {
    if (isAnimating || newPageNum === currentPage) return;
    if (newPageNum < 1 || newPageNum > totalPages) return;
    
    isAnimating = true;
    const currentCard = currentPage === 4 ? cakePage : cardContent;
    const nextCard = newPageNum === 4 ? cakePage : cardContent;
    
    currentCard.style.animation = "none";
    void currentCard.offsetWidth; // Force reflow
    
    const isNextPage = newPageNum > currentPage;
    if (isNextPage) {
      currentCard.style.animation = "pageFlipForward 0.8s ease-out";
    } else {
      currentCard.style.animation = "pageFlipBackward 0.8s ease-out";
    }
    
    setTimeout(() => {
      renderPage(newPageNum);
    }, 400);
    
    setTimeout(() => {
      isAnimating = false;
      currentCard.style.animation = "none";
    }, 800);
  }

  // === Navigate Pages ===
  nextPageBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      turnPageWithAnimation(currentPage + 1);
    }
  });

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      turnPageWithAnimation(currentPage - 1);
    }
  });

  prevPageBtn2.addEventListener("click", () => {
    if (currentPage > 1) {
      turnPageWithAnimation(currentPage - 1);
    }
  });

  // === Open Card ===
  openCardBtn.addEventListener("click", () => {
    frontPage.classList.remove("active");
    cardPages.classList.add("active");
    openCardBtn.classList.add("hidden");
    turnPageBtn.classList.remove("hidden");
    turnPageBtn.classList.add("visible");
  });

  // === Turn Page from Front ===
  turnPageBtn.addEventListener("click", () => {
    frontPage.classList.remove("active");
    cardPages.classList.add("active");
  });

  // === Close Card ===
  function closeCard() {
    cardPages.classList.remove("active");
    frontPage.classList.add("active");
    renderPage(1);
    openCardBtn.classList.remove("hidden");
    turnPageBtn.classList.add("hidden");
    turnPageBtn.classList.remove("visible");
    flame.classList.remove("burning");
    balloonContainer.innerHTML = "";
    cakePage.classList.remove("shake");
    starsEffect.classList.add("hidden");
    starsEffect.classList.remove("active");
    darkOverlay.classList.add("hidden");
    darkOverlay.classList.remove("active");
    byeText.classList.add("hidden");
    byeText.classList.remove("active");
    errorMessage.classList.add("hidden");
    errorMessage.classList.remove("active");
    fullScreenBlack.classList.add("hidden");
    fullScreenBlack.classList.remove("active");
  }

  closeCardBtn.addEventListener("click", closeCard);
  closeCardBtn2.addEventListener("click", closeCard);

  // === Create Stars ===
  function createStars() {
    starsEffect.innerHTML = "";
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.setProperty("--tx", (Math.random() - 0.5) * 200 + "px");
      star.style.setProperty("--ty", (Math.random() - 0.5) * 200 + "px");
      starsEffect.appendChild(star);
    }
  }

  // === Special Ending Sequence ===
  function triggerSpecialEnding() {
    // Start shaking
    cakePage.classList.add("shake");
    
    // Show stars
    starsEffect.classList.remove("hidden");
    createStars();
    starsEffect.classList.add("active");
    
    // Wait then show full-screen black
    setTimeout(() => {
      fullScreenBlack.classList.remove("hidden");
      fullScreenBlack.classList.add("active");
    }, 800);
    
    // Show bye text
    setTimeout(() => {
      byeText.classList.remove("hidden");
      byeText.classList.add("active");
    }, 1400);
    
    // Show error message
    setTimeout(() => {
      cakePage.classList.remove("shake");
      errorMessage.classList.remove("hidden");
      errorMessage.classList.add("active");
    }, 2200);
  }

  // === Light Cake ===
  lightBtn.addEventListener("click", () => {
    flame.classList.add("burning");
    lightBtn.classList.add("hidden");
    celebrateBtn.classList.remove("hidden");
    giftMessage.classList.remove("hidden");
    startBalloons();
    
    // Trigger special ending after 3 seconds
    setTimeout(() => {
      triggerSpecialEnding();
    }, 3000);
  });

  // === Celebrate ===
  celebrateBtn.addEventListener("click", () => {
    celebrateBtn.style.transform = "scale(1.2)";
    setTimeout(() => {
      celebrateBtn.style.transform = "scale(1)";
    }, 100);
    startBalloons();
  });

});
