import { RemoteSender } from "../game/controller/remote/RemoteSender.js";
import { SquareDrawer } from "../game/view/drawer/square/SquareDrawer.js";
import { TextSquareDrawer } from "../game/view/drawer/square/TextSquareDrawer.js";
import { HTMLService } from "./HTMLService.js";
import { URLService } from "./URLService.js";
import { UserService } from "./UserService.js";
import { Environment } from "./environment/Environment.js";
import { EnvironmentService } from "./environment/EnvironmentService.js";
import { LocalStorageService } from "./storage/LocalStorageService.js";
import { StorageService } from "./storage/StorageService.js";

class Injector {
    private htmlService: HTMLService;
    private environment: EnvironmentService;
    private squareDrawer: SquareDrawer;
    private storageService: StorageService;
    private userService: UserService;
    private urlService: URLService;
    constructor() {
        this.environment = new EnvironmentService()
        this.htmlService = new HTMLService(document, this.environment)
        this.squareDrawer = new TextSquareDrawer()
        this.storageService = new LocalStorageService()
        this.userService = new UserService(this.storageService)
        this.urlService = new URLService()
    }
    async initialize() {
        return this.environment.load()
    }
    getEnvironment(): Environment {
        return this.environment.env
    }
    getHtmlService(): HTMLService {
        return this.htmlService
    }
    getSquareDrawer(): SquareDrawer {
        return this.squareDrawer
    }
    getStorageService(): StorageService {
        return this.storageService
    }
    getUserService(): UserService {
        return this.userService
    }
    getURLService(): URLService {
        return this.urlService
    }
}

const injector = new Injector()
export default injector