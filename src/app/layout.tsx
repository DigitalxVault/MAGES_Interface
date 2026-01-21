import type { Metadata } from 'next';
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
    <html lang="en">
      <body className="bg-bg-deep text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
