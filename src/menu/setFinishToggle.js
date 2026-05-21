export const setFinishToggle = (card) => {
    const paperSelect = document.querySelectorAll('[data-paper]');
    const foilSelect = document.querySelectorAll('[data-foil]');

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

    setupToggleGroup(paperSelect, 'paper');
    setupToggleGroup(foilSelect, 'foil');
};