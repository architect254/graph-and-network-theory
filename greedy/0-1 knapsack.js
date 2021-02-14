// The Problem: Given a set of items each having a value and a weight, we need to put these items in a knapsack of a given capacity to get the maximum total value of items in the knapsack. we are not allowed to divide items.
class Item {
  constructor(id, value, weight) {
    this.id = id;
    this.value = value;
    this.weight = weight;
    // calculate cost of item
    this.cost = value / weight;
  }
}
// function to get maximum value
const knapsack = (items, capacity) => {
  // sorting items by cost;
  items.sort((item1, item2) => item2.cost - item1.cost);
  let maxValue = 0;
  let selectedItems = [];

  items.forEach((item) => {
    let currentItemWeight = item.weight;
    let currentItemValue = item.value;

    if (capacity - currentItemWeight >= 0) {
      // this item can be picked whole
      capacity = capacity - currentItemWeight;
      maxValue += currentItemValue;
      selectedItems.push(item.id);
    }
  });

  selectedItems.forEach((item) => {
    console.log(item);
  });
  console.log("\nmax value is ", maxValue);
};

// Driver code
const items = [
  new Item("rice", 10, 60),
  new Item("maize", 40, 40),
  new Item("wheat", 20, 100),
  new Item("kale", 30, 120),
];

knapsack(items, 100);
