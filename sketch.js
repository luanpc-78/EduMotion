let video;
let poseNet;
let poses = [];

const HOLD_FRAMES = 45;
const MAX_SQUATS_PER_ROUND = 3;
const QUESTION_BANKS = {
  math: [
    ["Số nào lớn hơn?", ["7", "5", "3", "1"], "A"], ["2 + 3 bằng mấy?", ["4", "5", "6", "7"], "B"],
    ["Hình nào có 3 cạnh?", ["Hình tròn", "Hình vuông", "Tam giác", "Hình chữ nhật"], "C"], ["Số nào nhỏ hơn?", ["9", "8", "2", "6"], "C"],
    ["5 - 2 bằng mấy?", ["1", "2", "3", "4"], "C"], ["Một tuần có mấy ngày?", ["5", "6", "7", "8"], "C"],
    ["Số nào là số chẵn?", ["3", "5", "8", "9"], "C"], ["4 + 4 bằng mấy?", ["6", "7", "8", "9"], "C"],
    ["Hình nào có 4 cạnh bằng nhau?", ["Tam giác", "Hình vuông", "Hình tròn", "Hình oval"], "B"], ["10 chia 2 bằng mấy?", ["2", "4", "5", "8"], "C"],
    ["3 + 6 bằng mấy?", ["7", "8", "9", "10"], "C"], ["Số nào đứng sau 8?", ["6", "7", "9", "10"], "C"],
    ["Có bao nhiêu tháng trong một năm?", ["10", "11", "12", "13"], "C"], ["Số nào là số lẻ?", ["2", "4", "6", "7"], "D"],
    ["7 - 4 bằng mấy?", ["2", "3", "4", "5"], "B"], ["Hình nào không có góc?", ["Hình tròn", "Hình vuông", "Tam giác", "Hình chữ nhật"], "A"],
    ["Số nào lớn nhất?", ["12", "21", "9", "18"], "B"], ["Một nửa của 10 là mấy?", ["2", "4", "5", "8"], "C"],
    ["2 x 3 bằng mấy?", ["5", "6", "7", "8"], "B"], ["Số nào bằng 5 + 5?", ["8", "9", "10", "11"], "C"]
  ],
  vietnamese: [
    ["Từ nào chỉ người?", ["bàn", "mẹ", "đẹp", "chạy"], "B"], ["Từ trái nghĩa với ‘cao’?", ["thấp", "dài", "to", "rộng"], "A"],
    ["Câu nào là câu hỏi?", ["Bạn đi đâu?", "Em học bài.", "Trời rất đẹp.", "Hãy đứng lên."], "A"], ["Từ nào là từ chỉ hoạt động?", ["xanh", "chạy", "cái bàn", "niềm vui"], "B"],
    ["Từ nào viết đúng?", ["xắp xếp", "sắp xếp", "xắp sếp", "sắp xép"], "B"], ["Ai là nhân vật?", ["cây bàng", "bạn Lan", "màu đỏ", "chạy nhanh"], "B"],
    ["Từ nào chỉ đặc điểm?", ["nhảy", "bông hoa", "xinh đẹp", "em bé"], "C"], ["Dấu câu kết thúc câu hỏi là gì?", [".", "!", ",", "?"], "D"],
    ["Từ nào cùng nghĩa với ‘siêng năng’?", ["lười biếng", "chăm chỉ", "ồn ào", "nhanh nhẹn"], "B"], ["Tiếng Việt có mấy dấu thanh?", ["3", "4", "5", "6"], "C"],
    ["Từ nào chỉ đồ vật?", ["chạy", "quyển vở", "xinh", "vui"], "B"], ["Từ nào là từ láy?", ["lung linh", "học sinh", "bàn ghế", "con mèo"], "A"],
    ["Câu kể thường kết thúc bằng dấu gì?", [".", "?", "!", ","], "A"], ["Từ nào viết đúng?", ["nghỉ hè", "ngĩ hè", "nghỉ hề", "ngĩ hề"], "A"],
    ["Từ nào chỉ màu sắc?", ["đỏ", "chạy", "cười", "bàn"], "A"], ["Từ nào trái nghĩa với ‘nhanh’?", ["vui", "chậm", "cao", "sáng"], "B"],
    ["Trong câu ‘Lan đọc sách’, ai đọc sách?", ["Lan", "sách", "đọc", "câu"], "A"], ["Từ nào chỉ con vật?", ["bông hoa", "con mèo", "màu xanh", "chạy nhảy"], "B"],
    ["Dấu phẩy dùng để làm gì?", ["ngăn cách ý", "kết thúc câu hỏi", "bắt đầu câu", "thay chữ cái"], "A"], ["Từ nào có tiếng ‘học’?", ["học bài", "bông hoa", "con cá", "màu đỏ"], "A"]
  ],
  english: [
    ["What color is the sun?", ["Blue", "Yellow", "Green", "Black"], "B"], ["Choose an animal.", ["Apple", "Run", "Cat", "Red"], "C"],
    ["How many legs does a dog have?", ["Two", "Three", "Four", "Five"], "C"], ["‘Xin chào’ in English is...", ["Goodbye", "Hello", "Thanks", "Sorry"], "B"],
    ["Choose a fruit.", ["Car", "Book", "Banana", "Chair"], "C"], ["What is the opposite of big?", ["Tall", "Small", "Fast", "Long"], "B"],
    ["Complete: I ___ happy.", ["am", "is", "are", "be"], "A"], ["Which one is a number?", ["Seven", "School", "Happy", "Green"], "A"],
    ["What do bees make?", ["Milk", "Honey", "Bread", "Water"], "B"], ["Choose the correct greeting.", ["Good morning", "Good night sky", "Thank book", "Hello apple"], "A"],
    ["What color is grass?", ["Green", "Purple", "Black", "Pink"], "A"], ["Choose a school object.", ["Pencil", "Tiger", "Banana", "Blue"], "A"],
    ["How many eyes do you have?", ["One", "Two", "Three", "Four"], "B"], ["Complete: She ___ a student.", ["am", "is", "are", "be"], "B"],
    ["What is the opposite of hot?", ["Cold", "Fast", "Big", "Long"], "A"], ["Choose a body part.", ["Hand", "House", "Horse", "Hat"], "A"],
    ["Which word means ‘mèo’?", ["Dog", "Cat", "Bird", "Fish"], "B"], ["Complete: They ___ friends.", ["am", "is", "are", "be"], "C"],
    ["What shape is a ball?", ["Round", "Square", "Flat", "Long"], "A"], ["Choose a drink.", ["Water", "Chair", "Table", "Shoe"], "A"]
  ]
};

