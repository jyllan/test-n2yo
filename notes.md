1. How would you modify your project to handle horizontal scaling in such way we do not keep multiple copies of satellites data?

I used a server-side cache.
If the project is meant to be deployed on multiple servers, we could create a centralized cache server/database to handle the data but it would also create a bottleneck.

2. Imagine we do not track a dozen of satellites, but a million. How would you change your project to handle it?

CRON that calls and cache satellites positions

3. What metrics should be produced by your software? What would they be useful for? Propose an implementation using Prometheus protocol.

4. Which assertion in the requirements and constraints is a scientific mistake, if any? This question won't give you any point.
   The orbit is not circular.

# Notes

I used moment.js to convert UNIX time to a human readable date, matching the device timezone
