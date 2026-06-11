export const getFileExtension = (mineType) => {
    if (mineType.includes('mp4')) {
        return 'mp4';
    } else {
        return 'webm';
    }
};