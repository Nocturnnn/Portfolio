import type {Metadata} from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Karzone | Luxury Exotic Car Collection',
  description: 'Rent the luxury. Own the thrill. Explore our curated collection of exotic sports cars and luxury sedans.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body suppressHydrationWarning className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
