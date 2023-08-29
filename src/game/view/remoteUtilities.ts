import injector from "../../service/Injector.js";
import { UserService } from "../../service/UserService.js";
import { GameEvent } from "../model/GameEvent.js";

const isRemoteGame = (event: GameEvent) => {
  return event.players.some(player => Boolean(player.clientId))
}

const isRemoteTurnNext = async (
  event: GameEvent,
  userService: UserService = injector.getUserService()
) => {
    const atLeastOnePlayerIsRemote = isRemoteGame(event)
    const thisMachineIsNotActivePlayer = event.activePlayer.clientId !== await userService.getUserId()
    return atLeastOnePlayerIsRemote && thisMachineIsNotActivePlayer
};


export {isRemoteTurnNext, isRemoteGame}
