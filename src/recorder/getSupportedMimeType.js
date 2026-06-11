export const getSupportedMimeType = () => {
    const mimeTypes = [
        'video/mp4',
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm'
    ];

    for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
            return mimeType;
        }
    }

    return '';
};