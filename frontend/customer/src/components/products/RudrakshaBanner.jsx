import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const rudrakshaMukhi = Array.from({ length: 13 }, (_, index) => {
  const mukhi = index + 1;
  return {
    mukhi,
    image: `/Rudraksha/${mukhi}%20${mukhi === 12 ? 'mukhi' : 'Mukhi'}.png`,
  };
});

const RudrakshaMandal = () => {
  const reduceMotion = useReducedMotion();
  const [hoveredMukhi, setHoveredMukhi] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const pointerPosition = useRef(null);
  const lastPointerCheck = useRef(0);

  const trackPointer = (event) => {
    pointerPosition.current = { x: event.clientX, y: event.clientY };
    setTooltipPosition({
      x: Math.max(8, Math.min(event.clientX + 12, window.innerWidth - 150)),
      y: Math.max(8, Math.min(event.clientY + 12, window.innerHeight - 42)),
    });
  };

  useAnimationFrame((time) => {
    const pointer = pointerPosition.current;
    if (!pointer || time - lastPointerCheck.current < 50) return;

    lastPointerCheck.current = time;
    const hoveredElement = document.elementFromPoint(pointer.x, pointer.y);
    const mukhiValue = hoveredElement?.closest('[data-mukhi]')?.getAttribute('data-mukhi');
    const nextMukhi = mukhiValue === null || mukhiValue === undefined ? null : Number(mukhiValue);

    setHoveredMukhi((currentMukhi) => currentMukhi === nextMukhi ? currentMukhi : nextMukhi);
  });

  return (
    <div
      className="relative mx-auto aspect-square w-[min(80vw,360px)] shrink-0 md:ml-auto md:mr-0 md:w-[min(42vw,360px)]"
      onPointerMove={trackPointer}
      onPointerLeave={() => {
        pointerPosition.current = null;
        setHoveredMukhi(null);
      }}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {rudrakshaMukhi.map(({ mukhi, image }, index) => {
          const angle = (index / rudrakshaMukhi.length) * Math.PI * 2 - Math.PI / 2;
          const left = `${50 + Math.cos(angle) * 44}%`;
          const top = `${50 + Math.sin(angle) * 44}%`;

          return (
            <div
              key={mukhi}
              data-mukhi={mukhi}
              className={`absolute h-[21%] w-[21%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${hoveredMukhi === mukhi ? 'z-30 scale-125' : 'z-10'}`}
              style={{ left, top }}
            >
              <img
                src={image}
                alt={`${mukhi} Mukhi Rudraksha`}
                loading="lazy"
                className="h-full w-full rounded-full object-cover drop-shadow-[0_1px_5px_rgba(179,113,48,0.45)]"
              />
            </div>
          );
        })}
      </motion.div>
      <div
        data-mukhi="0"
        className={`absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ${hoveredMukhi === 0 ? 'z-30 scale-110' : 'z-20'}`}
      >
        <motion.img
          src="/Rudraksha/0%20Mukhi.png"
          alt="0 Mukhi Rudraksha"
          loading="lazy"
          className="h-full w-full rounded-full object-cover drop-shadow-[0_1px_5px_rgba(179,113,48,0.45)]"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          whileHover={reduceMotion ? undefined : { scale: 1.12 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {hoveredMukhi !== null && (
        <div
          role="tooltip"
          className="pointer-events-none fixed z-[100] rounded border border-[#f3c48c]/60 bg-[#1b0802]/95 px-2.5 py-1.5 text-xs font-semibold text-[#fff6e9] shadow-lg"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
        >
          {hoveredMukhi} Mukhi Rudraksha
        </div>
      )}
    </div>
  );
};

const RudrakshaBanner = ({ showShopButton = true }) => (
  <section className="relative isolate min-h-[360px] overflow-hidden bg-[#1b0802] sm:min-h-[400px] lg:min-h-[420px]">
    <img
      src="/Rudra.jpg"
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full scale-[1.06] object-cover object-[72%_center] origin-[72%_center]"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-[#1b0802]/90 via-[#1b0802]/65 to-[#1b0802]/10" aria-hidden="true" />
    <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-12 sm:px-10 md:flex-row md:items-center md:gap-10 lg:min-h-[420px] lg:px-16 lg:py-7">
      <div className="w-full text-white md:flex-1 lg:-translate-y-3">
        <h2 className="max-w-2xl text-[clamp(2rem,3.5vw,3rem)] font-bold leading-[1.15] tracking-normal">
          Discover the Divine Power of Authentic Rudraksha.
        </h2>
        <p className="mt-4 text-left text-sm font-normal leading-6 text-white sm:text-base sm:leading-7">
          Sourced directly from the pristine foothills of the Himalayas, our lab-certified, 100% genuine beads are meticulously selected and sacredly energized to bring peace, protection, and prosperity to your life. Whether you are seeking spiritual alignment, stress relief, or a powerful shield against negative energies, explore our premium collection to find the perfect Mukhi destined for your journey.
        </p>
        {showShopButton && (
          <Link
            to="/rudraksha"
            className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-[#f3c48c] px-6 py-3 text-sm font-semibold text-[#1b0802] transition-colors hover:bg-[#ffdbac] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b0802]"
          >
            Shop now
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}
      </div>
      <RudrakshaMandal />
    </div>
  </section>
);

export default RudrakshaBanner;
