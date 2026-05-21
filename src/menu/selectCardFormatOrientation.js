import { DEFAULT_CARD_FORMAT_ID, DEFAULT_CARD_ORIENTATION } from "../card/cardFormats";

export const selectCardFormatOrientation = (card, controls) => {
    const formatSelect = document.querySelector('#card-format-select');
    const orientationSelect = document.querySelector('#card-orientation-select');
    
    const applyCurrentCardFormat = () => {
        const formatId = formatSelect?.value ?? DEFAULT_CARD_FORMAT_ID;
        const orientation = orientationSelect?.value ?? DEFAULT_CARD_ORIENTATION;
        
        const { heightMm } = card.setCardFormat({ formatId, orientation });
        
        controls.target.set(0, 0, 0);
        controls.update();
    };
    
    formatSelect?.addEventListener('change', applyCurrentCardFormat);
    orientationSelect?.addEventListener('change', applyCurrentCardFormat);
    
    applyCurrentCardFormat();
};