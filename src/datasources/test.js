const oldArr = [
  {
    id: 1,
    name: "category 1",
    parentId: null,
  },
  {
    id: 2,
    name: "category 2",
    parentId: 1,
  },
  {
    id: 3,
    name: "category 3",
    parentId: 2,
  },
];

function printReverseList(singleLinkedList) {
    let arr = [];
  
    let p = singleLinkedList;
    let i = 0
    while (p) {
      let et = oldArr.filter(el => el.id === p[i].parentId);
       if(p[i].parentId === et.id){
        arr.push(...p, {chirdrent: p});
      }
      
      p = p.next;
      i++
    }
  
    for (let i = arr.length - 1; i >= 0; i--) {
      console.log(arr[i]);
    }
  }


printReverseList(oldArr)