import { Link } from 'react-router-dom';

const AboutPage = () => (
  <main className="min-h-[60vh] bg-[#f5f1eb]">
    <section className="bg-[#201b3a] px-5 py-16 text-white sm:px-8 sm:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3c969]">About us</p>
        <h1 className="mt-3 font-serif text-3xl font-bold sm:text-4xl">Astrovastubazar</h1>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">
          We bring together gemstone collections, spiritual products, and astrology-inspired services to help you explore items and guidance connected to your personal journey.
        </p>
      </div>
    </section>

    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#201b3a]">Explore with intention</h2>
          <p className="mt-4 text-sm leading-7 text-[#5b5470]">
            Browse stones, jewellery, yantras, and other spiritual collections, or explore the astrology services and remedies available on our site.
          </p>
        </div>
        <div className="rounded-2xl border border-[#201b3a]/10 bg-white p-6 sm:p-8">
          <h2 className="font-serif text-xl font-bold text-[#201b3a]">How can we help?</h2>
          <p className="mt-3 text-sm leading-7 text-[#5b5470]">
            Visit our collections or get in touch with us through the contact form.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/gemstone"
              className="inline-flex items-center rounded-lg bg-[#4d001e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a0016]"
            >
              Browse stones
            </Link>
            <Link
              to="/#contact-us"
              className="inline-flex items-center rounded-lg border border-[#201b3a]/15 px-4 py-2.5 text-sm font-semibold text-[#201b3a] transition hover:border-[#4d001e]/40 hover:text-[#4d001e]"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default AboutPage;
