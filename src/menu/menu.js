import { uploadFile } from "./upload-file";
import { disableButtons } from "./disableButtons";

export const menu = () => {
    uploadFile();
    disableButtons();
};