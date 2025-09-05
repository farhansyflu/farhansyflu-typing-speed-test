const sentences = ["The quick brown fox jumps over the lazy dog near the old barn",
  "She sells seashells by the seashore every sunny summer morning",
"A good book can take you to places you have never been before",
"The cat sat on the mat and watched the birds fly by the window",
"Time flies when you are having fun with your friends and family",
"Programming requires patience, practice, and persistent problem-solving skills",
"The magnificent sunset painted the sky with brilliant shades of orange and purple",
"Technology continues to evolve rapidly, changing how we communicate and work",
"Exercise regularly, eat healthy foods, and maintain a positive attitude for wellness",
"The ancient library contained thousands of books written in various languages"]


const textToTypeElement = document.getElementById("textToType");
const inputText = document.getElementById("inputText");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const timeDisplay = document.getElementById("timeDisplay");
const wpmDisplay = document.getElementById("wpmDisplay");
const time = document.getElementById("time");
const WPM = document.getElementById("WPM");
const titleElement = document.getElementById("title")

let startTime;
let timeInterval;
inputText.disabled = true
let textToType;
stopBtn.style.display = "none"
wpmDisplay.innerHTML = `Words Per Minutes :`

titleElement.style.display = "block"

function randomSentence(){
  const sentence = sentences[Math.floor(Math.random() * sentences.length)]
  console.log(sentence);
  textToTypeElement.innerHTML = sentence
  textToType = textToTypeElement.innerHTML.split(" ");
}


function startTest() {
  titleElement.style.display = "none"
  wpmDisplay.innerHTML = `Words Per Minutes :`
  randomSentence()
  inputText.disabled = false
  startTime = new Date();
  inputText.value = "";
  inputText.focus();
  timeInterval = setInterval(updateTimer, 1000);
  textToTypeElement.innerHTML = textToType
  .map((word) => `<span>${word}</span>`)
  .join(" ");
  startBtn.style.display = "none"
  stopBtn.style.display = "block"
}

function updateTimer() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  time.innerHTML = elapsedTime;
}

function calculateWPM() {
  titleElement.style.display = "block"
  const wordsTyped = inputText.value.trim().split(/\s+/).length;
  const elapsedTime = Math.floor((new Date() - startTime) / 1000);
  const minutes = elapsedTime / 60;
  const wpm = Math.floor(wordsTyped / minutes);
  wpmDisplay.innerHTML = `Words Per Minutes : ${wpm} WPM`;
  clearInterval(timeInterval);
}

function checkInput() {
  const typedText = inputText.value.trim().split(" ");
  const spans = textToTypeElement.querySelectorAll("span");

  typedText.forEach((word, index) => {
    if (spans[index]) {
      if (word === textToType[index]) {
        spans[index].className = "correct";
      } else {
        spans[index].className = "incorrect";
      }
    }
  });

  for (let i = typedText.length; i < spans.length; i++) {
    spans[i].className = "";
  }
}

function stopTest(){
  clearInterval(timeInterval);
  calculateWPM();
  startBtn.style.display = "block"
  stopBtn.style.display = "none"
}

startBtn.addEventListener("click", () => {
  startTest();
});

inputText.addEventListener("input", () => {
  checkInput();
  const typedText = inputText.value;
  if (typedText.trim() === textToType.join(" ")) {
    stopTest();
  }
});

stopBtn.addEventListener("click", ()=> {
  stopTest()
})

document.addEventListener("keydown", (e) =>{
if(e.key === "Enter"){
  startTest()
}
})