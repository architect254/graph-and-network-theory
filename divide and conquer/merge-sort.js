// mergesort is a sorting algorithm for lists following divide and conquer strategy
// it has a time complexity of O(n log n)

const sort = (list) => {
  const merge = (list1, list2) => {
    let i = 0,
      j = 0,
      mergedArray = [];

    for (let k = 0; k < list1.length + list2.length; k++) {
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

  const mergeSort = (list) => {
    if (list.length <= 1) {
      return list;
    }

    const mid = Math.floor(list.length / 2);

    const leftSortedList = mergeSort(list.slice(0, mid));
    const rightSortedList = mergeSort(list.slice(mid, list.length));

    return merge(leftSortedList, rightSortedList);
  };

  return mergeSort(list);
};

console.log(sort([9, 8, 7, 6, 5, 3, 2, 0, 10]));
