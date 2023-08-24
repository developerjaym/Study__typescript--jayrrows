import { Game } from "../model/Game.js";

export class GameController {
  constructor(private game: Game) {}
  onMove(
    originX: number,
    originY: number,
    destinationX: number,
    destinationY: number
  ) {}
  select(x: number, y: number) {
    console.log("controller.select", arguments)
    this.game.onSelect(x, y)
  }
  undo() {
    console.log("controller.undo")
  }
  endGame() {
    console.log("controller.endGame")
  }
}
