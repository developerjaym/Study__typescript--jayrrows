import { Observable } from "../../observer/observer.js";
import injector from "../../service/Injector.js";
import { Environment } from "../../service/environment/Environment.js";
import { Board, BoardHelper } from "./Board.js";
import { GameEvent, GameEventType } from "./GameEvent.js";
import { Piece } from "./Piece.js";
import { Player, PlayerHelper } from "./Player.js";
import { Square } from "./Square.js";

interface GameState {
  board: Board;
  players: Player[];
  activePlayer: Player;
}

export class Game extends Observable<GameEvent> {
  
  private state: GameState;
  constructor(existingState: GameState | null = null, private env: Environment = injector.getEnvironment()) {
    super();
    this.state = existingState || this.getFreshState()
    
  }
  onStart() {
    this.notifyAll(structuredClone({
      type: GameEventType.START,
      activePlayer: this.state.activePlayer,
      board: this.state.board,
      message: "Game Started!",
      legalMoves: BoardHelper.determineLegalMoves(this.state.board, this.state.activePlayer)
    }))
  }
  onSelect(x: number, y:number): void {
    const previouslySelectedSquare = BoardHelper.selectedSquare(this.state.board)
    const thisSquare = BoardHelper.getSquare(this.state.board, x, y);
    if(previouslySelectedSquare && thisSquare.player === this.state.activePlayer) {
      // Player is likely trying to change their selection
      BoardHelper.unselectAll(this.state.board)
      this.notifyAll(structuredClone({type: GameEventType.UNSELECT, message: "OK", legalMoves: BoardHelper.determineLegalMoves(this.state.board, this.state.activePlayer), ...this.state}))
    }
    else if(previouslySelectedSquare) {      
      this.move(previouslySelectedSquare, thisSquare)
    }
    else {      
      this.select(thisSquare)
    }
  }
  onEnd() {
    this.state = this.getFreshState()
    this.onStart()
  }
  private move(originSquare: Square, destinationSquare: Square) {    
    if(BoardHelper.isLegalMove(originSquare, destinationSquare)) {
      const movingPiece = originSquare.piece!
      const destinationPiece = destinationSquare.piece
      const newPiece = BoardHelper.determinePromotion(movingPiece, this.state.activePlayer, this.state.board, originSquare, destinationSquare)
      destinationSquare.piece = newPiece
      destinationSquare.player = this.state.activePlayer
      originSquare.piece = null
      originSquare.player = null
      BoardHelper.unselectAll(this.state.board)      
      if(destinationPiece === Piece.KING) {
        this.state.activePlayer.victor = true
        this.notifyAll(structuredClone({type: GameEventType.END, message: `GAME OVER!\n\n${this.state.activePlayer.name} has won!`, legalMoves: [], ...this.state}))
      }
      else {
        this.changeTurns()
        this.notifyAll(structuredClone({type: GameEventType.MOVE, message: "Next Player!", legalMoves: BoardHelper.determineLegalMoves(this.state.board, this.state.activePlayer), ...this.state}))
      }
    }
    else {
    //    create error event and set helpful message
      this.notifyAll(structuredClone({type: GameEventType.ERROR, message: `This move is illegal.`, legalMoves: BoardHelper.determineLegalMoves(this.state.board, this.state.activePlayer), ...this.state}))
    }

  }
  private select(square: Square) {
    BoardHelper.unselectAll(this.state.board)
    square.selected = BoardHelper.isLegalSelection(this.state.activePlayer, square)        
    this.notifyAll(structuredClone({type: GameEventType.SELECT, message: `OK`, legalMoves: BoardHelper.determineLegalMoves(this.state.board, this.state.activePlayer), ...this.state}))
  }
  private changeTurns() {
    this.state.activePlayer = this.state.players.find(player => player.id !== this.state.activePlayer.id)!
  }
  private getFreshState(): GameState {
    const players = PlayerHelper.createPlayers()
    const state = {
        board: {squares: BoardHelper.createFreshSquares(this.env.width, this.env.height, players)},
        players,
        activePlayer: players[0]
    }
    return state
  }
}
