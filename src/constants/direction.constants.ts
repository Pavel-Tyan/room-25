import { getRandomInt } from '@/helpers/helpers';

export enum Direction {
    UpperRightCorner,
    UpperLeftCorner,
    DownRightCorner,
    DownLeftCorner,
}

export const getRandomDirections = (): Direction[] => {
    const orderedDirections: Direction[] = [
        Direction.UpperRightCorner,
        Direction.UpperLeftCorner,
        Direction.DownRightCorner,
        Direction.DownLeftCorner,
    ];
    const hasChoosen: boolean[] = Array(4).fill(false);

    const randomDirections = [];

    for (let i = 0; i < orderedDirections.length; i++) {
        let randomIndex = getRandomInt(0, 4);

        while (hasChoosen[randomIndex]) {
            randomIndex = getRandomInt(0, 4);
        }

        randomDirections.push(orderedDirections[i]);
        hasChoosen[randomIndex] = true;
    }

    return randomDirections;
};
