/**
 * ALL page text lives here so Leonor can review and approve it in one place.
 *
 * Rules (AGENTS.md section 2): no em or en dashes, no analogies or metaphors,
 * the student is the subject, benefit before feature, every section title
 * states an outcome for the student, British spelling.
 */

import { LINKS, PRICING, formatEur, formatInstallment, pricingFor } from "@/config/site";

/**
 * Price strings for the current state. `launchPrice` comes from the launch state resolved on the
 * server (src/lib/launch.ts): launch prices while the offer is active, otherwise the regular ones.
 */
export function priceStrings(launchPrice: boolean) {
  const p = pricingFor(launchPrice);
  return {
    oneTime: formatEur(p.oneTime),
    plan: `${p.plan.installments} x ${formatInstallment(p.plan.amount)}`,
    planTotal: formatEur(p.plan.total),
    planNote: `Total ${formatEur(p.plan.total)}, one payment a month.`,
    installments: p.plan.installments,
    installment: formatInstallment(p.plan.amount),
    regularOneTime: formatEur(PRICING.oneTime),
    regularPlan: `${PRICING.plan.installments} x ${formatInstallment(PRICING.plan.amount)}`,
    regularPlanTotal: formatEur(PRICING.plan.total),
  };
}

export const meta = {
  title: "The Functional Desserts Program | Healthy desserts with a year of live mentorship",
  description:
    "Learn to turn any recipe into a gluten-free, dairy-free, refined-sugar-free dessert that works the first time, with monthly live sessions and personal feedback from Leonor for a full year.",
  ogTitle: "Eat desserts that love you back, every single day",
  ogDescription:
    "The Functional Desserts Program: 5 modules, 30+ lessons and 12 months of live mentorship with Leonor.",
  keywords: [
    "healthy desserts course",
    "functional baking",
    "gluten-free baking course",
    "sugar-free desserts",
    "dairy-free desserts",
    "online baking program",
  ],
} as const;

export const nav = {
  program: "The program",
  mentorship: "Mentorship",
  pricing: "Pricing",
  faq: "Questions",
  ctaWaitlist: "Join the waiting list",
  ctaOpen: "Join the program",
} as const;

export const hero = {
  eyebrow: "The Functional Desserts Program · 12 months of live mentorship",
  headline: ["Eat desserts that love you back, every single day.", "No more guessing, no more failed batches."],
  subheadline:
    "Master the swaps, ratios and techniques that make healthy desserts work the first time, and bring every doubt to a live session with Leonor for a full year.",
  ctaWaitlist: "Join the waiting list",
  ctaOpen: "Join the program",
  secondaryCta: "See what you will learn",
  proofs: ["30+ video lessons", "Monthly live sessions", `${PRICING.guaranteeDays}-day money-back guarantee`],
  waitlistNote:
    "Doors are closed right now. Join the waiting list and you will be the first to know when they open, with the launch price.",
  videoPlaceholder: "A short welcome video from Leonor will play here.",
  mediaTag: "Gluten-free · Dairy-free · Refined-sugar-free",
  mediaAlt: "Leonor holding a raspberry cake made without gluten, dairy or refined sugar",
  liveBadge: "Live with Leonor",
  liveText: "Every month, for 12 months",
  stats: [
    { value: "5", label: "modules" },
    { value: "30+", label: "video lessons" },
    { value: "4", label: "bonuses with ebooks" },
    { value: "12", label: "months of live mentorship" },
  ],
} as const;

export const pains = {
  title: "If healthy baking has left you frustrated, here is why",
  intro: "You have probably tried at least one of these.",
  items: [
    {
      heading: "The recipe said healthy. The cake came out dense and dry.",
      text: "You followed every step and it still failed. You do not know what went wrong, so you cannot fix it next time.",
    },
    {
      heading: "You swapped one ingredient and the texture fell apart.",
      text: "Sugar for a sweetener, wheat flour for almond flour. Nobody told you the ratios, so the result was a guess.",
    },
    {
      heading: "You keep buying expensive ingredients and throwing batches away.",
      text: "After a few failures you go back to the old recipe, because at least that one works.",
    },
    {
      heading: "You eat a traditional dessert and feel bloated, tired or guilty.",
      text: "You are tired of choosing between enjoying a dessert and feeling well afterwards.",
    },
    {
      heading: "You are doing all of this alone.",
      text: "When a recipe fails at nine in the evening there is nobody to ask, and the next attempt is another guess.",
    },
  ],
  closing: "None of this is your fault. You were taught to follow recipes, not to understand them. That is what changes here.",
  imageAlt: "A slice of strawberry cheesecake on a white plate",
  imageCaption: "This is the kind of dessert you will make at home, and feel well after eating it.",
} as const;

