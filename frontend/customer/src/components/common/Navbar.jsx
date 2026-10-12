import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCustomerStore } from '../../store/useCustomerStore';

const menuSections = [
  { label: 'Home', to: '/' },
  {
    label: 'Product',
    items: [
      'Lal Kitab Amrit',
      'Mantra Upchar',
      { label: 'Yantra', children: ['Execlusive Yantra', 'Rashi Yantra', 'Nakshatra Yantra'] },
      { label: 'Gemstones', children: ['Standard Gemstones', 'Premium Gemstones'] },
      {
        label: 'Rudraksha',
        children: [
          { label: 'Rudraksha Beads', children: Array.from({ length: 14 }, (_, mukhi) => `${mukhi} Mukhi`) },
          'Rudraksha Bracelet',
          'Rudraksha Pendant',
        ],
      },
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
    label: 'Stones',
    items: [
      { label: 'Pyrite', to: '/pyrite' },
      { label: 'Garnet', to: '/garnet' },
      { label: 'Citrine', to: '/citrine' },
      { label: 'Tiger Eye', to: '/tiger-eye' },
      { label: 'Amethyst', to: '/amethyst' },
      { label: 'Selenite', to: '/selenite' },
      { label: 'Rose Quartz', to: '/rose-quartz' },
      { label: 'Lapis Lazuli', to: '/lapis-lazuli' },
    ],
  },
  {
    label: 'Remedies',
    items: [
      { label: 'Lal Kitab Remedies', to: '/lal-kitab' },
    ],
  },
  { label: 'About', to: '/about' },
  { label: 'Contact us', to: '/#contact-us' },
];

const menuLink = (item) => {
  if (item === 'Lal Kitab Amrit') return '/lal-kitab';
  if (item === 'Soap') return '/soap';
  if (item === 'Dhoop') return '/dhoop';
  if (item === 'Gemstones') return '/gemstone';
  if (item === 'Standard Gemstones') return '/gemstone?quality=Standard';
  if (item === 'Premium Gemstones') return '/gemstone?quality=Premium';
  if (item === 'Rudraksha') return '/rudraksha';
  if (item === 'Mantra Upchar') return '/mantra-upchar';
  const mukhiMatch = item.match(/^(\d+)\s+Mukhi$/);
  if (mukhiMatch) return `/rudraksha?category=beads&mukhi=${mukhiMatch[1]}`;
  if (item === 'Rudraksha Beads') return '/rudraksha?category=beads';
  if (item === 'Rudraksha Bracelet') return '/rudraksha?category=bracelet';
  if (item === 'Rudraksha Pendant') return '/rudraksha?category=pendant';
  return `/products?category=${encodeURIComponent(item)}`;
};

const menuItemLink = (item) => item.to || menuLink(item.label || item);
const menuItemLabel = (item) => (typeof item === 'string' ? item : item.label);
const menuGroupClasses = ['group/menu-level-0', 'group/menu-level-1', 'group/menu-level-2'];
const submenuVisibilityClasses = [
  'group-hover/menu-level-0:block group-focus-within/menu-level-0:block',
  'group-hover/menu-level-1:block group-focus-within/menu-level-1:block',
  'group-hover/menu-level-2:block group-focus-within/menu-level-2:block',
];

const renderMenuItem = (item, depth = 0) => {
  const label = menuItemLabel(item);
  const to = menuItemLink(item);

  if (!item.children) {
    return <Link key={label} to={to} className={dropdownItem}>{label}</Link>;
  }

  return (
    <div key={label} className={`${menuGroupClasses[depth]} relative`}>
      <Link to={to} className={`${dropdownItem} flex items-center justify-between gap-2 group-hover:bg-amber-50/70 group-hover:text-[#a87500]`}>
        {label}
        <Chevron className="-rotate-90 opacity-60" />
      </Link>
      <div className={`absolute left-full top-0 hidden w-56 pl-2 ${submenuVisibilityClasses[depth]}`}>
        <div className={`${dropdownPanel} ${label === 'Rudraksha Beads' ? 'grid grid-cols-2 gap-x-1' : ''}`}>
          {item.children.map((child) => renderMenuItem(child, depth + 1))}
        </div>
      </div>
    </div>
  );
};

const flattenMenuItems = (items) => items.flatMap((item) => {
  if (typeof item === 'string') {
    return [{ label: item, to: menuLink(item) }];
  }
  return [
    { label: item.label, to: menuItemLink(item) },
    ...flattenMenuItems(item.children || []),
  ];
});

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
const dropdownPanel = 'rounded-none border border-slate-200/80 bg-white p-2 shadow-[0_18px_40px_-12px_rgba(15,23,42,0.22)] [animation:nav-pop_160ms_ease-out]';
const iconButton = 'flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all duration-200 group-hover:border-[#f3c969] group-hover:bg-amber-50/60 group-hover:text-[#a87500]';
const iconLabel = 'hidden overflow-hidden max-w-0 text-[13px] font-semibold opacity-0 transition-all duration-200 group-hover:opacity-100 sm:inline-block';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const { isAuthenticated } = useAuth();
  const cartCount = useCustomerStore((state) => state.cart.length);

  const accountLabel = isAuthenticated ? 'Profile' : 'Login';
  const accountRoute = isAuthenticated ? '/orders' : '/login';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white text-slate-900 shadow-[0_4px_16px_-12px_rgba(15,23,42,0.2)]">
      <style>{'@keyframes nav-pop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'}</style>
      <div className="mx-auto flex min-h-[68px] max-w-[1440px] items-center gap-3 px-4 sm:px-8 lg:gap-6">
        <Link to="/" aria-label="Astro Vastu Bazar home" className="shrink-0 text-[1.2rem] font-bold tracking-[-0.045em] text-slate-900 sm:text-[1.45rem]">
          astrovastubazar<span className="text-[#d39e25]">.</span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-2 xl:flex 2xl:gap-4" onMouseLeave={() => setActiveMenu(null)}>
          {menuSections.map((section, index) => (
            <div
              key={section.label}
              className="relative"
              onMouseEnter={() => section.items && setActiveMenu(index)}
              onFocus={() => section.items && setActiveMenu(index)}
            >
              {section.items ? (
                <>
                  <button
                    type="button"
                    className={`relative flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2.5 text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9b75e] focus-visible:ring-offset-2 ${activeMenu === index ? 'text-[#946b13]' : 'text-slate-700 hover:text-[#946b13]'}`}
                    onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                    aria-expanded={activeMenu === index}
                  >
                    {section.label}
                    <Chevron className={`transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''}`} />
                    <span aria-hidden="true" className={`absolute inset-x-2 bottom-0 h-0.5 origin-left rounded-full bg-[#c69a32] transition-transform duration-200 ${activeMenu === index ? 'scale-x-100' : 'scale-x-0'}`} />
                  </button>
                  {activeMenu === index && (
                    <div className="absolute left-0 top-full z-40 w-60 pt-2">
                      <div className={dropdownPanel}>
                        {section.items.map((item) => renderMenuItem(item))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={section.to}
                  className="block whitespace-nowrap rounded-md px-2.5 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:text-[#946b13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9b75e] focus-visible:ring-offset-2"
                >
                  {section.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden h-10 w-[210px] shrink-0 items-center rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-400 transition-colors focus-within:border-[#c69a32] focus-within:bg-white xl:flex">
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
          <Link to="/cart" className="group flex items-center gap-2 text-slate-700 transition-colors hover:text-[#a87500]" aria-label={`Cart${cartCount ? `, ${cartCount} items` : ''}`}>
            <span className={`${iconButton} relative`}>
              <BagIcon />
              <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#d39e25] px-1 text-[10px] font-bold text-white ring-2 ring-white">{cartCount}</span>
            </span>
            <span className={`${iconLabel} group-hover:max-w-[80px]`}>Cart</span>
          </Link>
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:border-[#d9b75e] hover:text-[#946b13] xl:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><MenuIcon open={menuOpen} /></button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-[0_16px_24px_-24px_rgba(15,23,42,0.4)] xl:hidden sm:px-8">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-4 flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500 focus-within:border-[#c69a32] focus-within:bg-white">
              <SearchIcon className="mr-2.5 h-[17px] w-[17px] text-[#a87500]" />
              <input aria-label="Mobile search products" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search gems and birthstones" />
            </div>
            <nav aria-label="Main navigation" className="divide-y divide-slate-100">
              {menuSections.map((section, index) => section.items ? (
                <div key={section.label} className="py-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-slate-800 transition-colors hover:text-[#946b13]"
                    onClick={() => setMobileMenu(mobileMenu === index ? null : index)}
                    aria-expanded={mobileMenu === index}
                  >
                    {section.label}
                    <Chevron className={`transition-transform duration-200 ${mobileMenu === index ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileMenu === index && (
                    <div className="grid grid-cols-2 gap-2 pb-3 sm:grid-cols-3">
                      {flattenMenuItems(section.items).map((item) => (
                        <Link
                          key={`${item.label}-${item.to}`}
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className="rounded-lg bg-slate-50 px-3 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-amber-50 hover:text-[#946b13]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={section.label} to={section.to} onClick={() => setMenuOpen(false)} className="block py-3 text-sm font-semibold text-slate-800 transition-colors hover:text-[#946b13]">
                  {section.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;