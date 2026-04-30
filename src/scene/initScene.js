import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { setCameraView } from "../camera/setCameraView.js";
import { createRenderer } from "./createRenderer";
import { createCard } from "./createCard.js";
import { createControls } from "./createControls";
import { createLights } from "./createLights.js";
import { setupResizerHandler } from "./setupResizeHandler";
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

    const formatSelect = document.querySelector('#card-format-select');
    const orientationSelect = document.querySelector('#card-orientation-select');

    const frontPdfInput = document.querySelector('#front-pdf-input');
    const backPdfInput = document.querySelector('#back-pdf-input');

    const frontUvPdfInput = document.querySelector('#front-uv-pdf-input');
    const backUvPdfInput = document.querySelector('#back-uv-pdf-input');

    const applyCurrentCardFormat = () => {
        const formatId = formatSelect?.value ?? DEFAULT_CARD_FORMAT_ID;
        const orientation = orientationSelect?.value ?? DEFAULT_CARD_ORIENTATION;

        const { heightMm } = card.setCardFormat({ formatId, orientation });

        controls.target.set(0, 0, 0);
        controls.update();
    };

    const handlePdfUpload = async (file, side) => {
        if (!file) return;

        const { texture } = await renderPdfToTexture(file, {});

        if (side === 'front') {
            card.updateFrontTexture(texture);
        }

        if (side === 'back') {
            card.updateBackTexture(texture);
        }
    }

    formatSelect?.addEventListener('change', applyCurrentCardFormat);
    orientationSelect?.addEventListener('change', applyCurrentCardFormat);

    frontPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'front');
    });

    backPdfInput?.addEventListener('change', async (event) => {
        const file = event.target.files?.[0];
        await handlePdfUpload(file, 'back');
    });

    applyCurrentCardFormat();


    const paperSelect = document.querySelectorAll('[data-paper]');
    const foilSelect = document.querySelectorAll('[data-foil]');

    const setupToggleGroup = (buttons, material) => { 
        buttons.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                buttons.forEach((b) => b.classList.remove('is-active'));
                
                const button = event.currentTarget;
                button.classList.add('is-active');
                
                card.finishState[material] = button.dataset[material];
                card.updateCardFinish(card.finishState.paper, card.finishState.foil);
            });
        });
    };

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