const INF = Number.MAX_VALUE;

const shortestDist = (graph, V) => {
  // dist[i] is going to store shortest
  // distance from node i to node N-1.
  const dist = [];

  dist[V - 1] = 0;

  // Calculating shortest path for
  // rest of the nodes
  for (let i = V - 2; i >= 0; i--) {
    // Initialize distance from i to
    // destination (N-1)
    dist[i] = INF;

    // Check all nodes of next stages
    // to find shortest distance from
    // i to N-1.
    for (let j = i; j < V; j++) {
      // Reject if no edge exists
      if (graph[i][j] == INF) {
        continue;
      }

      // We apply recursive equation to
      // distance to target through j.
      // and compare with minimum distance
      // so far.
      dist[i] = Math.min(dist[i], graph[i][j] + dist[j]);
    }
  }

  return dist[0];
};
// Driver Code
// Graph stored in the form of an
// adjacency Matrix
const graph = [
  [INF, 1, 2, 5, INF, INF, INF, INF],
  [INF, INF, INF, INF, 4, 11, INF, INF],
  [INF, INF, INF, INF, 9, 5, 16, INF],
  [INF, INF, INF, INF, INF, INF, 2, INF],
  [INF, INF, INF, INF, INF, INF, INF, 18],
  [INF, INF, INF, INF, INF, INF, INF, 13],
  [INF, INF, INF, INF, INF, INF, INF, 2],
];

console.log(shortestDist(graph, 8));
