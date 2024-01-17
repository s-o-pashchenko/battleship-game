import logo from './logo.svg';
import './App.css';
import './input.css';

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
}

const playMap = []

for (let i = 0; i < 10; i++) {
  playMap.push(new Row(i));
}


console.log(playMap);

function App() {
  return (
    //Generated table
    <table class="">
      {playMap.map(row => <tr id={row.rowId}>{row.array.map(field => <td id={field.id} class="border border-slate-300 w-10 h-10"></td>)}</tr>)}
    </table>
  );
}

export default App;
