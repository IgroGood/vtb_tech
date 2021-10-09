var JSONString = "{}";

var currentDraggedElement = null;
var offsetX = 0;
var offsetY = 0;
            
function mouseDownEventHandler(event)
{
    
    if (event.target.classList.contains("treeitem"))
    {
        if (currentDraggedElement != null) {
            currentDraggedElement.remove();
        }
        
        event.preventDefault();
        event.target.id = "idForCurrentDraggableElement";
        currentDraggedElement = document.createElement("DIV");
        document.body.appendChild(currentDraggedElement); 
        currentDraggedElement.outerHTML = event.target.outerHTML;  
        event.target.id = "";
        currentDraggedElement = document.getElementById("idForCurrentDraggableElement"); 
        offsetX = event.target.offsetLeft - event.clientX;
        offsetY = event.target.offsetTop - event.clientY;
        currentDraggedElement.style.position = "absolute";
        currentDraggedElement.style.left = event.clientX + offsetX + "px";
        currentDraggedElement.style.top = event.clientY + offsetY + "px";
        currentDraggedElement.style.width = event.target.offsetWidth - 10 + "px";
        currentDraggedElement.style.height = event.target.offsetHeight - 10 + "px";
        currentDraggedElement.style.zIndex = 1000;
        document.addEventListener('mousemove', mouseMoveEventHandler);
    }
    else
    {
        currentDraggedElement = null;
    }
}
        
function mouseMoveEventHandler(event)
{
    if (currentDraggedElement != null)
    {
        event.preventDefault();
        currentDraggedElement.style.position = "absolute";
        currentDraggedElement.style.left = event.clientX + offsetX + "px";
        currentDraggedElement.style.top = event.clientY + offsetY + "px";
    }
}

function mouseUpEventHandler(event)
{
    if (currentDraggedElement != null)
    {
        event.preventDefault();
        
        currentDraggedElement.style.pointerEvents = 'none';
        var item = document.elementFromPoint(event.clientX, event.clientY);
        if (item != null && (item.classList.contains("ReportItem") || item.hasAttribute("data-reportitemtype"))) {
            if (item.dataset.reportitemtype == "ReportTableCell") {
                //Текущая ячейка не всегда верно определяется внутренним событием "onmouseover"
                storeCell(item);
            }
            
            while (item != null && !item.classList.contains("ReportItem")) {
                item = item.parentNode;
            }
            
            if (item != null) {
                loadTreeItemData(currentDraggedElement);
                storeSourceDataInReportItem(item);
            }
        }

        currentDraggedElement.remove();
        currentDraggedElement = null;
        offsetX = 0;
        offsetY = 0;                
        document.removeEventListener('mousemove', mouseMoveEventHandler);
    }
}

function showHideTree(event)
{
    console.log(event.target.parentElement.tagName);
    
    for (var i = 0; i < event.target.parentElement.children.length; i++)
    {
        //console.log(event.target.parentElement.children[i].tagName);
        
        if (event.target.parentElement.children[i].tagName.toUpperCase() == "UL")
        {
            if (event.target.parentElement.children[i].style.display == "none")
            {
                event.target.parentElement.children[i].style.display = "list-item";
                event.target.innerText = " - ";
            }
            else
            {
                event.target.parentElement.children[i].style.display = "none";
                event.target.innerText = " + ";
            }
        }
    }
}

function DrawNode(JSONNode)
{
    var HTMLCode = "<LI>";
    
    var hasChild = (JSONNode["child"] != undefined && JSONNode["child"].length != undefined && JSONNode["child"].length > 0);
    
    if (hasChild)
    {
        HTMLCode += "<A onclick='showHideTree(event);' style='cursor: grab'> - </A>";
    }
    
    HTMLCode += "<DIV class='treeitem' ondragstart='return false;'>" + JSONNode["name"] + "</DIV>";

    if (hasChild)
    {
        HTMLCode += "<UL style=\"list-style: none\">";

        for (var i = 0; i < JSONNode["child"].length; i++)
        {
            HTMLCode += DrawNode(JSONNode["child"][i]);
        }

        HTMLCode += "</UL>";
    }

    HTMLCode += "</LI>";

    return HTMLCode;
}

document.addEventListener('mousedown', mouseDownEventHandler);
document.addEventListener('mouseup', mouseUpEventHandler);        

var moveOffset1;

var signalsTreeBlock;
var reportPageBlock;

function getElements()
{
    signalsTreeBlock = document.getElementById("signalsTreeContainer");
    reportPageBlock = document.getElementsByClassName("pageWorkspace active")[0];
    reportPageBlock.style.width = window.innerWidth * (1 - parseFloat(signalsTreeBlock.style.width) / 100.0) - 10 + "px";
}

function splitterMouseDown(event)
{
    document.addEventListener("mousemove", splitterMouseMove);
    document.addEventListener("mouseup", function (event) { document.removeEventListener("mousemove", splitterMouseMove); });
    moveOffset1 = event.target.offsetLeft - event.clientX;
}

function splitterMouseUp(event)
{
    document.removeEventListener("mousemove", splitterMouseMove);
}

function splitterMouseMove(event)
{
    signalsTreeBlock.style.width = event.clientX + moveOffset1 + "px";
    reportPageBlock.style.width = window.innerWidth - parseFloat(signalsTreeBlock.style.width) - 10 + "px";
}

function updateSize()
{
    reportPageBlock.style.width = window.innerWidth - parseFloat(signalsTreeBlock.style.width) - 10 + "px";
}

function loadTreeItemData(item)
{
    if (!event.target.classList.contains("treeitem")) {
        sourceData = [];
    } else {
        //TODO: подгрузка данных
        sourceData = [];
        for (var i = 1; i < 6; ++i) {
            sourceData[i-1] = item.innerText + "-" + i;
        }
    }
}