const UI_TEXT = {
  vi: { title: "Chọn đáp án bằng cơ thể", instruction: "Giữ đúng tư thế cho đến khi vòng tiến trình đầy.", startTitle: "Chọn môn học", startInstruction: "Chọn một môn để bắt đầu lượt chơi 10 câu.", start: "Bắt đầu", mirror: "Tấm gương của bạn", question: "Câu hỏi", hold: "Giữ cử chỉ", ready: "Đã thấy bạn", away: "Lùi lại một bước", dark: "Chế độ tối", sound: "Âm thanh", squat: "Cho phép squat", keyboard: "Bàn phím", finish: "Lượt chơi hoàn thành!", summary: "Bạn đã hoàn thành 10 câu.", continue: "Chơi tiếp", restart: "Chơi lại", prompt: "Hãy chọn một đáp án nhé!", done: "Đã hoàn thành", history: "Lịch sử chơi gần nhất", subjects: ["Toán", "Tiếng Việt", "Tiếng Anh"] },
  en: { title: "Choose with your body", instruction: "Hold the pose until the progress circle is full.", startTitle: "Choose a subject", startInstruction: "Choose a subject to start a 10-question round.", start: "Start", mirror: "Your mirror", question: "Question", hold: "Hold pose", ready: "I see you", away: "Step back", dark: "Dark mode", sound: "Sound", squat: "Allow squat", keyboard: "Keyboard", finish: "Round complete!", summary: "You completed 10 questions.", continue: "Continue", restart: "Play again", prompt: "Choose an answer!", done: "Complete", history: "Recent play history", subjects: ["Math", "Vietnamese", "English"] }
};

