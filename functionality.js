const DEFAULT_SL = 10;
const container = document.querySelector("#grid-container");
let drawing = false;

const newGrid = document.querySelector("#new-grid");
newGrid.addEventListener("click", () => {
    let sideLength = prompt("Enter a side-length between 10 and 100");
    if (!sideLength) resetGrid();
    else if (sideLength < 10 || sideLength > 100) {
        alert("Invalid side-length!");
    }
    else initializeGrid(sideLength);
});

const toggleLines = document.querySelector("#toggle-gridlines");
toggleLines.addEventListener("click", () => toggleGridLines());

function toggleGridLines() {
    // console.log("toggling...");
    boxes = container.querySelectorAll(".box");
    if (toggleLines.checked) {
        for (box of boxes) {
            box.style.border = "1px solid black";
        }
    } else {
        for (box of boxes) {
            box.style.border = "none";
        }
    }
}

function resetGrid() {
    boxes = container.querySelectorAll(".box");
    for (box of boxes) {
        box.style.backgroundColor = "initial";
    }
}


function createBox() { // Helper function for initializeGrid()
    const box = document.createElement("div");
    box.setAttribute("class", "box");
    return box;
}

function initializeGrid(dimension) {
    clearGrid();
    toggleLines.checked = true;
    for (i = 0; i < dimension; ++i) {
        const row = document.createElement("div");
        row.setAttribute("class", "row");
        for (j = 0; j < dimension; ++j) {
            const box = createBox();
            row.append(box);
        }
        container.append(row);
    }
}

function clearGrid() {
    rows = container.querySelectorAll(".row");
    for (row of rows) {
        container.removeChild(row);
    }
}

container.addEventListener("mousedown", (event) => {
    console.log("down");
    event.preventDefault();
    if (event.target.className === "box" && event.button === 0) {
        drawing = true;
        event.target.style.backgroundColor = "black";
    }
});

container.addEventListener("mouseup", () => {
    console.log("up");
    // event.preventDefault();
    drawing = false;
});

container.addEventListener("mouseover", (event) => {
    console.log("over");
    // event.preventDefault();
    if (!drawing) return;

    if (event.target.className === "box")
        event.target.style.backgroundColor = "black";
});

initializeGrid(DEFAULT_SL);
