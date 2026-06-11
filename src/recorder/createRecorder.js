import { getFileExtension } from "./getFileExtension";
import { getSupportedMimeType } from "./getSupportedMimeType";

export const createRecorder = (canvas) => {
    let recorder = null;
    let stream = null;
    let chunks = [];
    let url = '';

    const mimeType = getSupportedMimeType();

    const startRecording = () => {
        stream = canvas.captureStream(30);
        chunks = [];

        if (mimeType) {
            recorder = new MediaRecorder(stream, { mimeType });
        } else {
            recorder = new MediaRecorder(stream);
        }
        
        recorder.addEventListener('dataavailable', (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        });

        recorder.addEventListener('stop', () => {
            const blob = new Blob(chunks, {
                type: recorder.mimeType || 'video/webm'
            });

            if (url) URL.revokeObjectURL(url);
            url = URL.createObjectURL(blob);

            stream.getTracks().forEach((track) => track.stop());
        }, {once: true});

        recorder.start();
    };

    const stopRecording = () => {
        if (recorder && recorder.state !== 'inactive') {
            recorder.stop();
        }
    };

    const downloadRecording = (fileBaseName = 'business-card') =>  {
        if (!url) return;
        console.log(recorder.mimeType)
        const extension = getFileExtension(recorder.mimeType);
        const fileName = `${fileBaseName}.${extension}`;

        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
    };

    const destroyRecording = () => {
        if (url) URL.revokeObjectURL(url);
    };

    return {
        startRecording,
        stopRecording,
        downloadRecording,
        destroyRecording
    };
};