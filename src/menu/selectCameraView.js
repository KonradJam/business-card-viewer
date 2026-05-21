import { setCameraView } from "../camera/setCameraView";

export const selectCameraView = (camera, controls) => {
const positionSelect = document.querySelectorAll('[data-position]');

    positionSelect.forEach((button) => {
        button.addEventListener('click', (event) => {
            const position = event.currentTarget.dataset.position;
            setCameraView(camera, controls, position);
        });
    });
};