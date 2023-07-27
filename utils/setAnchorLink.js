(function setAnchorLink ()  {

    const selection = window.getSelection();
    const promptText = window.prompt('Введите айди для якоря')

    let currentRange = undefined;

    if (selection) {
        const isSelectionHasRanges =
            selection.rangeCount && selection.rangeCount > 0;
        currentRange = isSelectionHasRanges ? selection.getRangeAt(0) : undefined;
    }
    if (!currentRange) {
        return;
    }
    const wrapper = document.createElement("a");
    wrapper.href = `#${promptText}`;
    wrapper.setAttribute(
        "onclick",
        "(function moveTo (that) {const idToMove = that.href.split('#')[1];window.location.hash = idToMove;})(this)"
    );
    wrapper.appendChild(currentRange.extractContents());
    currentRange.insertNode(wrapper);
})();