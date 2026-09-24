import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="w-full bg-[#f3efe9]">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-[1320px] items-center justify-center px-4 py-16 sm:px-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-[#201b3a]/10 bg-[#f7f3ee] shadow-[0_20px_60px_rgba(23,19,45,0.08)] lg:grid-cols-2">
          <div className="relative hidden min-h-[520px] overflow-hidden bg-[#172554] p-10 text-white lg:flex lg:flex-col lg:justify-end">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(243,201,105,0.35),transparent_38%),linear-gradient(135deg,#172554_0%,#1f3068_48%,#0e1638_100%)]" />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#f3c969]">
                Your cosmic destiny
              </p>
              <h1 className="mt-4 max-w-sm font-['Cormorant_Garamond',serif] text-5xl font-bold leading-[0.9] tracking-[-0.04em]">
                Log in to unlock your sacred picks.
              </h1>
              <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
                Access your saved gemstones, personalised recommendations, and
                astrology-led essentials.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center bg-[#f7f3ee] px-5 py-10 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#f3c969]">
                  Welcome back
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-900">
                  Login
                </h2>
              </div>

              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f3c969] focus:ring-2 focus:ring-[#f3c969]/30 [-webkit-text-fill-color:#0f172a] autofill:shadow-[0_0_0_1000px_#f8fafc_inset]"
                    style={{ WebkitBoxShadow: "0 0 0 1000px #f8fafc inset" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#f3c969] focus:ring-2 focus:ring-[#f3c969]/30 [-webkit-text-fill-color:#0f172a] autofill:shadow-[0_0_0_1000px_#f8fafc_inset]"
                    style={{ WebkitBoxShadow: "0 0 0 1000px #f8fafc inset" }}
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#f3c969]"
                    />
                    Remember me
                  </label>
                  <a
                    href="/"
                    className="font-semibold text-[#a87500] hover:text-[#8f6500]"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#172554] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#1f3068]"
                >
                  Login
                </button>
              </form>

              <div className="mt-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-[#f3c969]"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:border-[#f3c969]"
                >
                  Continue with Apple
                </button>
              </div>

              <p className="mt-8 text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/"
                  className="font-bold text-[#a87500] hover:text-[#8f6500]"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;