const readline = require('node:readline');
const {calculateBookName, calculateBookContents} = require('./bookBox.js');
let bookName, xCoords, yCoords, zCoords, rotation

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function loopOrNo() {
    rl.question("Would you like to do another calculation? (Y/n)\n", input => {
        switch(input) {
            case '':
            case 'y':
            case 'Y': doEverything(); break;
            case 'n':
            case 'N': rl.close(); break;
            default: console.log('ERROR: Type "y" or "n"')
        }
    })
}

function doEverything() {
    console.clear();

rl.question("What's the x coordinate?\n", input => {
    xCoords = input;
    console.log();

    rl.question("What's the y coordinate?\n", input => {
        yCoords = input;
        console.log();

        rl.question("What's the z coordinate?\n", input => {
            zCoords = input;
            console.log();

            rl.question("Which direction do the book's face?\nNorth = 0, East = 1, South = 2, West = 3\n", input => {
                rotation = input;
                console.log();

                bookName = calculateBookName(xCoords, yCoords, zCoords, rotation);
                console.log(`The book's name is ${bookName}`);
                console.log();
                calculateBookContents();
                
                loopOrNo();


            });
        });
    });
});

}

doEverything();
/*rl.question(`What's your name?`, name => {
  console.log(`Hi ${name}!`);
  rl.close();
});
*/