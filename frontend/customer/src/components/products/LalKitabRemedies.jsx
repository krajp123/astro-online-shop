                                                                                                                                                                                              import { motion, useReducedMotion } from 'framer-motion';

                                                                                                                                                                                              const planets = [
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Sun',
                                                                                                                                                                                                  image: '/Planets/Sun.png',
                                                                                                                                                                                                  remedy: 'Offer water to the Sun (Surya Arghya) every morning',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Moon',
                                                                                                                                                                                                  image: '/Planets/Moon.png',
                                                                                                                                                                                                  remedy: 'Donate white items, wear pearl or moonstone',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Mars',
                                                                                                                                                                                                  image: '/Planets/Mars.png',
                                                                                                                                                                                                  remedy: 'Donate red lentils on Tuesdays, recite Hanuman Chalisa',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Mercury',
                                                                                                                                                                                                  image: '/Planets/Mercury.png',
                                                                                                                                                                                                  remedy: 'Feed green grass to cows, donate green vegetables',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Jupiter',
                                                                                                                                                                                                  image: '/Planets/Jupiter.png',
                                                                                                                                                                                                  remedy: 'Donate yellow items on Thursdays, respect teachers',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Venus',
                                                                                                                                                                                                  image: '/Planets/Venus.png',
                                                                                                                                                                                                  remedy: 'Donate white sweets, help young girls',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Saturn',
                                                                                                                                                                                                  image: '/Planets/Saturn.png',
                                                                                                                                                                                                  remedy: 'Donate black items on Saturdays, feed crows',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Rahu',
                                                                                                                                                                                                  image: '/Planets/Rahu.png',
                                                                                                                                                                                                  remedy: 'Donate blue or black items, feed dogs',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  name: 'Ketu',
                                                                                                                                                                                                  image: '/Planets/Ketu.png',
                                                                                                                                                                                                  remedy: 'Donate brown items',
                                                                                                                                                                                                },
                                                                                                                                                                                              ];

                                                                                                                                                                                              const problemRemedies = [
                                                                                                                                                                                                {
                                                                                                                                                                                                  title: 'Lal Kitab Remedies to Prevent Divorce',
                                                                                                                                                                                                  description: 'Don’t Let Your Marriage Fall Apart—Try These Lal Kitab Remedies to Prevent Divorce',
                                                                                                                                                                                                  emoji: '💔',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  title: 'Lal Kitab Remedies for Career Problems',
                                                                                                                                                                                                  description: 'Facing Career Struggles? Try These Lal Kitab Remedies for Success',
                                                                                                                                                                                                  emoji: '💼',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  title: 'Lal Kitab Remedies for Financial Problems',
                                                                                                                                                                                                  description: 'Struggling with Money Issues? Try These Lal Kitab Remedies',
                                                                                                                                                                                                  emoji: '💰',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  title: 'Lal Kitab Remedies for Delay in Marriage',
                                                                                                                                                                                                  description: 'Is your marriage getting delayed again and again? Try these proven Lal Kitab remedies today',
                                                                                                                                                                                                  emoji: '💍',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  title: 'Lal Kitab Remedies for Health Problems',
                                                                                                                                                                                                  description: 'Struggling with health issues? Discover powerful Lal Kitab remedies for healing and well-being.',
                                                                                                                                                                                                  emoji: '🏥',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  title: 'Education Problems ke Lal Kitab Remedies',
                                                                                                                                                                                                  description: 'Strengthen Mercury and Jupiter, perform remedies for academic success',
                                                                                                                                                                                                  emoji: '📚',
                                                                                                                                                                                                },
                                                                                                                                                                                              ];

                                                                                                                                                                                              const remedyBenefits = [
                                                                                                                                                                                                { title: 'Simple and practical remedies', emoji: '✨' },
                                                                                                                                                                                                { title: 'No mantra or expensive pooja required', emoji: '🙏' },
                                                                                                                                                                                                { title: 'Low cost and easy to follow', emoji: '💰' },
                                                                                                                                                                                                { title: 'Focus on karmic balance', emoji: '⚖️' },
                                                                                                                                                                                                { title: 'Safe and non-harmful', emoji: '🛡️' },
                                                                                                                                                                                                { title: 'Results-oriented approach', emoji: '🎯' },
                                                                                                                                                                                              ];

                                                                                                                                                                                              const frequentlyAskedQuestions = [
                                                                                                                                                                                                {
                                                                                                                                                                                                  question: 'What are Lal Kitab remedies?',
                                                                                                                                                                                                  answer:
                                                                                                                                                                                                    'Lal Kitab remedies are simple, practical measures suggested to reduce the negative effects of planets and strengthen positive influences in a birth chart.',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  question: 'How are Lal Kitab remedies different from traditional Vedic remedies?',
                                                                                                                                                                                                  answer:
                                                                                                                                                                                                    'Unlike traditional remedies, Lal Kitab remedies usually do not involve mantras, yantras, or complex rituals. They focus more on everyday actions, charity, and behavioral corrections.',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  question: 'Are Lal Kitab remedies scientifically proven?',
                                                                                                                                                                                                  answer:
                                                                                                                                                                                                    'Lal Kitab remedies are based on astrological principles and belief systems rather than scientific validation. Their effectiveness is largely experiential and faith-based.',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  question: 'How long does it take for Lal Kitab remedies to show results?',
                                                                                                                                                                                                  answer:
                                                                                                                                                                                                    'Results vary depending on the individual, the planet involved, and consistency. Some people notice changes quickly, while others may see gradual improvements.',
                                                                                                                                                                                                },
                                                                                                                                                                                                {
                                                                                                                                                                                                  question: 'Can Lal Kitab remedies be done without a horoscope?',
                                                                                                                                                                                                  answer:
                                                                                                                                                                                                    'Basic remedies can be done without a horoscope, but personalized remedies are more effective when based on an accurate Lal Kitab chart analysis.',
                                                                                                                                                                                                },
                                                                                                                                                                                              ];

                                                                                                                                                                                              const LalKitabRemediesPage = () => {
  const reduceMotion = useReducedMotion();
  const imageAnimation = reduceMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: -64 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: 'easeOut' },
      };
  const contentAnimation = reduceMotion
    ? { initial: false, animate: { opacity: 1, x: 0 } }
    : {
        initial: { opacity: 0, x: 64 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.12, ease: 'easeOut' },
      };

  return (
    <main className="min-h-[calc(100svh-68px)] bg-[#f8f6f1] px-4 py-4 text-black sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      <section
        aria-labelledby="lal-kitab-remedies-heading"
        className="relative mx-auto grid min-h-[calc(100svh-100px)] w-full max-w-[1280px] items-center gap-6 px-8 md:grid-cols-2 md:gap-6 md:px-14 lg:gap-8 lg:px-16"
      >
        {[0, 1].map((side) => (
          <motion.div
            key={side}
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.65, delay: side * 0.08, ease: 'easeOut' }}
            className={`pointer-events-none absolute inset-y-8 z-0 w-px origin-top bg-[#9b6847]/50 sm:inset-y-10 ${
              side === 0 ? 'left-2' : 'right-2'
            }`}
          />
        ))}

        <div className="relative z-10 min-w-0 overflow-hidden py-2">
          <motion.div {...imageAnimation} className="flex w-full justify-center">
            <img
              src="/Lal%20Kitab/Lal%20Kitab%20Remedies%20Infographic.png"
              alt="Lal Kitab remedies for business, money, career, health, love, and other life concerns"
              className="block h-auto max-h-[60svh] w-auto max-w-full rounded-2xl object-contain shadow-[0_18px_50px_rgba(67,35,17,0.16)] md:max-h-[80svh]"
            />
          </motion.div>
        </div>

        <div className="relative z-10 min-w-0 overflow-hidden py-2">
          <motion.div {...contentAnimation} className="space-y-5 lg:space-y-6">
            <h1
              id="lal-kitab-remedies-heading"
              className="font-serif text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl"
            >
              Lal Kitab Remedies
            </h1>
            <div className="space-y-3 text-base leading-6 text-black sm:text-lg sm:leading-7">
              <p>
                Lal Kitab remedies are simple, practical astrological solutions rooted in the ancient wisdom of the Lal Kitab. Unlike traditional astrology that often relies on complex rituals, mantras, or expensive gemstones, Lal Kitab focuses on karma correction and daily-life actions to reduce the negative effects of planetary imbalances.
              </p>
              <p>
                These remedies are easy to perform, affordable, and designed to bring gradual but meaningful positive changes in areas such as career, relationships, health, and finances. By following Lal Kitab remedies with consistency and sincerity, one can restore balance between actions and destiny, allowing planetary energies to work in a more supportive way.
              </p>
              <p>
                Lal Kitab remedies emphasize responsibility, discipline, and conscious behavior—making them suitable for anyone seeking practical and non-harmful astrological guidance in modern life.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        aria-labelledby="planet-remedies-heading"
        className="mx-auto w-full max-w-[1280px] px-2 py-5 sm:px-4 sm:py-7 lg:px-8 lg:py-8"
      >
        <div className="mb-4 text-center sm:mb-5">
          <h2
            id="planet-remedies-heading"
            className="font-serif text-2xl font-bold text-black sm:text-3xl lg:text-4xl"
          >
            Lal Kitab Remedies for 9 Planets
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#594b41] sm:text-base">
            Explore planet-specific remedies for balancing cosmic energies
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {planets.map((planet) => (
            <article
              key={planet.name}
              className="flex flex-col items-center justify-center rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white px-3 py-3 shadow-[0_8px_24px_rgba(77,0,30,0.2),0_3px_8px_rgba(148,107,19,0.22)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(77,0,30,0.28),0_5px_12px_rgba(148,107,19,0.3)] sm:px-4 sm:py-4"
            >
              <img
                src={planet.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="mb-1.5 h-11 w-11 object-contain sm:h-12 sm:w-12"
              />
              <h3 className="text-center font-serif text-sm font-semibold leading-snug text-[#946b13] sm:text-base">
                {planet.name} Lal Kitab Remedies
              </h3>
              {planet.remedy && (
                <p className="mt-1.5 text-center text-xs leading-4 text-black sm:text-sm sm:leading-5">
                  {planet.remedy}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <div
        aria-hidden="true"
        className="h-px w-full bg-[#946b13]/45"
      />

      <section
        aria-labelledby="problem-remedies-heading"
        className="mx-auto w-full max-w-[1280px] px-2 pb-8 pt-5 sm:px-4 sm:pt-7 lg:px-8 lg:pt-8 lg:pb-10"
      >
        <div className="mb-4 text-center sm:mb-5">
          <h2
            id="problem-remedies-heading"
            className="font-serif text-2xl font-bold text-black sm:text-3xl lg:text-4xl"
          >
            Problem-Wise Lal Kitab Remedies
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#594b41] sm:text-base">
            Find targeted solutions for specific life challenges
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {problemRemedies.map((problem) => (
            <article
              key={problem.title}
              className="flex flex-col rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white px-4 py-4 shadow-[0_8px_24px_rgba(77,0,30,0.2),0_3px_8px_rgba(148,107,19,0.22)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(77,0,30,0.28),0_5px_12px_rgba(148,107,19,0.3)] sm:px-5 sm:py-5"
            >
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-xl sm:text-2xl">
                  {problem.emoji}
                </span>
                <h3 className="min-w-0 flex-1 font-serif text-sm font-semibold leading-snug text-[#946b13]">
                  {problem.title}
                </h3>
              </div>
              <p className="mt-2 text-xs leading-4 text-black sm:text-sm sm:leading-5">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div aria-hidden="true" className="h-px w-full bg-[#946b13]/45" />

      <section
        aria-labelledby="remedy-benefits-heading"
        className="mx-auto w-full max-w-[1280px] px-2 pb-8 pt-5 sm:px-4 sm:py-7 lg:px-8 lg:py-8 lg:pb-10"
      >
        <div className="mb-4 text-center sm:mb-5">
          <h2
            id="remedy-benefits-heading"
            className="font-serif text-2xl font-bold text-black sm:text-3xl lg:text-4xl"
          >
            Benefits of Lal Kitab Remedies
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#594b41] sm:text-base">
            Why choose Lal Kitab remedies for your spiritual journey
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {remedyBenefits.map((benefit) => (
            <article
              key={benefit.title}
              className="flex min-h-28 flex-col items-center justify-center rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white px-3 py-4 shadow-[0_8px_24px_rgba(77,0,30,0.2),0_3px_8px_rgba(148,107,19,0.22)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(77,0,30,0.28),0_5px_12px_rgba(148,107,19,0.3)] sm:px-4"
            >
              <span aria-hidden="true" className="mb-2 text-2xl">
                {benefit.emoji}
              </span>
              <h3 className="text-center font-serif text-sm font-semibold leading-snug text-[#946b13] sm:text-base">
                {benefit.title}
              </h3>
            </article>
          ))}
        </div>
      </section>

      <div aria-hidden="true" className="h-px w-full bg-[#946b13]/45" />

      <section
        aria-labelledby="faq-heading"
        className="mx-auto w-full max-w-[1000px] px-2 pb-10 pt-5 sm:px-4 sm:py-7 lg:px-8 lg:py-8"
      >
        <div className="mb-5 text-center sm:mb-7">
          <h2
            id="faq-heading"
            className="font-serif text-2xl font-bold text-black sm:text-3xl lg:text-4xl"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-sm leading-5 text-[#594b41] sm:text-base">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="space-y-3">
          {frequentlyAskedQuestions.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-none rounded-bl-2xl border border-[#946b13]/35 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(77,0,30,0.2),0_3px_8px_rgba(148,107,19,0.22)]"
            >
              <summary className="cursor-pointer font-serif text-sm font-semibold leading-snug text-[#946b13] marker:text-[#946b13] sm:text-base">
                {faq.question}
              </summary>
              <p className="mt-3 border-t border-[#946b13]/15 pt-3 text-sm leading-6 text-black sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
};

export default LalKitabRemediesPage;
