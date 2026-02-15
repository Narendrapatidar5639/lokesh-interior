
import { Outlet } from 'react-router';
import { Header } from "./Header";

import { Footer } from './Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Header />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
