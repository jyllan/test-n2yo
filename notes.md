1. How would you modify your project to handle horizontal scaling in such way we do not keep multiple copies of satellites data?
   I used a server-side cache.
   If the project is meant to be deployed on multiple servers, we could create a centralized cache server/database to handle the data but it would also create a bottleneck.
2. Imagine we do not track a dozen of satellites, but a million. How would you change your project to handle it?

   - CRON that calls and cache satellites positions
   - Use a library that will store the data and allow the app to query/display some chunks

3. What metrics should be produced by your software? What would they be useful for? Propose an implementation using Prometheus protocol.
   We could use `Counter` to track successful and failed requests
   We could use `Histogram` to track fetch duration
   It would allow us to see if we need to implement a CRON that will preload the data so the user doesn't have to wait.
4. Which assertion in the requirements and constraints is a scientific mistake, if any? This question won't give you any point.
   The orbit is not circular.

# Notes

I used `moment.js` to convert UNIX time to a human readable date, matching the device timezone.

I used `tailwind` atomic classes to handle layout and scss files to override some rules from the `Table` library.

I didn't used redux because we don't need to store a global state with the current implementation.

I used a custom hook pattern to create `useGetSatellitesData` in order to easily separate the method requesting the date from the one displaying it.

The nested table could be improved a lot, by lazyloading the satellites info, and lazyloading their passes info array only if needed.

I used Promise.all to call make multiple requests in parallel and aggretate the responses
