// A C# program for Bellman-Ford's single source shortest path
// algorithm.

// set infinite constant
const INF = Number.MAX_VALUE;

// A utility function used to print the solution
const printArr = (dist, V) => {
  console.log("Vertex Distance from Source");
  console.log("index\t\tvertex");
  for (let i = 0; i < V; ++i) {
    console.log(i + "\t\t" + dist[i]);
  }
};

// A class to represent a weighted edges in graph
class edges {
  constructor() {
    this.src = this.dest = this.weight = 0;
  }
}

// A class to represent a connected, directed and weighted graph
class Graph {
  // Creates a graph with V vertices and E edges
  constructor(v, e) {
    this.V = v;
    this.E = e;
    this.edges = [];
    for (let i = 0; i < e; ++i) this.edges[i] = new edges();
  }

  // The main function that finds shortest distances from src
  // to all other vertices using Bellman-Ford algorithm. The
  // function also detects negative weight cycle
  BellmanFord = (graph, src) => {
    let V = graph.V,
      E = graph.E;
    let dist = [];

    // Step 1: Initialize distances from src to all other
    // vertices as INFINITE
    for (let i = 0; i < V; ++i) dist[i] = INF;
    dist[src] = 0;

    // Step 2: Relax all edges |V| - 1 times. A simple
    // shortest path from src to any other vertex can
    // have at-most |V| - 1 edges
    for (let i = 1; i < V; ++i) {
      for (let j = 0; j < E; ++j) {
        let u = graph.edges[j].src;
        let v = graph.edges[j].dest;
        let weight = graph.edges[j].weight;
        if (dist[u] != INF && dist[u] + weight < dist[v])
          dist[v] = dist[u] + weight;
      }
    }

    // Step 3: check for negative-weight cycles. The above
    // step guarantees shortest distances if graph doesn't
    // contain negative weight cycle. If we get a shorter
    // path, then there is a cycle.
    for (let j = 0; j < E; ++j) {
      let u = graph.edges[j].src;
      let v = graph.edges[j].dest;
      let weight = graph.edges[j].weight;
      if (dist[u] != INF && dist[u] + weight < dist[v]) {
        console.log("Graph contains negative weight cycle");
        return;
      }
    }

    printArr(dist, V);
  };
}

// Driver method to test above function
const V = 5; // Number of vertices in graph
const E = 8; // Number of edges in graph

const graph = new Graph(V, E);

// add edges 0-1 (or A-B in above figure)
graph.edges[0].src = 0;
graph.edges[0].dest = 1;
graph.edges[0].weight = -1;

// add edges 0-2 (or A-C in above figure)
graph.edges[1].src = 0;
graph.edges[1].dest = 2;
graph.edges[1].weight = 4;

// add edges 1-2 (or B-C in above figure)
graph.edges[2].src = 1;
graph.edges[2].dest = 2;
graph.edges[2].weight = 3;

// add edges 1-3 (or B-D in above figure)
graph.edges[3].src = 1;
graph.edges[3].dest = 3;
graph.edges[3].weight = 2;

// add edges 1-4 (or B-E in above figure)
graph.edges[4].src = 1;
graph.edges[4].dest = 4;
graph.edges[4].weight = 2;

// add edges 3-2 (or D-C in above figure)
graph.edges[5].src = 3;
graph.edges[5].dest = 2;
graph.edges[5].weight = 5;

// add edges 3-1 (or D-B in above figure)
graph.edges[6].src = 3;
graph.edges[6].dest = 1;
graph.edges[6].weight = 1;

// add edges 4-3 (or E-D in above figure)
graph.edges[7].src = 4;
graph.edges[7].dest = 3;
graph.edges[7].weight = -3;

graph.BellmanFord(graph, 0);
