/**
 * 
 * You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.



Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]

Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

let node4 = new ListNode(4, null);
//let node3 = new ListNode(3, node4);
let node2 = new ListNode(2, node4);
let headList1 = new ListNode(1, node2);

let nodeList4 = new ListNode(4, null);
//let node3 = new ListNode(3, node4);
let nodeList3 = new ListNode(3, nodeList4);
let headList2 = new ListNode(1, nodeList3);
//let head1 = new ListNode(0, node1);

var mergeTwoLists = function (list1, list2) {
  let current1 = list1;
  let current2 = list2;
  let mergedList = new ListNode(0, null);
  let head = mergedList;

  /**
 //[1,next]->[1,next]
 [1,next]->[2,next]->[4,next]
 [1,next]->[3,next]->[4,next]
 merged = [1,next]->[2,next]->[4,next]
 currentMerged = head
 curr1 = [1,next]
 curr2 = [1,next]

 (1<=1)
head->[1,next]
 curr1 = [2,next]
 curr2 = [1,next]


(2<=1)
head->[1,next]->[1,next]
 curr1 = [2,next]
 curr2 = [3,next]


 (2<=3)
head->[1,next]->[1,next]->[2,next]
 curr1 = [4,next]
 curr2 = [3,next]

  (4<=3)
head->[1,next]->[1,next]->[2,next]->[3,next]
 curr1 = [4,next]
 curr2 = [4,next]

   (4<=4)
head->[1,next]->[1,next]->[2,next]->[3,next]->[4,next]
 curr1 = null
 curr2 = [4,next]

if(curr !==null)
head->[1,next]->[1,next]->[2,next]->[3,next]->[4,next]
else{
  head->[1,next]->[1,next]->[2,next]->[3,next]->[4,next]->[4,next]
}

return head.next
  //curr = [2,next]
 */
  while (current1 !== null && current2 != null) {
    console.log(mergedList.val);
    if (current1.val <= current2.val) {
      mergedList.next = current1;
      mergedList = mergedList.next;
      current1 = current1.next;
    } else {
      mergedList.next = current2;
      mergedList = mergedList.next;
      current2 = current2.next;
    }
  }
  if (current1) {
    mergedList.next = current1;
  } else if (current2) {
    mergedList.next = current2;
  }

  console.log(head.next);
  return head.next;
};

mergeTwoLists(headList1, headList2);
