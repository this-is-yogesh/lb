/**
 * 
 * 
 * Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:


Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
Example 2:


Input: head = [1,2]
Output: [2,1]
Example 3:

Input: head = []
Output: []
 */

/**
 * Definition for singly-linked list.

 */

/** so we have to reverse the linked list, we have the head, linked list is defined has each node's next will contain the other
 * node , so if we get the head , we can traverse the entire list
 *
 * i traversed the entire list, now the way to reverse can be, i make the last pointer the first pointer, so this is a singly linked
 * list, i can have a prev and current, from the start so i will traverse till the end node, where my current will be at the last node
 * and my prev will be at the node before, so now my current next will turn to prev , and now my prev becomes , now my prev will become
 * its prev, no we cant do that , its not doubly linked list, i only have access to the current and the prev node,
 *
 * okay so intead of going till last, lets start from the start, i will turn the head to prev, that is null but before doing that
 * i will store my current.next as restNode so that i dont loose my list  and then i will travserse ahead and again put the current.next = prev
 *
 *
 * so first i will store my restNode = current.next
 * then do current.next = prev;
 * prev = current ;
 * current = restNode;
 *
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
const reverseList = function (head) {
  let current = head;
  let restNode = null;
  let prev = null;
  while (current) {
    restNode = current.next;
    current.next = prev;
    prev = current;
    current = restNode;
  }
  return prev;
};

const traverseList = function (head) {
  let current = head;
  while (current) {
    console.log(current.val);
    current = current.next;
  }
};

let head = reverseList(buildAndGetLinkedList());
console.log(head);
traverseList(head);

function buildAndGetLinkedList() {
  let head = new ListNode(0);
  let firstNode = new ListNode(1);
  let secondNode = new ListNode(2);
  let thirdNode = new ListNode(3);
  let fourthNode = new ListNode(4);

  head.next = firstNode;
  firstNode.next = secondNode;
  secondNode.next = thirdNode;
  thirdNode.next = fourthNode;
  return head;
}
