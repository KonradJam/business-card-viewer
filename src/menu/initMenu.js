import { selectCardFormatOrientation } from "./selectCardFormatOrientation";
import { selectCameraView } from "./selectCameraView";
import { uploadManager } from "./uploadManager";
import { disableButtons } from "./disableButtons";
import { toggleEmboss } from "./toggleEmboss";
import { setFinishToggle } from "./setFinishToggle";
import { selectSample } from "./selectSample";

export const initMenu = (sceneObjects) => {
    const { card, camera, controls } = sceneObjects;

    selectSample(card);

    selectCardFormatOrientation(card, controls);

    selectCameraView(camera, controls);

    uploadManager(card);

    toggleEmboss(card);

    setFinishToggle(card);

    disableButtons();
};