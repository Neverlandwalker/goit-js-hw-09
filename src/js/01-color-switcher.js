let bodyColorChangeInterval = null;
const refs = {
    startButton: document.querySelector('button[data-start]'),
    stopButton: document.querySelector('button[data-stop]'),
    bodyBG: document.querySelector('body'),
}
refs.startButton.disabled = false;
refs.stopButton.disbaled = true;
refs.startButton.addEventListener('click', onClickStart);
refs.stopButton.addEventListener('click', onClickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onClickStart() {
    bodyColorChangeInterval = setInterval(() => {
        refs.bodyBG.style.backgroundColor = getRandomHexColor();

    }, 1000);
    refs.startButton.disabled = true;
    refs.stopButton.disbaled = false;

}

function onClickStop(){
    clearInterval(bodyColorChangeInterval);
    refs.startButton.disabled = false;
    refs.stopButton.disbaled = true;
}
