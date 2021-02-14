// The problem: Given a set of events each having a start time and an end time.find a schedule to perform maximum events where no two jobs overlap.
class Event {
  constructor(id, startTime, endTime) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}

const schedule = (events) => {
  // sort
  events.sort((event1, event2) => {
    return event1.endTime - event2.endTime;
  });
  const scheduledEvents = [];

  events.forEach((event) => {
    let isCompatible = true;
    for (let index = 0; index < scheduledEvents.length; index++) {
      // test whether the actual event and the event from solution are incompatible
      if (
        event.endTime >= scheduledEvents[index].startTime &&
        event.startTime <= scheduledEvents[index].endTime
      ) {
        isCompatible = false;
        break;
      }
    }
    if (isCompatible) {
      scheduledEvents.push(event);
    }
  });

  //print scheduled events
  scheduledEvents.forEach((scheduledevent) => {
    console.log(
      "event id: ",
      scheduledevent.id,
      " start time: ",
      scheduledevent.startTime,
      " end time: ",
      scheduledevent.endTime
    );
  });
};

// Driver code
// create a list of events
const events = [
  new Event(1, 2, 4),
  new Event(2, 3, 4),
  new Event(3, 1, 3),
  new Event(4, 4, 5),
  new Event(5, 3, 5),
  new Event(6, 2, 5),
  new Event(7, 6, 8),
  new Event(8, 7, 9),
  new Event(9, 8, 9),
  new Event(0, 9, 10),
];
schedule(events);
