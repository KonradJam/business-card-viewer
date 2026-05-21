import * as THREE from 'three';
import { renderPdfToTexture } from "./renderPdfToTexture";

export const handlePdfUpload = async (card, file, side) => {
    if (!file) {
        if (side === 'front' || side === 'back') card.updateTexture(null, side);
        else if (side === 'frontUV' || side === 'backUV') card.updateUvTexture(null, side);
        else if (side === 'frontEmboss') card.updateFrontEmbossTexture(null);
        
        return; 
    }

    if (side === 'front' || side === 'back') {
        const { texture } = await renderPdfToTexture(file, {});
        card.updateTexture(texture, side);

    } else if (side === 'frontUV' || side === 'backUV') {
        const { texture } = await renderPdfToTexture(file, {
            colorSpace: THREE.NoColorSpace,
            invert: true
        });
        card.updateUvTexture(texture, side);
        
    } else {
        const { texture } = await renderPdfToTexture(file, { 
            colorSpace: THREE.NoColorSpace,
            invert: true
        });
        
        if (side === 'frontEmboss') {
            card.updateFrontEmbossTexture(texture);
        }
    }
};  