chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'addAnchorLink',
        title: 'Добавить якорную ссылку',
        contexts: ['selection'],
    });

    chrome.contextMenus.create({
        id: "addAnchorTarget",
        title: "Добавить якорную цель",
        contexts: ["selection"],
    });
    chrome.contextMenus.create({
        id: "setAdaptiveTable",
        title: "Сделать все таблицы адаптивными",
        contexts: ["all"],
    });
});

const filesConfig = {
    addAnchorLink: ["utils/setAnchorLink.js"],
    addAnchorTarget: ["utils/setAnchorTarget.js"],
    setAdaptiveTable: ["utils/setAdaptiveTable.js"]
}


function contextClick(info, tab) {
    const {menuItemId} = info;

    chrome.scripting
        .executeScript({
            target: {tabId: tab.id},
            files: filesConfig[menuItemId],
        });

}

chrome.contextMenus.onClicked.addListener(contextClick)



chrome.webNavigation.onCompleted.addListener(function (details) {
    if (details.url.startsWith("https://sfera.inno.local/knowledge")) {

    chrome.scripting.executeScript({
        target: {tabId: details.tabId},
        func: function () {

            // Добавляем скролл для картинок (figure)
            document.head.appendChild(document.createElement("style")).innerHTML = "figure { overflow:scroll !important; }";

            function setAdaptiveTableView() {
                const container = document.getElementsByClassName("mce-content-body")[0]?.parentNode;
                const table = document.getElementsByTagName("table")[0];

                const hasTargetElements = !!container && !!table;

                if (hasTargetElements) {
                    container.style.width = "100%"
                    table.style.width = "100%"
                }
                return hasTargetElements;
            }

            const hasTargetElements = setAdaptiveTableView();

            // Проверяем есть ли сейчас элемент в DOM
            if (hasTargetElements) return;

            // Обработчик MutationObserver
            function handleElementAppearance(mutationsList, observer) {
                const hasElement = setAdaptiveTableView();

                if (hasElement) {
                    observer.disconnect(); // Останавливаем отслеживание
                    return;
                }
            }

            // Корневой элемент для отслеживания изменений
            const targetNode = document.documentElement; // Обычно это корневой элемент <html>

            // Создаем экземпляр MutationObserver с функцией обратного вызова
            const observer = new MutationObserver(handleElementAppearance);

            // Запускаем отслеживание + настройка MutationObserver
            observer.observe(targetNode, {
                childList: true, // Наблюдать за добавлением/удалением дочерних элементов
                subtree: true,   // Наблюдать за всеми потомками элемента
            });
        },
    });
    }
});
