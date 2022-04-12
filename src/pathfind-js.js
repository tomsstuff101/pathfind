console.log("this needs rewriting in ts");
//import { Vector } from "./Vector.type";

const pathfind = (A, P, Q) => {
  console.log("Array A");
  console.table(A);
  console.log("P --> ", P);
  console.log("Q --> ", Q);

  /* Init   */
  /***********/

  //let cellGHFArray = Array.from(Array(A.length), () => new Array(A.length)); // create arrayGHF for storing G, H, F and parent

  let arrayGHF = [];

  // square array
  for (let index = 0; index < A.length; index++) {
    let row = [];
    for (let rowIndex = 0; rowIndex < A.length; rowIndex++) {
      row.push({ G: -1, H: -1, F: -1 }); // IF hedge or path not found then same ie all -1 around Q
    }
    arrayGHF.push(row);
  }

  let openList = []; // cells being considered
  let closedList = []; // GH and F calculated
  let nextList = []; // the next cells to be considered

  const initOpenList = (cell) => {
    let north = { x: cell.x, y: cell.y - 1 };
    let east = { x: cell.x + 1, y: cell.y };
    let south = { x: cell.x, y: cell.y + 1 };
    let west = { x: cell.x - 1, y: cell.y };

    let initOpenDirections = [north, east, south, west];

    initOpenDirections.forEach((direction) => {
      //   console.log(`A direction -->  x ${direction.x}   y ${direction.y} `);

      if (direction.x >= 0 && direction.x < A.length) {
        if (direction.y >= 0 && direction.y < A.length) {
          if (A[direction.y][direction.x] === true) {
            // its not a wall

            openList.push(direction);
          }
        }
      }
    });
  };

  const findNextCells = () => {
    // Find list of valid vectors for nextList

    // test each openList vector N,E,S and W (no diagonals)
    // ignore if wall or if out of bounds
    // otherwise add its vector to the nextList

    openList.forEach((cell) => {
      let north = { x: cell.x, y: cell.y - 1 };
      let east = { x: cell.x + 1, y: cell.y };
      let south = { x: cell.x, y: cell.y + 1 };
      let west = { x: cell.x - 1, y: cell.y };

      let checkList = [north, east, south, west];

      console.log("find next cells for");
      console.log(cell);
      console.log(" --  check list directions --> ");
      console.log(checkList);

      checkList.forEach((direction) => {
        // its not off the map
        console.log("considering adding --> ", direction);
        if (direction.x >= 0 && direction.x < A.length) {
          if (direction.y >= 0 && direction.y < A.length) {
            // its not a wall
            console.log(
              `direction x ${direction.x}    direction y ${direction.y}`
            );

            if (A[direction.y][direction.x] === true) {
              console.log(
                `not a wall direction x ${direction.x}    direction y ${direction.y}`
              );

              // see if in the closed list
              console.log(closedList);
              let inClosedList = closedList.filter((cell) => {
                return cell.x === direction.x && cell.y === direction.y;
              });

              console.log("inClosed list -- ", inClosedList);

              //   if (closedList.indexOf(direction) === -1) {
              if (inClosedList.length === 0) {
                console.log("ADDING ==> ", direction);
                nextList.push(direction);
              }
            }
          }
        }
      });
    });
  };

  const calcH = (x, y) => {
    return Math.abs(Q.x - x) + Math.abs(Q.y - y);
  };

  const findGHFforAllOpenCells = (g) => {
    /**
     * Find G,H & F for each on openList. Put these values in cellGHFArray
     *
     */

    openList.forEach((cell) => {
      let h = calcH(cell.x, cell.y);

      let f = g + h;

      arrayGHF[cell.y][cell.x] = { G: g, H: h, F: f };
    });
  };

  /******
   * Initialse the search
   * * */
  closedList.push(P);
  initOpenList(P);

  //Check P and Q not already togeether at start
  if (P.x !== Q.x || P.y !== Q.y) {
    let g = 1;
    do {
      //Calculate G, H & F for all valid cells starting at P,
      // working outwards untill Q is found or its impossible ie no path

      findGHFforAllOpenCells(g);
      nextList = [];
      findNextCells();
      closedList = [...closedList, ...openList];
      openList = [...nextList];
      g++;

      console.log(nextList);
    } while (openList.length !== 0);

    //find minimum steps

    console.log(arrayGHF);

    const stepsToQ = () => {
      // find lowest G for each valid cell in cellGHFArray for position Q
      let north = { x: Q.x, y: Q.y - 1 };
      let east = { x: Q.x + 1, y: Q.y };
      let south = { x: Q.x, y: Q.y + 1 };
      let west = { x: Q.x - 1, y: Q.y };

      let checkG = [north, east, south, west];

      console.log("north");
      console.log(arrayGHF[north.y][north.x].G);
      console.log(arrayGHF[north.y][north.x].H);
      console.log(arrayGHF[north.y][north.x].F);

      console.log("east");
      console.log(arrayGHF[east.y][east.x].G);
      console.log(arrayGHF[east.y][east.x].H);
      console.log(arrayGHF[east.y][east.x].F);

      console.log("south");
      console.log(arrayGHF[south.y][south.x].G);
      console.log(arrayGHF[south.y][south.x].H);
      console.log(arrayGHF[south.y][south.x].F);

      console.log("west");
      console.log(arrayGHF[west.y][west.x].G);
      console.log(arrayGHF[west.y][west.x].H);
      console.log(arrayGHF[west.y][west.x].F);

      //   let isBlockedCheck = checkG.reduce((total, num) => {
      //     return total + num;
      //   });
      //   if (isBlockedCheck === -4) {
      //     lowestG = -1; // all paths blocked; not possible
      //   } else {
      //     lowestG = Math.min(...checkG);
      //   }

      lowestG = 99;
      console.log("lowest G ", lowestG);
      return lowestG;
    };

    return stepsToQ();
  } else {
    console.log("P and Q same");
    return 0;
  }

  //return -1;
};
// [true, false, false, false, false],
//[true, true, true, true, true],
const A = [
  [true, true, true, true, true],
  [true, false, false, false, true],
  [true, true, true, true, true],
  [true, true, true, true, true],
  [true, true, true, true, true],
];
const P = { x: 1, y: 0 };
const Q = { x: 2, y: 3 };

pathfind(A, P, Q);
