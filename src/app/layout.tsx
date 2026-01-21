import type { Metadata } from 'next';
import { bebasNeue, oswald, rajdhani, inter } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'RT Lofi Immersive Interface',
  description: 'Board game night control panel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${oswald.variable} ${rajdhani.variable} ${inter.variable}`}
    >
      <body className="bg-bg-deep text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
