import { CartProvider } from '@/context/CartContext';
import Navbar from '@/app/components/Navbar'; // Import the Navbar component
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar /> {/* Add the Navbar component here */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}