export const getRandomInt = (min: number, max: number): number => {
    // Диапазон - [min; max)
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};
