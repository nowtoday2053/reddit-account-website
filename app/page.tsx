"use client";

import { useState, useEffect } from "react";
import { motion, type MotionProps } from "framer-motion";

// Promo end date - 72 hours from first visit (stored in localStorage)
const getPromoEndDate = () => {
  if (typeof window === "undefined") return new Date();
  const stored = localStorage.getItem("promoEndDate72");
  if (stored) {
    return new Date(stored);
  }
  const endDate = new Date(Date.now() + 72 * 60 * 60 * 1000);
  localStorage.setItem("promoEndDate72", endDate.toISOString());
  return endDate;
};

const principles = [
  { number: "01", statement: "Purchase An Account" },
  { number: "02", statement: "Receive Your Account Within 10 Minutes" },
  { number: "03", statement: "Post & Go Viral" },
];

const benefits = [
  "Warm-up + posting cadence playbook",
  "Subreddit fit + engagement strategy",
  "Risk checklist (what triggers restrictions)",
  "Recovery steps if you’re locked out",
  "Operating guidelines for teams",
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$19",
    original: "$29",
    subtitle: "Includes Free Warm Up Guide",
    bullets: [
      "Aged account",
      "50–100 karma",
      "Email verified",
      "Light history",
      "Best for normal use & testing Reddit",
    ],
    featured: false,
    link: "https://buy.stripe.com/7sY9AS92bfkGch1gkR6Ri00",
  },
  {
    name: "Growth",
    price: "$39",
    original: "$59",
    subtitle: "Includes Warm Up Guide & Playbook",
    bullets: [
      "Aged account",
      "250–500 karma",
      "Email verified",
      "Established post + comment history",
      "Best for scaling campaigns & community launches",
    ],
    featured: false,
    link: "https://buy.stripe.com/3cIeVc5PZ3BYgxh0lT6Ri01",
  },
  {
    name: "Pro",
    price: "$49",
    original: "$79",
    subtitle: "Everything In Growth + Growth Hacking pdf",
    bullets: [
      "Aged account",
      "1,000+ karma",
      "Email verified",
      "Best for high-visibility launches & influencer ops",
    ],
    featured: true,
    link: "https://buy.stripe.com/eVqcN4fqz0pM5SDc4B6Ri02",
  },
];

const faqs = [
  {
    question: "Can you guarantee I'll never get banned?",
    answer:
      "No. But we've dramatically reduced the ban rate from 45% to 2% by using the methods we've outlined in the guide.",
  },
  {
    question: "Who is this for?",
    answer:
      "This is for founders, marketers, and creators who want Reddit exposure without burning accounts.",
  },
  {
    question: "How fast can I see results?",
    answer:
      "Within 24 hours, depending on what you post and where you post it.",
  },
  {
    question: "How do I receive my account?",
    answer:
      "After purchase, you'll receive the login credentials (username, password, and email access) within 10 minutes via email.",
  },
  {
    question: "What if the account gets banned right after I buy it?",
    answer:
      "If your account gets banned within 48 hours of purchase (and you followed our warm-up guide), we'll replace it for free. No questions asked.",
  },
];

const ourBenefits = [
  "Aged accounts with real history",
  "Karma-ready; post immediately",
  "Email verified & secure handoff",
  "Free warm-up guide included",
  "Fast delivery (under 10 minutes)",
  "1-on-1 support if you get stuck",
];

const competitorProblems = [
  "Fresh accounts that get flagged instantly",
  "Low karma; can't post in most subreddits",
  "Unverified emails, easily suspended",
  "No guidance — you're on your own",
  "Slow delivery, sometimes days",
  "No support after purchase",
];

const easing = [0.22, 1, 0.36, 1] as const;

