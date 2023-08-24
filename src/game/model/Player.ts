export interface Player {
    id: boolean,
    name: string,
    victor: boolean
}

export class PlayerHelper {
    static createPlayers(): Player[] {
        return [this.createPlayer(true, "Player One"), this.createPlayer(false, "Player Two")]
    }
    static createPlayer(id: boolean, name: string): Player {
        return {
            id,
            name,
            victor: false
        }
    }
}