let score = 0;
let correctAnswers = 0;
let activeSeconds = 0;
let currentQuestion = 0;
let heldAction = "";
let holdFrames = 0;
let questionLocked = false;
let gameFinished = false;
let selectedSubject = "english";
let language = "vi";
let questionBanksPlayed = 0;
let gameStarted = false;
let squatCount = 0;
let fpsSamples = [];
let minimumFps = Infinity;
let actionStartedAt = 0;
let poseCanvas;
let roundRecords = [];
let currentRoundQuestions = [];

function setup() {
  poseCanvas = createCanvas(640, 480);
  poseCanvas.parent("canvas-container");
  document.querySelectorAll(".start-subject").forEach(button => button.classList.toggle("active", button.dataset.subject === selectedSubject));
  document.querySelectorAll(".subject-button").forEach(button => button.classList.toggle("active", button.dataset.subject === selectedSubject));
  prepareRoundQuestions();
  renderQuestion();
  updateNetworkState();
  renderRecentHistory();

  setInterval(() => {
    if (poses.length > 0 && !gameFinished) {
      activeSeconds++;
      updateText("time-val", formatTime(activeSeconds));
    }
  }, 1000);
}

function modelReady() {
  setStatus("ready", currentLanguage().ready);
}

function draw() {
  if (!video) return;
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  drawSkeleton();
  drawKeypoints();
  pop();

  recordFrameRate();
  updatePoseStatus();
  detectAction();
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  document.getElementById("start-screen").classList.add("hidden");
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function(results) {
    poses = results;
  });
  video.hide();
}

function confidence(point) {
  return point ? (point.confidence || point.score || 0) : 0;
}

function reliable(...points) {
  return points.every(point => point && confidence(point) > 0.35);
}

function isHandRaised(hand, shoulder) {
  return reliable(hand, shoulder) && hand.y < shoulder.y - Math.max(18, height * 0.035);
}

function angleAt(first, middle, last) {
  const firstAngle = Math.atan2(first.y - middle.y, first.x - middle.x);
  const lastAngle = Math.atan2(last.y - middle.y, last.x - middle.x);
  let degrees = Math.abs((firstAngle - lastAngle) * 180 / Math.PI);
  return degrees > 180 ? 360 - degrees : degrees;
}

function isSquatting(pose) {
  if (!reliable(pose.leftHip, pose.rightHip, pose.leftKnee, pose.rightKnee, pose.leftAnkle, pose.rightAnkle)) return false;
  const leftKneeAngle = angleAt(pose.leftHip, pose.leftKnee, pose.leftAnkle);
  const rightKneeAngle = angleAt(pose.rightHip, pose.rightKnee, pose.rightAnkle);
  const hipDrop = ((pose.leftKnee.y + pose.rightKnee.y) / 2) - ((pose.leftHip.y + pose.rightHip.y) / 2);
  return hipDrop > height * 0.08 && leftKneeAngle <= 155 && rightKneeAngle <= 155;
}

function getLeanAction(pose) {
  if (!reliable(pose.leftShoulder, pose.rightShoulder, pose.leftHip, pose.rightHip)) return "";
  const shoulderX = (pose.leftShoulder.x + pose.rightShoulder.x) / 2;
  const shoulderY = (pose.leftShoulder.y + pose.rightShoulder.y) / 2;
  const hipX = (pose.leftHip.x + pose.rightHip.x) / 2;
  const hipY = (pose.leftHip.y + pose.rightHip.y) / 2;
  const trunkHeight = Math.max(hipY - shoulderY, 1);
  const leanRatio = (shoulderX - hipX) / trunkHeight;
  if (leanRatio <= -0.28) return "LEAN_LEFT";
  if (leanRatio >= 0.28) return "LEAN_RIGHT";
  return "";
}

function getDetectedAction(pose) {
  const leftHandRaised = isHandRaised(pose.leftWrist, pose.leftShoulder);
  const rightHandRaised = isHandRaised(pose.rightWrist, pose.rightShoulder);
  if (leftHandRaised && rightHandRaised) return "C";
  if (leftHandRaised) return "A";
  if (rightHandRaised) return "B";
  if (document.getElementById("squat-toggle").checked && squatCount < MAX_SQUATS_PER_ROUND && isSquatting(pose)) return "D";
  return getLeanAction(pose);
}

