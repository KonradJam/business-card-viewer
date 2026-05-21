export const toggleEmboss = (card) => {
    const frontEmbossToggle = document.querySelector('#frontEmboss-toggle');

    frontEmbossToggle.addEventListener('change', () => {
        card.updateFrontEmbossTextureSwitch();
    });
};