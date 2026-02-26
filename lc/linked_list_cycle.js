/**
 * 
 * Linked List Cycle
 * Pattern : Two pointers - slow and fast
 * 
 * I will keep fast and slow at head and create a while loop with condition if fast and fast.next is not null  and inside loop, will move fast by two steps that is fast = fast.next.next and move slow by one step that is slow = slow.next , and if slow == fast then will break the loop
 */