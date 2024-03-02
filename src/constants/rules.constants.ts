export type Rules = {
    description: string;
    actionsInfo: {
        path: string;
        description: string;
        alt: string;
    }[];
};

export let rulesRussian: Rules = {
    description: `Игровое поле состоит из 25 карточек комнат, расположенных 5 на 5 в виде квадрата.
Комната может быть открытой (игроки видят ее эффект), либо закрытой (эффект комнаты
неизвестен). Вначале игры все комнаты, кроме комнаты, которая расположена по центру
(это центральная комната) закрыты. Всего 3 участника: 2 бота и сам игрок. Каждому
участнику дается 2 персонажа. Все персонажи расположены в центральной комнате. Чтобы
сбежать из тюрьмы, нужно найти комнату 25 и передвинуть ее к одной из зон выхода. Зона
выхода – это комната, расположенная в углу вместе с ее соседними комнатами. Соседние
комнаты текущей комнаты – это все ближайшие комнаты, кроме тех, которые расположены
по диагонали от текущей. Комнаты расположены случайным образом, однако комната
управления и комната 25 должны быть в зонах выхода. Победителем считается игрок, чьи
персонажи успели спастись первыми или уничтожили всех соперников.
Игра состоит из 10 раундов. Каждый раунд содержит в себе 3 фазы. 
Первая фаза - программирование. Каждый игрок выбирает 2 действия для 2 
своих персонажей. Далее игроки по очереди выполняют действия. После порядок хода игроков 
сдвигается на 1 игрока. Игрок, который ходил первым, теперь ходит последним. 
Игрок, который ходил вторым, теперь ходит
первым и т.д.`,
    actionsInfo: [
        {
            path: './actions/eye.svg',
            description: `Заглянуть. Игрок выбирает одну из соседних комнат и смотрит ее эффект, при этом
остальные игроки не видят эффект этой комнаты. После выполнения действия
игрок больше не видит эффект комнаты, т. е. она снова становится закрытой.`,
            alt: 'Иконка действия "Заглянуть"',
        },
        {
            path: './actions/enter.svg',
            description: `Войти. Персонаж перемещается в одну из соседних комнат. После этого комната
становится открытой на все оставшиеся время игры. Эффект комнаты сразу
применяется на вошедшего в нее персонажа.`,
            alt: 'Иконка действия "Войти"',
        },
        {
            path: './actions/push.svg',
            description: `Толкнуть. Переместите другого персонажа, с которым вы в одной комнате в одну
из соседних комнат. Этот персонаж сразу же испытает на себе эффект соседней
комнаты. Если комната была закрыта, то она открывается. Однако нельзя
выталкивать персонажа из центральной комнаты.`,
            alt: 'Иконка действия "Толкнуть"',
        },
        {
            path: './actions/control.svg',
            description: `Контролировать. Игрок передвигает ряд с комнатой, в которой находится его
персонаж. Весь ряд смещается на 1 комнату в выбранном направлении. Все
персонажи передвигаются вместе с комнатами. Комната в конце ряда, оказавшаяся
за пределами поля, перемещается в противоположный конец передвинутого ряда.
Но нельзя двигать ряды, в которых есть центральная комната.`,
            alt: 'Иконка действия "Контролировать"',
        },
    ],
};

export let rulesEnglish: Rules = {
    description: `The playing field consists of 25 room cards, arranged 5 by 5 in the form of a square.
The room can be open (players see its effect) or closed (room effect
unknown). At the beginning of the game, all rooms except the room located in the center
(this is the central room) are closed. There are 3 participants in total: 2 bots and the 
player himself. To each The participant is given 2 characters. All characters are 
located in the central room. To escape from prison, you need to find room 25 and move it to one of the exit areas. Zone
exit is a room located in the corner along with its neighboring rooms. The neighboring rooms 
of the current room are all the nearest rooms, except those located diagonally from 
the current one. The rooms are located randomly, however the room control and room 25 
should be in the exit areas. The winner is the player whose
the characters managed to escape first or destroyed all rivals.
The game consists of 10 rounds. Each round contains 3 phases.
The first phase is programming. Each player chooses 2 actions for 2
their characters. Next, players take turns performing actions. After the player's turn order
moves by 1 player. The player who went first now goes last.
The player who went second now goes
first, etc.`,
    actionsInfo: [
        {
            path: './actions/eye.svg',
            description: `Peek. The player selects one of the neighboring rooms and watches its effect, while
other players do not see the effect of this room. After completing the action
The player no longer sees the effect of the room, i.e. it becomes closed again.`,
            alt: '"Peek" action icon',
        },
        {
            path: './actions/enter.svg',
            description: `Enter. Персонаж перемещается в одну из соседних комнат. После этого комната
становится открытой на все оставшиеся время игры. Эффект комнаты сразу
применяется на вошедшего в нее персонажа.`,
            alt: '"Enter" action icon',
        },
        {
            path: './actions/push.svg',
            description: `Push. Move another character you are in the same room with into the same room
from neighboring rooms. This character will immediately experience the effect of the neighboring
rooms. If the room was closed, it opens. However, it is impossible
push the character out of the central room.`,
            alt: '"Push" action icon',
        },
        {
            path: './actions/control.svg',
            description: `Control. The player moves the row with the room in which he is located
character. The entire row is shifted by 1 room in the selected direction. All
characters move along with the rooms. The room at the end of the row, which turned out to be
out of bounds, moves to the opposite end of the moved row.
But you cannot move rows that have a central room.`,
            alt: '"Control" action icon',
        },
    ],
};
