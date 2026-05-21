export const setFinishBtn = (paper, foil) => {
    const paperSelect = document.querySelectorAll('[data-paper]');
    const foilSelect = document.querySelectorAll('[data-foil]');

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