function actionLabel(action) {
  const labels = { A: "Giơ tay trái · A", B: "Giơ tay phải · B", C: "Hai tay lên · C", D: "Squat · D", LEAN_LEFT: "Nghiêng trái · Sai", LEAN_RIGHT: "Nghiêng phải · Đúng" };
  return labels[action] || "Chưa thấy";
}

function detectAction() {
  if (gameFinished || questionLocked) return;
  let action = "";
  if (poses.length > 0 && poses[0].pose) action = getDetectedAction(poses[0].pose);
  updateText("current-action", actionLabel(action));
  if (!action) {
    heldAction = "";
    holdFrames = 0;
    updateHoldProgress();
    hideOverlay();
    return;
  }
  showOverlay(actionLabel(action));
  if (action !== heldAction) {
    heldAction = action;
    holdFrames = 0;
    actionStartedAt = performance.now();
  }
  holdFrames = Math.min(HOLD_FRAMES, holdFrames + 1);
  updateHoldProgress();
  if (holdFrames >= HOLD_FRAMES) {
    if (["A", "B", "C", "D"].includes(action)) {
      completeChoice(action, performance.now());
    } else if (["LEAN_LEFT", "LEAN_RIGHT"].includes(action)) {
      const currentAnswer = getQuestions()[currentQuestion].correct;
      if (["TRUE", "FALSE"].includes(currentAnswer)) {
        completeChoice(action === "LEAN_RIGHT" ? "TRUE" : "FALSE", performance.now());
      }
    }
  }
}

function completeChoice(choice, confirmedAt = performance.now()) {
  if (questionLocked || gameFinished) return;
  questionLocked = true;
  const question = getQuestions()[currentQuestion];
  const responseLatency = Math.round(performance.now() - confirmedAt);
  updateText("latency-val", `${responseLatency} ms`);
  const isCorrect = choice === question.correct;
  if (choice === "D") {
    squatCount++;
    updateText("squat-limit", `Squat liên tiếp: ${squatCount} / ${MAX_SQUATS_PER_ROUND}`);
    updateSquatDots();
  }
  if (isCorrect) {
    correctAnswers++;
    score += 10;
  }
  roundRecords.push({
    questionNumber: currentQuestion + 1,
    question: question.text,
    selected: choice,
    correct: question.correct,
    isCorrect,
    score,
    latency: responseLatency,
    fps: Math.round(frameRate()),
    image: poseCanvas && poseCanvas.elt ? poseCanvas.elt.toDataURL("image/jpeg", 0.82) : ""
  });
  updateText("score-val", score);
  updateText("correct-val", correctAnswers);
  setAnswerState(choice, isCorrect ? "good" : "wrong");
  showFeedback(isCorrect ? "Giỏi lắm! Chính xác ✦" : `Gần đúng rồi! Đáp án là ${question.correct}. Cố lên nhé!`, isCorrect);
  playFeedbackSound(isCorrect);
  window.setTimeout(nextQuestion, 1250);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= getQuestions().length) {
    gameFinished = true;
    saveRoundHistory();
    updateText("question", `${currentLanguage().finish} ${correctAnswers}/${getQuestions().length}.`);
    updateText("question-label", currentLanguage().finish);
    updateText("end-title", currentLanguage().finish);
    updateText("end-summary", `${currentLanguage().summary} ${correctAnswers}/${getQuestions().length}.`);
    showFeedback(currentLanguage().restart, true);
    updateText("round-count", currentLanguage().done);
    setProgress(100);
    updateEndRoundSummary();
    document.getElementById("end-panel").classList.add("visible");
    document.querySelector(".workspace").style.display = "none";
    downloadRoundReport();
    return;
  }
  questionLocked = false;
  heldAction = "";
  holdFrames = 0;
  renderQuestion();
}

