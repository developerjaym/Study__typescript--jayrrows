import injector from "../../../service/Injector.js";
import { IController } from "../IController.js";

export class RemoteListener {
    private events: Set<UIEvent> = new Set<UIEvent>()
    id: number = 0
    constructor(private controller: IController, private env = injector.getEnvironment(), private urlService = injector.getURLService()) {
    }
    start() {
        this.id = window.setInterval(()=>{this.poll()})
    }
    cancel() {
        window.clearInterval(this.id)
    }
    private async poll() {
        const hostId = this.urlService.getSearchParam("hostId")
        const response = fetch(`${this.env.remoteUrl}/${hostId}/event`)
        const listOfEvents = (await response).json()
        // TODO check for new events
        // TODO notify controller of each new event
        
    }

}