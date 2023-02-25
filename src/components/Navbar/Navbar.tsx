import Cart from '../Cart';
import Search from '../Icons/Search';
import Menu from './Menu';

export default function Navbar() {
  return (
    <nav className="py-3.5 sm:py-5 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-700 text-white flex justify-around px-3 space-x-4">
      <div className="flex items-center space-x-3.5 md:space-x-8">
        <Menu />
        <h1 className="text-2xl md:text-5xl">KAV</h1>
        <form className="flex relative md:ml-14">
          <input
            type="search"
            className="block w-full md:w-[30vw] py-1.5 px-1 md:py-3 md:px-4 text-sm placeholder-black text-gray-900 rounded-l-md bg-gray-50"
            placeholder="Search Mockups, Logos..."
            required
          />
          <button
            type="submit"
            className="text-white bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md text-sm px-1 py-1 md:px-4 md:py-2"
          >
            <Search className="h-7 w-7 text-black" />
          </button>
        </form>
      </div>
      <Cart />
    </nav>
  );
}
