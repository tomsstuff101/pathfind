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
Enjoyed tackling the problem and improving my coding.
A different type of challange than Im used to for sure!

### What I Would Have Done With More Time
TypeScript ! : I can read it and make sense of it but Im not quite there writing in it
Jest testing in TS: As Ive done in TS this isnt working. Gone for simpler solution of adding a call with prefixed test inside the pathfine-js script
Path: Store the parent vectors in the valid next cells to find paths
Options: Chose fatstes path find solution, rther than minim path by only adding lowest F score from open to closed list
Larger gird: Breakdown a large grid (eg 1x10^6 x 1x10^6) into chunks with intermediate P' -> Q' for each chunk
Convert Open data via an api into a grid. Might be able to get a more reall world

