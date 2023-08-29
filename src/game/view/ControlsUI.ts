import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { rules } from "../../text/Rules.js";
import { GameController } from "../controller/GameController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { Icon } from "./Icon.js";
import { Viewable } from "./Viewable.js";

export class ControlsUI implements Viewable {
    private helpDialogShown = false
  constructor(
    private controller: GameController,
    private htmlService: HTMLService = injector.getHtmlService()
  ) {}
  get component(): HTMLElement {
    const container = this.htmlService.create(
      "section",
      ["controls"],
      "controls"
    );
    const undoButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "undoButton",
      "Undo"
    );
    undoButton.addEventListener("click", () => this.controller.onEvent({type: UserEventType.UNDO}));
    const endGameButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "endGameButton",
      "End Game"
    );
    endGameButton.addEventListener("click", () => this.controller.onEvent({type: UserEventType.END_GAME}));
    const helpButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "helpButton",
      "Help"
    );
    helpButton.addEventListener("click", () => this.showHelpDialog());
    container.append(undoButton, endGameButton, helpButton);
    return container;
  }
  onChange(event: GameEvent): void {
    if (event.type === GameEventType.START && !this.helpDialogShown) {
      this.showHelpDialog();
      this.helpDialogShown = true
    }
  }
  private showHelpDialog() {
    this.htmlService.showDialog("Help", rules, Icon.HELP);
  }
}
