'use client';

import { Navbar } from '@/components/Navbar/Navbar';
import { Languages } from '@/constants/languages.constants';
import StoreProvider from '@/redux/StoreProvider';

export default function Home() {
    return (
        <StoreProvider>
            <Navbar language={Languages.English} />
        </StoreProvider>
    );
}
