import * as THREE from 'three';
import cardFrontTextureUrl from '../assets/card-front.jpg';
import cardBackTextureUrl from '../assets/card-backt.jpg';

export const createTestMesh = () => {
    const geometry = new THREE.BoxGeometry(4.5, 2.5, 0.1);

    const textureLoader = new THREE.TextureLoader();

    const cardFrontTexture = textureLoader.load(cardFrontTextureUrl);
    const cardBackTexture = textureLoader.load(cardBackTextureUrl);

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

    return mesh;
};