assigneeButtonXpath = ".//div[contains(@class, 'issue-card')]//button[contains(@class, 'avatar')]";
projectTopBarXpath = ".//div[contains(@class, 'project-header-controls')]";

function getElementsByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getSingleElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

let uniqueAssignees = new Set();
let assigneeButtonsToAdd = new Array();

let assigneeButtons = getElementsByXpath(assigneeButtonXpath);

for ( var i=0 ; i < assigneeButtons.snapshotLength; i++ )
{
    let assigneeButton = assigneeButtons.snapshotItem(i);
    let assignee = assigneeButton.getAttribute('data-card-filter');
    if ( !uniqueAssignees.has(assignee) ) {
        assigneeButtonsToAdd.push(assigneeButton.cloneNode(true));
        uniqueAssignees.add(assignee);
    }
}

let projectTopBar = getSingleElementByXpath(projectTopBarXpath);

for ( var i=0 ; i < assigneeButtonsToAdd.length; i++ )
{
    projectTopBar.insertBefore(assigneeButtonsToAdd[i], projectTopBar.firstChild);
}
