console.log("this needs rewriting in ts");
//import { Vector } from "./Vector.type";

const pathfind = (A, P, Q) => {
  console.log("Array A");
  console.table(A);
  console.log("P --> ", P);
  console.log("Q --> ", Q);

  /* Init   */
  /***********/

  let cellGHFArray = Array.from(Array(A.length), () => new Array(A.length)); // create cellArray for storing G, H, F and parent
  let openList = []; // cells being considered
  let closedList = []; // GH and F calculated
  let nextList = []; // the next cells to be considered

  //let validState = true;

  const findNextCells = () => {
    // Find list of valid vectors for nextList
    // open cells pushes to next list.
  };

  const findGHFforAllOpenCells = () => {
    /**
     * Find G,H & F for each on openList. Put these values in cellGHFArray
     *
     */
  };

  //   const qNotFound = () => {
  //     let notFound = true;

  //     // test if the path has been found
  //     // closedList contains Q cordinates and notFound = false

  //     return notFound;
  //   };

  /******
   * Initialse the search
   * * */
  closedList.push(P);

  //   while (qNotFound() && validSate) {

  //Check P and Q not already togeether at start
  if (P.x !== Q.x || P.y !== Q.y) {
    do {
      //Calculate G, H & F for all valid cells starting at P,
      // working outwards untill Q is found or its impossible ie no path
      findNextCells();
      closedList = [...closedList, ...openList];
      openList = [...nextList];
      findGHFforAllOpenCells();
    } while (openList !== []);

    //find minimum steps
    const stepsToQ = () => {
      // find lowest G for each valid cell in cellGHFArray for position Q

      return lowestG;
    };
  } else {
    console.log("P and Q same");
    return 0;
  }

  return -1;
};

const A = [
  [true, true, true, true, true],
  [true, false, false, false, true],
  [true, true, true, true, true],
  [true, true, true, true, true],
  [true, true, true, true, true],
];
const P = { x: 0, y: 0 };
const Q = { x: 0, y: 0 };

pathfind(A, P, Q);
