import * as THREE from 'three';

export const createRenderer = (container) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    return renderer;
};