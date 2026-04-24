import * as THREE from 'three';
import cardFrontTextureUrl from '../assets/card-front.jpg';

export const createTestMesh = () => {
    const geometry = new THREE.BoxGeometry(4.5, 2.5, 0.1);

    const textureLoader = new THREE.TextureLoader();
    const cardFrontTexture = textureLoader.load(cardFrontTextureUrl);

    const material = new THREE.MeshStandardMaterial({
        map: cardFrontTexture,
        roughness: 0.9,
        metalness: 0.1
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
};