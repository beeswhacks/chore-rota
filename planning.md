### Objects required:
- Rooms
    - Room ID
    - Room name
    - Method to output which person is cleaning the room and what kind of clean it is
        - Needs seed date as input
        - week 1: person 1, deep
        - week 2: person 1, quick
        - week 3: person 2, deep
        - week 4: person 2, quick
        - Returns an object with person ID, name of room and level of clean

- People
    - Name
    - ID
- Seed date

### Rough workflow:
1. For each room
2. What kind of clean is it? Use method in rooms object to get person to clean and level of clean

### Dev ideas
- Add schedule type (alternating, fixed) and cleaning frequency so it can figure out schedules automatically.
- Store rooms in an array so that any number of rooms can be accounted for. Build the HTML for each room in JavaScript.