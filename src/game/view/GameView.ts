import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { GameController } from "../controller/GameController.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { BoardUI } from "./BoardUI.js";
import { ControlsUI } from "./ControlsUI.js";
import { Icon } from "./Icon.js";
import { Viewable } from "./Viewable.js";

export class GameView implements Viewable {
  board: BoardUI;
  controls: ControlsUI;
  container: HTMLElement;
  constructor(
    private controller: GameController,
    private htmlService: HTMLService = injector.getHtmlService()
  ) {
    // TODO, create the HTML elements
    this.container = this.htmlService.create("main", ["game__main"], "main");
    // create controls (help, undo, end game)
    this.controls = new ControlsUI(this.controller);
    this.container.append(this.controls.component);
    // create board
    this.board = new BoardUI(this.controller);
    this.container.append(this.board.component);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    if(event.type === GameEventType.END) {
      this.htmlService.showDialog("Game Over", event.message, Icon.CELEBRATE, () => this.controller.endGame())
      return
    }
    this.controls.onChange(event);
    this.board.onChange(event);
  }
}
