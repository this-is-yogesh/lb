/**
 * 
 *  Sort Colors
 * Pattern : Two pointer - in place modification
 * 
 * 
 * approach:
 * i will keep two pointer at start - i,j , one at end - k  , i at start will be for 0 and k at end will be for 2 and j pointer at start  will be my free pointer , my free pointer will encounter which digit it is and then replace the digit with i if it is 0 and move i++,j++ and replace digit with k if it is 2 and move k--  else j++ , will do this till j<=k
 * 

 */
