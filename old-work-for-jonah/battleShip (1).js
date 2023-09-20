const shipObj = {
    a: Array(10).fill(0), b: Array(10).fill(0),
    c: Array(10).fill(0), d: Array(10).fill(0),
    e: Array(10).fill(0), f: Array(10).fill(0),
    g: Array(10).fill(0), h: Array(10).fill(0),
    i: Array(10).fill(0), j: Array(10).fill(0),
}

let large = 4;
let medium = 3;
let small = 2;
let points;

const shipSizes = ['l', 'm', 's']; // Ship sizes
// defines the ship size
for (const size of shipSizes) {
    let width, height;
    if (size === 'l') {
      width = height = 4;
    } else if (size === 'm') {
      width = height = 3;
    } else if (size === 's') {
      width = height = 2;
    }
}


function checkCells(x, y, idOfTd){
    if (shipObj[[x]][y] != 0 && shipObj[[x]][y] != 'h') {
        document.getElementById(idOfTd).style.backgroundColor = "red";
        alert('You hit a Ship!')
        switch (shipObj[[x]][y]) {
            case 'l':
                large--;
                if(large == 0) {
                    alert('You killed a large ship');
                    points += 4;
                }
            break;
            case 'm':
                medium--;
                if(medium == 0) {
                    alert('You killed a medium ship');
                    points += 3;
                }
            break;
            case 's':
                small--;
                if(small == 0) {
                    alert('You killed a small ship');
                    points += 2;
                }
            break;
        }

    } else if (shipObj[[x]][y] == 'h') {
        alert("you can't shoot twice");
        points--;

    } else if (shipObj[[x]][y] == 0) {
        document.getElementById(idOfTd).style.backgroundColor = "blue";
        alert('miss');
    }
    shipObj[[x]][y] = 'h';
    console.log(shipObj);
}