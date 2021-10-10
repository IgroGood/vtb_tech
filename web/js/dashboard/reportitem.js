function storeSourceDataInReportItem(item)
{
    storeDataInReportItem(sourceData, item);
}

function storeSourceDataInReportItem(item)
{
    if (!Array.isArray(sourceData) || sourceData.length == 0) {
        return;
    }
    
    switch(item.dataset.reportitemtype) {
        case "ReportTextItem":
            item.innerHTML = sourceData[0];
            sourceData = [];
        break;
        
        case "ReportTableItem":
            document.getElementById('tableInsertDialog').showModal();
        break;
    }
}

function setupReportItem(item)
{
    var page = currentPage();
    //page.insertBefore(item, page.getElementsByClassName("page")[0]);
    page.appendChild(item);

    var pageRect = page.getBoundingClientRect();
    console.log(event.clientX);
    console.log(pageRect.left);
    item.style.left = event.clientX - pageRect.left + "px";
    item.style.top = event.clientY - pageRect.top + "px";
    
    item.setAttribute("tabindex", '0');
    item.style.cursor = "move";
    item.setAttribute("data-dragtype", "dragdrop");
    
    item.ondblclick = function() {
        item.setAttribute("data-dragtype", "none");
        item.style.cursor = "text";
        item.focus();
    };
    
    item.onblur = function() {
        item.setAttribute("data-dragtype", "dragdrop");
        item.style.cursor = "move";
    };
    
    initDrag(item);
}
