// heapify is a recursive algorithm of converting a list into a max heap. it is used in heapSort.
// it has a time complexity of O(n) which is faster than the up bottom approach which has a time complexity of O(n log n)

const createMaxHeap = (list) => {
    const swap = (index1, index2) => {
      const val1 = list[index1];
      list[index1] = list[index2];
      list[index2] = val1;
    };
    const heapify = (lastindex) => {
      if (lastindex >= 0) {
        let parent = lastindex,
          leftChild = parent * 2 + 1,
          rightChild = parent * 2 + 2,
          largest = parent;
  
        if (leftChild < list.length && list[leftChild] > list[parent]) {
          largest = leftChild;
        }
  
        if (rightChild < list.length && list[rightChild] > list[parent]) {
          largest = rightChild;
        }
        if (largest != parent) {
          swap(largest, parent);
          heapify(largest);
        }
  
        heapify(largest - 1);
      }
    };
    heapify(list.length - 1);
    return list;
  };
  
  console.log(createMaxHeap([1, 2, 16, 4, 100, 3, 9, 0, 10]));
  