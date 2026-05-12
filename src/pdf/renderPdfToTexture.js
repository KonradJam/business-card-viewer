import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
import * as THREE from 'three';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const renderPdfToTexture = async (
    file, {
        targetWidth = 1600,
        colorSpace = THREE.SRGBColorSpace,
        invert = false
    }
) => {
    const buffer = await file.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const baseViewport = page.getViewport({ scale: 1 });
    const scale = targetWidth / baseViewport.width;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const outputScale = window.devicePixelRatio || 1;

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = `${Math.floor(viewport.width)}px`;
    canvas.style.height = `${Math.floor(viewport.height)}px`;

    const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0 ,0] : null;

    await page.render({
        canvasContext: context,
        viewport,
        transform
    }).promise;

    if (invert) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        context.putImageData(imageData, 0, 0);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = colorSpace;
    texture.generateMipmaps = true; 

    // texture.minFilter = THREE.LinearMipmapLinearFilter;
    // texture.magFilter = THREE.LinearFilter;

    texture.needsUpdate = true;

    return {
        texture,
        canvas,
        width: viewport.width,
        height: viewport.height,
        pageCount: pdf.numPages
    };
};