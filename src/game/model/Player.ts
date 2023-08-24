export interface Player {
    id: boolean,
    name: string,
    victor: boolean
}

export class PlayerHelper {
    static createPlayers(): Player[] {
        return [this.createPlayer(true, "Green"), this.createPlayer(false, "Purple")]
    }
    static createPlayer(id: boolean, name: string): Player {
        return {
            id,
            name,
            victor: false
        }
    }
}