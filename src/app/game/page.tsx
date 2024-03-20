'use client';

import { Game } from '@/components/Game/Game';
import { Navbar } from '@/components/Navbar/Navbar';
import StoreProvider from '@/redux/StoreProvider';

export default function Home() {
    return (
        <StoreProvider>
            <Navbar />
            <Game />
        </StoreProvider>
    );
}
