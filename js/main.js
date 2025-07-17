// Variables
const synth = window.speechSynthesis; // To get the voices and put them in select
let voices;

const textarea = document.querySelector("textarea"); // textarea
const select = document.querySelector("select"); // Select element
const playBtn = document.querySelector("button"); // Play button
const icon = document.querySelector(".fa-play");
// End of Variables

// functions

// Put voices in the select
function getVoices() {
  voices = synth.getVoices(); // Voices
  // Loop on voices and put it in options then append them to select
  voices.forEach((voice, index) => {
    const option = document.createElement("option"); // Create a new option
    option.textContent = `${voice.name} (${voice.lang})`; // Voice name => Ahmed || Voice lang => arabic
    option.value = index; // Set value of each option
    select.appendChild(option); // Append option to select
  });
}

// Play the voice when clickimg the play button
function play() {
  const utterance = new SpeechSynthesisUtterance(textarea.value); // To play the voice
  utterance.voice = voices[select.value]; // Set the voice
  // If there is text in textarea
  if (textarea.value) {
    // If started butn not paused pause it
    if (synth.speaking && !synth.paused) {
      synth.pause();
      icon.className = "fa fa-play";
      // If paused resume it
    } else if (synth.paused) {
      synth.resume();
      icon.className = "fa fa-pause";
      // If still did not began begin it
    } else {
      synth.speak(utterance);
      icon.className = "fa fa-pause";
    }
  }
}
// End of functions

// Add voices options to select after 100MiliSeconds
setTimeout(() => {
  getVoices();
}, 100);