function renderQuestion() {
  const question = getQuestions()[currentQuestion];
  const text = currentLanguage();
  updateText("round-count", `${text.question} ${currentQuestion + 1} / ${getQuestions().length}`);
  updateText("question-label", `${text.question} ${currentQuestion + 1}`);
  updateText("question", question.text);
  ["A", "B", "C", "D"].forEach((choice, index) => updateText(`choice-${choice.toLowerCase()}`, question.choices[index]));
  document.querySelectorAll(".answer").forEach(button => button.classList.remove("active"));
  showFeedback(text.prompt, false, false);
  updateHoldProgress();
  setProgress((currentQuestion / getQuestions().length) * 100);
}

function updateEndRoundSummary() {
  const subjectNames = {
    math: language === "vi" ? "Toán" : "Math",
    vietnamese: language === "vi" ? "Tiếng Việt" : "Vietnamese",
    english: language === "vi" ? "Tiếng Anh" : "English"
  };
  const averageFps = fpsSamples.length ? Math.round(fpsSamples.reduce((sum, value) => sum + value, 0) / fpsSamples.length) : 0;
  const lastRecord = roundRecords[roundRecords.length - 1];
  updateText("end-subject", subjectNames[selectedSubject]);
  updateText("end-score", score);
  updateText("end-correct", `${correctAnswers} / ${getQuestions().length}`);
  updateText("end-time", formatTime(activeSeconds));
  updateText("end-fps-average", averageFps);
  updateText("end-fps-minimum", minimumFps === Infinity ? 0 : minimumFps);
  updateText("end-latency", lastRecord ? `${lastRecord.latency} ms` : "-- ms");
}

function resetGame() {
  score = 0;
  correctAnswers = 0;
  activeSeconds = 0;
  currentQuestion = 0;
  heldAction = "";
  holdFrames = 0;
  questionLocked = false;
  gameFinished = false;
  squatCount = 0;
  fpsSamples = [];
  minimumFps = Infinity;
  roundRecords = [];
  prepareRoundQuestions();
  updateText("score-val", 0);
  updateText("correct-val", 0);
  updateText("time-val", "00:00");
  updateText("latency-val", "-- ms");
  updateText("squat-limit", `Squat liên tiếp: 0 / ${MAX_SQUATS_PER_ROUND}`);
  updateSquatDots();
  document.getElementById("end-panel").classList.remove("visible");
  document.querySelector(".workspace").style.display = "grid";
  renderQuestion();
}

function escapeReportText(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
}

