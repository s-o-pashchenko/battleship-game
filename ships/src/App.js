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
function between(x, min, max) {
  return x >= min && x <= max;
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
    // Generate a new ship of the given size
    const shipToCheck = this.ship(size);

    // Get the list of busy cells on the game board
    const busy = this.ships.busy;
    console.log(busy);

    // Check if there are any busy cells
    if (busy.length > 0) {
      // Loop through each busy ship
      for (let i = 0; i < busy.length; i++) {
        // Loop through each cell of the ship to be checked
        for (let j = 0; j < ((size < busy[i].length) ? busy[i].length : size); j++) {
          // Loop through each cell of the busy ship
          for (let k = 0; k < ((size > busy[i].length) ? busy[i].length : size); k++) {
            // Compare the cell of the busy ship with the cell of the ship to be checked
            if (busy[i][((size < busy[i].length) ? j : k)].toString() === shipToCheck[((size > busy[i].length) ? j : k)].toString()) {
              // If there is an overlap, recursively call the check function
              return this.check(size);
            }
          }
        }
      }
      // After whole chain of for loops if there is no matches it'll return the ship
      return shipToCheck;
    } else {
      // If there are no busy cells, log the generated ship and return it
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
  console.log(playMap);
  console.log(ship);
  for (let i = 0; i < ship.length; i++) {
    for (let j = 0; j < ship[i].length; j++) {
      playMap[ship[i][j][0]].array[ship[i][j][1]].ship = 1;
    }
  }
}

changeTable();

function hitTheMap(ship, id) {
  if (ship == 1) {
    document.getElementById(id).classList.add('bg-red');
  } else {
    document.getElementById(id).classList.add('bg-blue');
  }
}
console.log(randomCoords.ships.busy);
console.log(playMap);

function App() {
  return (
    <div>
      <table class="mx-auto">
        {playMap.map(row => <tr id={row.rowId}>{row.array.map(field => <td id={field.id} class="w-10 h-10 border-2" onClick={() => hitTheMap(field.ship, field.id)}></td>)}</tr>)}
      </table>
    </div>
  );
}

export default App;
