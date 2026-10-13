/* ============================================================
   "Agar men ..." — Interaktiv Web-Prezentatsiya
   Barcha funksiyalar: slaydlar, o'yinlar, refleksiya
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ========== 1. SLAYD BOSHQARUVI ========== */
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentSlide = 0;

  const progressBar = document.getElementById("progressBar");
  const slideCounter = document.getElementById("slideCounter");
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");
  const btnHome = document.getElementById("btnHome");
  const btnGames = document.getElementById("btnGames");
  const btnFullscreen = document.getElementById("btnFullscreen");
  const btnStart = document.getElementById("btnStart");

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    currentSlide = index;
    updateUI();
  }

  function updateUI() {
    slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    progressBar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === totalSlides - 1;
  }

  btnNext.addEventListener("click", () => showSlide(currentSlide + 1));
  btnPrev.addEventListener("click", () => showSlide(currentSlide - 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") showSlide(currentSlide + 1);
    if (e.key === "ArrowLeft") showSlide(currentSlide - 1);
  });

  btnHome.addEventListener("click", () => showSlide(0));
  btnStart.addEventListener("click", () => showSlide(1));

  // O'yinlar bo'limiga o'tish (16-slayd, index 15)
  btnGames.addEventListener("click", () => showSlide(15));

  // To'liq ekran
  btnFullscreen.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });

  updateUI();

  /* ========== 2. FLIP KARTOCHKALAR ========== */
  document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });

  /* ========== 3. QUIZ ========== */
  const quizData = [
    {
      q: "Huquq nima?",
      opts: ["Qonun bilan himoyalangan imkoniyat", "Majburiyat", "Jazo", "An'ana"],
      correct: 0,
      expl: "Huquq — qonun bilan kafolatlangan imkoniyat."
    },
    {
      q: "Fuqarolik burchi nima?",
      opts: ["Faqat soliq to'lash", "Jamiyat va davlat oldidagi majburiyatlarni bajarish", "Saylovda qatnashish", "Sport bilan shug'ullanish"],
      correct: 1,
      expl: "Burch — qonun va jamiyat oldidagi majburiyatlarni bajarish."
    },
    {
      q: "Mahalla yoshlar yetakchisining asosiy vazifasi nima?",
      opts: ["Soliq yig'ish", "Yoshlar bilan ishlashni tashkil etish", "Qonun chiqarish", "Sud qarorlarini ijro etish"],
      correct: 1,
      expl: "Yoshlar yetakchisi yoshlar bilan ishlashni tashkil etadi."
    },
    {
      q: "Jamoat mulkini asrash nima uchun muhim?",
      opts: ["Chunki u barchaga tegishli", "Chunki u davlatga tegishli", "Chunki u qimmat", "Chunki u hech kimniki emas"],
      correct: 0,
      expl: "Jamoat mulki barchaga tegishli, uni asrash har bir fuqaroning burchi."
    },
    {
      q: "Muammoni hal qilish uchun qanday dalillar kerak?",
      opts: ["Faqat shaxsiy fikr", "Kuzatuv, so'rov, intervyu", "Ijtimoiy tarmoqlardagi mish-mishlar", "Tasodifiy ma'lumotlar"],
      correct: 1,
      expl: "Ishonchli dalillar: kuzatuv, so'rov, intervyu va rasmiy manbalar."
    },
    {
      q: "Konstitutsiya nima?",
      opts: ["Oddiy qonun", "Asosiy qonun", "Farmon", "Qaror"],
      correct: 1,
      expl: "Konstitutsiya — davlatning asosiy qonuni."
    },
    {
      q: "Qonun oldida javobgarlik nima?",
      opts: ["O'z harakatlari uchun mas'ul bo'lish", "Jazodan qochish", "Boshqalarni ayblash", "Hech narsa qilmaslik"],
      correct: 0,
      expl: "Javobgarlik — o'z harakatlari va oqibatlari uchun mas'ul bo'lish."
    },
    {
      q: "Yoshlar tashabbusini qo'llab-quvvatlash qaysi sohaga kiradi?",
      opts: ["Faqat iqtisodiyot", "Yoshlar siyosati", "Faqat ta'lim", "Faqat madaniyat"],
      correct: 1,
      expl: "Yoshlar tashabbuslari yoshlar siyosati doirasida qo'llab-quvvatlanadi."
    }
  ];

  const quizContainer = document.getElementById("quizContainer");
  const quizResult = document.getElementById("quizResult");
  const btnQuizSubmit = document.getElementById("btnQuizSubmit");
  const btnQuizRetry = document.getElementById("btnQuizRetry");
  let quizAnswers = new Array(quizData.length).fill(null);

  function renderQuiz() {
    quizContainer.innerHTML = "";
    quizAnswers = new Array(quizData.length).fill(null);
    quizResult.textContent = "";
    quizData.forEach((item, qi) => {
      const div = document.createElement("div");
      div.className = "quiz-q";
      div.innerHTML = `<h4>${qi + 1}. ${item.q}</h4>`;
      item.opts.forEach((opt, oi) => {
        const label = document.createElement("label");
        label.className = "quiz-opt";
        label.innerHTML = `<input type="radio" name="q${qi}" value="${oi}" style="margin-right:8px;"> ${opt}`;
        label.addEventListener("click", () => {
          quizAnswers[qi] = oi;
          div.querySelectorAll(".quiz-opt").forEach(l => l.classList.remove("selected"));
          label.classList.add("selected");
        });
        div.appendChild(label);
      });
      const expl = document.createElement("div");
      expl.className = "quiz-expl";
      expl.style.display = "none";
      expl.textContent = "💡 " + item.expl;
      div.appendChild(expl);
      quizContainer.appendChild(div);
    });
  }

  btnQuizSubmit.addEventListener("click", () => {
    let score = 0;
    const qDivs = quizContainer.querySelectorAll(".quiz-q");
    quizData.forEach((item, qi) => {
      const qDiv = qDivs[qi];
      const opts = qDiv.querySelectorAll(".quiz-opt");
      opts.forEach((opt, oi) => {
        opt.classList.remove("correct", "wrong");
        if (oi === item.correct) opt.classList.add("correct");
        else if (quizAnswers[qi] === oi) opt.classList.add("wrong");
      });
      qDiv.querySelector(".quiz-expl").style.display = "block";
      if (quizAnswers[qi] === item.correct) score++;
    });
    const percent = Math.round((score / quizData.length) * 100);
    quizResult.innerHTML = `🎯 Natija: <b>${score} / ${quizData.length}</b> (${percent}%)<br>${
      percent >= 80 ? "🌟 Ajoyib!" : percent >= 50 ? "👍 Yaxshi, yana urinib ko'ring." : "📚 Mavzuni takrorlang."
    }`;
  });

  btnQuizRetry.addEventListener("click", renderQuiz);
  renderQuiz();

  /* ========== 4. SCENARIO ========== */
  const scenarioData = [
    {
      title: "1-yechim: Yoshlar markazi tashkil etish",
      desc: "Mahallada bepul yoshlar markazi ochish.",
      pros: ["Yoshlar bandligi oshadi", "Huquqbuzarliklar kamayadi", "Ijtimoiy muhit yaxshilanadi"],
      cons: ["Katta xarajat talab qiladi", "Uzoq muddatda amalga oshadi"],
      legal: "Qonuniy — davlat yoshlar siyosatiga mos.",
      ideal: true
    },
    {
      title: "2-yechim: Huquqiy ta'lim dasturi",
      desc: "Yoshlar uchun huquqiy savodxonlik kurslari.",
      pros: ["Arzon", "Tez amalga oshadi", "Huquqiy madaniyat oshadi"],
      cons: ["Yoshlarni jalb qilish qiyin", "Uzoq muddatli natija"],
      legal: "Qonuniy — ta'lim sohasiga mos.",
      ideal: true
    },
    {
      title: "3-yechim: Yoshlar tashabbuslari granti",
      desc: "Kichik loyihalar uchun grant va tanlovlar.",
      pros: ["Tashabbuskorlikni oshiradi", "Raqobat muhitini yaratadi"],
      cons: ["Hamma ham qatnasha olmaydi", "Tanlov asosida — adolatli emas"],
      legal: "Qonuniy, lekin adolat jihatidan kamchilik bor.",
      ideal: false
    }
  ];

  const scenarioBox = document.getElementById("scenarioBox");
  const scenarioResult = document.getElementById("scenarioResult");
  const btnScenarioReset = document.getElementById("btnScenarioReset");

  function renderScenario() {
    scenarioBox.innerHTML = "";
    scenarioResult.innerHTML = "";
    scenarioData.forEach((s, i) => {
      const div = document.createElement("div");
      div.className = "scenario-opt";
      div.innerHTML = `<h4>${s.title}</h4><p>${s.desc}</p>`;
      div.addEventListener("click", () => showScenarioResult(i));
      scenarioBox.appendChild(div);
    });
  }

  function showScenarioResult(i) {
    const s = scenarioData[i];
    scenarioResult.innerHTML = `
      <h4>${s.title}</h4>
      <p><b>Afzalliklari:</b></p>
      <ul>${s.pros.map(p => `<li>✅ ${p}</li>`).join("")}</ul>
      <p><b>Kamchiliklari:</b></p>
      <ul>${s.cons.map(c => `<li>⚠️ ${c}</li>`).join("")}</ul>
      <p><b>Qonuniyligi:</b> ${s.legal}</p>
      <p><b>Jamoat manfaatiga ta'siri:</b> ${s.ideal ? "Yuqori — barchaga foyda." : "O'rtacha — hamma qamrab olinmaydi."}</p>
      <p style="margin-top:10px;color:${s.ideal ? "#38a169" : "#dd6b20"};font-weight:600;">
        ${s.ideal ? "✅ Bu maqbul yechim!" : "⚠️ Bu ideal emas. Boshqa variantni sinab ko'ring."}
      </p>
    `;
  }

  btnScenarioReset.addEventListener("click", renderScenario);
  renderScenario();

  /* ========== 5. MATCH ========== */
  const matchPairs = [
    { left: "Huquq", right: "Qonun bilan himoyalangan imkoniyat" },
    { left: "Burch", right: "Bajarilishi lozim bo'lgan majburiyat" },
    { left: "Javobgarlik", right: "O'z harakati va oqibatlari uchun mas'ul bo'lish" },
    { left: "Jamoat manfaati", right: "Jamiyat a'zolari uchun muhim umumiy manfaat" }
  ];

  const matchLeft = document.getElementById("matchLeft");
  const matchRight = document.getElementById("matchRight");
  const matchResult = document.getElementById("matchResult");
  const btnMatchCheck = document.getElementById("btnMatchCheck");
  const btnMatchReset = document.getElementById("btnMatchReset");
  let selectedLeft = null;
  let selectedRight = null;

  function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

  function renderMatch() {
    matchLeft.innerHTML = "";
    matchRight.innerHTML = "";
    matchResult.textContent = "";
    selectedLeft = null;
    selectedRight = null;

    shuffle(matchPairs).forEach(p => {
      const div = document.createElement("div");
      div.className = "match-item";
      div.textContent = p.left;
      div.dataset.key = p.left;
      div.addEventListener("click", () => selectLeft(div));
      matchLeft.appendChild(div);
    });

    shuffle(matchPairs).forEach(p => {
      const div = document.createElement("div");
      div.className = "match-item";
      div.textContent = p.right;
      div.dataset.key = p.left;
      div.addEventListener("click", () => selectRight(div));
      matchRight.appendChild(div);
    });
  }

  function selectLeft(el) {
    if (el.classList.contains("matched")) return;
    matchLeft.querySelectorAll(".match-item").forEach(i => i.classList.remove("selected"));
    el.classList.add("selected");
    selectedLeft = el;
    tryMatch();
  }

  function selectRight(el) {
    if (el.classList.contains("matched")) return;
    matchRight.querySelectorAll(".match-item").forEach(i => i.classList.remove("selected"));
    el.classList.add("selected");
    selectedRight = el;
    tryMatch();
  }

  function tryMatch() {
    if (selectedLeft && selectedRight) {
      if (selectedLeft.dataset.key === selectedRight.dataset.key) {
        selectedLeft.classList.add("matched");
        selectedRight.classList.add("matched");
        selectedLeft.classList.remove("selected");
        selectedRight.classList.remove("selected");
        selectedLeft = null;
        selectedRight = null;
      }
    }
  }

  btnMatchCheck.addEventListener("click", () => {
    const matched = matchLeft.querySelectorAll(".matched").length;
    matchResult.textContent = matched === matchPairs.length
      ? "🎉 Barcha juftliklar to'g'ri!"
      : `✅ ${matched} / ${matchPairs.length} juftlik topildi.`;
  });

  btnMatchReset.addEventListener("click", renderMatch);
  renderMatch();

  /* ========== 6. ORDER ========== */
  const orderSteps = [
    "Muammoni aniqlash",
    "Dalillar to'plash",
    "Huquqiy va ijtimoiy tahlil",
    "Yechimlarni ishlab chiqish",
    "Harakat rejasini tuzish",
    "Loyihani himoya qilish va refleksiya"
  ];

  const orderList = document.getElementById("orderList");
  const orderResult = document.getElementById("orderResult");
  const btnOrderCheck = document.getElementById("btnOrderCheck");
  const btnOrderReset = document.getElementById("btnOrderReset");

  function renderOrder() {
    orderResult.textContent = "";
    orderList.innerHTML = "";
    shuffle(orderSteps).forEach(step => {
      const li = document.createElement("li");
      li.className = "order-item";
      li.draggable = true;
      li.innerHTML = `<span>${step}</span><span>☰</span>`;
      addDragEvents(li);
      orderList.appendChild(li);
    });
  }

  let dragged = null;

  function addDragEvents(el) {
    el.addEventListener("dragstart", () => {
      dragged = el;
      el.classList.add("dragging");
    });
    el.addEventListener("dragend", () => {
      el.classList.remove("dragging");
      dragged = null;
    });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (!dragged || dragged === el) return;
      const rect = el.getBoundingClientRect();
      const next = (e.clientY - rect.top) / rect.height > 0.5;
      orderList.insertBefore(dragged, next ? el.nextSibling : el);
    });
  }

  btnOrderCheck.addEventListener("click", () => {
    const items = [...orderList.querySelectorAll(".order-item")];
    let correctCount = 0;
    items.forEach((item, i) => {
      const text = item.querySelector("span").textContent;
      const isCorrect = text === orderSteps[i];
      item.classList.toggle("correct", isCorrect);
      item.classList.toggle("wrong", !isCorrect);
      if (isCorrect) correctCount++;
    });
    orderResult.textContent = correctCount === orderSteps.length
      ? "🎉 Barcha bosqichlar to'g'ri tartibda!"
      : `✅ ${correctCount} / ${orderSteps.length} to'g'ri. Xatolar qizil bilan belgilandi.`;
  });

  btnOrderReset.addEventListener("click", renderOrder);
  renderOrder();

  /* ========== 7. REFLEKSIYA ========== */
  const reflectTextareas = document.querySelectorAll("#reflectionForm textarea");
  const STORAGE_KEY = "agar_men_reflection";

  function loadReflection() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      reflectTextareas.forEach(ta => {
        if (saved[ta.dataset.key]) ta.value = saved[ta.dataset.key];
      });
    } catch (e) { /* ignore */ }
  }

  function saveReflection() {
    const data = {};
    reflectTextareas.forEach(ta => { data[ta.dataset.key] = ta.value; });
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
  }

  reflectTextareas.forEach(ta => ta.addEventListener("input", saveReflection));
  loadReflection();

  document.getElementById("btnClearReflect").addEventListener("click", () => {
    if (!confirm("Barcha javoblarni tozalashni tasdiqlaysizmi?")) return;
    reflectTextareas.forEach(ta => ta.value = "");
    localStorage.removeItem(STORAGE_KEY);
  });

  document.getElementById("btnDownloadReflect").addEventListener("click", () => {
    const questions = [
      "1. Loyihada men shaxsan qanday vazifalarni bajardim?",
      "2. Qaysi huquqiy talab, qoida yoki cheklovni aniqladim?",
      "3. Jamoada qanday mas'uliyat, tashabbus yoki hamkorlik ko'rsatdim?",
      "4. To'plangan dalillar mening fikrimni qanday o'zgartirdi?",
      "5. Kelajakda ushbu muammo bo'yicha amalga oshira oladigan bitta real fuqarolik harakatim nima?",
      "6. Loyihani qayta bajarsam, qaysi faoliyatimni yaxshilagan bo'lardim?"
    ];
    let text = '"Agar men ..." — Individual refleksiya\n';
    text += "=".repeat(50) + "\n\n";
    reflectTextareas.forEach((ta, i) => {
      text += questions[i] + "\n";
      text += (ta.value || "(javob kiritilmagan)") + "\n\n";
    });
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "refleksiya.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  /* ========== 8. TABLAR ========== */
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

});