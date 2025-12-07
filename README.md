# Task Manager (Angular + JSON Server)

## Setup

1. `npm install`
2. `npm start`  -- runs Angular app and json-server concurrently
3. Open http://localhost:4200

## API

JSON Server runs at http://localhost:3000
Endpoints: /tasks

## Notes

- Tasks are stored in localStorage as well as db.json when the JSON Server is used.
- If JSON Server is not available, the app will work from localStorage.

## Tests

Run `npm test`
