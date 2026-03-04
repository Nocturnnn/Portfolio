import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Karzone | Luxury Exotic Car Collection',
  description:
    'Rent the luxury. Own the thrill. Explore our curated collection of exotic sports cars and luxury sedans.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
