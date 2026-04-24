import * as THREE from 'three';

export const createLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2);
    mainLight.position.set(1, 2, 3);

    return { ambientLight, mainLight };
};