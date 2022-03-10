/* A Naive recursive implementation of LCS problem in javascript*/
class LongestCommonSubsequence {
  /* Returns length of LCS for X[0..m-1], Y[0..n-1] */
  lcs = (X, Y, m, n) => {
    if (m == 0 || n == 0) return 0;
    if (X[m - 1] == Y[n - 1]) return 1 + this.lcs(X, Y, m - 1, n - 1);
    else return this.max(this.lcs(X, Y, m, n - 1), this.lcs(X, Y, m - 1, n));
  };

  /* Utility function to get max of 2 integers */
  max = (a, b) => {
    return a > b ? a : b;
  };
}
// DriverCode
const lcs = new LongestCommonSubsequence();
const X = "AGGTAB";
const Y = "GXTXAYB";

const m = X.length;
const n = Y.length;

console.log("Length of LCS is" + " " + lcs.lcs(X, Y, m, n));
