class Graph {
  // Creates a graph with |vertices| vertices
  constructor(vertices) {
    this.vertices = vertices;
    this.edges = [];
  }

  addEdge = (source, destination, cost) => {
    this.edges.push([source, destination, cost]);
  };
}

// A utility function to find parent of an
// element i (uses path compression technique)
const find = (parents, i) => {
  // find root and make root as parent of is
  // (path compression)
  if (parents[i] == i) {
    return i;
  }
  return find(parents, parents[i]);
};

// A function that does union of two sets
// of x and y (uses union by rank)
const union = (parents, ranks, x, y) => {
  const xroot = find(parents, x);
  const yroot = find(parents, y);

  // Attach smaller rank tree under root
  // of high rank tree (Union by Rank)
  if (ranks[xroot] < ranks[yroot]) {
    parents[xroot] = yroot;
  } else if (ranks[xroot] > ranks[yroot]) {
    parents[yroot] = xroot;
    // If ranks are same, then make one as
    // root and increment its rank by one
  } else {
    parents[yroot] = xroot;
    ranks[xroot]++;
  }
};

// The main function to construct MCST using Kruskal's
// algorithm
const kruskalMCST = (graph) => {
  // Step 1:  Sort all the edges in non-decreasing
  // order of their cost.
  graph.edges.sort((a, b) => a[2] - b[2]);

  // Create |vertices| parents and ranks with single elements
  const parents = [],
    ranks = [];
  // Tnis will store the resultant MCST
  const result = [];
  for (let i = 0; i < graph.vertices; ++i) {
    parents.push(i);
    ranks.push(0);
  }

  let i = 0; // Index used to pick next edge
  let e = 0; // Index for picking result

  // Number of edges to be taken is equal to |vertices|-1
  while (e < graph.vertices - 1 && i < graph.vertices) {
    // Step 2: Pick the smallest edge. And increment
    // the index for next iteration

    let [u, v, cost] = graph.edges[i++];

    let x = find(parents, u);
    let y = find(ranks, v);

    // If including this edge does't cause cycle,
    // include it in result and increment the index
    // of result for next edge
    if (x != y) {
      result.push([u, v, cost]);
      union(parents, ranks, x, y);
    }
    // Else discard the next_edge
  }

  // print the contents of result[] to display
  // the built MCST
  console.log("Following are the edges in the constructed MCST");
  let minimumCost = 0;

  result.forEach(([u, v, cost]) => {
    console.log(u + " -- " + v + " == " + cost);
    minimumCost += cost;
  });
  console.log("Minimum Cost Spanning Tree " + minimumCost);
};

// Driver Code

/* Let us create following weighted graph
             10
        0--------1
        |  \     |
       6|   5\   |15
        |      \ |
        2--------3
            4       */
// Number of vertices in graph are 4

const graph = new Graph(4);

// add edge 0-1
graph.addEdge(0, 1, 10);

// add edge 0-2
graph.addEdge(0, 2, 6);

// add edge 0-3
graph.addEdge(0, 3, 5);

// add edge 1-3
graph.addEdge(1, 3, 15);

// add edge 2-3
graph.addEdge(2, 3, 4);

// Function call
kruskalMCST(graph);
