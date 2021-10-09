function createTextItem()
{
    var text = document.createElement("div");

    text.className = "ReportItem";
    text.innerHTML = "Text";
    text.setAttribute("data-reportitemtype", "ReportTextItem");
    text.setAttribute("contenteditable", "true");

    return text;
}
