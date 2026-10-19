import { Link, useParams } from 'react-router-dom';
import problemRemedies from '../data/lalKitabProblemRemedies';

const ProblemWiseLalKitabRemediesPage = () => {
  const { problemSlug } = useParams();
  const problem = problemRemedies.find(({ slug }) => slug === problemSlug);

  if (!problem) {
    return (
      <main className="min-h-[50vh] bg-[#f8f6f1] px-4 py-12 text-center text-black">
        <h1 className="font-serif text-2xl font-bold">
          Problem remedy not found
        </h1>
        <Link
          to="/lal-kitab-remedies"
          className="mt-4 inline-flex text-sm font-medium text-[#946b13] underline-offset-4 hover:underline"
        >
          Back to Lal Kitab Remedies
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f1] px-4 pb-8 pt-2 text-black sm:px-6 sm:pb-10 sm:pt-3 lg:px-10">
      <div className="mx-auto max-w-[1280px] px-8 md:px-14 lg:px-16">
        <Link
          to="/lal-kitab-remedies"
          className="inline-flex text-sm font-medium text-[#946b13] underline-offset-4 hover:underline"
        >
          Back to Lal Kitab Remedies
        </Link>

        <article className="mt-4 sm:mt-5">
          {problem.heroImage && (
            <img
              src={problem.heroImage}
              alt={problem.heroImageAlt}
              className="block h-auto w-full object-cover"
            />
          )}
          {problem.detailHeading && (
            <h1 className="mt-5 font-serif text-2xl font-bold leading-tight text-[#946b13] sm:mt-6 sm:text-3xl">
              {problem.detailHeading}
            </h1>
          )}
          {problem.detailParagraphs?.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-sm leading-6 text-[#594b41] sm:text-base sm:leading-7"
            >
              {paragraph}
            </p>
          ))}
          {problem.detailSections?.map((section) => (
            <section key={section.heading} className="mt-7">
              <h2 className="font-serif text-xl font-bold leading-tight text-[#946b13] sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-6 text-[#594b41] sm:text-base sm:leading-7"
                >
                  {paragraph}
                </p>
              ))}
              {section.subsections?.map((subsection) => (
                <div key={subsection.heading} className="mt-5">
                  <h3
                    className={`leading-snug ${
                      subsection.inlineHeading
                        ? 'inline text-sm font-bold text-black sm:text-base'
                        : 'font-serif text-base font-normal text-[#946b13] sm:text-lg'
                    }`}
                  >
                    {subsection.heading}
                  </h3>
                  {subsection.paragraphs?.map((paragraph) => (
                    <p
                      key={paragraph}
                      className={`text-sm leading-6 text-[#594b41] sm:text-base sm:leading-7 ${
                        subsection.inlineHeading
                          ? 'ml-1 inline'
                          : `mt-2 ${
                              section.heading === 'Frequently Asked Questions'
                                ? 'ml-4'
                                : ''
                            }`
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </section>
          ))}
          {!problem.heroImage && (
            <header>
              <span aria-hidden="true" className="text-3xl">
                {problem.emoji}
              </span>
              <h1 className="mt-1 font-serif text-2xl font-bold leading-tight text-[#946b13] sm:text-3xl">
                {problem.title}
              </h1>
              <p className="mt-4 text-sm leading-6 text-black sm:text-base sm:leading-7">
                {problem.description}
              </p>
            </header>
          )}
        </article>
      </div>
    </main>
  );
};

export default ProblemWiseLalKitabRemediesPage;
