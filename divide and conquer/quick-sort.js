//quicksort is an in place sorting algorithm following divide and conquer algorithm
// it has an average case of O(n log n) and a worst case of O(n*n)
const sort = (list) => {
  const partition = (start, end) => {
    const swap = (index1, index2) => {
      let value1 = list[index1];
      list[index1] = list[index2];
      list[index2] = value1;
    };

    let pivot = list[start],
      i = start,
      j = end + 1;

    while (i < j) {
      do {
        i++;
      } while (list[i] <= pivot);
      do {
        j--;
      } while (list[j] > pivot);

      if (i < j) {
        swap(i, j);
      }
    }

    swap(start, j);
    return j;
  };

  const quickSort = (start, end) => {
    if (start < end) {
      const pivot = partition(start, end);
      quickSort(start, pivot);
      quickSort(pivot + 1, end);
    }
  };

  quickSort(0, list.length - 1);
  return list;
};

console.log(sort([9, 8, 7, 1, 0, 11]));
