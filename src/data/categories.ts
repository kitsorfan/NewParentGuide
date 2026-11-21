import type { Category } from './types'

export const categories: readonly Category[] = [
  {
    id: 'sleep',
    name: { el: 'Ύπνος', en: 'Sleep' },
    intro: {
      el: 'Ασφαλής ύπνος: σκληρό, επίπεδο στρώμα, σεντόνι με λάστιχο και τίποτα άλλο μέσα στην κούνια.',
      en: 'Safe sleep: a firm, flat mattress, a fitted sheet and nothing else in the cot.',
    },
  },
  {
    id: 'travel',
    name: { el: 'Βόλτα & αυτοκίνητο', en: 'Out & about' },
    intro: {
      el: 'Το κάθισμα αυτοκινήτου χρειάζεται από την πρώτη μέρα, για τη διαδρομή από το μαιευτήριο.',
      en: 'The car seat is needed from day one, for the drive home from the hospital.',
    },
  },
  {
    id: 'feeding',
    name: { el: 'Τάισμα', en: 'Feeding' },
    intro: {
      el: 'Οι ποσότητες εξαρτώνται από το αν θηλάζετε ή δίνετε ξένο γάλα. Ξεκινήστε με λίγα και συμπληρώστε.',
      en: 'Quantities depend on breastfeeding vs formula. Start small and top up.',
    },
  },
  {
    id: 'diapering',
    name: { el: 'Αλλαγή πάνας', en: 'Nappy changing' },
    intro: {
      el: 'Ένα νεογέννητο θέλει 8–12 αλλαγές την ημέρα, άρα περίπου 300 πάνες τον πρώτο μήνα.',
      en: 'A newborn needs 8–12 changes a day: roughly 300 nappies in the first month.',
    },
  },
  {
    id: 'bath',
    name: { el: 'Μπάνιο & περιποίηση', en: 'Bath & grooming' },
    intro: {
      el: '2–3 μπάνια την εβδομάδα αρκούν. Νερό γύρω στους 37 °C και ποτέ το μωρό μόνο του.',
      en: '2–3 baths a week is plenty. Water around 37 °C, and never leave baby alone.',
    },
  },
  {
    id: 'health',
    name: { el: 'Υγεία & ασφάλεια', en: 'Health & safety' },
    intro: {
      el: 'Ένα μικρό «φαρμακείο» έτοιμο πριν τη γέννα. Δοσολογίες πάντα από τον παιδίατρο.',
      en: 'A small first-aid kit ready before the birth. Doses always from your paediatrician.',
    },
  },
  {
    id: 'clothing',
    name: { el: 'Ρούχα (0–3 μηνών)', en: 'Clothes (0–3 months)' },
    intro: {
      el: 'Λίγα σε μέγεθος 50/56, τα περισσότερα σε 62. Πλύντε τα πριν τα φορέσει.',
      en: 'A few in size 50/56, most in 62. Wash everything before first wear.',
    },
  },
  {
    id: 'mom',
    name: { el: 'Για τη μαμά', en: 'For mum' },
    intro: {
      el: 'Η λοχεία θέλει κι αυτή προετοιμασία. Βάλτε τα στη βαλίτσα του μαιευτηρίου.',
      en: 'Recovery needs preparing for too. Pack these in the hospital bag.',
    },
  },
  {
    id: 'play',
    name: { el: 'Παιχνίδι & εξέλιξη', en: 'Play & development' },
    intro: {
      el: 'Τις πρώτες εβδομάδες το μωρό θέλει κυρίως εσάς. Αυτά μπορούν να περιμένουν.',
      en: 'In the first weeks your baby mostly wants you. These can wait.',
    },
  },
]
