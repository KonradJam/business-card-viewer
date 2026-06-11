import { createRecorder } from "../recorder/createRecorder"

export const recorderButtons = (canvas) => {
    const recorder = createRecorder(canvas);

    const startButton = document.querySelector('#recorder-start');
    const stopButton = document.querySelector('#recorder-stop');
    const downloadButton = document.querySelector('#recorder-download');

    const textButtons = document.querySelectorAll('.btn-group__text')

    startButton.addEventListener('click', () => {
        recorder.startRecording();

        textButtons.forEach(btn => {
            btn.classList.add('btn-group__text--red');
        });
    });

    stopButton.addEventListener('click', () => {
        recorder.stopRecording();

        textButtons.forEach(btn => {
            btn.classList.remove('btn-group__text--red');
        });

        downloadButton.disabled = false;
    });

    downloadButton.addEventListener('click', () => {
        recorder.downloadRecording();
    });

    window.addEventListener('beforeunload', () => {
        recorder.destroyRecording();
    });
}