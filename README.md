# Oxbury Pathfind

Imagine representing a grid-shaped game map as a 2-dimensional array. Each value of this array is
boolean `true` or `false` representing whether that part of the map is passable (a floor) or blocked
(a wall).

Write a function that takes such a 2-dimensional array `A` and 2 vectors `P` and `Q` each represented by the `Vector` type found in `src/Vector.type.ts`, with `0,0` being the top left corner of the map (in the example below, `P = { x: 1, y: 0 }` and `Q = { x: 2, y: 3 }`), and returns the distance of the shortest path between those points, respecting the walls in the map.

eg. Given the map (where `.` is passable - `true`, and `#` is blocked - `false`)

```
.P...
.###.
.....
..Q..
.....
```

then `pathfind(A, P, Q)` should return `6`.

## What to do

1. Clone/Fork this repo
2. Implement the `pathfind` function in `src/pathfind.ts`
3. Feel free to add further test cases to `tests/pathfind.test.ts`

## Running the tests

Tests have been implemented using Jest and can be run by running `yarn test`.

## Comments Section

Please fill in the sections below after you complete the challenge.

### What I'm Pleased With

### What I Would Have Done With More Time
