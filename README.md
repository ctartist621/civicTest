# civicTest
Meteor.js app coding challenge

Using Meteor create a simple single-page web application that displays a history of fictional api calls to the user in a list format. Basically a visual log of api call history.

# A1. Seed the mongodb with 1000 api log entries.
Each log entry should contain these fields:
timestamp,
client name,
endpoint called,
result i.e. success or error

Seed with generated data e.g. client1, client2 etc.

# A2. Implement a UI that displays these entries to the user in a list with most recent log entries first.

# A3. Allow the user to add new log entries to the database from the UI. Use meteor's live data and reactivity to keep the visual list in synch.

For the second part, remove meteor packages from your project like insecure and autopublish and then:
B1. With the number of log entries likely to grow into the millions you can't send all these entries to the UI. So convert your list to a virtual list that only publishes 50 rows at a time on demand, ala instagram with "load more" and "new entries" indicators as applicable.

Don't worry about a perfect UX experience. The focus is on the functionality and a working implementation.
If part A has been too time consuming then part B can be presented in pseudo code format explaining the main nuances.