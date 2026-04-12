GENERAL NOTES:

1. Whatever we put as first value after the cb function in reduce, that is the first value of acc
  [1, 2, 3].reduce((acc, curr) => {
    console.log(curr, acc);
    return 50 + acc;
  },-1);