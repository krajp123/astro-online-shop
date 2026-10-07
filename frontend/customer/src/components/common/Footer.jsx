import { Link } from 'react-router-dom';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/products' },
  { label: 'Contact Us', to: '/#contact-us' },
  { label: 'Our Services', to: '/#services' },
];

const astroStoreLinks = [
  { label: 'Gemstone', to: '/products?category=Gemstone' },
  { label: 'Yantra', to: '/products?category=Yantra' },
  { label: 'Lal Kitab Yantra', to: '/products?category=Lal%20Kitab%20Yantra' },
  { label: 'Mantra Upchar Potli', to: '/mantra-upchar' },
  { label: 'Shop', to: '/products' },
  { label: 'Dhoop', to: '/products?category=Dhoop' },
];

const infoLinks = [
  { label: 'Disclaimer', to: '/products' },
  { label: 'Terms & Condition', to: '/products' },
  { label: 'Privacy Policy', to: '/products' },
  { label: 'Cancel & Return Policy', to: '/products' },
  { label: 'Shipping Policy', to: '/products' },
  { label: 'Indemnification', to: '/products' },
];

const Footer = ({ className = 'mt-20' }) => {
  return (
    <footer className={`${className} border-t border-[#201b3a]/10 bg-[#f3efe9] text-slate-900`}>
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <p className="text-xl font-bold tracking-normal">astrovastubazar<span className="text-[#f3c969]">.</span></p>
          <p className="mt-3 max-w-xs text-[13px] leading-5 text-slate-700 sm:text-sm">Gems chosen with intention for your cosmic journey.</p>
          <div className="mt-5 flex items-center gap-3 text-slate-600" aria-label="Social media">
            <span role="img" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201b3a]/10 bg-white/70 shadow-sm transition-colors hover:border-[#f3c969] hover:bg-amber-50">
              <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden="true">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0" y1="32" x2="32" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFDC80" />
                    <stop offset=".35" stopColor="#F77737" />
                    <stop offset=".68" stopColor="#E1306C" />
                    <stop offset="1" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#instagram-gradient)" />
                <rect x="8" y="8" width="16" height="16" rx="5" fill="none" stroke="white" strokeWidth="2.2" />
                <circle cx="16" cy="16" r="4" fill="none" stroke="white" strokeWidth="2.2" />
                <circle cx="22" cy="10" r="1.5" fill="white" />
              </svg>
            </span>
            <span role="img" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201b3a]/10 bg-white/70 shadow-sm transition-colors hover:border-[#f3c969] hover:bg-amber-50">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                <circle cx="12" cy="12" r="11" fill="#0866FF" />
                <path fill="white" d="M13.45 20v-7.27h2.44l.37-2.84h-2.81V8.08c0-.82.23-1.38 1.41-1.38h1.5V4.16c-.26-.04-1.16-.11-2.2-.11-2.18 0-3.67 1.33-3.67 3.78v2.06H8.03v2.84h2.46V20h2.96Z" />
              </svg>
            </span>
            <span role="img" aria-label="YouTube" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201b3a]/10 bg-white/70 shadow-sm transition-colors hover:border-[#f3c969] hover:bg-amber-50">
              <svg viewBox="0 0 28 20" className="h-6 w-7" aria-hidden="true">
                <rect width="28" height="20" rx="5" fill="#FF0033" />
                <path d="M11 5.5 19 10l-8 4.5v-9Z" fill="white" />
              </svg>
            </span>
            <span role="img" aria-label="WhatsApp" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#201b3a]/10 bg-white/70 text-[#25D366] shadow-sm transition-colors hover:border-[#25D366] hover:bg-green-50">
              <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
                <path
                  d="M12 2a9.55 9.55 0 0 0-8.2 14.45L2.5 21.5l5.2-1.36A9.55 9.55 0 1 0 12 2Z"
                  fill="#25D366"
                />
                <path
                  d="M8.1 6.9c.2-.45.42-.46.66-.47h.57c.18 0 .38.08.48.31l.77 1.8c.09.22.07.39-.07.58l-.58.7c-.15.17-.18.35-.05.56a8 8 0 0 0 2.32 2.32c.21.12.39.1.55-.07l.7-.82c.16-.19.36-.24.59-.14l1.69.8c.24.12.36.28.35.5-.04.56-.29 1.39-.86 1.86-.55.46-1.27.65-2.04.47-1.18-.28-2.62-.96-4.06-2.34-1.25-1.19-2.14-2.66-2.44-3.74-.31-1.11-.02-1.85.54-2.31Z"
                  fill="white"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#bd850f] sm:text-[13px]">Quick Links</p>
          <div className="space-y-2 text-[13px] text-slate-700 sm:text-sm">
            {quickLinks.map(({ label, to }) => (
              <Link key={label} className="block transition hover:text-[#a87500]" to={to}>{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#bd850f] sm:text-[13px]">Astrostore</p>
          <div className="space-y-2 text-[13px] text-slate-700 sm:text-sm">
            {astroStoreLinks.map(({ label, to }) => (
              <Link key={label} className="block transition hover:text-[#a87500]" to={to}>{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#bd850f] sm:text-[13px]">Information</p>
          <div className="space-y-2 text-[13px] text-slate-700 sm:text-sm">
            {infoLinks.map(({ label, to }) => (
              <Link key={label} className="block transition hover:text-[#a87500]" to={to}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#f3efe9]">
        <div className="mx-auto flex max-w-[1440px] justify-center px-4 py-4 text-center text-xs text-slate-700 sm:px-8 sm:text-[13px]">
          <p>© 2026 astrovastubazar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
