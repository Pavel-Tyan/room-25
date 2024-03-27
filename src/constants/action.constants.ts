export enum GameAction {
    Peek,
    Enter,
    Push,
    Control,
    Unknown,
}

export type RoomClickHandler =
    | (() => void)
    | ((roomIndex: number, playerNumber: number, neighbourRooms: number[]) => void)
    | ((
          roomIndex: number,
          activePlayerNumber: number,
          passivePlayerNumber: number,
          neighbourRooms: number[]
      ) => void);
