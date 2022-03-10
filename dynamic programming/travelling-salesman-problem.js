// JavaScript program to implement
// traveling salesman problem
// using naive dynamic programming approach.
let V = 4;

// implementation of traveling
// Salesman Problem
const travllingSalesmanProblem = (graph, s) => {
  // store all vertex apart
  // from source vertex
  let vertex = [];

  for (let i = 0; i < V; i++) if (i != s) vertex.push(i);

  // store minimum weight
  // Hamiltonian Cycle.
  let minPath = Number.MAX_VALUE;
  do {
    // store current Path weight(cost)
    let currentPathweight = 0;

    // compute current path weight
    let k = s;

    for (let i = 0; i < vertex.length; i++) {
      currentPathweight += graph[k][vertex[i]];
      k = vertex[i];
    }
    currentPathweight += graph[k][s];

    // update minimum
    minPath = Math.min(minPath, currentPathweight);
  } while (findNextPermutation(vertex));

  return minPath;
};

// Function to swap the data
// present in the left and right indices
const swap = (data, left, right) => {
  // Swap the data
  let temp = data[left];
  data[left] = data[right];
  data[right] = temp;

  // Return the updated array
  return data;
};

// Function to reverse the sub-array
// starting from left to the right
// both inclusive
const reverse = (data, left, right) => {
  // Reverse the sub-array
  while (left < right) {
    let temp = data[left];
    data[left++] = data[right];
    data[right--] = temp;
  }

  // Return the updated array
  return data;
};

// Function to find the next permutation
// of the given integer array
const findNextPermutation = (data) => {
  // If the given dataset is empty
  // or contains only one element
  // next_permutation is not possible
  if (data.length <= 1) return false;

  let last = data.length - 2;

  // find the longest non-increasing
  // suffix and find the pivot
  while (last >= 0) {
    if (data[last] < data[last + 1]) {
      break;
    }
    last--;
  }

  // If there is no increasing pair
  // there is no higher order permutation
  if (last < 0) return false;

  let nextGreater = data.length - 1;

  // Find the rightmost successor
  // to the pivot
  for (let i = data.length - 1; i > last; i--) {
    if (data[i] > data[last]) {
      nextGreater = i;
      break;
    }
  }

  // Swap the successor and
  // the pivot
  data = swap(data, nextGreater, last);

  // Reverse the suffix
  data = reverse(data, last + 1, data.length - 1);

  // Return true as the
  // next_permutation is done
  return true;
};

// Driver Code
// matrix representation of graph
let graph = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0],
];
let s = 0;
console.log(travllingSalesmanProblem(graph, s));
