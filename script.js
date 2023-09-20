"use strict"

const rowX = (letter) => letter.charCodeAt() - 96; // letter to number
const letter = (x) => String.fromCharCode(x + 96); // number to letter

// Table Generator
function tableGenerator() {
    document.write('<table>');
    for (let row = 'a'.charCodeAt(); row <= 'j'.charCodeAt(); row++) {
        let rowId = String.fromCharCode(row);
        document.write(`<tr id = "${rowId}">`);
        for (let col = 0; col < 10; col++) {
            document.write(`<td id = "${rowId}${col}" onclick = "checkCell(${row}, ${col})"></td>`);
        }
        document.write('</tr>');
    }

document.write('</table>');
}
tableGenerator();

// Generating EMPTY playground map
const map = {};
function emptyMap() {
    for (let row = 'a'.charCodeAt(); row <= 'j'.charCodeAt(); row++) {
        map[String.fromCharCode(row)] = Array(10).fill(0);
    }
}
emptyMap();

// Add Ships to empty map
function spawnShip() {
    map.a[0] = 'k'
    randomPoint()
}

// Generate random point on the map
function randomShip() {
    let y = letter(Math.floor(Math.random() * 10));
    let x = Math.floor(Math.random() * 10);
    let position = Math.round(Math.random()); // 0 - vertical, 1 - horizontal
    switch (position) {
        //veritacly
        case 1:
        case 0:
            if (x > 5) {
                for (let i = 0; i < 4; i++){
                    map[y][x] = 'l';
                    x--;
                }
            } else {
                for (let i = 0; i < 4; i++){
                    map[y][x] = 'l';
                    x++;
                }
            }
        break;
        //horizontaly
    }
}
randomShip();
console.log(map);
// Check ship in cell
function checkCell(x, col) {
    let row = String.fromCharCode(x);
    let id = row + col;
    if (map[row][col] == 'l') {
        changeColor(id, 'red');
    } else {

        changeColor(id, 'green');
    }
}

// Cells' color changer
function changeColor(id, color) {
    document.getElementById(`${id}`).style.backgroundColor = `${color}`;
}

