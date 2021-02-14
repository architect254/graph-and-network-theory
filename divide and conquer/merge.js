// merge is an algorithm for merging two sorted lists into a single sorted lists
// it is used in merge sort which is a recursive sorting algorithm that follows divide and conquer strategy
// it has a time complexity of O(m + n)

const merge = (list1, list2) => {
  let i = 0,
    j = 0,
    mergedArray = [];

  for (let k = 0; k < list1.length + list2.length; k++) {
    console.log(i, j, k, list1, list2, mergedArray);
    if (i >= list1.length) {
      mergedArray[k] = list2[j];
      j++;
    } else if (j >= list2.length) {
      mergedArray[k] = list1[i];
      i++;
    } else {
      if (list1[i] < list2[j]) {
        mergedArray[k] = list1[i];
        i++;
      } else {
        mergedArray[k] = list2[j];
        j++;
      }
    }
  }
  return mergedArray;
};

console.log(merge([1, 3, 8,9, 20], [2, 4, 6, 8, 70,100]));
