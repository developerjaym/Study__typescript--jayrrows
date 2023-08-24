import { GameController } from "./controller/GameController.js";
import { Game } from "./model/Game.js";
import { GameEvent } from "./model/GameEvent.js";
import { GameView } from "./view/GameView.js";
import { Viewable } from "./view/Viewable.js";


export class GameComponent implements Viewable{
    private model;
    private controller;
    private view;
    constructor() {
        this.model = new Game()
        this.controller = new GameController(this.model)
        this.view = new GameView(this.controller)
        this.model.subscribe(this.view)

        this.model.start(); // TODO, maybe have a RULES modal with a start button
    }
    get component(): HTMLElement {
        return this.view.component
    }
    onChange(event: GameEvent): void {
       
    }
}