export const transformation = {
  title: "What changes for you inside the program",
  items: [
    {
      heading: "You stop depending on other people's recipes.",
      text: "You understand why each ingredient is there and what happens when you change it, so you can fix a recipe instead of throwing it away.",
    },
    {
      heading: "You rescue your family recipes.",
      text: "You pick up your grandmother's cake and know which swaps keep it moist, hold it together and keep the taste you remember.",
    },
    {
      heading: "You eat dessert and feel well afterwards.",
      text: "No sugar crash, no bloating, no guilt, because you choose ingredients that nourish you and you know how to make them work.",
    },
    {
      heading: "You bake one cake for everyone at the table.",
      text: "Celiac, diabetic, lactose intolerant, vegan. One recipe adapted to everyone's needs, instead of a different cake for each person.",
    },
    {
      heading: "You never bake alone again.",
      text: "Every month you bring your questions, your photos and your failures to a live session with Leonor and leave with answers.",
    },
    {
      heading: "You create your own desserts.",
      text: "By the end you are not adapting recipes any more. You are writing them, with templates that work every time.",
    },
  ],
  galleryEyebrow: "Made with what you learn here",
  galleryTitle: "Desserts you will make without gluten, dairy or refined sugar",
  galleryIntro: "Every one of these follows the swaps and ratios from the modules. You will know why each one works.",
  gallery: [
    { title: "Chocolate lava cake", tag: "Gluten-free", alt: "A chocolate lava cake with raspberries on a plate" },
    { title: "Chocolate chip cookies", tag: "Refined-sugar-free", alt: "A plate of chocolate chip cookies" },
    { title: "Nut and seed muffins", tag: "Dairy-free", alt: "Muffins topped with nuts and seeds" },
    { title: "Red velvet cupcake", tag: "Gluten-free", alt: "A red velvet cupcake on a glass stand" },
  ],
} as const;

export const forWho = {
  title: "You will get the most out of this program if",
  yes: [
    "You love desserts and you want to keep eating them without feeling unwell afterwards.",
    "You or someone you cook for has a food sensitivity, intolerance or restriction.",
    "You have tried gluten-free, dairy-free or sugar-free baking and the results disappointed you.",
    "You want to understand what you are doing in the kitchen, not just follow steps.",
    "You want someone experienced to ask when things go wrong.",
  ],
  noTitle: "It is probably not for you if",
  no: [
    "You believe a dessert only tastes good with white sugar, white flour and butter.",
    "You are not curious about what is actually inside your dessert.",
    "You are looking for a quick fix. This is a method you learn once and keep for life.",
    "You think feeling good means giving up dessert. Here, dessert stays.",
  ],
} as const;

export const modules = {
  title: "What you will be able to do after each module",
  intro: "Five modules, more than thirty video lessons, and the PDF guides, charts, quizzes and worksheets that go with them. You keep everything.",
  imageAlt: "A chocolate layer cake covered in swirls of chocolate frosting, with an offset spatula beside it",
  sideStats: [
    { value: "5", label: "modules, in the order you need them" },
    { value: "30+", label: "video lessons you can rewatch" },
    { value: "PDF", label: "guides, charts, quizzes and worksheets" },
  ],
  keepNote: "You keep every lesson and every PDF for life.",
  items: [
    {
      number: "01",
      name: "The Basics of Baking",
      outcome: "You stop ruining recipes with the wrong pan, temperature or portion.",
      topics: ["Tools you actually need", "Pans and portions", "Temperatures and times", "Unit conversions", "Mise en place"],
    },
    {
      number: "02",
      name: "All About Functional Baking",
      outcome: "You know exactly what makes a dessert functional and which core ingredients to keep in your pantry.",
      topics: ["What functional baking is", "The core ingredients", "How preparation changes", "Functional desserts and fitness", "Your first recipes"],
    },
    {
      number: "03",
      name: "All About Nutrition",
      outcome: "You understand what your body is telling you after a dessert and you choose ingredients that agree with it.",
      topics: [
        "Reading your body's symptoms",
        "Gluten",
        "Milk and dairy",
        "Sugars and sweeteners",
        "Flours and starches",
        "Fats",
        "Eggs",
        "Salt",
        "Cocoa",
      ],
    },
    {
      number: "04",
      name: "The Alchemy of Baking",
      outcome: "You know the role of every ingredient and you fix structure, binding, rising, moisture and flavour on purpose.",
      topics: ["The role of each ingredient", "How a recipe is built", "Structure", "Binding", "Rising", "Moisture", "Flavour"],
    },
    {
      number: "05",
      name: "Adjusting and Creating Recipes",
      outcome: "You adapt any recipe and create your own, controlling taste, colour, structure and tenderness with ready-to-use templates.",
      topics: ["Adjusting taste", "Adjusting colour", "Adjusting structure", "Adjusting tenderness", "Recipe templates"],
    },
  ],
} as const;

