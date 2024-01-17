import logo from './logo.svg';
import './App.css';

//class for field
class Field {
  constructor(id, ship) {
    this.id = id;
    this.ship = ship
  }
}
//class for row
class Row {
  constructor(rowId) {
    this.rowId = rowId;
    this.array = this.createRow(this.rowId);
  }
  createRow() {
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push(new Field((this.rowId + '' + i), 0));
    }
    return arr;
  }
  placeShip(ship, x) {
    this.array[x].ship = ship;
    return this.array[x].id;
  }
}

let playMap = []

for (let i = 0; i < 10; i++) {
  playMap.push(new Row(i));
}
// generator of ships
const randomCoords = {
  ships: {
    busy: [], // here is all ships coords
    large: [],
    medium: [],
    small: [],
    individual: []
  },
  shipsToGen() {
    this.generateShip(4);
    this.generateShip(3);
    this.generateShip(3);
    this.generateShip(2);
    this.generateShip(2);
    this.generateShip(2);
    this.generateShip(1);
    this.generateShip(1);
    this.generateShip(1);
    this.generateShip(1);
  },
  initial() {
    return { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10), d: Math.floor(Math.random() * 2) };
  },
  generateShip(size) {
    const shipReady = this.check(size);
    this.ships.busy.push(shipReady);
  },
  check(size) {
    console.log('start');
    const shipToCheck = this.ship(size)
    if (!!this.ships.busy[0]) {
      for (let i = 0; i < this.ships.busy.length; i++) {
        console.log('ONE');
        for (let j = 0; j < ((size < this.ships.busy[i].length) ? this.ships.busy[i].length : size); j++) {
          console.log('TWO');
          for (let k = 0; k < ((size > this.ships.busy[i].length) ? this.ships.busy[i].length : size); k++) {
            console.log('THREE');
            console.log(this.ships.busy[i][((size < this.ships.busy[i].length) ? j : k)].toString() + shipToCheck[((size > this.ships.busy[i].length) ? j : k)].toString());
            if (this.ships.busy[i][((size < this.ships.busy[i].length) ? j : k)].toString() == shipToCheck[((size > this.ships.busy[i].length) ? j : k)].toString()) {
              console.log('true');
              this.check(size);
            }
          }
        }
      }
      console.log('for done');
      // return shipToCheck;
    } else {

      console.log('first ship generated ' + shipToCheck);
      return shipToCheck;
    }
  },
  ship(size) {
    const startPos = this.initial();
    let ship = [];
    if (startPos.d == 1) { // Horizontal
      if (startPos.x < 4) {
        for (let i = 0; i < size; i++) {
          ship.push([startPos.x, startPos.y]);
          startPos.x++;
        }
      } else {
        for (let i = 0; i < size; i++) {
          ship.push([startPos.x, startPos.y]);
          startPos.x--;
        }
      }
      return ship;
    } else {
      if (startPos.x < 4) {
        for (let i = 0; i < size; i++) {
          ship.push([startPos.x, startPos.y]);
          startPos.y++;
        }
      } else {
        for (let i = 0; i < size; i++) {
          ship.push([startPos.x, startPos.y]);
          startPos.y--;
        }
      }
      return ship;
    }
  }
}

randomCoords.shipsToGen()

function changeTable() {
  const ship = randomCoords.ships.busy;
  for (let i = 0; i < ship.length; i++) {
    for (let j = 0; j < ship[i].length; j++) {
      playMap[ship[i][j][0]].array[ship[i][j][1]].ship = 1;
    }
  }
}

changeTable();

console.log(randomCoords.ships.busy);
console.log(playMap);

function App() {
  return (
    <div>
      <table class="mx-auto">
        {playMap.map(row => <tr id={row.rowId}>{row.array.map(field => <td id={field.id} class="w-10 h-10 border-2">{field.ship}</td>)}</tr>)}
      </table>
    </div>
  );
}

export default App;
