/**
 *
 * Given the head of a singly linked list, reverse the list, and return the reversed list.
 * 
 * Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Input: head = [1,2]
Output: [2,1]
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

let node4 = new ListNode(4, null);
let node3 = new ListNode(3, node4);
let node2 = new ListNode(2, node3);
let node1 = new ListNode(1, node2);
let head = new ListNode(0, node1);

function reverseLinkedList(head) {
  let current = head;
  let prev = null;

  while (current !== null) {
    let restList = current.next;
    current.next = prev;
    prev = current;
    current = restList;
  }
  return prev;
}
reverseLinkedList(head);
