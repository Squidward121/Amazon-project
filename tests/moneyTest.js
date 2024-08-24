import formatCurrency from "../scripts/utils/money.js";

// this is automated testing, means we test our real code with a local code, so it doesn't take any effort and time as it takes in manual test.
// In manual test it's Hard to test every situation and it's Hard to re-test. Automated code solves these problems.
// Anyway the each code below is called Test cases.
/* There are two types of test cases: 
  - Basic test cases (just a basic test with normal numbers)
  - Edge test (tricky edge test with special numbers)
  
  the first code down here is a basic test case, and the 2nd & 3rd cases are Edge cases.
  So in testing it's essential to have both basic test case & edge test case.
  
  A group of related tests is called test suite.*/

if (formatCurrency(2095) === '20.95') {
  console.log('passed');
}
else {
  console.log('failed');
}

if (formatCurrency(0) === '0.00') {
  console.log('passed');
}
else {
  console.log('failed');
}

if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
}
else {
  console.log('failed');
}