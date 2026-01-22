import { Montserrat } from 'next/font/google';

// Primary font for Liquid Glass UI
// Used throughout the interface for all text
export const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

// Export font variables for Tailwind/CSS usage
export const fontVariables = `${montserrat.variable}`;
