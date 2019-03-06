var a = [
  [1, 2, 3],
  [4, 5],
  [7, 8, 9]
]

var table = [];

for (let i = a.length -1; i >=0; i--) {
  let item = a[i];
  if (i == a.length -1) {
    table = item.map(cell => [cell]);
  } else {
    let temp = [];
    item.forEach(cell => {
      temp = [...temp, ...table.map(t => [cell, ...t])];
    });
    table = temp;
  }
}


//[[7], [8], [9]]


//[[1,4, 7], [1, 4, 8], [1, 4, 9], [1, 5, 7],...[3, 5, 9]]


var o = [
  {
    prop: 'x',
    values: [1, 2, 3]
  },
  {
    prop: 'y',
    values: [4, 5]
  },
  {
    prop: 'z',
    values: [7, 8, 9]
  }
]

var table = [];

for (let i = o.length -1; i >=0; i--) {
  let {values, prop} = o[i];
  
  if (i == o.length -1) {
    table = values.map(v => ({[prop]: v}));
  } else {
    let temp = [];
    values.forEach(v => {
      temp = [...temp, ...table.map(t => ({[prop]: v, ...t}))];
    });
    table = temp;
  }
}


//[{z: 7}, {z: 8}, {z: 9}]

//[{z: 7, y: 4}, {z: 8, y: 4}, {z: 9, y: 4}, ....]

//[{x: 1, y: 4, z: 7}, {x:1, y: 4, z: 8}, ... {x: 3, y: 5, z: 9}]
