import type { Metadata } from 'next';
import { Play } from 'next/font/google';
import '../styles/globals.css';
import styles from './layout.module.css';
import classNames from 'classnames';

const play = Play({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Room 25',
    description: 'Browser version of the board game Room 25.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Нужно будет поменять язык
    return (
        <html lang='ru'>
            <body className={classNames(play.className, styles.layout)}>{children}</body>
        </html>
    );
}
