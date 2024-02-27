export type CardInfo = {
    alt: string;
    path: string;
    description: string;
};

export const cardsInfoRussian: CardInfo[] = [
    {
        alt: 'Иконка центральной комнаты',
        path: './rooms/arrows.svg',
        description:
            'Центральная комната. Это комната, в которой все заключённые начинают игру. Находясь здесь, вы можете выбрать только действия «Заглянуть» и «Передвинуться». Двигать (использовать действие «Контролировать») эту комнату запрещено.',
    },
    {
        alt: 'Иконка комнаты с кислотной баней',
        path: './rooms/acid.svg',
        description:
            'Кислотная баня. Как только двое персонажей оказываются в этой комнате, тот из них, кто зашёл первым, умирает.',
    },
    {
        alt: 'Иконка комнаты наблюдения',
        path: './rooms/binoculars.svg',
        description: 'Комната наблюдения. Можно посмотреть любую закрытую комнату.',
    },
    {
        alt: 'Иконка затопленной комнаты',
        path: './rooms/droplet.svg',
        description:
            'Затопленная комната. Как только персонаж заходит в эту комнату, она закрывается изнутри. Никто не может войти в неё до конца игры. Если после второго действия следующего раунда персонаж из неё не вышел, он умирает.',
    },
    {
        alt: 'Иконка темной комнаты',
        path: './rooms/eye.svg',
        description:
            'Темная комната. Находясь в этой комнате, вы не можете совершать действие «Заглянуть».',
    },
    {
        alt: 'Иконка комнаты контроля',
        path: './rooms/gear.svg',
        description:
            'Комната контроля. Передвиньте любой ряд комнат (кроме среднего) в любом направлении по вашему выбору (как при совершении действия «Контролировать»).',
    },
    {
        alt: 'Иконка комнаты с тюрьмой',
        path: './rooms/prison.svg',
        description:
            'Тюрьма. Выбраться из комнаты можно только к другому персонажу в соседней комнате или в Центральную комнату, если она находится по соседству.',
    },
    {
        alt: 'Иконка комнаты смерти',
        path: './rooms/skull.svg',
        description:
            'Комната смерти. Оказавшись в этой комнате, ваш персонаж мгновенно умирает.',
    },
    {
        alt: 'Иконка пустой комнаты',
        path: './rooms/smile.svg',
        description: 'Пустая комната. Обычная комната без дополнительных эффектов.',
    },
    {
        alt: 'Иконка комнаты с морозилкой',
        path: './rooms/snowflake.svg',
        description:
            'Морозилка. Находясь в этой комнате, можно запрограммировать только одно действие во время фазы программирования.',
    },
    {
        alt: 'Иконка комнаты с водоворотом',
        path: './rooms/tornado.svg',
        description: 'Водоворот. Перемещает персонажа в центральную комнату.',
    },
    {
        alt: 'Иконка комнаты с ловушкой',
        path: './rooms/trap.svg',
        description:
            'Ловушка. Следующим действием нужно покинуть комнату, иначе вас убьют.',
    },
    {
        alt: 'Иконка комнаты иллюзий',
        path: './rooms/trick.svg',
        description:
            'Комната иллюзий. Персонаж перемещается в любую закрытую комнату на выбор и сразу применяет ее эффект. Перемещённая комната Иллюзий остаётся открытой до конца игры.',
    },
    {
        alt: 'Иконка комнаты-близняшки',
        path: './rooms/twins.svg',
        description:
            '⎯ Комната-Близняшка. Если вторая комната-близняшка уже открыта, то персонаж перемещается в неё. Если нет, ничего не происходит.',
    },
    {
        alt: 'Иконка комнаты 25',
        path: './rooms/25.svg',
        description:
            'Комната 25. Это комната выхода. Когда в ней собираются все заключённые, один из них должен передвинуть её к выходу, используя действие контролировать.',
    },
];

export const cardsInfoEnglish: CardInfo[] = [
    {
        alt: 'Central room icon',
        path: './rooms/arrows.svg',
        description:
            'Central room. This is the room where all prisoners start the game. While here, you can only select the “Peek” and “Move” actions. It is prohibited to move (use the “Control” action) this room.',
    },
    {
        alt: 'Acid bath room icon',
        path: './rooms/acid.svg',
        description:
            'Acid bath. As soon as two characters are in this room, the one who entered first dies.',
    },
    {
        alt: 'Surveillance room icon',
        path: './rooms/binoculars.svg',
        description: 'Observation room. You can view any closed room.',
    },
    {
        alt: 'Flooded room icon',
        path: './rooms/droplet.svg',
        description:
            'Flooded room. As soon as a character enters this room, it is locked from the inside. No one can enter it until the end of the game. If after the second action of the next round the character does not exit, he dies.',
    },
    {
        alt: 'Dark room icon',
        path: './rooms/eye.svg',
        description: 'A dark room. While in this room, you cannot take the Peek action.',
    },
    {
        alt: 'Control room icon',
        path: './rooms/gear.svg',
        description:
            'Control room. Move any row of rooms (except the middle one) in any direction of your choice (as when taking the Control action).',
    },
    {
        alt: 'Prison room icon',
        path: './rooms/prison.svg',
        description:
            'Jail. You can only get out of the room to another character in the next room or to the Central Room, if it is located next door.',
    },
    {
        alt: 'Death room icon',
        path: './rooms/skull.svg',
        description: 'Death room. Once in this room, your character dies instantly.',
    },
    {
        alt: 'Empty room icon',
        path: './rooms/smile.svg',
        description: 'Empty room. An ordinary room without additional effects.',
    },
    {
        alt: 'Freezer room icon',
        path: './rooms/snowflake.svg',
        description:
            'Freezer. While in this room, you can only program one action during the programming phase.',
    },
    {
        alt: 'Whirlpool room icon',
        path: './rooms/tornado.svg',
        description: 'Whirlpool. Moves the character to the central room.',
    },
    {
        alt: 'Trap room icon',
        path: './rooms/trap.svg',
        description:
            'Trap. The next action is to leave the room, otherwise you will be killed.',
    },
    {
        alt: 'Illusion room icon',
        path: './rooms/trick.svg',
        description:
            'Room of illusions. The character moves to any closed room of his choice and immediately applies its effect. The moved Illusion room remains open until the end of the game.',
    },
    {
        alt: 'Twin room icon',
        path: './rooms/twins.svg',
        description:
            'Twin Room. If the second twin room is already open, then the character moves into it. If not, nothing happens.',
    },
    {
        alt: 'Room 25 icon',
        path: './rooms/25.svg',
        description:
            'Room 25. This is the exit room. When all the prisoners are gathered in it, one of them must move it to the exit using the control action.',
    },
];
