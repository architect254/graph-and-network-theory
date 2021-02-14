// The Problem: Given an list of jobs where every job has a deadline and associated profit if the job is finished before the deadline and every job takes a single unit of time and has a minimum deadline of 1.
// find a sequence of jobs to be done in which profit is maximized.

class Job {
    constructor(id, profit, deadline) {
      this.id = id;
      this.profit = profit;
      this.deadline = deadline;
    }
  }
  
  const sequence = (jobs) => {
    // sort jobs
    jobs.sort((job1, job2) => {
      return job2.profit - job1.profit;
    });
  
    let isSequenced = [],
      sequencedJobs = [],
      totalProfit = 0;
  
    for (let index = 0; index < jobs.length; index++) {
      // find a free slot for this job
      // note that we start from the last possible slot
      for (let index2 = jobs[index].deadline - 1; index2 >= 0; index2--) {
        // free slot found
        if (!isSequenced[index2]) {
          isSequenced[index2] = true;
          sequencedJobs[index2] = jobs[index];
          totalProfit += jobs[index].profit;
          break;
        }
      }
    }
  
    //   print sequence
    sequencedJobs.forEach((job) => {
      console.log(job.id, job.profit, job.deadline);
    });
    // print profit
    console.log("\nmax profit is " + totalProfit);
  };
  
  // Driver code
  // create list of jobs
  const jobs = [
    new Job("coding", 5000, 2),
    new Job("marketing", 2000, 1),
    new Job("networking", 2001, 1),
    new Job("lecturing", 4000, 3),
  ];
  
  sequence(jobs);
  