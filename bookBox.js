const characters = [' ', ',', '.', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const JavaRandom = require('java-random');
let block = {};

function checkForError(condition, consoleErrorText) {
    if (!condition) {return;}
    if (condition) {
        throw new Error(consoleErrorText);
    }}

function floorMod(a, b) {return ((a % b) + b) % b;}


function calculateBookName(xCoords, yCoords, zCoords, rotation) {
    console.clear();


    block.x = Number(xCoords);
    block.y = Number(yCoords);
    block.z = Number(zCoords);


    // figuring out which chunk this is inside of
    block.chunkX = Math.floor(block.x/16);
    block.chunkZ = Math.floor(block.z/16);

    
    // figuring out the localx and localz
    block.localX = block.x & 0xF;
    block.localZ = block.z & 0xF;



    // figuring out what the third and 4th value are  //  error checking if there's no rotation
    const rotationValue = rotation;  //  error checking if there's no rotation
    if (!rotationValue) {console.log("WARNING: You didn't select a rotation value, a default of north will be selected to avoid the script from breaking."); block.rotation = 1;} 
    else {block.rotation = Number(rotation);}

    switch (block.rotation) {
        case 0: block.fourthValue = 15 - block.localX; break;  // north
        case 1: block.fourthValue = 15 - block.localZ; break;  //  east 
        case 2: block.fourthValue =      block.localX; break;  // south
        case 3: block.fourthValue =      block.localZ; break;  //  west

        default:
        throw new Error("ERROR: Issue in rotation value, make sure to only input 0-3");
        }



    //  error checking
    checkForError(block.x > 29999983 || block.z > 29999983, 
        "WARNING: Your block is past the world border, this will generate an impossible book. Continue?")
        
    checkForError(block.y < 0, 
        "WARNING: Your block is under the world, this will generate an impossible book. Continue?")

    checkForError(block.y > 255, 
        "WARNING: Your block is higher than y=255, this will generate an impossible book. Continue?") 


    checkForError(
        ((block.rotation == 0 || block.rotation == 2) && (block.localX == 0 || block.localX == 15)) ||
        ((block.rotation == 1 || block.rotation == 3) && (block.localZ == 0 || block.localZ == 15)),
        "WARNING: The block runs parallel to the chunk border, while also bordering the chunk border. " +
        "This will result in the block not outputting a book in the game. " +
        "This is due to a bug in the snapshot.",
    );




    block.name = `${block.chunkX}/${block.chunkZ}/${block.rotation}/${block.fourthValue}/${block.y}`

    return block.name;
}



function calculateBookContents() {
            //  setting up randomness for later
            let chunkXRandom = new JavaRandom(block.chunkX);
            let chunkZRandom = new JavaRandom(block.chunkZ);
            let pseudoRandomNumber = new JavaRandom((block.fourthValue << 8) + (block.y << 4) + block.rotation);

    for (let loopCount = 1; loopCount < 17; loopCount++) {  //  creating page contents until 16 pages has been made
        let pageContents = '';
        for (let loopCount2 = 0; loopCount2 < 128; loopCount2++) {  //  creating a random character for the pages
            let indexNumber = ((chunkXRandom.nextInt() + chunkZRandom.nextInt()) | 0);
            indexNumber = ((indexNumber + -pseudoRandomNumber.nextInt()) | 0);    
            pageContents += characters[(floorMod(indexNumber, characters.length))];
        }
        console.log(`Page${loopCount}:\n ${pageContents}\n`);
    }

}

module.exports = {calculateBookName, calculateBookContents}