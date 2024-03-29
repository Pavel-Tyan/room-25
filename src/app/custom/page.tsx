'use client';

import { Navbar } from '@/components/Navbar/Navbar';
import { SelectRooms } from '@/components/SelectRooms/SelectRooms';
import StoreProvider from '@/redux/StoreProvider';

export default function Home() {
    return (
        <StoreProvider>
            <SelectRooms />
        </StoreProvider>
    );
}