export const mentorship = {
  eyebrow: "Included for 12 months",
  title: "You will never bake alone again. For a full year.",
  intro:
    "Most courses leave you with videos and silence. Here you have Leonor's direct support for twelve months from the day you join, included in your enrolment.",
  cards: [
    {
      heading: "Monthly live Q&A with Leonor",
      text: "Bring the recipe that failed, the ingredient you cannot find or the symptom you do not understand. You leave every session with an answer.",
      icon: "video",
    },
    {
      heading: "Monthly cook-along session",
      text: "Once a month you bake a complete recipe together with Leonor, live, step by step. You see every texture at every stage.",
      icon: "chef-hat",
    },
    {
      heading: "Every live session recorded",
      text: "Cannot make it? You watch the recording whenever you want, and your question is still answered in the session.",
      icon: "play-circle",
    },
    {
      heading: "Personal feedback on your recipes",
      text: "Send a photo or a recipe you are working on and get Leonor's specific notes on what to change.",
      icon: "message-square-text",
    },
    {
      heading: "Private student community",
      text: "Share your results, ask between sessions and learn from what other students are baking.",
      icon: "users",
    },
    {
      heading: "Direct messages between lives",
      text: "When something goes wrong between sessions, you write to Leonor and get guidance before the next one.",
      icon: "send",
    },
  ],
  rhythmTitle: "Your rhythm in the program",
  photoBadge: "Live · every month",
  photoCaption: "Your monthly session with Leonor. Bring the recipe, the photo or the question.",
  photoAlt: "Leonor in her kitchen, pouring a mixture into a bowl",
  rhythm: [
    { label: "Every month", text: "One live Q&A session with Leonor to answer your questions, and one cook-along baking a full recipe together." },
    { label: "Any day", text: "The community and direct messages." },
    { label: "For 12 months", text: "From the day you join." },
  ],
  footnote: "Live sessions take place on Zoom. The community lives in a private student group.",
} as const;

export const bonuses = {
  title: "You also get these, so you can start baking on day one",
  intro: "Four bonuses included with your enrolment.",
  eyebrow: "Bonuses",
  valueLabel: "value",
  items: [
    {
      number: "01",
      name: "DIY Recipes",
      value: 39,
      outcome: "You make your own staples at home and stop paying for ultra-processed versions.",
    },
    {
      number: "02",
      name: "Healthy Syrups, Fillings, Frostings and Creams",
      value: 49,
      outcome: "You finish every cake with a filling or frosting that is as healthy as the sponge. Includes the ebook.",
    },
    {
      number: "03",
      name: "Raw Vegan Desserts",
      value: 49,
      outcome: "You have a set of no-bake desserts for hot days, guests with restrictions and quick cravings. Includes the ebook.",
    },
    {
      number: "04",
      name: "Cakes, Desserts and Bread",
      value: 99,
      outcome: "You get complete, tested recipes to practise every technique from the modules. Includes the ebook.",
    },
  ],
  totalLabel: "Total value of the bonuses",
} as const;

export const testimonials = {
  title: "What students say after baking with Leonor",
  intro: "Real words from people who were where you are now.",
  fallbackAlt: "Messages from students of The Functional Desserts Program",
  eyebrow: "Students",
} as const;

export const about = {
  eyebrow: "Your mentor",
  title: "Who will be answering your questions every month",
  paragraphs: [
    "I'm Leonor Capristano. For more than ten years I worked as a professional baker and cake designer. Then food intolerances changed what I could eat, and every dessert I loved became a problem.",
    "I spent three years studying nutrition and became an Integrative Nutrition Health Coach, because I wanted to understand, not guess. Today I bake desserts that are gluten-free, dairy-free and refined-sugar-free, and they taste the way desserts should.",
    "I built this program so you can do the same. And I added a full year of live sessions because I remember exactly how it feels to stand in the kitchen with a failed cake and nobody to ask.",
  ],
  signature: "Leonor",
  credentials: [
    "10+ years as a professional baker and cake designer",
    "3 years of nutrition studies",
    "Integrative Nutrition Health Coach",
    "Lives with food intolerances and an autoimmune disease herself",
  ],
  portraitAlt: "Leonor Capristano in her kitchen",
} as const;

