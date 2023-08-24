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
    this.game.onSelect(x, y)
  }
  undo() {
    console.log("controller.undo")
  }
  endGame() {
    this.game.onEnd()
  }
}
