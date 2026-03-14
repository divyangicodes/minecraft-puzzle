var currentTheme = "minecraft";


function loadTheme(theme) {
    currentTheme = theme;

    document.getElementById("board").innerHTML = "";
    document.getElementById("pieces").innerHTML = "";

    turns = 0;
    document.getElementById("turns").innerText = turns;

    createBoard();
    createPieces();
}






var rows = 5; //var = container that store data by creating a variable
var columns = 5;

var currTile; //tile I drag
var otherTile; //tile I drop onto

var turns = 0; //keeps track of moves of player

//Run the code after the page loads, without this, script might run before the HTML exists, game is initialized under this function
window.onload = function(){
    createBoard();
    createPieces();
}



function createBoard() {
    //initialize the 5x5 game board
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) /*another loop, so total iteration = 5*5=25 */ {
            //creating an image tile 
            let tile = document.createElement("img"); /* creates an HTML image element <img> using javascript*/
            tile.src = "./Images/blank.jpg"; //dummy image to blend with the background

            tile.draggable = true; //allows the image to be dragged with the mouse
        


            //drag functionality   HTML Drag and Drop API.
            tile.addEventListener("dragstart", dragStart); //dragStart function created. click on an image to drag
            tile.addEventListener("dragover", dragOver); // drag an image 
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop); // drop an image onto another one
            tile.addEventListener("dragend", dragEnd); //after you completed dragdrop

            tile.addEventListener("click", selectTile); //mobile as phones don't support drag well

            document.getElementById("board").append(tile);  //This finds the HTML element: <div id="board"> and adds the tile inside it.

         }
    }
}

function createPieces() {
    //creating puzzle pieces
    let pieces = []; //creates an array
    for(let i=1; i<=rows*columns; i++) {
        pieces.push(i.toString()); //put 1 to 25 in the array (puzzle images name)
        //push() = add element to array
        //toSting() = convert number to text
        // 1 to 25 mathces the image names from 1.jpg to 25.jpg
    }
    
    pieces.reverse(); //to shuffle the pieces

    for(let i=0; i< pieces.length; i++) { //for randome swapping 
        let j = Math.floor(Math.random() * pieces.length); //Math.random create random decimal numbers which are multiplied by 25(pieces.length) and Math.floor covert the result into whole numbers

        //swapping 
        let temp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] =  temp;

    }
    
    //creating puzzle pieces images
    for(let i=0; i< pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./Images/" + currentTheme + "/" + pieces[i] + ".jpg";
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
    e.preventDefault(); //By default browsers do not allow dropping. preventDefault() allows dropping.
}
function dragEnter(e) {
    e.preventDefault();
}
function dragLeave() {

}
function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}





//actually swaps images
function dragEnd() {
    if (currTile.src.includes("blank")) {
        return; //stop running the dragEnd() immediately
    }
    //if image being dragged is not blank, these will RUN
    let currImg = currTile.src; //storing the path of currTile in currImg temporary variable
    let otherImg = otherTile.src; //storing the path of otherTile in otherImg temporary variable
    currTile.src = otherImg; //swap
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;  //Changes the text inside: <span id="turns"></span>
}



//mobile and tablet

function selectTile() {
    if (!currTile) /* if currTile does not exist yet (at start of the game)*/ {
        currTile = this; /* tile the player clicked*/
    } 
    else if (!otherTile) /* now currTile already exists and Is otherTile empty? (which is true) */ {
        otherTile = this; /* tile the player clicked*/

        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;   /* innerText = the text inside HTML element */

        currTile = null;
        otherTile = null;
    }
}