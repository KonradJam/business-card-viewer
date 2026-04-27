import * as THREE from 'three';

export const  createScene = () => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f1eb);

    return scene;
};