const revealProps: MotionProps = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.45 },
  transition: { duration: 0.6, ease: easing },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 72, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endDate = getPromoEndDate();
    
    const updateTimer = () => {
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f4ef]/80 backdrop-blur-md">
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
          <a
            href="#hero"
            className="flex flex-shrink-0 flex-col gap-1 text-left transition-opacity hover:opacity-80"
          >
            <span className="text-[0.55rem] font-medium tracking-[0.25em] uppercase text-[#38342f] sm:text-[0.72rem] sm:tracking-[0.42em]">
              redditaccountsforsale.com
            </span>
          </a>
          <div
            role="navigation"
            aria-label="Primary"
            className="hidden flex-nowrap justify-center gap-x-4 text-[0.68rem] uppercase tracking-[0.45em] text-[#2e2b28] md:flex"
          >
            <a className="transition-opacity hover:opacity-70" href="#principles">
              How It Works
            </a>
            <span className="px-1 text-[#b5aea6]">|</span>
            <a className="transition-opacity hover:opacity-70" href="#pricing">
              Pricing
            </a>
            <span className="px-1 text-[#b5aea6]">|</span>
            <a className="transition-opacity hover:opacity-70" href="#faq">
              FAQ
            </a>
            <span className="px-1 text-[#b5aea6]">|</span>
            <a className="transition-opacity hover:opacity-70" href="#affiliates">
              Affiliates
            </a>
          </div>
          <a
            href="#pricing"
            className="inline-flex flex-shrink-0 items-center rounded-full border border-[#2e2b28]/30 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#2e2b28] transition-all hover:-translate-y-0.5 hover:border-[#2e2b28] hover:bg-[#2e2b28] hover:text-[#f7f4ef] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]"
          >
            Buy Now
          </a>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-6 pb-20 pt-16 sm:px-8 sm:pb-28 lg:pt-20">
        <motion.section
          id="hero"
          className="space-y-8"
          {...revealProps}
        >
          <h1 className="mr-auto font-[var(--font-karma-display)] text-[2rem] leading-[1.15] text-[#131211] sm:text-5xl sm:leading-[1.05] md:text-6xl">
            <span className="block sm:ml-[-0.5em] sm:whitespace-nowrap">
              Stop Getting Banned On Reddit.
            </span>
            <span className="mt-1 block sm:mt-2 sm:pl-[2em]">Start Going Viral.</span>
          </h1>
          <p className="max-w-2xl text-base text-[#3c3832] sm:text-lg">
            Tired of getting banned? Use aged, karma-ready Reddit accounts built
            to post, comment, and scale without bans.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="#pricing"
              className="inline-flex items-center rounded-full border border-[#2e2b28] bg-[#2e2b28] px-6 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f7f4ef] transition-all hover:-translate-y-0.5 hover:bg-[#1d1a18]"
            >
              Buy Now
            </a>
            <a
              href="#principles"
              className="inline-flex items-center gap-2 border-b border-[#2e2b28]/40 pb-1 text-xs font-medium uppercase tracking-[0.3em] text-[#2e2b28] transition-all hover:border-[#2e2b28] hover:tracking-[0.34em]"
            >
              See Reviews
            </a>
          </div>
        </motion.section>


        <motion.section
          id="comparison"
          className="relative left-1/2 right-1/2 -mx-[50vw] mt-36 w-screen px-4 sm:mt-44 sm:px-8"
          {...revealProps}
        >
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-[var(--font-karma-display)] text-3xl leading-snug text-[#131211] sm:text-4xl md:text-5xl">
                Why Choose Us?
              </h2>
              <p className="text-base text-[#5a544c] sm:text-lg">
                Yes, there are other places to buy Reddit accounts, but our goal is to be the best.
              </p>
            </div>

            <div className="relative grid gap-6 lg:grid-cols-2">
              {/* Our Benefits */}
              <div className="rounded-2xl border border-[#2e2b28]/15 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2e2b28] text-white text-sm font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-[#131211] sm:text-2xl">Us</h3>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#5e5a55] mb-4">What we offer:</p>
                <ul className="space-y-4">
                  {ourBenefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white text-xs">✓</span>
                      <span className="text-[#2f2b27]">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* VS Badge */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#f7f4ef] bg-white text-lg font-bold text-[#2e2b28] shadow-lg">
                  VS
                </div>
              </div>

              {/* Competitor Problems */}
              <div className="rounded-2xl border border-[#2e2b28]/15 bg-white p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e5e2dd] text-[#5e5a55] text-sm font-bold">
                    ✗
                  </div>
                  <h3 className="text-xl font-bold text-[#5e5a55] sm:text-2xl">Other Sellers</h3>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#5e5a55] mb-4">What you get elsewhere:</p>
                <ul className="space-y-4">
                  {competitorProblems.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white text-xs">✗</span>
                      <span className="text-[#5a544c]">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="principles"
          className="mt-32 space-y-8"
          {...revealProps}
        >
          <div className="text-center text-2xl font-semibold tracking-tight text-[#1f1b17] underline sm:text-3xl">
            How It Works
          </div>
          <ul className="space-y-6">
            {principles.map((principle) => (
              <motion.li
                key={principle.number}
                className="flex gap-6 rounded-2xl border border-[#2e2b28]/15 bg-white/40 p-6 backdrop-blur-sm transition-colors hover:border-[#2e2b28]/40"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, ease: easing }}
              >
                <span className="font-[var(--font-karma-display)] text-2xl text-[#948a7d]">
                  {principle.number}
                </span>
                <p className="text-lg leading-relaxed text-[#1f1d1b] sm:text-xl">
                  {principle.statement}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.section>


        <motion.section
          id="proof"
          className="mt-24 space-y-6"
          {...revealProps}
        >
          <div className="text-center text-2xl font-semibold tracking-tight text-[#1f1b17] underline sm:text-3xl">
            Reviews
          </div>
          <p className="text-center text-sm text-[#5a544c]">
            Trusted by hundreds of people posting on Reddit.
          </p>
          <div
            className="trustpilot-widget mx-auto max-w-md"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6942617dae5298305b4fe796"
            data-style-height="52px"
            data-style-width="100%"
            data-token="ef0de007-eab2-4839-8ba0-f3e54401f0a1"
          >
            <a
              href="https://www.trustpilot.com/review/redditaccountsforsale.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Trustpilot
            </a>
          </div>
          <div className="grid gap-4 pt-4 sm:grid-cols-1 lg:grid-cols-2">
            <a
              href="https://x.com/jaydmss/status/2001102971786989719"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[#2e2b28]/15 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(16,16,15,0.2)] transition-all hover:-translate-y-1 hover:border-[#2e2b28]/30 hover:shadow-[0_20px_50px_-25px_rgba(16,16,15,0.35)]"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#db4a4a]" />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-[#1f1b17]">
                    @jaydmss
                    <svg className="h-4 w-4 text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor">
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#5a544c]">on X</div>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#2f2b27]">
                Redditaccountsforsale.com has some good reddit accounts. 10/10 site.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#1d9bf0] group-hover:underline">
                View on X
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
            <a
              href="https://x.com/zakdmss/status/2001105866792083685"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[#2e2b28]/15 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(16,16,15,0.2)] transition-all hover:-translate-y-1 hover:border-[#2e2b28]/30 hover:shadow-[0_20px_50px_-25px_rgba(16,16,15,0.35)]"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-[#00ffff]" />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-[#1f1b17]">
                    @zakdmss
                    <svg className="h-4 w-4 text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor">
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#5a544c]">on X</div>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#2f2b27]">
                redditaccountsforsale.com is a good place for reddit accs imo
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#1d9bf0] group-hover:underline">
                View on X
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
            <a
              href="https://x.com/arditbelulii/status/2001113315070677167"
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-[#2e2b28]/15 bg-white p-6 shadow-[0_12px_40px_-20px_rgba(16,16,15,0.2)] transition-all hover:-translate-y-1 hover:border-[#2e2b28]/30 hover:shadow-[0_20px_50px_-25px_rgba(16,16,15,0.35)]"
            >
              <div className="flex items-center gap-3">
                <img src="/ard.jpg" alt="@arditbelulii" className="h-10 w-10 flex-shrink-0 rounded-full object-cover" />
                <div>
                  <div className="flex items-center gap-1 font-semibold text-[#1f1b17]">
                    @arditbelulii
                    <svg className="h-4 w-4 text-[#1d9bf0]" viewBox="0 0 22 22" fill="currentColor">
                      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
                    </svg>
                  </div>
                  <div className="text-xs text-[#5a544c]">on X</div>
                </div>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-[#2f2b27]">
                recently bought a reddit account from redditaccountsforsale.com, had a good experience like seriously lol (I was told to leave a review but i'm satisfied so i'm actually leaving one) would recommend
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#1d9bf0] group-hover:underline">
                View on X
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>
        </motion.section>

        <motion.section
          id="pricing"
          className="relative left-1/2 right-1/2 -mx-[50vw] mt-24 w-screen space-y-10 px-4 sm:px-8"
          {...revealProps}
        >
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center text-2xl font-semibold tracking-tight text-[#1f1b17] underline sm:text-3xl">
              Pricing
            </div>
            
            {/* Promo Banner */}
            <motion.div
              className="mx-auto max-w-xl rounded-2xl border border-[#2e2b28]/15 bg-white p-6 text-center shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="inline-block rounded-full bg-[#2e2b28] px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#f7f4ef]">
                Limited Offer
              </div>
              <div className="mt-3 font-[var(--font-karma-display)] text-xl text-[#1f1b17] sm:text-2xl">
                Buy One, Get One Free
              </div>
              <p className="mt-1 text-sm text-[#5a544c]">
                Get a second account free with any purchase
              </p>
              <div className="mt-4 flex items-center justify-center gap-3 text-[#2e2b28]">
                <div className="flex flex-col items-center rounded-lg bg-[#f7f4ef] px-3 py-2">
                  <span className="text-xl font-semibold sm:text-2xl">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wider text-[#5a544c]">hrs</span>
                </div>
                <span className="text-lg text-[#b5aea6]">:</span>
                <div className="flex flex-col items-center rounded-lg bg-[#f7f4ef] px-3 py-2">
                  <span className="text-xl font-semibold sm:text-2xl">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wider text-[#5a544c]">min</span>
                </div>
                <span className="text-lg text-[#b5aea6]">:</span>
                <div className="flex flex-col items-center rounded-lg bg-[#f7f4ef] px-3 py-2">
                  <span className="text-xl font-semibold sm:text-2xl">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wider text-[#5a544c]">sec</span>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`relative flex h-full w-full flex-col rounded-[24px] border px-8 py-10 transition-all ${
                    tier.featured
                      ? "border-[#1e1b18] bg-[#121110] text-[#f7f4ef] shadow-[0_24px_80px_-40px_rgba(0,0,0,0.55)]"
                      : "border-[#2e2b28]/15 bg-white text-[#1f1b17] shadow-[0_20px_60px_-40px_rgba(16,16,15,0.3)]"
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`rounded-full px-3 py-1 text-[0.6rem] font-medium uppercase tracking-wider ${
                      tier.featured 
                        ? "bg-[#f7f4ef] text-[#121110]" 
                        : "bg-[#2e2b28] text-[#f7f4ef]"
                    }`}>
                      Buy 1 Get 1 Free
                    </span>
                  </div>
                  <span
                    className={`text-sm font-semibold uppercase tracking-[0.28em] ${
                      tier.featured ? "text-[#d8d0c3]" : "text-[#514b44]"
                    }`}
                  >
                    {tier.name}
                  </span>
                  <div className="mt-5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={`font-[var(--font-karma-display)] text-[2.75rem] leading-none ${
                          tier.featured ? "text-[#f7f4ef]" : "text-[#161310]"
                        }`}
                      >
                        {tier.price}
                      </span>
                      <span
                        className={`text-sm line-through ${
                          tier.featured ? "text-[#a99f93]" : "text-[#9c958c]"
                        }`}
                      >
                        {tier.original}
                      </span>
                    </div>
                    <span
                      className={`mt-1 block text-sm ${
                        tier.featured ? "text-[#cbc3b8]" : "text-[#5a524a]"
                      }`}
                    >
                      per account
                    </span>
                  </div>
                  <p
                    className={`mt-5 text-sm leading-relaxed ${
                      tier.featured ? "text-[#d9d1c6]" : "text-[#4a443d]"
                    }`}
                  >
                    {tier.subtitle}
                  </p>
                  <ul
                    className={`mt-6 flex-1 space-y-2 text-sm ${
                      tier.featured ? "text-[#f0e8dc]" : "text-[#2f2b27]"
                    }`}
                  >
                    {tier.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5">
                        <span
                          className={`text-sm ${
                            tier.featured ? "text-[#f7f4ef]" : "text-[#2e2b28]"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={tier.link}
                    className={`mt-8 inline-flex w-full items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] transition-all hover:-translate-y-0.5 ${
                      tier.featured
                        ? "border-[#f7f4ef]/30 bg-[#f7f4ef] text-[#121110] hover:bg-transparent hover:text-[#f7f4ef]"
                        : "border-[#2e2b28] text-[#2e2b28] hover:bg-[#2e2b28] hover:text-[#f7f4ef]"
                    }`}
                  >
                    Buy Now
                  </a>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="faq" className="mt-24 space-y-8" {...revealProps}>
          <div className="text-center text-2xl font-semibold tracking-tight text-[#1f1b17] underline sm:text-3xl">
            FAQ
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="cursor-pointer rounded-2xl border border-[#2e2b28]/15 bg-white/55 p-6 transition-all hover:border-[#2e2b28]/40"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-[var(--font-karma-display)] text-lg tracking-tight text-[#1f1c19] sm:text-xl">
                    {faq.question}
                  </h3>
                  <span className="ml-4 text-xl text-[#5e5a55] transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    +
                  </span>
                </div>
                {openFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 text-base leading-relaxed text-[#2f2b27] sm:text-lg"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="affiliates"
          className="mt-28 rounded-3xl border border-[#2e2b28]/15 bg-[#121110] px-8 py-12 text-[#f7f4ef] transition-all hover:-translate-y-1 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easing }}
        >
          <div className="space-y-6">
            <div className="text-xs uppercase tracking-[0.5em] text-[#c7c0b5]">
              Affiliate Program
            </div>
            <h2 className="font-[var(--font-karma-display)] text-3xl leading-snug sm:text-4xl">
              Earn 50% Commission
            </h2>
            <p className="text-base leading-relaxed text-[#cbc3b8] sm:text-lg">
              Refer customers to us and earn 50% of every sale. No limits, no caps — just passive income for spreading the word.
            </p>
            <ul className="space-y-3 text-sm text-[#f0e8dc] sm:text-base">
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                50% commission on every sale
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                Paid out weekly
              </li>
              <li className="flex items-center gap-3">
                <span className="text-green-400">✓</span>
                No minimum payout threshold
              </li>
            </ul>
            <a
              href="mailto:support@redditaccountsforsale.com"
              className="inline-flex items-center rounded-full border border-[#f7f4ef]/40 bg-[#f7f4ef]/10 px-6 py-3 text-xs font-semibold tracking-[0.1em] text-[#f7f4ef] transition-all hover:bg-[#f7f4ef] hover:text-[#121110]"
            >
              Email Us At: support@redditaccountsforsale.com
            </a>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: easing }}
        >
          <p className="text-sm text-[#5a544c]">
            Need help?{" "}
            <a
              href="mailto:support@redditaccountsforsale.com"
              className="underline transition-opacity hover:opacity-70"
            >
              support@redditaccountsforsale.com
            </a>
          </p>
        </motion.section>
      </main>

      <footer className="border-t border-black/10 bg-[#f7f4ef]/90 py-8">
        <div className="mx-auto max-w-3xl px-6 text-sm text-[#4a4641] sm:px-8">
          © redditaccountsforsale.com — compliance-first growth.
        </div>
      </footer>
    </div>
  );
}
