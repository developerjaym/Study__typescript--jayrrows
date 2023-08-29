import { Coordinate } from "../model/Coordinate.js";

export enum UserEventType {
    SELECT,
    UNDO,
    END_GAME
}

export interface UserEvent {
    type: UserEventType,
    coordinate?: Coordinate
}