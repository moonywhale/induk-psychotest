const questions = [
  {
    q: "1. 가장 마음이 편한 공간은 어디인가요?",
    icon: "🏞️",
    answers: [
      { text: "복잡한 상상을 펼칠 수 있는 내 방 책상 앞", type: "발명" },
      { text: "햇빛이 비추는 따뜻한 창가", type: "에너지" },
      { text: "단단한 금속이 얽혀있는 커다란 구조물 옆", type: "용접" },
      { text: "위잉 위잉 소리가 복잡하게 얽힌 기계실", type: "설비" },
      { text: "컴퓨터 앞에 앉아 3D모델링 중", type: "3D프린터" }
    ]
  },
  {
    q: "2. 나는 어떤 말을 많이 하나요?",
    icon: "💬",
    answers: [
      { text: "'이거 이렇게 한번 해보면 어때요?'", type: "발명" },
      { text: "'에너지 낭비 아니에요?'", type: "에너지" },
      { text: "'와 이건 어떻게 붙어있어요?'", type: "용접" },
      { text: "'이건 대체 어디로 연결되어 있어요?'", type: "설비" },
      { text: "'이거 이렇게 만들 수 있어요?'", type: "3D프린터" }
    ]
  },
  {
    q: "3. 상상 속에서 더 자주 떠오르는 모습은?",
    icon: "🧠",
    answers: [
      { text: "머릿속에서 이것 저것 조립되는 장면", type: "발명" },
      { text: "자동차가 날아다니는 등 자연과 조화를 이루는 미래 도시", type: "에너지" },
      { text: "망치와 불꽃, 철판이 어우러지는 작업 현장", type: "용접" },
      { text: "파이프가 미로처럼 얽힌 도시 구조", type: "설비" },
      { text: "3D 프린터가 움직이며 결과물이 나오는 장면", type: "3D프린터" }
    ]
  },
  {
    q: "4. 만약 내가 직장인이라면 어떤 역할을 맡고 싶나요?",
    icon: "🛠️",
    answers: [
      { text: "무에서 유를 창조하는 기획자", type: "발명" },
      { text: "에너지를 효율적으로 분배하는 관리자", type: "에너지" },
      { text: "모든 걸 정교하게 연결하는 기술자", type: "용접" },
      { text: "복잡한 구조를 해석하는 설계자", type: "설비" },
      { text: "상상력을 출력하는 조형 디자이너", type: "3D프린터" }
    ]
  },
  {
    q: "5. 당신이 주변 친구들에게 가장 듣고 싶은 말은?",
    icon: "✨",
    answers: [
      { text: "와! 그건 정말 기발한 생각이야!", type: "발명" },
      { text: "너는 환경 생각을 많이 하는 구나 대단해!", type: "에너지" },
      { text: "이렇게 튼튼하게 만든 사람 처음 봐!", type: "용접" },
      { text: "이 설계 덕분에 모든 게 잘 연결돼", type: "설비" },
      { text: "이거 진짜 출력했어? 실화야?", type: "3D프린터" }
    ]
  }
];

const results = {
  "발명": {
    title: "💡창의력 폭발! '차세대 에디슨' 타입!",
    desc: "당신은 번뜩이는 아이디어로 세상을 바꿀 발명가 자질이 보입니다!",
    job: "추천 직업: 메이커, 발명가, UX 디자이너"
  },
  "에너지": {
    title: "♻️미래를 밝히다! '그린 에너지 리더' 타입!",
    desc: "당신은 똑똑한 에너지 전문가가 될 자질이 충분합니다!",
    job: "추천 직업: 전기공학자, 태양광설계사"
  },
  "용접": {
    title: "👨‍🏭강철의 마에스트로! '용접 명장' 타입!",
    desc: "산업 현장의 핵심, 정밀한 용접 전문가의 길이 열려있습니다!",
    job: "추천 직업: 특수용접사, 구조물 제작자"
  },
  "설비": {
    title: "🌱스마트 시티 설계자! '플랜트 마스터' 타입!",
    desc: "도시의 기능을 책임지는 멋진 설비 전문가가 될 수 있습니다!",
    job: "추천 직업: 배관설계사, 설비 엔지니어"
  },
  "3D프린터": {
    title: "⚒️상상을 현실로! '디지털 대장장이' 타입!",
    desc: "무엇이든 만들어내는 4차 산업혁명의 핵심 인재입니다!",
    job: "추천 직업: 3D디자이너, 제품설계자"
  }
};

let current = 0;
let score = {};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("start-button").addEventListener("click", startTest);
});

function startTest() {
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("question-screen").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerHTML = `${q.icon} ${q.q}`;
  document.getElementById("options").innerHTML = q.answers.map((a) =>
    `<button onclick="chooseAnswer('${a.type}')">${a.text}</button>`
  ).join("<br><br>");
}

function chooseAnswer(type) {
  score[type] = (score[type] || 0) + 1;
  nextQuestion();
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  document.getElementById("question-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  const best = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);
  document.getElementById("result-title").textContent = results[best].title;
  document.getElementById("result-description").textContent = results[best].desc;
  document.getElementById("result-job").textContent = results[best].job;
}

function restartTest() {
  current = 0;
  score = {};
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}
