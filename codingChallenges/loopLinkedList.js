class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  let hasCycle = function(linkedList){
    //Create a slow node pointer and fast node pointer
    let slow = linkedList;
    let fast = linkedList;
  
    while(fast && fast.next){
      //move the slow pointer by one node and fast pointer by two node
      slow = slow.next;
      fast = fast.next.next;
      
      // if at any time slow pointer and the fast pointer are equal the linkedList contains a Cycle
  
      if(slow===fast){
        return true;
      }
    }
    return false;
  
  }
  
  const nodeA = new Node('A');
  const nodeB = nodeA.next = new Node('B');
  const nodeC = nodeB.next = new Node('C');
  const nodeD = nodeC.next = new Node('D');
  const nodeE = nodeD.next = new Node('E');
  console.log(hasCycle(nodeA)); // => false
  nodeE.next = nodeB;
  console.log(hasCycle(nodeA)); // => true
  
  