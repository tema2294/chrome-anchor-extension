chrome.contextMenus.create({
    id: 'addAnchorLink',
    title: 'Добавить якорную ссылку',
    contexts: ['selection'],
})

chrome.contextMenus.create({
    id: "addAnchorTarget",
    title: "Добавить якорную цель",
    contexts: ["selection"],
});

const filesConfig = {
    addAnchorLink: [ "utils/setAnchorLink.js" ],
    addAnchorTarget: [ "utils/setAnchorTarget.js" ]
}


function contextClick(info, tab) {
    const {menuItemId} = info;

    chrome.scripting
        .executeScript({
            target: { tabId: tab.id },
            files: filesConfig[menuItemId],
        });

}

chrome.contextMenus.onClicked.addListener(contextClick)
