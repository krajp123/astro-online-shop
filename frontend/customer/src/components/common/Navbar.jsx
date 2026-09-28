import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const menuSections = [
  {
    label: 'Product',
    items: [
      'Lal Kitab Amrit',
      'Mantra Upchar',
      { label: 'Yantra', children: ['Execlusive Yantra', 'Rashi Yantra', 'Nakshatra Yantra'] },
      { label: 'Gemstones', children: ['Standard Gemstones', 'Premium Gemstones'] },
      { label: 'Rudraksha', children: ['1 Mukhi', '2 Mukhi ', '3 Mukhi', '4 Mukhi', '5 Mukhi', '6 Mukhi', '7 Mukhi', '8 Mukhi', '9 Mukhi'] },
      'Bracelets & Malas',
      'Karungali Malas',
      'Vastu',
      'Ring',
      'Pendant',
      'Soap',
      'Dhoop',
    ],
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

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const Chevron = ({ className = '' }) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={`h-3 w-3 ${className}`} aria-hidden="true">
    <path d="M5 7.5l5 5 5-5" />
  </svg>
);
const SearchIcon = ({ className = 'h-[18px] w-[18px]' }) => (
  <svg {...iconProps} className={className}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
);
const UserIcon = () => (
  <svg {...iconProps} className="h-[18px] w-[18px]"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>
);
const HeartIcon = () => (
  <svg {...iconProps} className="h-[18px] w-[18px]"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
);
const BagIcon = () => (
  <svg {...iconProps} className="h-[18px] w-[18px]"><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></svg>
);
const MenuIcon = ({ open }) => (
  <svg {...iconProps} className="h-5 w-5">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
);

const dropdownItem = 'block whitespace-nowrap rounded-lg px-3 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-amber-50/70 hover:text-[#a87500]';
const dropdownPanel = 'rounded-xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.22)] [animation:nav-pop_160ms_ease-out]';
const iconButton = 'flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 group-hover:border-[#f3c969] group-hover:bg-amber-50/60 group-hover:text-[#a87500]';
const iconLabel = 'hidden overflow-hidden max-w-0 text-[13px] font-semibold opacity-0 transition-all duration-200 group-hover:opacity-100 sm:inline-block';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const { isAuthenticated } = useAuth();

  const accountLabel = isAuthenticated ? 'Profile' : 'Login';
  const accountRoute = isAuthenticated ? '/orders' : '/login';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 text-slate-900 shadow-[0_1px_0_rgba(15,23,42,0.03),0_8px_24px_-12px_rgba(15,23,42,0.12)] backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <style>{'@keyframes nav-pop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'}</style>
      <div className="mx-auto flex min-h-[68px] max-w-[1600px] items-center gap-3 px-4 sm:px-8 lg:gap-4">
        <Link to="/" aria-label="astrovastubazar home" className="mr-3 shrink-0 text-[1.55rem] font-bold tracking-tight text-slate-900">
          astrovastubazar<span className="text-[#d39e25]">.</span>
        </Link>

        <nav className="hidden min-w-0 max-w-[600px] flex-1 items-center justify-between gap-0 pr-2 xl:flex xl:pr-3 2xl:max-w-[800px]" onMouseLeave={() => setActiveMenu(null)}>
          {menuSections.map((section, index) => (
            <div key={section.label} className="relative" onMouseEnter={() => setActiveMenu(index)}>
              <button type="button" className={`relative flex items-center gap-1 whitespace-nowrap px-1.5 py-2.5 text-[11px] font-semibold tracking-[0.01em] transition-colors 2xl:px-2.5 2xl:text-[12.5px] ${activeMenu === index ? 'text-[#a87500]' : 'text-slate-700 hover:text-[#a87500]'}`} onClick={() => setActiveMenu(activeMenu === index ? null : index)} aria-expanded={activeMenu === index}>
                {section.label}
                <Chevron className={`transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''}`} />
                <span aria-hidden="true" className={`absolute inset-x-1.5 bottom-0 h-0.5 origin-left rounded-full bg-[#d39e25] transition-transform duration-200 2xl:inset-x-2.5 ${activeMenu === index ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
              {activeMenu === index && (
                <div className="absolute left-0 top-full z-40 w-60 pt-2" onMouseEnter={() => setActiveMenu(index)}>
                  <div className={dropdownPanel}>
                    {section.items.map((item) => typeof item === 'string' ? (
                      <Link key={item} to={menuLink(item)} className={dropdownItem}>{item}</Link>
                    ) : (
                      <div key={item.label} className="group relative">
                        <Link to={menuLink(item.label)} className={`${dropdownItem} flex items-center justify-between gap-2 group-hover:bg-amber-50/70 group-hover:text-[#a87500]`}>
                          {item.label}
                          <Chevron className="-rotate-90 opacity-60" />
                        </Link>
                        <div className="absolute left-full top-0 hidden w-56 pl-2 group-hover:block">
                          <div className={dropdownPanel}>
                            {item.children.map((child) => <Link key={child} to={menuLink(child)} className={dropdownItem}>{child}</Link>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="ml-2 hidden h-10 w-[180px] shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400 transition-all duration-200 focus-within:border-[#d39e25] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(211,158,37,0.15)] xl:flex 2xl:w-[240px]">
          <SearchIcon className="mr-2.5 h-[17px] w-[17px] shrink-0 text-slate-400" />
          <input aria-label="Search products" className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search gems, pendants, birthstones..." />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4 xl:ml-0">
          <Link to={accountRoute} className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]" aria-label={accountLabel}>
            <span className={iconButton}><UserIcon /></span>
            <span className={`${iconLabel} group-hover:max-w-[90px]`}>{accountLabel}</span>
          </Link>
          <button className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]" aria-label="Wishlist">
            <span className={iconButton}><HeartIcon /></span>
            <span className={`${iconLabel} group-hover:max-w-[80px]`}>Wishlist</span>
          </button>
          <Link to="/cart" className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]" aria-label="Cart">
            <span className={`${iconButton} relative`}>
              <BagIcon />
              <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#d39e25] px-1 text-[10px] font-bold text-white ring-2 ring-white">0</span>
            </span>
            <span className={`${iconLabel} group-hover:max-w-[80px]`}>Cart</span>
          </Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#f3c969] hover:text-[#a87500] xl:hidden" aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}><MenuIcon open={menuOpen} /></button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto border-t border-slate-100 px-4 py-2.5 text-[12px] font-semibold tracking-normal text-slate-600 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:hidden sm:px-8">
        {menuSections.map((section, index) => <button type="button" key={section.label} className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 transition-colors ${mobileMenu === index ? 'border-[#f3c969] bg-amber-50 text-[#a87500]' : 'border-slate-200 bg-white hover:border-[#f3c969]'}`} onClick={() => setMobileMenu(mobileMenu === index ? null : index)}>{section.label}</button>)}
      </div>

      {mobileMenu !== null && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {menuSections[mobileMenu].items.flatMap((item) => (typeof item === 'string' ? [item] : [item.label, ...item.children])).map((item) => <Link key={item} to={menuLink(item)} className="rounded-lg border border-slate-200 px-3 py-3 text-xs font-semibold text-slate-600 transition-colors hover:border-[#f3c969] hover:bg-amber-50/60 hover:text-[#a87500]">{item}</Link>)}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 xl:hidden">
          <div className="mb-3 flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 focus-within:border-[#d39e25] focus-within:bg-white">
            <SearchIcon className="mr-2.5 h-[17px] w-[17px] text-[#a87500]" />
            <input aria-label="Mobile search products" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search gems and birthstones" />
          </div>
          <Link to="/orders" className="block border-b border-slate-100 py-3 text-sm font-semibold text-slate-700">Profile & orders</Link>
          <Link to="/cart" className="block py-3 text-sm font-semibold text-slate-700">Wishlist & bag</Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;