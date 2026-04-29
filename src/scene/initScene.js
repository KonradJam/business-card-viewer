import { createScene } from "./createScene";
import { createCamera } from "./createCamera";
import { createRenderer } from "./createRenderer";
import { createCard } from "./createCard.js";
import { createControls } from "./createControls";
import { createLights } from "./createLights.js";
import { setupResizerHandler } from "./setupResizeHandler";
import {
    DEFAULT_CARD_FORMAT_ID,
    DEFAULT_CARD_ORIENTATION
} from '../card/cardFormats.js'
import { rennderPdfToTexture } from "../pdf/renderPdfToTexture.js";

export const initScene = (container) => {
    const scene = createScene();
    const camera = createCamera(container);
    const renderer = createRenderer(container);
    
    const card = createCard();
    scene.add(card.mesh);


    const { ambientLight, frontLight, frontLightSecondary, backLight } = createLights();
    scene.add(ambientLight, frontLight, frontLightSecondary, backLight);

    const controls = createControls(camera, renderer);

    setupResizerHandler({ container, camera, renderer });

    const formatSelect = document.querySelector('#card-format-select');
    const orientationSelect = document.querySelector('#card-orientation-select');
    const frontPdfInput = document.querySelector('#front-pdf-input');
    const backPdfInput = document.querySelector('#back-pdf-input');

    const applyCurrentCardFormat = () => {
        const formatId = formatSelect?.value ?? DEFAULT_CARD_FORMAT_ID;
        const orientation = orientationSelect?.value ?? DEFAULT_CARD_ORIENTATION;

        const { heightMm } = card.setCardFormat({ formatId, orientation });

        controls.target.set(0, 0, 0);
        controls.update();
    };

    const handlePdfUpload = async (file, side) => {
        if (!file) return;

        const { texture } = await rennderPdfToTexture(file);

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

    paperSelect.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            paperSelect.forEach((b) => b.classList.remove('is-active'));
            
            event.target.classList.add('is-active');
            
            card.finishState.paper = event.target.dataset.paper;
            card.updateCardFinish(card.finishState.paper, card.finishState.foil);
        });
    });

    foilSelect.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            foilSelect.forEach((b) => b.classList.remove('is-active'));
                
            event.target.classList.add('is-active');

            card.finishState.foil = event.target.dataset.foil;
            card.updateCardFinish(card.finishState.paper, card.finishState.foil)
        });
    });




    const animate = () => {
        controls.update();
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };

    animate();

    return { scene, camera, renderer, controls };
};