import * as THREE from 'three';

export const  createScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    return scene;
};