var currentCell = null;

function createTableItem()
{
    var table = document.createElement("table");
    var tableBody = document.createElement("tbody");

    for (var rowIndex = 0; rowIndex < 2; ++rowIndex) {
        var row = document.createElement("tr");

        for (var columnIndex = 0; columnIndex < 2; ++columnIndex) {
            var cell = document.createElement("td");
            setupCell(cell);
            row.appendChild(cell);
        }

        tableBody.appendChild(row);
    }

    table.appendChild(tableBody);
    table.setAttribute("border", "1");
    table.setAttribute("cellspacing", "0");

    table.className = "ReportItem";
    table.setAttribute("data-reportitemtype", "ReportTableItem");
    table.setAttribute("contenteditable", "true");

    return table;
}

function setupCell(cell)
{
    cell.setAttribute("data-reportitemtype", "ReportTableCell");
    cell.setAttribute("onmouseover", "storeCell(this)");
    var cellText = document.createTextNode("cell");
    cell.appendChild(cellText);
}

function tableRowCount(table)
{
    return table.rows.length;
}

function tableColumnCount(table)
{
    var rowCellsCount = table.rows[0].cells.length;
    var count = 0;

    for (var i = 0; i < rowCellsCount; ++i) {
        count += table.rows[0].cells[i].colSpan;
    }

    return count;
}

function insertTableRow(table, at)
{
    var columnCount = tableColumnCount(table);
    var rowRef = table.insertRow(at);

    for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
        var cell = document.createElement("td");
        setupCell(cell);
        rowRef.appendChild(cell);
    }
}

function insertTableColumn(table, at)
{  
    var rowCount = tableRowCount(table);
        
    for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
        var cell = table.rows[rowIndex].insertCell(at);
        setupCell(cell);
    }
}

function insertSourceDataInTableRow()
{
    if (currentCell == null || !Array.isArray(sourceData) || sourceData.length == 0) {
        return;
    }
    
    var tableRow = currentCell.parentNode;
    var table = tableRow.parentNode.parentNode;
    var columnCount = tableColumnCount(table);
    var cell = currentCell;
    var column = cellColumn(cell);
    
    for (var i = 0; i < sourceData.length;) {
        cell.innerHTML = sourceData[i];
        ++i;
        if (i < sourceData.length) {
            column += cell.colSpan;
            
            if (column >= columnCount) {
                insertTableColumn(table, column);
            }
        
            cell = tableRow.cells[cell.cellIndex + 1];
        }
    }
    
    //sourceData = [];
}

function insertSourceDataInTableColumn()
{
    if (currentCell == null || !Array.isArray(sourceData) || sourceData.length == 0) {
        return;
    }
    
    var tableBody = currentCell.parentNode.parentNode;
    var table = tableBody.parentNode;
    var rowCount = tableRowCount(table);
    var cell = currentCell;
    var row = cellRow(cell);
    
    for (var i = 0; i < sourceData.length;) {
        cell.innerHTML = sourceData[i];
        ++i;
        if (i < sourceData.length) {
            row += cell.rowSpan;
            
            if (row >= rowCount) {
                insertTableRow(table, row);
            }
        
            cell = tableBody.rows[cell.parentNode.rowIndex + 1].cells[currentCell.cellIndex];
        }
    }
    
    //sourceData = [];
}

function removeTableRow(table, at)
{
    if (tableRowCount(table) <= 1) {
        table.remove();
    }

    table.deleteRow(at);
}

function removeTableColumn(table, at)
{
    var rowCount = tableRowCount(table);

    var allRowsAreEmpty = true;

    for (var rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
        table.rows[rowIndex].deleteCell(at);

        if (table.rows[rowIndex].cells.length > 0) {
            allRowsAreEmpty = false;
        }
    }

    if (allRowsAreEmpty) {
        table.remove();
    }
}

function storeCell(cell)
{
    currentCell = cell;
    //     Строка  -   тело   -  таблица
    cell.parentNode.parentNode.parentNode.setAttribute("data-currentrow", cell.parentNode.rowIndex);
    cell.parentNode.parentNode.parentNode.setAttribute("data-currentcolumn", cell.cellIndex);
}

function cellRow(cell)
{
    //TODO: вычисление с учётом объединённых ячеек
    /*
    var row = 0;

    for (var column = cellColumn(cell); column < row.cells.length;) {
        var columnCell = row.cells[column];
        
        if (rowCell.cellIndex == cell.cellIndex) {
            return column;
        }
        
        column += rowCell.colSpan;
    }

    return column;
    */
    return cell.parentNode.rowIndex;
}

function cellColumn(cell)
{
    var row = cell.parentNode;

    for (var column = cell.cellIndex; column < row.cells.length;) {
        var rowCell = row.cells[column];
        
        if (rowCell.cellIndex == cell.cellIndex) {
            return column;
        }
        
        column += rowCell.colSpan;
    }

    return column;
}