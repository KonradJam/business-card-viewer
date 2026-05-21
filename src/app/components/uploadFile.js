export const uploadFile = (side, legend) => {
    const toggleEmboss = /*html*/`
        <label class="toggle">
            <span class="toggle__label">Debossing</span>
            <input id="frontEmboss-toggle" type="checkbox" role="switch" class="toggle__input">
            <span class="toggle__slider"></span>
            <span class="toggle__label">Embossing</span>
        </label>
    `;

    return /*html*/`
        <details class="control-group" ${side === 'front' ? 'open' : ''}>
            <summary class="control-group__legend">${legend}</summary>
            ${side === 'frontEmboss' ? toggleEmboss : ''}
            <div class="file-upload">
                <label for="${side}-pdf-input" class="file-upload__btn" aria-label="Choose file">Choose File</label>
                <input id="${side}-pdf-input" class="file-upload__input" type="file" accept="application/pdf" />
                <span class="file-upload__text">No file chosen</span>
                <button type="button" class="file-upload__clear file-upload__clear--hidden" aria-label="Remove file">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </details>
    `;
}