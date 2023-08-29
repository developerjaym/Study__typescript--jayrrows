import injector from "../service/Injector.js";
import { GameController } from "./controller/GameController.js";
import { IController } from "./controller/IController.js";
import { RemoteController } from "./controller/RemoteController.js";
import { RemoteListener } from "./controller/remote/RemoteListener.js";
import { RemoteSender } from "./controller/remote/RemoteSender.js";
import { Game } from "./model/Game.js";
import { GameEvent } from "./model/GameEvent.js";
import { GameView } from "./view/GameView.js";
import { Viewable } from "./view/Viewable.js";

export class GameComponent implements Viewable {
  private model;
  private controller: IController;
  private view;
  constructor(private urlService = injector.getURLService()) {
    this.model = new Game();
    this.controller = new GameController(this.model);
    if(this.urlService.getSearchParam("hostId")) {
        // must be a remote game
        const remoteListener = new RemoteListener(this.controller)
        this.controller = new RemoteController(this.controller, new RemoteSender())
        remoteListener.start()
    }
    this.view = new GameView(this.controller);
    this.model.subscribe(this.view);
    this.model.start();
    
  }
  get component(): HTMLElement {
    return this.view.component;
  }
  onChange(event: GameEvent): void {}
}
