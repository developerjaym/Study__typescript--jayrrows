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
        this.htmlService.showDialog("Help", `PIECES\n King (${Icon.KING_PIECE}): This piece cannot move.\n  Your goal is to capture your opponent's King.\n  The first piece you move becomes your King.\n Diagonal-Mover (${Icon.DIAGONAL_PIECE}): This piece can move one space diagonally.\n Vertical-Mover (${Icon.VERTICAL_PIECE}): This piece can move one space vertically.\n Horizontal-Mover (${Icon.HORIZONTAL_PIECE}): This piece can move one space horizontally.\n All-Mover (${Icon.ALL_PIECE}): This piece can move to any connecting square.\n  The first All-Mover you move is promoted to King.\n  Later, an All-Mover is promoted based on direction you moved it.\n   So, if moved diagonally, it becomes a Diagonal-Mover.\n\nPLAY\n Green goes first.\n Purple goes second.\n Moving a piece to an occupied square will capture the opponent's piece.`, Icon.HELP)

    }
}