export const pricing = {
  eyebrow: "Enrolment",
  title: "Everything you get when you join",
  includes: [
    {
      heading: "12 months of live mentorship",
      text: "Monthly Q&A, monthly cook-along, recordings, personal feedback, private community and direct messages.",
      value: "Included",
      highlight: true,
    },
    {
      heading: "The complete program",
      text: "5 modules, 30+ video lessons, PDF guides, charts, quizzes and worksheets.",
      value: `€${PRICING.courseValue}`,
    },
    {
      heading: "4 bonuses",
      text: "DIY Recipes, Syrups and Frostings, Raw Vegan Desserts, Cakes Desserts and Bread, with ebooks.",
      value: `€${PRICING.bonusesValue}`,
    },
    {
      heading: "Lifetime access to every lesson",
      text: "Watch again whenever you need, including future updates.",
      value: "Included",
    },
    {
      heading: `${PRICING.guaranteeDays}-day money-back guarantee`,
      text: "Try it. If it is not for you, you get every cent back.",
      value: "Included",
    },
  ],
  totalValueLabel: "Value of the content and bonuses",
  totalValue: `€${PRICING.totalValueBeforeMentorship}`,
  totalValueNote: "plus a full year of mentorship",
  yourPriceLabel: "Your price",
  yourLaunchPriceLabel: "Your launch price",
  launchBadge: "Launch price",
  regularPriceLabel: "Regular price",
  oneTime: {
    label: "One payment",
    note: "Pay once, get everything today.",
  },
  plan: {
    label: "Payment plan",
  },
  ctaOpen: "Join the program",
  ctaWaitlist: "Join the waiting list",
  closedTitle: "Doors are closed right now",
  closedText:
    "Enrolment opens soon. Join the waiting list and you get first access and the launch price before anyone else.",
  closedTextWithDate: "Doors open on {date}. Join the waiting list and you get first access and the launch price.",
  guaranteeTitle: `${PRICING.guaranteeDays}-day money-back guarantee`,
  guaranteeText: `Try the program for ${PRICING.guaranteeDays} days. If it is not what you need, write to ${LINKS.supportEmail} and you get a full refund.`,
  secure: "Secure checkout. Prices in euros, VAT included where applicable.",
} as const;

/** `items` is a function because the payment plan answer depends on the launch state. */
export const faq = {
  title: "Questions you may still have",
  items: (launchPrice: boolean) => {
    const p = priceStrings(launchPrice);
    return [
    {
      q: "Do these desserts actually taste good?",
      a: "Yes. Every recipe in the program was tested on people who eat traditional desserts, including Leonor's own family. You learn how to adjust sweetness, texture and flavour until the result tastes the way you expect a dessert to taste.",
    },
    {
      q: "Are functional desserts really healthy?",
      a: "They are made with whole ingredients, without refined sugar, gluten or dairy, and you learn what each ingredient does in your body. You will still eat them in sensible portions, but you will not get the crash or the bloating you get from the traditional version.",
    },
    {
      q: "I have celiac disease, diabetes or allergies. Can I use these recipes?",
      a: "Yes. Every recipe is gluten-free, dairy-free and refined-sugar-free, and Module 3 teaches you how each ingredient behaves so you can adapt for your specific needs. If you have a medical condition, keep following your doctor's advice.",
    },
    {
      q: "Is it difficult to make functional desserts?",
      a: "No. It is different, not harder. Once you know the swaps and the ratios, which is exactly what the program teaches, a functional cake takes the same time as a traditional one.",
    },
    {
      q: "Are the ingredients hard to find or expensive?",
      a: "Most of them are in any supermarket today: oats, almonds, coconut, dates, cocoa, eggs. You will learn which ones are worth buying and which ones you can skip, so you stop wasting money on products you do not need.",
    },
    {
      q: "Do I need baking experience?",
      a: "No. Module 1 starts with the basics: tools, pans, temperatures and portions. If you have never baked, you start there. If you are experienced, you will move faster and get more out of Modules 4 and 5.",
    },
    {
      q: "When are the live sessions?",
      a: "There is one live Q&A session and one cook-along session every month, on Zoom. The day and time are announced inside the student community, and every session is recorded.",
    },
    {
      q: "What if I cannot attend a live session?",
      a: "You send your question in advance, Leonor answers it in the session, and you watch the recording whenever it suits you. You lose nothing.",
    },
    {
      q: "How long do I have access?",
      a: "The lessons, PDFs and bonuses are yours for life. The live mentorship (monthly sessions, cook-alongs, feedback, community and direct messages) lasts 12 months from the day you join.",
    },
    {
      q: "How do I get feedback on my own recipes?",
      a: "You post a photo or the recipe in the student community or send it to Leonor directly, and you get specific notes on what to change. You can also bring it to the next live session.",
    },
    {
      q: "How does the payment plan work?",
      a: launchPrice
        ? `At the launch price you pay ${p.oneTime} once, or ${p.installments} monthly payments of ${p.installment} (total ${p.planTotal}). The regular price is ${p.regularOneTime}, or ${p.regularPlan} (total ${p.regularPlanTotal}). You get full access from the first payment.`
        : `You can pay ${p.oneTime} once, or ${p.installments} monthly payments of ${p.installment} (total ${p.planTotal}). You get full access from the first payment.`,
    },
    {
      q: "What if it is not for me?",
      a: `You have ${PRICING.guaranteeDays} days to try the program. If it is not what you need, write to ${LINKS.supportEmail} and you get a full refund. No forms, no questions.`,
    },
  ];
  },
} as const;