function downloadRoundReport() {
  const subjectNames = { math: "Toán / Math", vietnamese: "Tiếng Việt / Vietnamese", english: "Tiếng Anh / English" };
  const averageFps = fpsSamples.length ? Math.round(fpsSamples.reduce((sum, value) => sum + value, 0) / fpsSamples.length) : 0;
  const currentFps = document.getElementById("fps-val").textContent;
  const currentAction = document.getElementById("current-action").textContent;
  const latency = document.getElementById("latency-val").textContent;
  const reportSummary = `
    <section class="summary-grid">
      <article class="summary-card"><h2>Điểm của bạn</h2><strong class="score">${score}</strong><div class="summary-row"><span>Đúng</span><b>${correctAnswers}</b></div><div class="summary-row"><span>Thời gian</span><b>${formatTime(activeSeconds)}</b></div></article>
      <article class="summary-card"><h2>Trạng thái</h2><div class="status-grid"><div><span>Cử chỉ</span><b>${escapeReportText(currentAction)}</b></div><div><span>FPS</span><b>${escapeReportText(currentFps)}</b></div><div><span>FPS TB</span><b>${averageFps}</b></div><div><span>FPS thấp nhất</span><b>${minimumFps === Infinity ? 0 : minimumFps}</b></div><div><span>Phản hồi</span><b>${escapeReportText(latency)}</b></div></div></article>
    </section>`;
  const cards = roundRecords.map(record => `
    <article class="result ${record.isCorrect ? "correct" : "incorrect"}">
      <img src="${record.image}" alt="Pose question ${record.questionNumber}">
      <div><h2>Question ${record.questionNumber}: ${escapeReportText(record.question)}</h2>
      <p>Selected: <b>${escapeReportText(record.selected)}</b> · Correct: <b>${escapeReportText(record.correct)}</b> · ${record.isCorrect ? "Correct" : "Needs practice"}</p>
      <p>Score: ${record.score} · Response: ${record.latency} ms · FPS: ${record.fps}</p></div>
    </article>`).join("");
  const report = `<!doctype html><html lang="vi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EduMotion report</title><style>body{margin:0;padding:24px;font-family:Arial,sans-serif;background:#f5f7fa;color:#17324d}main{max-width:980px;margin:auto}header,.summary-card{background:#fff;padding:22px;border-radius:16px;margin-bottom:16px}.summary-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}.summary-card h2{font-size:1rem;margin:0 0 10px;color:#587087;text-transform:uppercase}.score{display:block;font-size:3rem;margin-bottom:8px}.summary-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #d9e2e9}.summary-row b,.status-grid b{color:#2d75d6}.status-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.status-grid div{padding:9px;border-radius:8px;background:#e3f0ff}.status-grid span{display:block;font-size:.75rem;color:#587087}.result{display:grid;grid-template-columns:280px 1fr;gap:18px;align-items:center;background:#fff;padding:14px;margin:12px 0;border-left:8px solid #dc5d69;border-radius:12px}.result.correct{border-left-color:#2c9b68}.result img{width:100%;border-radius:8px;background:#193047}.result h2{font-size:1.15rem;margin:0 0 10px}.result p{line-height:1.5}@media(max-width:650px){.summary-grid,.result{grid-template-columns:1fr}}</style></head><body><main><header><h1>EduMotion</h1><p>Môn học: ${escapeReportText(subjectNames[selectedSubject])} · Ngôn ngữ: ${escapeReportText(language)} · Thời điểm: ${new Date().toLocaleString()}</p></header>${reportSummary}<h2>Chi tiết từng câu</h2>${cards}</main></body></html>`;
  const blob = new Blob([report], { type: "text/html;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `edumotion-${selectedSubject}-${Date.now()}.html`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function getQuestions() {
  return currentRoundQuestions;
}

function prepareRoundQuestions() {
  const bank = QUESTION_BANKS[selectedSubject];
  const shuffled = bank.slice();
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  currentRoundQuestions = shuffled.slice(0, 10).map(item => ({
    text: item[0],
    choices: item[1],
    correct: item[2]
  }));
}

function currentLanguage() {
  return UI_TEXT[language];
}

function applyLanguage() {
  const text = currentLanguage();
  document.documentElement.lang = language;
  updateText("start-title", text.startTitle);
  updateText("start-instruction", text.startInstruction);
  updateText("start-button", text.start);
  updateText("game-title", text.title);
  updateText("game-instruction", text.instruction);
  updateText("mirror-title", text.mirror);
  updateText("hold-label", text.hold);
  updateText("dark-label", text.dark);
  updateText("sound-label", text.sound);
  updateText("squat-label", text.squat);
  updateText("keyboard-label", text.keyboard);
  updateText("end-title", text.finish);
  updateText("end-summary", text.summary);
  updateText("continue-button", text.continue);
  updateText("restart-button", text.restart);
  updateText("history-title", text.history);
  document.querySelector('[data-subject="math"]').textContent = text.subjects[0];
  document.querySelector('[data-subject="vietnamese"]').textContent = text.subjects[1];
  document.querySelector('[data-subject="english"]').textContent = text.subjects[2];
  renderRecentHistory();
  if (gameFinished) {
    updateText("end-title", text.finish);
    updateText("end-summary", `${text.summary} ${correctAnswers}/${getQuestions().length}.`);
    updateText("continue-button", text.continue);
    updateText("restart-button", text.restart);
    updateEndRoundSummary();
  } else {
    renderQuestion();
  }
}

function selectSubject(subject) {
  selectedSubject = subject;
  document.querySelectorAll(".subject-button").forEach(button => button.classList.toggle("active", button.dataset.subject === subject));
  resetGame();
}

function continueToNextSubject() {
  const subjects = ["math", "vietnamese", "english"];
  const nextIndex = (subjects.indexOf(selectedSubject) + 1) % subjects.length;
  selectSubject(subjects[nextIndex]);
}

function saveRoundHistory() {
  const averageFps = fpsSamples.length ? Math.round(fpsSamples.reduce((sum, value) => sum + value, 0) / fpsSamples.length) : 0;
  const historyEntry = {
    subject: selectedSubject,
    score,
    correct: correctAnswers,
    total: getQuestions().length,
    time: formatTime(activeSeconds),
    averageFps,
    date: new Date().toLocaleString()
  };
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("edumotion-recent-history") || "[]");
  } catch (error) {
    history = [];
  }
  history.unshift(historyEntry);
  try {
    localStorage.setItem("edumotion-recent-history", JSON.stringify(history.slice(0, 5)));
  } catch (error) {
    // The game still works when browser storage is unavailable.
  }
  renderRecentHistory();
}

