import * as THREE from 'three';
import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { setCameraView } from "../camera/setCameraView.js";
import { createRenderer } from "./createRenderer";
import { createCard } from "./createCard.js";
import { createControls } from "./createControls";
import { createLights } from "./createLights.js";
import { setupResizerHandler } from "./setupResizeHandler";
import { SAMPLES } from '../samples/samples.js';
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js'
import { renderPdfToTexture } from "../pdf/renderPdfToTexture.js";

export const initScene = (container) => {
    const scene = createScene();
    const camera = createCamera(container);
    const renderer = createRenderer(container);
    
    const card = createCard();
    scene.add(card.mesh);

    const { ambientLight, frontLight, frontLightSecondary, backLight, backLightSecondary } = createLights();
    scene.add( ambientLight, frontLight, frontLightSecondary, backLight, backLightSecondary );

    const controls = createControls(camera, renderer);

    setupResizerHandler({ container, camera, renderer });

    const positionSelect = document.querySelectorAll('[data-position]');

    positionSelect.forEach((button) => {
        button.addEventListener('click', (event) => {
            const position = event.currentTarget.dataset.position;
            setCameraView(camera, controls, position);
        });
    });

    const sampleSelect = document.querySelector('#sample-select');

    const formatSelect = document.querySelector('#card-format-select');
    const orientationSelect = document.querySelector('#card-orientation-select');

    const frontPdfInput = document.querySelector('#front-pdf-input');
    const backPdfInput = document.querySelector('#back-pdf-input');

    const frontUvPdfInput = document.querySelector('#front-uv-pdf-input');
    const backUvPdfInput = document.querySelector('#back-uv-pdf-input');

    const frontEmbossPdfInput = document.querySelector('#front-embossing-pdf-input');
    const frontEmbossPdfInputSwitch = document.querySelector('#toggle-input-embossing-front');

    const applyCurrentCardFormat = () => {
        const formatId = formatSelect?.value ?? DEFAULT_CARD_FORMAT_ID;
        const orientation = orientationSelect?.value ?? DEFAULT_CARD_ORIENTATION;

        const { heightMm } = card.setCardFormat({ formatId, orientation });

        controls.target.set(0, 0, 0);
        controls.update();
    };

    const handlePdfUpload = async (file, side) => {
    if (!file) {
        if (side === 'front' || side === 'back') card.updateTexture(null, side);
        else if (side === 'frontUV' || side === 'backUV') card.updateUvTexture(null, side);
        else if (side === 'frontEmboss') card.updateFrontEmbossTexture(null);
        
        return; 
    }

    if (side === 'front' || side === 'back') {
        const { texture } = await renderPdfToTexture(file, {});
        card.updateTexture(texture, side);

    } else if (side === 'frontUV' || side === 'backUV') {
        const { texture } = await renderPdfToTexture(file, {
            colorSpace: THREE.NoColorSpace,
            invert: true
        });
        card.updateUvTexture(texture, side);
        
    } else {
        const { texture } = await renderPdfToTexture(file, { 
            colorSpace: THREE.NoColorSpace,
            invert: true
        });
        
        if (side === 'frontEmboss') {
            card.updateFrontEmbossTexture(texture);
        } else if (side === 'backEmboss') {

        }
    }
};  

    formatSelect?.addEventListener('change', applyCurrentCardFormat);
    orientationSelect?.addEventListener('change', applyCurrentCardFormat);
    
    const paperSelect = document.querySelectorAll('[data-paper]');
    const foilSelect = document.querySelectorAll('[data-foil]');

    const setFinishBtnForUv = () => {
        paperSelect.forEach((btn) => {
            btn.classList.remove('btn-group__btn--active');
            if (btn.dataset.paper === 'mat') {
                btn.classList.add('btn-group__btn--active');
            }
        });
        foilSelect.forEach((btn) => {
            btn.classList.remove('btn-group__btn--active');
            if (btn.dataset.foil === 'mat') {
                btn.classList.add('btn-group__btn--active');
            }
        });

    };

    frontPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'front');
    });

    backPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'back');
    });

    frontUvPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'frontUV');
        setFinishBtnForUv();
    });

    backUvPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'backUV');
        setFinishBtnForUv();
    });

    frontEmbossPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'frontEmboss');
    });

    frontEmbossPdfInputSwitch.addEventListener('change', () => {
        card.updateFrontEmbossTextureSwitch();
    });

    applyCurrentCardFormat();

    const setupToggleGroup = (buttons, material) => { 
        buttons.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                buttons.forEach((b) => b.classList.remove('btn-group__btn--active'));
                
                const button = event.currentTarget;
                button.classList.add('btn-group__btn--active');
                
                card.finishState[material] = button.dataset[material];
                card.updateCardFinish(card.finishState.paper, card.finishState.foil);
            });
        });
    };

    sampleSelect.addEventListener('change', async (event) => {
        const id = event.target.value;
        if (id) { 
            for (const [key, val] of Object.entries(SAMPLES[id].files)) {
                handlePdfUpload(val, key);
            }
            console.log()

            const frontUploadText = document.querySelector('#front-pdf-input + .file-upload__text');
            frontUploadText.textContent = SAMPLES[id].files.front || "No file chosen";
            frontUploadText.nextElementSibling.classList.remove('file-upload__clear--hidden');

            const backUploadText = document.querySelector('#back-pdf-input + .file-upload__text');
            backUploadText.textContent = SAMPLES[id].files.back || "No file chosen";
            backUploadText.nextElementSibling.classList.remove('file-upload__clear--hidden');

            const frontUvUploadText = document.querySelector('#front-uv-pdf-input + .file-upload__text');
            frontUvUploadText.textContent = SAMPLES[id].files.frontUV || "No file chosen";
            frontUvUploadText.nextElementSibling.classList.remove('file-upload__clear--hidden');

            const backUvUploadText = document.querySelector('#back-uv-pdf-input + .file-upload__text');
            backUvUploadText.textContent = SAMPLES[id].files.backUV || "No file chosen";
            backUvUploadText.nextElementSibling.classList.remove('file-upload__clear--hidden');

            const frontEmbossUploadText = document.querySelector('#front-embossing-pdf-input + .file-upload__text');
            frontEmbossUploadText.textContent = SAMPLES[id].files.frontEmboss || "No file chosen";
            frontEmbossUploadText.nextElementSibling.classList.remove('file-upload__clear--hidden');
        }
    });

    setupToggleGroup(paperSelect, 'paper');
    setupToggleGroup(foilSelect, 'foil');

    const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    return { scene, camera, renderer, controls };
};