export const leadMagnet = {
  eyebrow: "Free guide",
  title: "Not ready to wait? Start fixing your recipes today",
  text: "Download Indulge in Wellness: the 9 swaps that make healthy baking work, with the exact ratios, in a printable cheat sheet you can keep in your kitchen.",
  bullets: ["The 9 swaps with exact ratios", "Printable cheat sheet", "Free, straight to your inbox"],
  cta: "Send me the free guide",
  externalText: "Tell us where to send it and the guide lands in your inbox in a minute.",
  coverAlt: "Mockup of the free guide Indulge in Wellness: the cover with Leonor holding a plate of cacao bites, and a page of the Functional Baking Cheat Sheet",
} as const;

export const finalCta = {
  title: "Picture your next birthday cake",
  text: "Everyone at the table eats it. Nobody feels unwell afterwards. And you made it, knowing exactly why it worked.",
  imageAlt: "Leonor holding a white frosted cake on a cake stand",
  ctaWaitlist: "Join the waiting list",
  ctaOpen: "Join the program",
} as const;

export const forms = {
  firstName: "First name",
  firstNamePlaceholder: "Your first name",
  email: "Email",
  emailPlaceholder: "you@example.com",
  consent: "I agree to receive emails from Leonor's Sweet Creations and I have read the privacy policy.",
  privacyLinkText: "privacy policy",
  submitting: "Sending...",
  waitlistTitle: "Join the waiting list",
  waitlistText: "Be the first to know when doors open, and get the launch price.",
  waitlistButton: "Put me on the list",
  waitlistSuccessTitle: "You are on the list.",
  waitlistSuccessText: "Check your inbox for a confirmation from Leonor. You will hear from her before doors open.",
  guideSuccessTitle: "Your guide is on its way.",
  guideSuccessText: "Check your inbox in the next few minutes. If you do not see it, look in the promotions or spam folder.",
  errorGeneric: "Something went wrong on our side. Please try again in a moment.",
  errorEmail: "Please enter a valid email address.",
  errorConsent: "Please tick the box so we can email you.",
  spamFree: "No spam. You can unsubscribe with one click.",
} as const;

export const sticky = {
  waitlist: "Join the waiting list",
  open: "Join the program",
  regularPriceLabel: "Regular price",
  /** "€299 or 4 x €87.50" (regular) or, with the launch price active, the launch values. */
  priceNote: (launchPrice: boolean) => {
    const p = priceStrings(launchPrice);
    return `${p.oneTime} or ${p.plan}`;
  },
  /** Second line under the highlighted launch price. */
  launchPlanNote: (launchPrice: boolean) => {
    const p = priceStrings(launchPrice);
    return `or ${p.plan}, total ${p.planTotal}`;
  },
} as const;

export const cookies = {
  text: "This site uses cookies for analytics and to measure our ads. You choose.",
  accept: "Accept",
  reject: "Only essential",
  more: "Privacy policy",
} as const;

export const footer = {
  tagline: "Healthy functional desserts that taste the way desserts should.",
  rights: "Leonor's Sweet Creations. All rights reserved.",
  links: [
    { label: "Blog", href: LINKS.blog },
    { label: "Privacy policy", href: LINKS.privacy },
    { label: "Disclaimer", href: LINKS.disclaimer },
    { label: "Terms and conditions", href: LINKS.terms },
  ],
  support: `Questions? Write to ${LINKS.supportEmail}`,
  disclaimer:
    "The information on this page is for educational purposes and does not replace medical advice. Results depend on your practice and your body.",
} as const;
