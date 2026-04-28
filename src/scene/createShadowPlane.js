import * as THREE from 'three';

export const createShadowPlane = () => {
    const geometry = new THREE.PlaneGeometry(400, 400);

    const material = new THREE.ShadowMaterial({
        color: 0x000000,
        opacity: 0.18
    });

    const plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -35;
    plane.receiveShadow = true;

    return plane;
};