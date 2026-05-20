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
import { uploadSample } from '../menu/uploadSample.js';
import { disable } from '../menu/disableButtons.js';
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

    const frontUvPdfInput = document.querySelector('#frontUV-pdf-input');
    const backUvPdfInput = document.querySelector('#frontUV-pdf-input');

    const frontEmbossPdfInput = document.querySelector('#frontEmboss-pdf-input');
    const frontEmbossToggle = document.querySelector('#frontEmboss-toggle');

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

    const setFinishBtn = (paper, foil) => {
        paperSelect.forEach((btn) => {
            btn.classList.remove('btn-group__btn--active');
            if (btn.dataset.paper === paper) {
                btn.classList.add('btn-group__btn--active');
            }
        });
        foilSelect.forEach((btn) => {
            btn.classList.remove('btn-group__btn--active');
            if (btn.dataset.foil === foil) {
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
        setFinishBtn('mat', 'mat');
    });

    backUvPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'backUV');
        setFinishBtn('mat', 'mat');
    });

    frontEmbossPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'frontEmboss');
    });

    frontEmbossToggle.addEventListener('change', () => {
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
        const index = event.target.value;

        if (index) { 
            for (const [key, val] of Object.entries(SAMPLES[index].files)) {
                handlePdfUpload(val, key);
                uploadSample(val, key);
            }
            const paper = SAMPLES[index].tags.paper;
            const foil = SAMPLES[index].tags.foil;

            card.updateCardFinish(paper, foil || 'none');
            setFinishBtn(paper, foil || 'none');

            disable();
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