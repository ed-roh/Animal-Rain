
let number;
let speed;
let animal;
let checked;
const paulAudio = new Audio('audio/paul.mp3');
const catAudio = new Audio('audio/nyan.mp3');
const dogAudio = new Audio('audio/dog.mp3');
catAudio.volume = 0.8;
dogAudio.volume = 0.3;

document.getElementById("submitButton").addEventListener("click", function() {
  number = document.getElementById('inputNumber').value;
  speed = document.getElementById('inputSpeed').value;
  animal = document.querySelector('input[name="animal"]:checked').value;
  checked = document.getElementById('audioCheck').checked;

  if (!paulAudio.paused) {
    paulAudio.pause();
  }
  if (!catAudio.paused) {
    catAudio.pause();
  }
  if (!dogAudio.paused) {
    dogAudio.pause();
  }
  if (checked) {
    if (animal === "d") {
      paulAudio.play();
    } else if (animal === "b") {
      catAudio.play();
    } else if (animal === "c") {
      dogAudio.play();
    }
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.insertCSS({
      file: 'style.css'
    });
    chrome.tabs.executeScript({
      file: 'jquery.min.js'
    });
    chrome.tabs.executeScript({
      file: 'content_script.js'
    });
    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {
        greeting: number,
        greeting2: speed,
        greeting3: animal
      });
    });

  });
});
