import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { rules } from "../../text/Rules.js";
import { GameController } from "../controller/GameController.js";
import { IController } from "../controller/IController.js";
import { UserEventType } from "../controller/UserEvent.js";
import { GameEvent, GameEventType } from "../model/GameEvent.js";
import { Icon } from "./Icon.js";
import { Viewable } from "./Viewable.js";
import { isRemoteGame, isRemoteTurnNext } from "./remoteUtilities.js";

export class ControlsUI implements Viewable {
  private helpDialogShown = false;
  private undoButton: HTMLElement;
  private container: HTMLElement;
  constructor(
    private controller: IController,
    private htmlService: HTMLService = injector.getHtmlService()
  ) {
    this.container = this.htmlService.create(
      "section",
      ["controls"],
      "controls"
    );
    this.undoButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "undoButton",
      "Undo"
    );
    this.undoButton.addEventListener("click", () =>
      this.controller.onEvent({ type: UserEventType.UNDO })
    );
    const endGameButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "endGameButton",
      "End Game"
    );
    endGameButton.addEventListener("click", () =>
      this.controller.onEvent({ type: UserEventType.END_GAME })
    );
    const helpButton = this.htmlService.create(
      "button",
      ["button", "button--game"],
      "helpButton",
      "Help"
    );
    helpButton.addEventListener("click", () => this.showHelpDialog());
    this.container.append(this.undoButton, endGameButton, helpButton);
  }
  get component(): HTMLElement {
    return this.container;
  }
  onChange(event: GameEvent): void {
    if (event.type === GameEventType.START && !this.helpDialogShown) {
      this.showHelpDialog();
      this.helpDialogShown = true;
    }
    if (isRemoteGame(event)) {
      this.undoButton.setAttribute("disabled", "true");
    } else {
      this.undoButton.removeAttribute("disabled");
    }
  }
  private showHelpDialog() {
    this.htmlService.showDialog("Help", rules, Icon.HELP);
  }
}
