/**
 * 1. Remove Nth Node From End of List
Pattern: Two pointers - Fixed separation
Move the fast node first to 0+nth position and then move both pointer together, when fast reaches end, then the node ahead of slow is target node , remove that



key mental model:
You’re not actually finding “nth from end”.
You’re maintaining a gap of n nodes.
So when fast reaches end:
Slow is exactly before the target node.
 */