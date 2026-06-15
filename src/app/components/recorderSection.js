export const recorderSection = () => {
    return/*html*/`
        <aside class="recorder-panel">
            <div class="btn-group">
            <button class="btn-group__btn" id="recorder-start">
                <span class="btn-group__text">&#9673;</span>
                <span class="btn-group__text">REC</span>
            </button>
            <button class="btn-group__btn" id="recorder-stop">&#9209;</button>
            <button class="btn-group__btn btn-group__btn--blue" id="recorder-download" disabled>&#11123;</button>
            </div>
        </aside>
    `;
};