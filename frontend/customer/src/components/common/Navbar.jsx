import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const menuSections = [
  {
    label: 'Product',
    items: ['Gemstones', 'Pendants', 'Rudraksha', 'Bracelets', 'Mala & rosaries'],
  },
  {
    label: 'Shop by purpose',
    items: ['Money', 'Love', 'Health', 'Rashi', "Men's zodiac collection", "Women's zodiac collection", 'Protection'],
  },
  {
    label: 'Shop by planets',
    items: ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'],
  },
  {
    label: 'Shop by mulank',
    items: ['Mulank 1', 'Mulank 2', 'Mulank 3', 'Mulank 4', 'Mulank 5', 'Mulank 6', 'Mulank 7', 'Mulank 8', 'Mulank 9'],
  },
  {
    label: 'Siddh collection',
    items: ['Siddh gemstones', 'Energised pendants', 'Siddh yantra'],
  },
  {
    label: 'Spiritual jewellery',
    items: ["Men's bracelets", "Women's bracelets", 'Couple bracelets'],
  },
  {
    label: 'Vastu',
    items: ['Vastu tortoise', 'Pyramids', 'Vastu stones', 'Towers & tumbles', 'Crystal dome trees'],
  },
];

const menuLink = (item) => `/products?category=${encodeURIComponent(item)}`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const { isAuthenticated } = useAuth();

  const accountLabel = isAuthenticated ? 'Profile' : 'Login';
  const accountRoute = isAuthenticated ? '/orders' : '/login';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white text-slate-900 shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
      <div className="mx-auto flex min-h-[66px] max-w-[1600px] items-center gap-3 px-4 sm:px-8 lg:gap-4">
        <Link to="/" aria-label="astrovastubazar home" className="mr-2 shrink-0 text-2xl font-bold tracking-normal text-slate-900">
          astrovastubazar<span className="text-[#d39e25]">.</span>
        </Link>

        <nav className="hidden min-w-0 max-w-[600px] flex-1 items-center justify-between gap-0 pr-2 xl:flex xl:pr-3 2xl:max-w-[800px]" onMouseLeave={() => setActiveMenu(null)}>
          {menuSections.map((section, index) => (
            <div key={section.label} className="relative" onMouseEnter={() => setActiveMenu(index)}>
              <button type="button" className={`flex items-center gap-1 whitespace-nowrap rounded-md px-1 py-2 text-[11px] font-bold tracking-normal transition-colors 2xl:px-2 2xl:text-[12px] ${activeMenu === index ? 'bg-amber-50 text-[#a87500]' : 'text-slate-700 hover:text-[#a87500]'}`} onClick={() => setActiveMenu(activeMenu === index ? null : index)} aria-expanded={activeMenu === index}>
                {section.label}<span className="text-[12px]">⌄</span>
              </button>
              {activeMenu === index && <div className="absolute left-0 top-full z-40 w-56 pt-3" onMouseEnter={() => setActiveMenu(index)}><div className="rounded-lg border border-slate-200 bg-white p-2 shadow-xl">{section.items.map((item) => <Link key={item} to={menuLink(item)} className="block whitespace-nowrap rounded-md px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-amber-50 hover:text-[#a87500]">{item}</Link>)}</div></div>}
            </div>
          ))}
        </nav>

        <div className="ml-2 hidden h-10 w-[180px] shrink-0 items-center rounded-md border border-slate-200 border-l-0 bg-slate-50 px-3 pl-4 text-sm text-slate-400 xl:flex 2xl:w-[220px] 2xl:pl-5">
          <span aria-hidden="true" className="mr-3 text-xl leading-none text-slate-500">⌕</span>
          <input aria-label="Search products" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search gems, pendants, birthstones..." />
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link to={accountRoute} className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]" aria-label={accountLabel}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg transition-colors group-hover:border-[#f3c969] group-hover:text-[#a87500]">👤</span>
            <span className="hidden overflow-hidden max-w-0 text-sm font-medium opacity-0 transition-all duration-200 group-hover:max-w-[90px] group-hover:opacity-100 sm:inline-block">{accountLabel}</span>
          </Link>
          <button className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]" aria-label="Wishlist">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg transition-colors group-hover:border-[#f3c969] group-hover:text-[#a87500]">♡</span>
            <span className="hidden overflow-hidden max-w-0 text-sm font-medium opacity-0 transition-all duration-200 group-hover:max-w-[80px] group-hover:opacity-100 sm:inline-block">Wishlist</span>
          </button>
          <Link to="/cart" className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition-colors group-hover:border-[#f3c969] group-hover:text-[#a87500]">🛒<span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#f3c969] px-1 text-[9px] font-bold text-[#172554]">0</span></span>
            <span className="hidden overflow-hidden max-w-0 text-sm font-medium opacity-0 transition-all duration-200 group-hover:max-w-[80px] group-hover:opacity-100 sm:inline-block">Cart</span>
          </Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-lg text-slate-700 xl:hidden" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? '×' : '☰'}</button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto border-t border-slate-100 px-4 py-3 text-[12px] font-bold tracking-normal text-slate-500 xl:hidden sm:px-8">
        {menuSections.map((section, index) => <button type="button" key={section.label} className={`shrink-0 whitespace-nowrap rounded-md px-3 py-2 ${mobileMenu === index ? 'bg-amber-50 text-[#a87500]' : ''}`} onClick={() => setMobileMenu(mobileMenu === index ? null : index)}>{section.label}</button>)}
      </div>

      {mobileMenu !== null && <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{menuSections[mobileMenu].items.map((item) => <Link key={item} to={menuLink(item)} className="rounded-md border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 hover:border-[#f3c969] hover:text-[#a87500]">{item}</Link>)}</div></div>}

      {menuOpen && <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden"><div className="mb-3 flex items-center rounded-md bg-slate-50 px-3 py-2.5 text-sm text-slate-500"><span className="mr-2 text-lg text-[#a87500]">⌕</span><input aria-label="Mobile search products" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search gems and birthstones" /></div><Link to="/orders" className="block border-b border-slate-100 py-3 text-sm font-bold text-slate-700">Profile & orders</Link><Link to="/cart" className="block py-3 text-sm font-bold text-slate-700">Wishlist & bag</Link></div>}
    </header>
  );
};

export default Navbar;
