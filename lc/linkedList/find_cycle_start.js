/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;
  let meetingPoint = null;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      meetingPoint = slow;
      break;
    }
  }

  let dummy = head;

  while (dummy && meetingPoint && dummy !== meetingPoint) {
    dummy = dummy.next;
    meetingPoint = meetingPoint.next;
  }
  return meetingPoint;
};
