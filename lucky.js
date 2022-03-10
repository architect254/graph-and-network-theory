const findLucky = (arr) => {
  let lucky = [-1];
  let numObj = {};
  for (num of arr) {
    numObj[num] ? (numObj[num] += 1) : (numObj[num] = 1);
  }
  let nums = Object.keys(numObj);
  let frequencies = Object.values(numObj);

  for (let num in nums) {
    console.log(nums[num], frequencies[num]);
    if (nums[num] == frequencies[num]) {
      lucky.push(frequencies[num]);
    }
  }
  if (lucky.length === 1) {
    return lucky;
  } else {
    return Math.max(...lucky);
  }
};
console.log(findLucky([2, 3, 3, 5, 2, 3, 6, 6, 6, 6, 0]));
