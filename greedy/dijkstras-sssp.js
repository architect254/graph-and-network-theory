// A JavaScript program for Dijkstra's single source shortest path algorithm.
// The program is for adjacency matrix representation of the graph

class ShortestPath {
  // A utility function to find the vertex with minimum distance value,
  // from the set of vertices not yet included in shortest path tree
  constructor(V) {
    this.V = V;
  }
  minDistance = (dist, sptSet) => {
    // Initialize min value
    let min = Number.MAX_VALUE,
      min_index = -1;

    for (let v = 0; v < this.V; v++)
      if (sptSet[v] == false && dist[v] <= min) {
        min = dist[v];
        min_index = v;
      }

    return min_index;
  };

  // A utility function to print the constructed distance array
  printSolution = (dist) => {
    console.log("Vertex \t\t Distance from Source");
    for (let i = 0; i < this.V; i++) console.log(i + " \t\t " + dist[i]);
  };

  // Function that implements Dijkstra's single source shortest path
  // algorithm for a graph represented using adjacency matrix
  // representation
  dijkstra = (graph, src) => {
    const dist = [this.V]; // The output array. dist[i] will hold
    // the shortest distance from src to i

    // sptSet[i] will true if vertex i is included in shortest
    // path tree or shortest distance from src to i is finalized
    const sptSet = [this.V];

    // Initialize all distances as INFINITE and stpSet[] as false
    for (let i = 0; i < this.V; i++) {
      dist[i] = Number.MAX_VALUE;
      sptSet[i] = false;
    }

    // Distance of source vertex from itself is always 0
    dist[src] = 0;

    // Find shortest path for all vertices
    for (let count = 0; count < this.V - 1; count++) {
      // Pick the minimum distance vertex from the set of vertices
      // not yet processed. u is always equal to src in first
      // iteration.
      let u = this.minDistance(dist, sptSet);

      // Mark the picked vertex as processed
      sptSet[u] = true;

      // Update dist value of the adjacent vertices of the
      // picked vertex.
      for (let v = 0; v < this.V; v++)
        // Update dist[v] only if is not in sptSet, there is an
        // edge from u to v, and total weight of path from src to
        // v through u is smaller than current value of dist[v]
        if (
          !sptSet[v] &&
          graph[u][v] != 0 &&
          dist[u] != Number.MAX_VALUE &&
          dist[u] + graph[u][v] < dist[v]
        )
          dist[v] = dist[u] + graph[u][v];
    }

    // print the constructed distance array
    this.printSolution(dist);
  };
}

// Driver method
/* Let us create the example graph discussed above */
const graph = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0],
];
const t = new ShortestPath(9);
t.dijkstra(graph, 0);
