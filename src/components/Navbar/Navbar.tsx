import Cart from '../Cart';
import Menu from './Menu';
import Search from './Search';

export default function Navbar() {
  return (
    <nav className="py-3.5 sm:py-5 bg-gradient-to-r from-[#0daac5] via-blue-[#0ea8c4] to-blue-600 text-white flex justify-between px-4 sm:px-10 lg:px-28 xl:px-16 2xl:px-60 space-x-4">
      <div className="flex items-center space-x-1.5 md:space-x-8">
        <Menu />
        <h1 className="text-2xl md:text-5xl">KAV</h1>
        <Search />
      </div>
      <Cart />
    </nav>
  );
}
