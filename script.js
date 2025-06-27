const startBtn = document.getElementById("start-button");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionTitle = document.getElementById("question-title");
const questionOptions = document.getElementById("question-options");
const resultTitle = document.getElementById("result-title");
const resultDesc = document.getElementById("result-desc");
const restartBtn = document.getElementById("restart-button");
const bgm = document.getElementById("bgm");

const questions = [
  {
    text: "친구가 충전기를 들고 왔을 때 나는?",
    options: [
      { text: "이건 어떻게 작동할까? 내부 구조가 궁금하다!", type: "에너지" },
      { text: "이걸 더 작고 효율적으로 만들 수 없을까?", type: "발명" },
      { text: "정비나 납땜이 잘 되어있는지 먼저 본다", type: "용접" },
      { text: "이게 전체 시스템 안에서 어떤 역할을 할까?", type: "설비" },
      { text: "이걸 3D 프린터로 복제할 수 있을까?", type: "3D프린터" }
    ]
  },
  {
    text: "지하철을 타고 있을 때 나는?",
    options: [
      { text: "안에 있는 장비들이 어떻게 연결되어 있을지 궁금해요!", type: "설비" },
      { text: "문 닫히는 타이밍, 구조물의 용접 부위가 보여요", type: "용접" },
      { text: "다른 노선의 동작 방식이 떠올라요", type: "에너지" },
      { text: "이걸 더 편리하게 개선할 아이디어가 떠올라요", type: "발명" },
      { text: "이 열차를 미니어처로 프린팅해보고 싶어요", type: "3D프린터" }
    ]
  },
  {
    text: "손으로 무언가 만드는 걸 좋아한다면?",
    options: [
      { text: "3D 모델링 후 출력까지 하는 게 좋아요", type: "3D프린터" },
      { text: "손으로 직접 용접하며 결과물이 나오는 게 좋아요", type: "용접" },
      { text: "설계부터 배관까지 전체를 보는 게 좋아요", type: "설비" },
      { text: "기존에 없던 걸 창의적으로 만들어내는 게 좋아요", type: "발명" },
      { text: "실생활 전기 회로를 손으로 만들어보는 게 좋아요", type: "에너지" }
    ]
  },
  {
    text: "학교에서 제일 흥미로웠던 건?",
    options: [
      { text: "모형 도시에서 조명이나 냉난방 흐름을 제어한 수업", type: "설비" },
      { text: "전기나 회로 실습하며 불이 들어오는 순간", type: "에너지" },
      { text: "뭔가를 불꽃으로 녹여서 붙이는 실습", type: "용접" },
      { text: "내가 만든 디자인이 실제 물건으로 출력된 순간", type: "3D프린터" },
      { text: "아무도 생각 못한 새로운 기능을 만든 순간", type: "발명" }
    ]
  },
  {
    text: "나를 가장 잘 설명하는 말은?",
    options: [
      { text: "호기심이 많고 남들이 안 보는 부분이 궁금해요", type: "에너지" },
      { text: "언제나 뭔가 새롭게 만들고 싶어요", type: "발명" },
      { text: "꼼꼼하게 세밀한 작업을 잘해요", type: "용접" },
      { text: "전체를 보고 연결짓는 게 재밌어요", type: "설비" },
      { text: "디자인과 기술의 융합이 좋아요", type: "3D프린터" }
    ]
  }
];

const results = {
  "발명": {
    title: "창의력 폭발! '차세대 에디슨' 타입!",
    desc: "당신은 번뜩이는 아이디어로 세상을 바꿀 발명가 자질이 보입니다!",
    jobs: ["제품 디자이너", "테크벤처 창업자", "로봇 발명가"]
  },
  "에너지": {
    title: "미래를 밝히다! '그린 에너지 리더' 타입!",
    desc: "당신은 똑똑한 에너지 전문가가 될 자질이 충분합니다!",
    jobs: ["전기기술자", "태양광 발전 설계자", "에너지 컨설턴트"]
  },
  "용접": {
    title: "강철의 마에스트로! '용접 명장' 타입!",
    desc: "산업 현장의 핵심, 정밀한 용접 전문가의 길이 열려있습니다!",
    jobs: ["용접사", "구조물 제작 전문가", "자동차 조립 전문가"]
  },
  "설비": {
    title: "스마트 시티 설계자! '플랜트 마스터' 타입!",
    desc: "도시의 기능을 책임지는 멋진 설비 전문가가 될 수 있습니다!",
    jobs: ["설비기사", "배관설계사", "스마트시티 구축 기술자"]
  },
  "3D프린터": {
    title: "상상을 현실로! '디지털 대장장이' 타입!",
    desc: "무엇이든 만들어내는 4차 산업혁명의 핵심 인재입니다!",
    jobs: ["3D 모델러", "산업 디자이너", "제품 시제품 전문가"]
  }
};

let currentQuestion = 0;
let answers = {};

startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  bgm.play();
  loadQuestion();
});

restartBtn.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
  currentQuestion = 0;
  answers = {};
});

function loadQuestion() {
  const question = questions[currentQuestion];
  questionTitle.textContent = question.text;
  questionOptions.innerHTML = "";

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("upgrade-item");
    btn.innerHTML = `<span class="item-name">${option.text}</span>`;
    btn.addEventListener("click", () => handleAnswer(option.type));
    questionOptions.appendChild(btn);
  });
}

function handleAnswer(type) {
  answers[type] = (answers[type] || 0) + 1;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let resultType = Object.keys(answers).reduce((a, b) =>
    answers[a] > answers[b] ? a : b
  );

  const result = results[resultType];

  resultTitle.textContent = result.title;
  resultDesc.innerHTML = `
    ${result.desc}<br><br>
    <strong>어울리는 직업:</strong><br>
    ${result.jobs.map(job => `🌟 ${job}`).join("<br>")}
  `;
}
