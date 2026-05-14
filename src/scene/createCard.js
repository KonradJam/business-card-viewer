import * as THREE from 'three';
import { getCardDimensions } from '../card/getCardDimensions.js';
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js';
import { FINISH_PRESETS } from '../card/finishPresets.js';
import { FINISH_UV_PRESETS } from '../card/finishUvPresets.js';
import { texture } from 'three/tsl';
import { BasicLightMapNode } from 'three/webgpu';

export const createCard = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1, 400, 400, 1);
    const textureLoader = new THREE.TextureLoader();

    const finishState = { paper: 'mat', foil: 'none'};

    const createMaterial = () => new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.85,
        metalness: 0.0,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
    });

    const edgeMaterial = createMaterial()
    const frontMaterial = createMaterial();
    const backMaterial = createMaterial();

    const materials = [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        frontMaterial,
        backMaterial
    ];

    const mesh = new THREE.Mesh(geometry, materials);

    mesh.customDepthMaterial = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    const setCardFormat = ({ formatId, orientation }) => {
        const { widthMm, heightMm, depthMm } = getCardDimensions(formatId, orientation);

        mesh.scale.set(widthMm, heightMm, depthMm);

        return { widthMm, heightMm, depthMm };
    };

    setCardFormat({ formatId: DEFAULT_CARD_FORMAT_ID, orientation: DEFAULT_CARD_ORIENTATION });

    const updateTexture = (texture, side) => {
        const material = side === 'front' ? frontMaterial : backMaterial;

        material.color.set(0xffffff);
        material.map?.dispose();
        material.map = texture;
        material.needsUpdate = true;
    }

    const updateFrontUvTexture = (texture) => {
        updateCardFinish('mat', 'mat', backMaterial.clearcoatMap ? 'front' : 'both');

        frontMaterial.clearcoatMap?.dispose();
        frontMaterial.clearcoatMap = texture;
        if (texture) {
            frontMaterial.clearcoat = FINISH_UV_PRESETS['standard']['clearcoat'];
            frontMaterial.clearcoatRoughness = FINISH_UV_PRESETS['standard']['clearcoatRoughness'];
        }

        frontMaterial.needsUpdate = true;
        backMaterial.needsUpdate = true;
    };

    const updateBackUvTexture = (texture) => {
        updateCardFinish('mat', 'mat', frontMaterial.clearcoatMap ? 'back' : 'both');

        backMaterial.clearcoatMap?.dispose();
        backMaterial.clearcoatMap = texture;
        if (texture) {
            backMaterial.clearcoat = FINISH_UV_PRESETS['standard']['clearcoat'];
            backMaterial.clearcoatRoughness = FINISH_UV_PRESETS['standard']['clearcoatRoughness'];
        }

        frontMaterial.needsUpdate = true;
        backMaterial.needsUpdate = true;
    };

    const updateFrontEmbossTexture = (texture) => {
        if (texture) {
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
        }
        
        let mirrorTexture = null;
        if (texture) {
            mirrorTexture = texture.clone();
            mirrorTexture.wrapS = THREE.RepeatWrapping;
            mirrorTexture.repeat.x = -1;
            mirrorTexture.offset.x = 1;
            mirrorTexture.needsUpdate = true;
        }

        const materials = [[frontMaterial, 1], [backMaterial, -1]];

        for (const [i, [materialObject, modifier]] of materials.entries()) {
            materialObject.displacementMap?.dispose();
            materialObject.displacementMap = i === 0 ? texture : mirrorTexture;
            materialObject.displacementScale = -1 * modifier;
            materialObject.displacementBias = 0.5 * modifier;

            materialObject.bumpMap?.dispose();
            materialObject.bumpMap = texture;
            materialObject.bumpScale = -0.6 * modifier;

            materialObject.needsUpdate = true;
        }
    };

    const updateFrontEmbossTextureSwitch = () => {
        for (const material of [frontMaterial, backMaterial]) {
            material.displacementScale *= -1;
            material.displacementBias *= -1;
            material.bumpScale *= -1;

            material.needsUpdate = true;
        }
    };

    const FINISH_SETTINGS = ['roughness', 'clearcoat', 'clearcoatRoughness'];

    const updateCardFinish = (paper, foil, side = 'both') => {
        const finishGroup = foil === 'none' ? 'paper' : 'foil';
        const finishKey = foil === 'none' ? paper : foil;
        const preset = FINISH_PRESETS[finishGroup][finishKey];

        if (side === 'both' || side === 'front') {
            for (const setting of FINISH_SETTINGS) {
                frontMaterial[setting] = preset[setting];
            }
            frontMaterial.needsUpdate = true;
        }

        if (side === 'both' || side === 'back') {
            for (const setting of FINISH_SETTINGS) {
                backMaterial[setting] = preset[setting];
            }
            backMaterial.needsUpdate = true;
        }
    };

    return { mesh, setCardFormat,
        updateTexture,
        updateFrontUvTexture, updateBackUvTexture,
        updateFrontEmbossTexture, updateFrontEmbossTextureSwitch,
        updateCardFinish, finishState };
};