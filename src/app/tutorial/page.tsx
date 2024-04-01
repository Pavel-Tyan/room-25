'use client';
import { Tutorial } from '@/components/Tutorial/Tutorial';
import StoreProvider from '@/redux/StoreProvider';

export default function Home() {
    return (
        <StoreProvider>
            <Tutorial />
        </StoreProvider>
    );
}
