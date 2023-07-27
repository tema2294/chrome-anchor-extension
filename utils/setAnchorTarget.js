(function setAnchorTarget () {

    const promptText = window.prompt('Введите айди для якорной цели')

    const selection = window.getSelection();
    let currentRange = undefined;
    if (selection) {
        const isSelectionHasRanges =
            selection.rangeCount && selection.rangeCount > 0;
        currentRange = isSelectionHasRanges ? selection.getRangeAt(0) : undefined;
    }
    if (!currentRange) {
        return;
    }
    const wrapper = document.createElement("span");
    wrapper.id = `${promptText}`;
    wrapper.appendChild(currentRange.extractContents());
    currentRange.insertNode(wrapper);
    
})()