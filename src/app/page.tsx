import { Menu } from '@/components/Menu/Menu';
import StoreProvider from '@/redux/StoreProvider';

export default function Home() {
    return (
        <StoreProvider>
            <Menu />
        </StoreProvider>
    );
}
