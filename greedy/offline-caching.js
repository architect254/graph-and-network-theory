// The caching problem arises from the limitation of finite space. Lets assume our cache C has k pages. Now we want
// to process a sequence of r item requests which must have been placed in the cache before they are processed. Of course
// if r<=k then we just put all elements in the cache and it will work, but usually is r>k.
// We say a request is a cache hit, when the requested item is already in cache, otherwise its called a cache miss. In that case
// we must bring the requested item into cache and evict another, assuming the cache is full. The Goal is an eviction
// schedule that minimizes the number of evictions.
// There are numerous greedy strategies for this problem, lets look at some:
// 1. First in, first out (FIFO): The oldest page gets evicted
// 2. Last in, first out (LIFO): The newest page gets evicted
// 3. Last recent out (LRU): Evict page whose most recent access was earliest
// 4. Least frequently requested(LFU): Evict page that was least frequently requested
// 5. Longest forward distance (LFD): Evict page in the cache that is not requested until farthest in the future.

class OfflineCache {
  constructor(pages) {
    this.pages = [...pages];
    this.requests = [];
  }

  resetpages = (pages) => {
    this.pages = [...pages];
  };

  updateCache = (request, strategy) => {
    // calculate where to put request
    const pagePosition = strategy.apply(request);

    // proof whether its a cache hit or a cache miss
    const missed = request != this.pages[pagePosition];

    // update strategy (for example recount distances)
    strategy.update(pagePosition, missed);

    // write to cache pages
    this.pages[pagePosition] = request;
    this.requests.push(request);
    return missed;
  };
}

// strategies include FIFO,LIFO,LRU,LFU,LFD
// super class for strategies
class Strategy {
  constructor(name, cache) {
    this.name = name;
    this.age = [];
    this.cache = cache;
    for (let index = 0; index < this.cache.pages.length; index++) {
      this.age[index] = 0;
    }
  }

  // calculate which cache position should be used
  apply = (request) => {};

  // update information needed by the strategy
  update = (pagePosition, isCacheMiss) => {
    if (!isCacheMiss) {
      return;
    }
    for (let index = 0; index < this.cache.pages.length; index++) {
      if (index != pagePosition) {
        this.age[index]++;
      } else {
        this.age[index] = 0;
      }
    }
  };
}

// FIFO just needs the information how long a page is in the cache(and of course only relative to the other pages). So
// the only thing to do is wait for a miss and then make the pages, the oldest page is evicted
class FIFO extends Strategy {
  constructor(cache) {
    super("FIFO", cache);
  }

  apply = (request) => {
    let oldest = 0;
    for (let index = 0; index < this.cache.pages.length; index++) {
      if (this.cache.pages[index] == request) {
        return index;
      } else if (this.age[index] > this.age[oldest]) {
        oldest = index;
      }
    }
    return oldest;
  };
}

// The implementation of LIFO is more or less the same as by FIFO but we evict the youngest not the oldest page
class LIFO extends Strategy {
  constructor(cache) {
    super("LIFO", cache);
  }

  apply = (request) => {
    let newest = 0;
    for (let index = 0; index < this.cache.pages.length; index++) {
      if (this.cache.pages[index] == request) {
        return index;
      } else {
        newest = index;
      }
    }
    return newest;
  };
}

// In case of LRU the strategy is independent from what is at the cache page, its only interest is the last usage
class LRU extends Strategy {
  constructor(cache) {
    super("LRU", cache);
  }

  apply = (request) => {
    let oldest = 0;
    for (let index = 0; index < this.cache.pages.length; index++) {
      if (this.cache.pages[index] == request) {
        return index;
      } else if (this.age[index] > this.age[oldest]) {
        oldest = index;
      }
      return oldest;
    }
  };
}

// LFU evicts the page accessed least often. So the update strategy is just to count every access. Of course after a miss the
// count resets.
class LFU extends Strategy {
  constructor(cache) {
    super("LFU", cache);
    delete this.age;
    this.requestFrequency = [];
    for (let index = 0; index < this.cache.pages.length; index++) {
      this.requestFrequency[index] = 0;
    }
  }

  apply = (request) => {
    let least = 0;
    for (let index = 0; index < this.cache.pages.length; index++) {
      if (this.cache.pages[index] == request) {
        return index;
      } else if (this.requestFrequency[index] < this.requestFrequency[least]) {
        least = index;
      }
    }
    return least;
  };

  update = (pagePosition, isCacheMiss) => {
    if (isCacheMiss) {
      this.requestFrequency[pagePosition] = 1;
    } else {
      this.requestFrequency[pagePosition]++;
    }
  };
}

// The LFD strategy is different from everyone before. Its the only strategy that uses the future requests for its
// decision what to evict. The implementation uses the function calcNextUse to get the page which next use is farthest away in the future
class LFD extends Strategy {
  constructor(cache) {
    super("LFD", cache);

    // precalculate next usage before starting to fullfill requests
    this.nextUse = [];
    for (let index = 0; index < this.cache.pages.length; index++) {
      this.nextUse[index] = this.calcNextUse(-1, this.cache.pages[index]);
    }
  }

  apply = (request) => {
    let latest = 0;
    for (let index = 0; index < this.cache.pages.length; index++) {
      if (this.cache.pages[index] == request) {
        return index;
      } else if (this.nextUse[index] > this.nextUse[latest]) {
        latest = index;
      }
    }
    return latest;
  };

  update = (pagePosition, requestPosition) => {
    this.nextUse[pagePosition] = this.calcNextUse(
      requestPosition,
      this.cache.pages[pagePosition]
    );
  };

  calcNextUse = (requestPosition, page) => {
    for (
      let index = requestPosition + 1;
      index < this.cache.requests.length;
      index++
    ) {
      if (this.cache.requests[index] == page) {
        return index;
      }
    }
    return this.cache.requests.length + 1;
  };
}

// Driver code
const pages = ["a", "b", "c"];
const requests = [
  "a",
  "a",
  "d",
  "e",
  "b",
  "b",
  "a",
  "c",
  "f",
  "d",
  "e",
  "a",
  "f",
  "b",
  "e",
  "c",
];

const cache = new OfflineCache(pages);
const strategies = [
  new FIFO(cache),
  new LIFO(cache),
  new LFU(cache),
  new LRU(cache),
  new LFD(cache),
];

for (
  let strategyPositon = 0;
  strategyPositon < strategies.length;
  strategyPositon++
) {
  cache.resetpages(pages);
  console.log("\nStrategy: ", strategies[strategyPositon].name);

  let cacheInitial = "\nCache initial: ";
  cache.pages.forEach((page) => {
    cacheInitial += page + ",";
  });
  console.log(cacheInitial);

  let missCount = 0;
  requests.forEach((request) => {
    const missed = cache.updateCache(request, strategies[strategyPositon]);
    if (missed) {
      missCount++;
    }
    console.log("request - ", request, "\t\n");

    cache.pages.forEach((page) => {
      console.log(page, "\t", missed ? "x" : "");
    });

    console.log("\nTotal cache misses: ", missCount, "\n\n");
  });
}
