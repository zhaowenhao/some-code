var a = [
  [1, 2, 3],
  [4, 5],
  [7, 8, 9]
]

var table = [];

for (let i = a.length -1; i >=0; i--) {
  let item = a[i];
  let temp = [];
  if (i == a.length -1) {
    table = item.map(cell => [cell]);
  } else {
    item.forEach(cell => {
      temp = [...temp, ...table.map(t => [cell, ...t])];
    });
    table = temp;
  }
}
