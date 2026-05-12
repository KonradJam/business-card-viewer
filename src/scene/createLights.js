import * as THREE from 'three';

export const createLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);

    const frontLight = new THREE.DirectionalLight(0xffffff, 2.3);
    frontLight.position.set(120, 10, 60);

    const frontLightSecondary = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLightSecondary.position.set(90, 20, 140);

    const backLight = new THREE.DirectionalLight(0xffffff, 2.3);
    backLight.position.set(-120, 10, -60);

    const backLightSecondary = new THREE.DirectionalLight(0xffffff, 1.2);
    backLightSecondary.position.set(90, -20, -140);

    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);

    frontLight.target = lightTarget;
    frontLightSecondary.target = lightTarget;
    backLight.target = lightTarget;
    backLightSecondary.target = lightTarget;

    for (const light of [
        frontLight, 
        frontLightSecondary,
        backLight,
        backLightSecondary
    ]) {
        light.castShadow = true;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
    
        const d = 55;
    
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 300;
        light.shadow.camera.left = -d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = -d;
    
        light.shadow.bias = -0.0001;
        light.shadow.normalBias = 0.002; 
    }

    return { ambientLight, 
        frontLight, 
        frontLightSecondary, 
        backLight,
        backLightSecondary, 
        lightTarget };
};