import * as THREE from 'three';
import { getCardDimensions } from './getCardDimensions';
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../config/cardFormats.js';

export const createTestMesh = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const textureLoader = new THREE.TextureLoader();

    const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xe8e6dc,
        roughness: 0.95,
        metalness: 0.02
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        metalness: 0.05
    });

    const backMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.9,
        metalness: 0.05
    });

    const materials = [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        frontMaterial,
        backMaterial
    ];

    const mesh = new THREE.Mesh(geometry, materials);

    mesh.castShadow = true;
    mesh.receiveShadow = false;

    const setCardFormat = ({ formatId, orientation }) => {
        const { widthMm, heightMm, depthMm } = getCardDimensions(formatId, orientation);

        mesh.scale.set(widthMm, heightMm, depthMm);

        return { widthMm, heightMm, depthMm };
    };

    setCardFormat({ formatId: DEFAULT_CARD_FORMAT_ID, orientation: DEFAULT_CARD_ORIENTATION });

    const updateFrontTexture = (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        frontMaterial.color.set(0xffffff);
        frontMaterial.map = texture;
        frontMaterial.needsUpdate = true;
    };

    const updateBackTexture = (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        backMaterial.color.set(0xffffff);
        backMaterial.map = texture;
        backMaterial.needsUpdate = true;
    };

    return { mesh, setCardFormat, updateFrontTexture, updateBackTexture };
};