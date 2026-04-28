import * as THREE from 'three';
import cardFrontTextureUrl from '../assets/card-front.jpg';
import cardBackTextureUrl from '../assets/card-backt.jpg';
import { getCardDimensions } from './getCardDimensions';
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../config/cardFormats.js';
import { texture } from 'three/tsl';

export const createTestMesh = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const textureLoader = new THREE.TextureLoader();

    const cardFrontTexture = textureLoader.load(cardFrontTextureUrl);
    cardFrontTexture.colorSpace = THREE.SRGBColorSpace;

    const cardBackTexture = textureLoader.load(cardBackTextureUrl);
    cardBackTexture.colorSpace = THREE.SRGBColorSpace;

    const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xe8e6dc,
        roughness: 0.95,
        metalness: 0.02
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
        map: cardFrontTexture,
        roughness: 0.9,
        metalness: 0.05
    });

    const backMaterial = new THREE.MeshStandardMaterial({
        map: cardBackTexture,
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
        frontMaterial.map = texture;
        frontMaterial.needsUpdate = true;
    };

    const updateBackTexture = (texture) => {
        backMaterial.map = texture;
        backMaterial.needsUpdate = true;
    };

    return { mesh, setCardFormat, updateFrontTexture, updateBackTexture };
};