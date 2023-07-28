(function setAdaptiveTableView() {
    const tablesList = document.getElementsByTagName("table");

    const hasTables = tablesList.length > 0;

    if (hasTables) {
        [...tablesList].forEach((table)=> {
            table.style.width = "100%"
        });
    }

    const containersList = document.getElementsByClassName("mce-content-body");
    const hasContainers = containersList.length > 0;

    if (hasContainers) {
        [...containersList].forEach((container) => {
            container.parentNode.style.width = "100%"
        })
    }

})()