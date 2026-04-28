import { CARD_FORMATS, CARD_THICKNESS_MM } from "../config/cardFormats.js";

export const getCardDimensions = (formatId, orientation) => {
    const format = CARD_FORMATS.find((item) => item.id === formatId) ?? CARD_FORMATS[0];

    const widthMm = orientation === 'portrait' ? format.heightMm : format.widthMm;
    const heightMm = orientation === 'portrait' ? format.widthMm : format.heightMm;

    return { widthMm, heightMm, depthMM: CARD_THICKNESS_MM };
};