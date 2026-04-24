import * as THREE from 'three';

export const createTestMesh = () => {
    const geometry = new THREE.BoxGeometry(4.5, 2.5, 0.1);
    const material = new THREE.MeshStandardMaterial({
        color: 0xfafaf3,
        roughness: 0.9,
        metalness: 0.05
    });
    const mesh = new THREE.Mesh(geometry, material);

    return mesh;
};