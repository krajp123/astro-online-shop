import { useState } from "react";

const LoginPage = () => {
  const [useEmail, setUseEmail] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [identifierFocused, setIdentifierFocused] = useState(false);
  const identifierLabel = useEmail ? "Email address" : "Phone Number";
  const shouldFloatIdentifierLabel = identifierFocused || Boolean(identifier);
  const canContinue = useEmail
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim())
    : Boolean(identifier.trim());

  return (
    <section className="w-full bg-[#f3efe9]">
      <div className="mx-auto flex max-w-[1320px] items-center justify-center px-4 pb-0 pt-3 sm:px-8 sm:pb-0 sm:pt-4">
        <div className="grid w-full max-w-4xl overflow-hidden rounded-[10px] border border-[#201b3a]/10 bg-[#f7f3ee] shadow-[0_20px_60px_rgba(23,19,45,0.08)] lg:min-h-[calc(100svh-96px)] lg:max-h-[calc(100svh-80px)] lg:grid-cols-2">
          <div className="relative hidden min-h-[500px] overflow-hidden bg-[#172554] p-8 text-white lg:flex lg:flex-col lg:justify-end">
            <video
              className="pointer-events-none absolute inset-0 z-0 block h-full w-full object-cover object-[20%_10%] opacity-85"
              autoPlay
              loop
              muted
              playsInline
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = 0.4;
              }}
              aria-hidden="true"
            >
              <source src="/v3.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(23,37,84,0.16)_0%,rgba(31,48,104,0.08)_48%,rgba(14,22,56,0.2)_100%)]" />
            <div className="relative z-20">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f3c969]">
                Your cosmic destiny
              </p>
              <h1 className="mt-4 max-w-sm text-5xl font-bold leading-[1.15] tracking-normal">
                Log in to unlock your sacred picks.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
                Access your saved gemstones, personalised recommendations, and
                astrology-led essentials.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#f7f3ee] px-5 py-5 sm:px-8 lg:px-10 lg:py-4">
            <div className="w-full max-w-md">
              <div className="mb-7">
                <h2 className="text-3xl font-bold leading-tight tracking-normal text-slate-900">
                  Log in for the best experience
                </h2>
                <p className="mt-2 text-base text-slate-600">
                  Enter your {useEmail ? "email address" : "phone number"} to continue
                </p>
              </div>

              <form
                className="space-y-7"
                onSubmit={(event) => event.preventDefault()}
              >
                <div
                  className={`relative flex min-h-[58px] min-w-0 rounded-[2px] border bg-[#f7f3ee] ${
                    identifierFocused ? "border-[#172554]" : "border-slate-300"
                  }`}
                >
                  <label
                    htmlFor="login-identifier"
                    className={`pointer-events-none absolute z-10 text-slate-900 transition-all duration-200 ease-out ${
                      shouldFloatIdentifierLabel
                        ? "left-3 top-0 -translate-y-1/2 bg-[#f7f3ee] px-1 text-xs leading-none"
                        : useEmail
                          ? "left-4 top-1/2 -translate-y-1/2 text-base"
                          : "left-[4.5rem] top-1/2 -translate-y-1/2 text-base"
                    }`}
                  >
                    {identifierLabel}
                  </label>
                  {!useEmail && (
                    <button
                      type="button"
                      className="flex items-center gap-1 border-r border-slate-200 px-4 text-sm text-slate-900"
                      aria-label="Country code"
                    >
                      +91 <span className="text-xs text-slate-500">▼</span>
                    </button>
                  )}
                  <input
                    id="login-identifier"
                    type={useEmail ? "email" : "tel"}
                    value={identifier}
                    inputMode={useEmail ? "email" : "numeric"}
                    maxLength={useEmail ? undefined : 10}
                    onChange={(event) =>
                      setIdentifier(
                        useEmail
                          ? event.target.value
                          : event.target.value.replace(/\D/g, "")
                      )
                    }
                    onFocus={() => setIdentifierFocused(true)}
                    onBlur={() => setIdentifierFocused(false)}
                    aria-label={identifierLabel}
                    className="min-w-0 flex-1 bg-transparent px-4 py-4 text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="button"
                  className="ml-auto block text-base font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    setUseEmail((current) => !current);
                    setIdentifier("");
                  }}
                >
                  {useEmail ? "Use Phone Number" : "Use Email-ID"}
                </button>

                <p className="pb-2 text-xs leading-4 text-slate-600">
                  <span className="block">By continuing, you confirm that you are above 18 years of</span>
                  <span className="block">
                    age, and you agree to the Astrovastubazar&apos;s{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Use
                    </a>{" "}
                    and
                  </span>
                  <span className="block">
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </p>

                <button
                  type="submit"
                  disabled={!canContinue}
                  className="w-full rounded-md bg-[#172554] px-5 py-3.5 text-base font-bold text-white transition hover:bg-[#1f3068] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;