function renderRecentHistory() {
  const historyList = document.getElementById("history-list");
  if (!historyList) return;
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("edumotion-recent-history") || "[]");
  } catch (error) {
    history = [];
  }
  const subjectNames = currentLanguage().subjects;
  const subjectKeys = ["math", "vietnamese", "english"];
  historyList.innerHTML = history.length ? history.map(entry => {
    const subjectIndex = subjectKeys.indexOf(entry.subject);
    return `<div class="history-item"><span>${escapeReportText(subjectNames[subjectIndex] || entry.subject)}</span><b>${entry.score} điểm</b><span>${entry.correct}/${entry.total} đúng</span><span>${escapeReportText(entry.date)}</span></div>`;
  }).join("") : `<div class="history-item"><span>Chưa có lượt chơi trước.</span></div>`;
}

function updatePoseStatus() {
  if (poses.length === 0) {
    setStatus("waiting", currentLanguage().away);
    return;
  }
  const visiblePoints = poses[0].pose.keypoints.filter(point => point.score > 0.3).length;
  setStatus(visiblePoints >= 8 ? "ready" : "waiting", visiblePoints >= 8 ? currentLanguage().ready : (language === "vi" ? "Thiếu sáng" : "Low light"));
}

function setStatus(type, text) {
  const status = document.getElementById("status");
  if (!status) return;
  status.className = `status ${type === "ready" ? "ready" : type === "error" ? "error" : ""}`;
  updateText("status-text", text);
}

function updateHoldProgress() {
  const progress = Math.round((holdFrames / HOLD_FRAMES) * 100);
  document.getElementById("hold-progress").style.width = `${progress}%`;
  updateText("hold-label", progress ? `Giữ ${progress}%` : "Giữ cử chỉ");
}

function updateSquatDots() {
  document.querySelectorAll(".squat-dot").forEach((dot, index) => {
    dot.classList.toggle("used", index < squatCount);
  });
}

function setProgress(percent) {
  document.getElementById("round-progress").style.width = `${Math.min(100, percent)}%`;
}

function setAnswerState(choice, state) {
  document.querySelectorAll(".answer").forEach(button => button.classList.remove("active"));
  const button = document.querySelector(`.answer[data-choice="${choice}"]`);
  if (button) button.classList.add("active");
  if (state === "wrong") window.setTimeout(() => button && button.classList.remove("active"), 1100);
}

function showFeedback(text, good, neutral = true) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = text;
  feedback.className = `feedback${neutral ? (good ? " good" : " try") : ""}`;
}

function showOverlay(text) {
  const overlay = document.getElementById("action-overlay");
  overlay.textContent = text;
  overlay.style.display = "block";
}

function hideOverlay() {
  document.getElementById("action-overlay").style.display = "none";
}

function updateText(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

function formatTime(seconds) {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function recordFrameRate() {
  const fps = Math.round(frameRate());
  if (fps <= 0) return;
  fpsSamples.push(fps);
  if (fpsSamples.length > 300) fpsSamples.shift();
  minimumFps = Math.min(minimumFps, fps);
  const averageFps = Math.round(fpsSamples.reduce((sum, value) => sum + value, 0) / fpsSamples.length);
  updateText("fps-val", fps);
  updateText("fps-average", averageFps);
  updateText("fps-minimum", minimumFps);
}

function updateNetworkState() {
  updateText("network-state", navigator.onLine ? "Đã tải cục bộ" : "Ngoại tuyến · vẫn chơi được");
}

function playFeedbackSound(isCorrect) {
  if (!document.getElementById("sound-toggle").checked) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const tones = isCorrect ? [660, 880] : [220];
  tones.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * 0.1;
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.05, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + 0.16);
  });
}

