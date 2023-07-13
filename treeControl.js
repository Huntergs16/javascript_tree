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

console.log(data);

function createRoot(obj) {
  const newContainer = document.createElement("div");
  newContainer.id = `${obj.CODEID}-container`;
  newContainer.style.display = "flex";
  newContainer.style.display = "flex";
  newContainer.style.justifyContent = "flex-start";
  newContainer.style.alignItems = "center";

  const rootNode = document.createElement("div");

  rootNode.setAttribute("id", `${obj.CODEID}`);
  rootNode.setAttribute(
    "style",
    "padding: 5%; background-color: #D3D3D3; border-style: solid; display: flex; flex-direction: column;"
  );

  const folderIcon = document.createElement("img");
  folderIcon.src = "/icon_folder.png";
  folderIcon.style.width = "10px";
  folderIcon.style.height = "10px";

  const showButton = document.createElement("button");
  showButton.textContent = "-";
  showButton.addEventListener("click", () => {
    const children = Array.from(rootNode.children);
    children.forEach((child) => {
      child.style.display = child.style.display === "none" ? "flex" : "none";
    });
    showButton.innerHTML = showButton.innerHTML === "+" ? "-" : "+";
  });

  rootNode.innerHTML = "root";

  newContainer.appendChild(folderIcon);
  newContainer.appendChild(rootNode);
  newContainer.appendChild(showButton);

  treeWrapper.appendChild(newContainer);

  return rootNode;
}

function createNode(obj) {
  const newContainer = document.createElement("div");
  newContainer.id = `${obj.CODEID}-container`;
  newContainer.style.display = "flex";
  newContainer.style.justifyContent = "flex-start";
  newContainer.style.alignItems = "center";

  const newNode = document.createElement("div");

  newNode.setAttribute("id", obj.CODEID);
  newNode.setAttribute(
    "style",
    "padding: 5%; background-color: #D3D3D3; border-style: solid; display: flex; flex-direction: column;"
  );

  newNode.innerHTML = obj.CODETxt;

  const folderIcon = document.createElement("img");
  folderIcon.src = "/icon_folder.png";
  folderIcon.style.width = "10px";
  folderIcon.style.height = "10px";

  // const moreIcon = document.createElement('img')
  // moreIcon.src = "/icon_plus.png"
  // moreIcon.style.width = '20px'
  // moreIcon.style.height = '20px';

  // const lessIcon = document.createElement('img')
  // lessIcon.src = "/icon_minus.png"
  // lessIcon.style.width = '20px'
  // lessIcon.style.height = '20px';

  const showButton = document.createElement("button");
  showButton.innerHTML = "-";
  showButton.addEventListener("click", () => {
    const children = Array.from(newNode.children);
    children.forEach((child) => {
      child.style.display = child.style.display === "none" ? "flex" : "none";
    });
    showButton.innerHTML = showButton.innerHTML === "+" ? "-" : "+";
  });

  // newNode.addEventListener('click', () => {
  //     newNode.innerHTML = newNode.innerHTML === obj.CODETxt ? obj.CODEVal : obj.CODETxt
  // })

  newContainer.appendChild(folderIcon);
  newContainer.appendChild(newNode);
  newContainer.appendChild(showButton);

  return newContainer;
}

//Create Nodes
const nodeList = [];

for (let i = 0; i < data.length; i += 1) {
  let newNode = null;
  if (i === 0) {
    newNode = createRoot(data[i]);
  } else newNode = createNode(data[i]);
  nodeList.push(newNode);
}

// Append child nodes
for (let i = 0; i < nodeList.length; i += 1) {
  for (let j = 1; j < nodeList.length; j += 1) {
    const parentNode = data[i];
    const childNode = nodeList[j];
    if (data[j].CODEParentID === data[i].CODEID) {
      let listNode = document.getElementById(`${parentNode.CODEID}`);
      listNode.appendChild(childNode);
    }
  }
}
