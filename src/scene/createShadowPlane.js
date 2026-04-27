import * as THREE from 'three';

export const createShadowPlane = () => {
    const geometry = new THREE.PlaneGeometry(20, 20);

    const material = new THREE.ShadowMaterial({
        color: 0x000000,
        opacity: 0.2
    });

    const plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2;
    plane.receiveShadow = true;

    return plane;
};