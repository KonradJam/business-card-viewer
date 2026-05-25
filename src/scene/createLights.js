import * as THREE from 'three';

export const createLights = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, .9);

    const light = {
        main : {
            position : { x : 120, y : 10, z : 60 },
            intensity : 2.3
        },
        secondary : {
            position : { x : 90, y : 0, z : 140 },
            intensity: 1.2
        }
    }

    const frontLight = new THREE.DirectionalLight(0xffffff, light.main.intensity);
    frontLight.position.set(light.main.position.x, light.main.position.y, light.main.position.z);

    const frontLightSecondary = new THREE.DirectionalLight(0xffffff, light.secondary.intensity);
    frontLightSecondary.position.set(light.secondary.position.x, light.secondary.position.y, light.secondary.position.z);

    const backLight = new THREE.DirectionalLight(0xffffff, light.main.intensity);
    backLight.position.set(-light.main.position.x, light.main.position.y, -light.main.position.z);

    const backLightSecondary = new THREE.DirectionalLight(0xffffff, light.secondary.intensity);
    backLightSecondary.position.set(-light.secondary.position.x, light.secondary.position.y, -light.secondary.position.z);

    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, 0, 0);

    frontLight.target = lightTarget;
    frontLightSecondary.target = lightTarget;
    backLight.target = lightTarget;
    backLightSecondary.target = lightTarget;

    for (const light of [
        frontLight, frontLightSecondary,
        backLight, backLightSecondary
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
        frontLight, frontLightSecondary, 
        backLight, backLightSecondary };
};