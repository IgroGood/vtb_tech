// Make the elements draggable: 
var reportItems = document.getElementsByClassName('ReportItem');
for (var index = 0; index < reportItems.length; ++index) {
  initDrag(reportItems[index]);
}

var mode = "selectItem";

function currentPage()
{
    return document.getElementsByClassName("pageWorkspace active")[0];
}

function onPageClicked(event)
{
    var item;

    switch(mode) {
        case "addText":
            item = createTextItem();
        break;

        case "addTable":
            item = createTableItem();
        break;

        default:  //selectItem
        break;
    }
  
    if (mode != "selectItem") {
        setupReportItem(item);

        document.getElementById(mode).className = "";
        mode = "selectItem";
        document.getElementById(mode).className = "active";
    }
}

function setMode(button)
{
    document.getElementById(mode).className = "";
    button.className = "active";
    mode = button.id;
}