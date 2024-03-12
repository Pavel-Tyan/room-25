'use client';

import { Navbar } from '@/components/Navbar/Navbar';
import { Language } from '@/constants/language.constants';
import StoreProvider from '@/redux/StoreProvider';

export default function Home() {
    return (
        <StoreProvider>
            <Navbar language={Language.English} />
        </StoreProvider>
    );
}
