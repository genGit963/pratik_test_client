import doneTone from "../assets/done.mp3";

function alertTone() {
  const doneSound = new Audio(doneTone);
  doneSound.play();
}

export default alertTone;
