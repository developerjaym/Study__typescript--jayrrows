import { Piece } from "../../../model/Piece.js"
import { Square } from "../../../model/Square.js"
import { SquareDrawer } from "./SquareDrawer.js"

export class TextSquareDrawer implements SquareDrawer {
    private pieceToTextMap = new Map<Piece | null, string>()
    constructor() {
        this.pieceToTextMap.set(Piece.ALL, "✷")
        this.pieceToTextMap.set(Piece.KING, "👑")
        this.pieceToTextMap.set(Piece.VERTICAL, "⇵")
        this.pieceToTextMap.set(Piece.HORIZONTAL, "⇆")
        this.pieceToTextMap.set(Piece.DIAGONAL, "╳")
        this.pieceToTextMap.set(null, " ")
    }
    noteLegalMove(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.classList.add("square--legal")
    }
    draw(modelSquare: Square, uiSquare: HTMLElement): void {
        uiSquare.textContent = this.pieceToTextMap.get(modelSquare.piece) || ""
        uiSquare.className = "square"
        uiSquare.classList.add(`square--${!modelSquare.player ? 'empty' : modelSquare.player.id ? 'first' : 'second'}`)
        if(modelSquare.selected) {
            console.log('something is selected', modelSquare);
            
            uiSquare.classList.add("square--selected")
        }
    }
    
}