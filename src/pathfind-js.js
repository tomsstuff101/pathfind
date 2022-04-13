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

  /********************************
   * Main loop
   ********************************/

  // const isQinClosedList = ()=>{
  //   let isQInList = closedList.filter(vector =>{
  //     return (vector.x === Q.x  && vector.y === Q.y)
  //   })
  //   isQInList.length !== 0
  //   ? true
  //   : false
  // }

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
    //} while (isQinClosedList)

    //find minimum steps

    console.log(arrayGHF);

    const stepsToQ = () => {
      // find lowest G for each valid cell in cellGHFArray for position Q
      let north = { x: Q.x, y: Q.y - 1 };
      let east = { x: Q.x + 1, y: Q.y };
      let south = { x: Q.x, y: Q.y + 1 };
      let west = { x: Q.x - 1, y: Q.y };

      let checkG = [north, east, south, west];

      let realpaths = [];

      checkG.forEach((potentialPathToQ) => {
        // check its valid

        if (potentialPathToQ.x >= 0 && potentialPathToQ.x < A.length) {
          if (potentialPathToQ.y >= 0 && potentialPathToQ.y < A.length) {
            if (potentialPathToQ !== -1) {
              realpaths.push(
                arrayGHF[potentialPathToQ.y][potentialPathToQ.x].G
              );
            }
          }
        }
      });

      let lowestG = -1; // defult to no path found

      console.log("realpaths");
      console.log(realpaths);

      if (realpaths.length !== 0) {
        let lowestGandNoWalls = realpaths.filter((path) => {
          return path !== -1;
        });
        console.log("lowestGandNoWalls");
        console.log(lowestGandNoWalls);

        if (lowestGandNoWalls.length !== 0) {
          lowestG = Math.min(...lowestGandNoWalls) + 1; // as counted from 0
        }
      }

      console.log("lowest number of steps = ", lowestG);

      return lowestG;
    };

    return stepsToQ();
  } else {
    console.log("P and Q same");
    console.log("lowest number of steps = 0");
    return 0;
  }
};

const A = [
  [true, true, true, true, true],
  [true, false, false, false, true],
  [true, true, true, true, true],
  [true, true, true, false, false],
  [true, true, true, false, true],
];
const P = { x: 1, y: 0 };
const Q = { x: 1, y: 0 };

pathfind(A, P, Q);
