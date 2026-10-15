/**
 * Student testimonials already published by Leonor on the current sales page
 * (healthy.leonors.com) and recorded in her "Customer testimonials" sheet.
 * Text is verbatim apart from small typo fixes. Used when the Supabase
 * testimonials table is empty or not configured.
 */

import type { Testimonial } from "@/lib/leads-types";

export const localTestimonials: Testimonial[] = [
  {
    id: "maria-joao",
    name: "Maria João Barros Weiss",
    highlight: "Her classes are as much an entertainment as a very good learning experience.",
    text: "Leonor has a very positive energy and her classes are as much an entertainment as a very good learning experience. I learned lots of materials that can help and basics I didn't know before. I would definitely recommend Leonor's courses as my learning experience was very positive.",
    photo_url: null,
    sort_order: 1,
  },
  {
    id: "andrea",
    name: "Andrea Steinhauser",
    highlight: "Leonor taught me how to bake in a more healthy way and I've made progress.",
    text: "Leonor is great. Leonor taught me how to bake in a more healthy way and I've made progress. The classes were very clear and easy to understand and I got many very creative new ideas.",
    photo_url: null,
    sort_order: 2,
  },
  {
    id: "eva",
    name: "Eva Hellwig",
    highlight: "It felt like we were baking with a friend.",
    text: "I attended one of Leonor's courses two years ago and it was wonderful. We got a lot of help and it felt like we were baking with a friend. My baking skills developed a lot, now I can finally decorate cupcakes in an appealing way, I am no longer a beginner. I learned a lot and even after two years I can still do it. I was very very satisfied.",
    photo_url: null,
    sort_order: 3,
  },
  {
    id: "sigrid",
    name: "Sigrid Ziegler",
    highlight: "I learned a lot of things that I couldn't have learned from books.",
    text: "I got a gift card and then found the course so good that I have done more courses. Leonor explained everything in an understandable way and helped the participants when they were not doing so well. She made sure that everyone took home a beautiful cake. The courses were very well prepared. I learned a lot of things that I couldn't have learned from books, as it is important for me to be shown and then copy it. I was very satisfied with the courses.",
    photo_url: null,
    sort_order: 4,
  },
  {
    id: "marie-vivianne",
    name: "Marie-Vivianne Komarek",
    highlight: "Now I bake and decorate my own cakes all the time.",
    text: "I received one of Leonor's courses as a gift. Learning how to bake with Leonor was easy and now I bake and decorate my own cakes all the time. Leonor's course was very well structured and it was a very sociable day. For the first time, I was having fun and learning techniques that I will never forget and still use for all kinds of decorations. I was very satisfied and would love to do it again.",
    photo_url: null,
    sort_order: 5,
  },
  {
    id: "astrid",
    name: "Astrid Jungblut",
    highlight: "The recipe is heavenly.",
    text: "I saw her macarons with caramel and fleur de sel on TV and baked them several times. The recipe is heavenly. I then also participated in a macarons course to learn it properly and it was so much fun. It was fun to bake with others and learn about many variations of macarons. The macarons succeed reliably now and look more even. I enjoyed it a lot and it was nice to meet her in person too.",
    photo_url: null,
    sort_order: 6,
  },
];
