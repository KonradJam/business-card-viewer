import * as THREE from 'three';
import { getCardDimensions } from '../card/getCardDimensions.js';
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js';
import { FINISH_PRESETS } from '../card/finishPresets.js';
import { FINISH_UV_PRESETS } from '../card/finishUvPresets.js';
import { texture } from 'three/tsl';

export const createCard = () => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const textureLoader = new THREE.TextureLoader();

    const finishState = { paper: 'mat', foil: 'none'};

    const edgeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.85,
        metalness: 0.0,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
    });

    const frontMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.85,
        metalness: 0.0,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
    });

    const backMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.85,
        metalness: 0.0,
        clearcoat: 0.0,
        clearcoatRoughness: 0.0,
    });

    const materials = [
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        edgeMaterial,
        frontMaterial,
        backMaterial
    ];

    const mesh = new THREE.Mesh(geometry, materials);

    mesh.castShadow = true;
    mesh.receiveShadow = false;

    const setCardFormat = ({ formatId, orientation }) => {
        const { widthMm, heightMm, depthMm } = getCardDimensions(formatId, orientation);

        mesh.scale.set(widthMm, heightMm, depthMm);

        return { widthMm, heightMm, depthMm };
    };

    setCardFormat({ formatId: DEFAULT_CARD_FORMAT_ID, orientation: DEFAULT_CARD_ORIENTATION });

    const updateFrontTexture = (texture) => {
        frontMaterial.color.set(0xffffff);
        frontMaterial.map?.dispose();
        frontMaterial.map = texture;
        frontMaterial.needsUpdate = true;
    };

    const updateBackTexture = (texture) => {
        backMaterial.color.set(0xffffff);
        backMaterial.map?.dispose();
        backMaterial.map = texture;
        backMaterial.needsUpdate = true;
    };

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
        updateFrontTexture, updateBackTexture,
        updateFrontUvTexture, updateBackUvTexture,
        updateCardFinish, finishState };
};