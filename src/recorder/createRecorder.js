import { getFileExtension } from "./getFileExtension";
import { getSupportedMimeType } from "./getSupportedMimeType";
import { getTimestamp } from "./getTimestamp";

export const createRecorder = (canvas) => {
    let isRecording = false;
    let hasRecording = false;
    let recorder = null;
    let stream = null;
    let chunks = [];
    let url = '';

    const mimeType = getSupportedMimeType();

    const startRecording = () => {
        if (isRecording) return;

        if (url) { 
            URL.revokeObjectURL(url);
            url = '';
            hasRecording = false;
        }

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

            url = URL.createObjectURL(blob);

            stream.getTracks().forEach((track) => track.stop());

            isRecording = false;
            hasRecording = true;
        }, {once: true});

        recorder.addEventListener('error', (event) => {
            console.error('Recording error:', event.error);

            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }

            isRecording = false;
        });

        recorder.start();
        isRecording = true;
    };

    const stopRecording = () => {
        if (recorder && recorder.state !== 'inactive') {
            recorder.stop();
        }
    };

    const downloadRecording = (fileBaseName = 'business-card') =>  {
        if (!hasRecording || !url || !recorder) return;

        const timestamp = getTimestamp();
        const extension = getFileExtension(recorder.mimeType);
        const fileName = `${fileBaseName}_${timestamp}.${extension}`;

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
        destroyRecording,
    };
};