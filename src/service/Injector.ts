import { SquareDrawer } from "../game/view/drawer/square/SquareDrawer.js";
import { TextSquareDrawer } from "../game/view/drawer/square/TextSquareDrawer.js";
import { HTMLService } from "./HTMLService.js";
import { EnvironmentService } from "./environment/EnvironmentService.js";

class Injector {
    private htmlService: HTMLService;
    private environment: EnvironmentService;
    private squareDrawer: SquareDrawer;
    constructor() {
        this.environment = new EnvironmentService()
        this.htmlService = new HTMLService(document, this.environment)
        this.squareDrawer = new TextSquareDrawer()
    }
    async initialize() {
        return this.environment.load()
    }
    getEnvironment() {
        return this.environment.env
    }
    getHtmlService() {
        return this.htmlService
    }
    getSquareDrawer() {
        return this.squareDrawer
    }
}

const injector = new Injector()
export default injector