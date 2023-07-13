/*
  Description:
  - This code generates a tree structure based on the provided data.
  - The data represents a hierarchy of nodes, where each node has an ID, a parent ID, a value, a text, and an icon.
  - The tree is rendered dynamically using JavaScript and HTML elements.
  - Nodes can be expanded or collapsed by clicking on the corresponding toggle button.
  - Clicking on a node displays its value.

  Steps:
  1) Order data by parentID so that we only check subsequent nodes for children when looping.
  2) Create each node individually, the root is created and appended to treeWrapper element.
  3) Loop through sortedData and append children nodes to parent nodes
*/

var treeWrapper = document.querySelector("#tree-wrapper");

var data = JSON.parse(`[
  {"CODEID":"8456","CODEParentID":null,"CODEVal":"8456","CODETxt":"(Root)","CODEIcon":"folder"},
  {"CODEID":"8457","CODEParentID":"8456","CODEVal":"8457","CODETxt":"2016","CODEIcon":"folder"},
  {"CODEID":"10231","CODEParentID":"8457","CODEVal":"10231","CODETxt":"07 July","CODEIcon":"folder"},
  {"CODEID":"20627","CODEParentID":"8456","CODEVal":"20627","CODETxt":"2017","CODEIcon":"folder"},
  {"CODEID":"21124","CODEParentID":"20627","CODEVal":"21124","CODETxt":"03 March","CODEIcon":"folder"},
  {"CODEID":"21168","CODEParentID":"20627","CODEVal":"21168","CODETxt":"04 April","CODEIcon":"folder"},
  {"CODEID":"21527","CODEParentID":"20627","CODEVal":"21527","CODETxt":"06 June","CODEIcon":"folder"},
  {"CODEID":"22304","CODEParentID":"20627","CODEVal":"22304","CODETxt":"10 October","CODEIcon":"folder"}
]`);

function compareByParentID(a, b) {
  return Number(a.CODEParentID) - Number(b.CODEParentID);
}

// Sort by parentID
const sortedData = data.sort(compareByParentID);

/**
 * Create a tree node element.
 *
 * @param {Object} obj - The object containing the node data.
 * @param {boolean} isRoot - Indicates whether the node is a root node.
 * @returns {HTMLElement} - The created node element.
 *
 * Organization:
 *  - Create a container div that consists of 1) folderControlsContainer and 2) container for children nodes
 *  - folderControlsContainer consists of 1) folderIcon, 2) folderName, 3) toggleButton
 *  - 'click' listeners exist for folder toggle button and folderName
 */

function createNode(obj, isRoot) {
  // Create the container for the folder controls and the content
  const newContainer = document.createElement("div");
  newContainer.id = `${obj.CODEID}-container`;
  newContainer.style.display = "flex";
  newContainer.style.flexDirection = "column";
  newContainer.style.width = "max-content";

  // Create the folder controls container and add the folder icon and folder name
  const folderControlsContainer = document.createElement("div");
  folderControlsContainer.style.display = "flex";
  folderControlsContainer.style.alignItems = "center";

  const folderIcon = document.createElement("img");
  folderIcon.src = `icon_${obj.CODEIcon}.png`;
  folderIcon.style.width = "16px";
  folderIcon.style.height = "16px";

  const folderName = document.createElement("h4");
  folderName.textContent = obj.CODETxt;
  folderName.style.padding = "0 0 4px 5px";

  folderName.addEventListener("click", () => {
    folderName.textContent =
      folderName.textContent === obj.CODETxt ? obj.CODEVal : obj.CODETxt;
  });

  const node = document.createElement("div");
  node.id = obj.CODEID;
  node.style.marginLeft = "20px";
  node.style.display = "none";
  node.style.flexDirection = "column";
  node.style.width = "max-content";

  const showButton = document.createElement("img");
  showButton.style.width = "25px";
  showButton.style.height = "25px";

  // Check if the node has children and add toggle functionality if so.
  const hasChildren = data.some((item) => item.CODEParentID === obj.CODEID);

  if (hasChildren) {
    showButton.src = "icon_plus.png";
    showButton.addEventListener("click", () => {
      if (node.style.display === "none") {
        node.style.display = "flex";
        showButton.src = "icon_minus.png";
      } else {
        node.style.display = "none";
        showButton.src = "icon_plus.png";
      }
    });
    // Add the showButton to the folder controls container
    folderControlsContainer.appendChild(showButton);
  } else {
    newContainer.style.marginLeft = "22px";
  }

  // Add the folder icon, folder name, and folder controls container to the newContainer
  folderControlsContainer.appendChild(folderIcon);
  folderControlsContainer.appendChild(folderName);
  newContainer.appendChild(folderControlsContainer);
  newContainer.appendChild(node);

  if (isRoot) {
    treeWrapper.appendChild(newContainer);
    return node;
  } else {
    return newContainer;
  }
}

//Create Nodes
const nodeList = [];

//Create root node and add to list
newNode = createNode(data[0], true);
nodeList.push(newNode);

//Add the rest of the nodes
for (let i = 1; i < data.length; i += 1) {
  let newNode = createNode(data[i], false);
  nodeList.push(newNode);
}

/*
  Append child nodes
    1) Loop through ordered nodes
    2) For each node, check the subsequent nodes for children
    3) For each subsequent node, if it is a child, append it to the parentNode.
*/
for (let i = 0; i < sortedData.length; i++) {
  const parentData = sortedData[i];
  const parentNode = document.getElementById(`${parentData.CODEID}`);

  for (let j = i + 1; j < sortedData.length; j++) {
    const childData = sortedData[j];

    if (childData.CODEParentID === parentData.CODEID) {
      const childNode = nodeList[j];
      parentNode.appendChild(childNode);
    }
  }
}
