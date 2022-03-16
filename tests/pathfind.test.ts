import { pathfind } from "../src/pathfind"
import { Vector } from "../src/Vector.type"

describe("Pathfind", () => {
  it("start and end the same", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { x: 0, y: 0 }
    const Q: Vector = { x: 0, y: 0 }

    expect(pathfind(A, P, Q)).toBe(0)
  })

  it("example case", () => {
    const A = [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
      [true, true, true, true, true],
    ]
    const P: Vector = { x: 1, y: 0 }
    const Q: Vector = { x: 2, y: 3 }

    expect(pathfind(A, P, Q)).toBe(6)
  })

  // You can add further tests here
})
