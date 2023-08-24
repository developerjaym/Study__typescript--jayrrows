import { Icon } from "../game/view/Icon.js";
import { EnvironmentService } from "./environment/EnvironmentService.js";

export class HTMLService {
    constructor(private document: Document, private environmentService: EnvironmentService) {
        
    }
    create(tag: string, classes: string[] = [], id = `${crypto.randomUUID()}`, textContent=""): HTMLElement {
        const element = this.document.createElement(tag)
        element.classList.add(...classes)
        element.id = id
        element.textContent = textContent
        return element;
    }
    createDialog(title: string, message: string, icon: Icon = Icon.MESSAGE, onClose: Function = () => {}): void {
        const dialog = this.document.createElement("dialog")
        const dialogHeader = document.createElement("header")
        const headerTitle = document.createElement("h2")
        headerTitle.textContent = title
        dialogHeader.append(headerTitle)
        const closeButton = document.createElement("button")
        closeButton.textContent = Icon.CLOSE
        closeButton.addEventListener("click", () =>{ dialog.close(); dialog.remove(); onClose() })
        dialogHeader.append(closeButton)
        dialog.append(dialogHeader)
        const messageBody = document.createElement("p")
        messageBody.textContent = message
        dialog.append(messageBody)
        this.append(dialog)
        dialog.showModal()
    }
    getRoot(): HTMLElement {
        const id: string = this.environmentService.env.rootElementId
        return this.document.getElementById(id)!
    }

    append(element: HTMLElement): void {
        this.getRoot().appendChild(element)
    }
}