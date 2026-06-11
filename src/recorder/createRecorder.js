export const createRecorder = (canvas) => {
    let recorder = null;
    let stream = null;
    let chunks = [];
    let url = '';

    const startRecording = () => {
        stream = canvas.captureStream(30);
        recorder = new MediaRecorder(stream);
        chunks = [];

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

    const downloadRecording = (fileName = 'business-card.webm') =>  {
        if (!url) return;

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