// binary search is a recursive search algorithm for sorted lists following divide and conquer strategy
// it is has a time complexity of O(log n) and is faster than linear search which is an iterative algorithm with a time complexity of O(n)

const search = (array, key) => {
  const binarySearch = (low, high) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);

      if (key === array[mid]) {
        return true;
      }
      if (key < array[mid]) {
        return binarySearch(low, mid);
      } else {
        return binarySearch(mid + 1, high);
      }
    }
  };
  return binarySearch(0, array.length) ? true : false;
};

console.log(search([2, 3, 4], 3));
