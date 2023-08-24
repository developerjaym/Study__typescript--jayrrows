import { HTMLService } from "../../service/HTMLService.js";
import injector from "../../service/Injector.js";
import { GameController } from "../controller/GameController.js";
import { GameEvent } from "../model/GameEvent.js";
import { Icon } from "./Icon.js";
import { Viewable } from "./Viewable.js";

export class ControlsUI implements Viewable {
    constructor(private controller: GameController, private htmlService: HTMLService = injector.getHtmlService()) {

    }
    get component(): HTMLElement {
        const container = this.htmlService.create("section", ["controls"], "controls")
        const undoButton = this.htmlService.create("button", ["button", "button--game"], "undoButton", "Undo")
        undoButton.addEventListener("click", () => this.controller.undo())
        const endGameButton = this.htmlService.create("button", ["button", "button--game"], "endGameButton", "End Game")
        endGameButton.addEventListener("click", () => this.controller.endGame())
        const helpButton = this.htmlService.create("button", ["button", "button--game"], "helpButton", "Help")
        helpButton.addEventListener("click", () => this.showHelpDialog())
        container.append(undoButton, endGameButton, helpButton);
        return container;
    }
    onChange(event: GameEvent): void {
    }
    private showHelpDialog() {
        this.htmlService.showDialog("Help", `Green goes first. The ${Icon.ALL_PIECE} piece can move one space in any direction. The first one you move will become a king (${Icon.KING_PIECE}). Kings can't move. Then Purple does the same. Then the next ${Icon.ALL_PIECE} you move will get promoted to a different piece depending on the direction you move. If you move diagonally, it will become a piece that can only move diagonally.`, Icon.HELP)

    }
}