function drawKeypoints() {
  for (let poseIndex = 0; poseIndex < poses.length; poseIndex += 1) {
    const pose = poses[poseIndex].pose;
    for (let pointIndex = 0; pointIndex < pose.keypoints.length; pointIndex += 1) {
      const keypoint = pose.keypoints[pointIndex];
      if (keypoint.score > 0.2) {
        fill(255, 255, 255);
        stroke(32, 104, 160);
        strokeWeight(2);
        ellipse(keypoint.position.x, keypoint.position.y, 12, 12);
      }
    }
  }
}

function drawSkeleton() {
  for (let poseIndex = 0; poseIndex < poses.length; poseIndex += 1) {
    const pose = poses[poseIndex].pose;
    const activeAction = getDetectedAction(pose);
    const skeleton = poses[poseIndex].skeleton;
    for (let partIndex = 0; partIndex < skeleton.length; partIndex += 1) {
      const partA = skeleton[partIndex][0];
      const partB = skeleton[partIndex][1];
      const activeSegment = isActiveSegment(partA, partB, activeAction);
      stroke(activeSegment ? 246 : 56, activeSegment ? 154 : 177, activeSegment ? 50 : 117);
      strokeWeight(5);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function isActiveSegment(partA, partB, action) {
  const parts = `${partA.part || ""} ${partB.part || ""}`;
  if (action === "A") return parts.includes("leftWrist") || parts.includes("leftElbow");
  if (action === "B") return parts.includes("rightWrist") || parts.includes("rightElbow");
  if (action === "C") return parts.includes("Wrist") || parts.includes("Elbow");
  if (action === "D") return parts.includes("Knee") || parts.includes("Ankle");
  if (action === "LEAN_LEFT" || action === "LEAN_RIGHT") return parts.includes("Shoulder") || parts.includes("Hip");
  return false;
}

document.querySelectorAll(".answer").forEach(button => {
  button.addEventListener("click", () => {
    if (document.getElementById("keyboard-toggle").checked) completeChoice(button.dataset.choice);
  });
});

document.querySelectorAll(".subject-button").forEach(button => {
  button.addEventListener("click", () => selectSubject(button.dataset.subject));
});

document.querySelectorAll(".start-subject").forEach(button => {
  button.addEventListener("click", () => {
    selectedSubject = button.dataset.subject;
    document.querySelectorAll(".start-subject").forEach(subjectButton => subjectButton.classList.toggle("active", subjectButton.dataset.subject === selectedSubject));
    document.querySelectorAll(".subject-button").forEach(subjectButton => subjectButton.classList.toggle("active", subjectButton.dataset.subject === selectedSubject));
    renderQuestion();
  });
});

document.getElementById("start-button").addEventListener("click", startGame);

document.getElementById("language-select").addEventListener("change", event => {
  language = event.target.value;
  applyLanguage();
});

document.getElementById("dark-toggle").addEventListener("change", event => {
  document.body.classList.toggle("dark", event.target.checked);
});

document.getElementById("continue-button").addEventListener("click", continueToNextSubject);
document.getElementById("restart-button").addEventListener("click", resetGame);

document.getElementById("keyboard-toggle").addEventListener("change", event => {
  showFeedback(event.target.checked ? (language === "vi" ? "Bàn phím đã bật: nhấn A, B, C hoặc D." : "Keyboard enabled: press A, B, C or D.") : currentLanguage().prompt, false, false);
});

document.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "r") resetGame();
  if (!document.getElementById("keyboard-toggle").checked) return;
  const choice = event.key.toUpperCase();
  if (["A", "B", "C", "D"].includes(choice)) completeChoice(choice);
});

window.addEventListener("online", updateNetworkState);
window.addEventListener("offline", updateNetworkState);
