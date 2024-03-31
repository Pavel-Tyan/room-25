export enum Room {
    CentralRoom,
    ObservationRoom,
    DarkRoom,
    ControlRoom,
    JailRoom,
    DeathRoom,
    EmptyRoom,
    FreezerRoom,
    WhirlpoolRoom,
    TrapRoom,
    IllusionRoom,
    TwinRoom,
    Room25,
}

// Этот тип нужен для того, чтобы при использовании map()
// у каждого элемента был уникальный ключ
export type RoomInfo = {
    room: Room;
    key: number;
};
