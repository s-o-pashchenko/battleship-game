const shipObj = {
    a: Array(10).fill(0), b: Array(10).fill(0), 
    c: Array(10).fill(0), d: Array(10).fill(0), 
    e: Array(10).fill(0), f: Array(10).fill(0),
    g: Array(10).fill(0), h: Array(10).fill(0),
    i: Array(10).fill(0), j: Array(10).fill(0),
}

const shipSizes = ['l', 'm', 's']; // Ship sizes
let large = 4;
let medium = 3;

function checkCells(x, y, idOfTd){
    if (shipObj[[x]][y] != 0 && shipObj[[x]][y] != 'h') {
        document.getElementById(idOfTd).style.backgroundColor = "red";
        alert('You hit the ship')
        switch (shipObj[[x]][y]) {
            case 'l':
                large--;
                if(large == 0) {
                    alert('You killed the large ship!');
                }
                shipObj[[x]][y] = 'h';
            break;
            case 'm':
                medium--;
                if(medium == 0) {
                    alert('You killed the medium ship!');
                }
                shipObj[[x]][y] = 'h';
            break;
        }
    } else if (shipObj[[x]][y] == 'h') {
        alert(`YOU ARE FUCKING IDIOT, YOU'VE ALREADY HIT THAT CHUNK`);
    } else if (shipObj[[x]][y] == 0) {
        document.getElementById(idOfTd).style.backgroundColor = "blue";
        shipObj[[x]][y] = 'h';
        alert('You are loser');
    } else {
        console.log('something went wrong, sorry')
    }
    console.log(shipObj)
}