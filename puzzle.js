var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;

window.onload = function() {
    //initialize the 5x5 game board
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            //create and img tag
            let tile = document.createElement("img");
            tile.src = "./Images/blank.jpg"; //dummy image to blend with the background
            tile.draggable = true;
        

            //drag functionality
            tile.addEventListener("dragstart", dragStart); //dragStart function created. click on an image to drag
            tile.addEventListener("dragover", dragOver); // drag an image 
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop); // drop an image onto another one
            tile.addEventListener("dragend", dragEnd); //after you completed dragdrop

            tile.addEventListener("click", selectTile); //mobile

            document.getElementById("board").append(tile);

         }
    }

    //pieces
    let pieces = [];
    for(let i=1; i<=rows*columns; i++) {
        pieces.push(i.toString()); //put 1 to 25 in the array (puzzle images name)
    }
    
    pieces.reverse(); //to shuffle the pieces
    for(let i=0; i< pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);
        //swap
        let temp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] =  temp;

    }

    for(let i=0; i< pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./Images/" + pieces[i] + ".jpg";
        tile.draggable = true;

       //drag functionality
       tile.addEventListener("dragstart", dragStart); //dragStart function created. click on an image to drag
       tile.addEventListener("dragover", dragOver); // drag an image 
       tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
       tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
       tile.addEventListener("drop", dragDrop); // drop an image onto another one
       tile.addEventListener("dragend", dragEnd); //after you complete  d dragdrop

       tile.addEventListener("click", selectTile); //mobile


        document.getElementById("pieces").append(tile);

    }
}

//DRAG Tiles
function dragStart() {
    currTile = this; //this refers to the image that was clicked on for dragging
}
function dragOver(e) {
    e.preventDefault();
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {

}
function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}
function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

//mobile and laptop

function selectTile() {
    if (!currTile) {
        currTile = this;
    } 
    else if (!otherTile) {
        otherTile = this;

        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;

        currTile = null;
        otherTile = null;
    }
}