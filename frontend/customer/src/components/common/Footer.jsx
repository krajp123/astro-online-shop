import { Link } from 'react-router-dom';

const Footer = ({ className = 'mt-20' }) => {
  return (
    <footer className={`${className} border-t border-[#201b3a]/10 bg-[#f3efe9] text-slate-900`}>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-bold tracking-normal">astrovastubazar<span className="text-[#f3c969]">.</span></p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">Gems chosen with intention for your cosmic journey.</p>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#f3c969]">Discover</p>
          <div className="space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-[#a87500]" to="/products?category=Birthstones">Birthstones</Link>
            <Link className="block hover:text-[#a87500]" to="/products?category=Planetary%20gems">Planetary gems</Link>
            <Link className="block hover:text-[#a87500]" to="/products?category=Rudraksha">Rudraksha</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#f3c969]">Guidance</p>
          <div className="space-y-2 text-sm text-slate-600">
            <Link className="block hover:text-[#a87500]" to="/products?category=Find%20your%20gemstone">Find your gemstone</Link>
            <Link className="block hover:text-[#a87500]" to="/products?category=Certification">Certification</Link>
            <Link className="block hover:text-[#a87500]" to="/orders">Shipping & returns</Link>
          </div>
        </div>
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#f3c969]">Cosmic notes</p>
          <p className="mb-3 text-sm text-slate-500">New arrivals, planetary insights and stone stories.</p>
          <div className="flex rounded-full border border-[#201b3a]/10 bg-[#f7f3ee] p-1">
            <input aria-label="Email address" className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400" placeholder="Your email" />
            <button type="button" className="rounded-full bg-[#f3c969] px-4 py-2 text-xs font-bold text-[#172554]">Join</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
