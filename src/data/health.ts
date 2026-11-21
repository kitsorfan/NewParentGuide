import type { Localized } from '../i18n/types'
import type { AgeOffset } from '../lib/dates'
import type { Source } from './types'

export const HEALTH_EVENT_KINDS = [
  'vaccine',
  'screening',
  'checkup',
  'supplement',
  'paperwork',
] as const
export type HealthEventKind = (typeof HEALTH_EVENT_KINDS)[number]

export interface HealthEvent {
  readonly id: string
  readonly kind: HealthEventKind
  readonly title: Localized
  readonly detail?: Localized
}

/** One point (or window) in time and everything due then. Offsets are from the birth/due date. */
export interface HealthVisit {
  readonly id: string
  readonly age: Localized
  readonly offset: AgeOffset
  /** End of the window, when the visit is a range (e.g. a pregnancy vaccine window). */
  readonly until?: AgeOffset
  readonly events: readonly HealthEvent[]
}

export interface VaccineColumn {
  readonly id: string
  readonly label: Localized
}

export interface VaccineRow {
  readonly id: string
  readonly name: Localized
  readonly abbreviation: string
  /** Column ids that have a dose. */
  readonly doses: readonly string[]
  readonly note?: Localized
}

/**
 * Greek National Childhood Immunisation Programme 2026 (Ministry of Health circular
 * Δ1α/Γ.Π.οικ.10774, 4/3/2026), the Adult Programme 2026–27 for pregnancy vaccines, the national
 * newborn screening programme (Ε.Π.Π.Ε.Ν.) and the Child Health Booklet visit schedule.
 */
export const healthVisits: readonly HealthVisit[] = [
  {
    id: 'pregnancy',
    age: { el: 'Στην εγκυμοσύνη', en: 'During pregnancy' },
    // 27 weeks of pregnancy = 13 weeks before a 40-week due date; 36+6 weeks = 3w1d before.
    offset: { weeks: -13 },
    until: { weeks: -3, days: -1 },
    events: [
      {
        id: 'tdap',
        kind: 'vaccine',
        title: {
          el: 'Εμβόλιο κοκκύτη (Tdap) για τη μαμά, 27–36 εβδομάδων',
          en: 'Whooping-cough vaccine (Tdap) for mum, 27–36 weeks',
        },
        detail: {
          el: 'Σε κάθε εγκυμοσύνη. Τα αντισώματα περνούν στο μωρό και το προστατεύουν πριν τα δικά του εμβόλια.',
          en: 'In every pregnancy. The antibodies pass to the baby and protect them before their own vaccines.',
        },
      },
      {
        id: 'rsv-maternal',
        kind: 'vaccine',
        title: {
          el: 'Εμβόλιο RSV για τη μαμά, 32–36+6 εβδομάδων',
          en: 'RSV vaccine for mum, 32–36+6 weeks',
        },
        detail: {
          el: 'Όταν ο τοκετός πέφτει 1 Νοεμβρίου – 31 Μαρτίου. Εναλλακτικά, το μωρό παίρνει αντίσωμα RSV μετά τη γέννα. Συζητήστε το με τον γυναικολόγο.',
          en: 'When the due date is 1 November – 31 March. Otherwise baby gets an RSV antibody after birth. Discuss it with your obstetrician.',
        },
      },
      {
        id: 'flu-maternal',
        kind: 'vaccine',
        title: { el: 'Αντιγριπικό εμβόλιο', en: 'Flu vaccine' },
        detail: {
          el: 'Συστήνεται σε κάθε στάδιο της εγκυμοσύνης και σε όσους θα έρχονται σε επαφή με το μωρό.',
          en: 'Recommended at any stage of pregnancy, and for everyone in close contact with the baby.',
        },
      },
    ],
  },
  {
    id: 'birth',
    age: { el: 'Στο μαιευτήριο', en: 'At the hospital' },
    offset: { days: 0 },
    events: [
      {
        id: 'discharge-exam',
        kind: 'checkup',
        title: { el: 'Παιδιατρική εξέταση εξόδου', en: 'Discharge examination' },
        detail: {
          el: 'Μάτια (ρόδινη ανταύγεια), ισχία, καρδιά (παλμική οξυμετρία), βάρος και ύψος. Καταγράφεται στο Βιβλιάριο Υγείας του Παιδιού.',
          en: 'Eyes (red reflex), hips, heart (pulse oximetry), weight and length. Recorded in the Child Health Booklet.',
        },
      },
      {
        id: 'vitamin-k',
        kind: 'supplement',
        title: { el: 'Βιταμίνη K', en: 'Vitamin K' },
        detail: {
          el: 'Δίνεται μετά τη γέννηση για την πρόληψη αιμορραγιών.',
          en: 'Given after birth to prevent bleeding problems.',
        },
      },
      {
        id: 'heel-prick',
        kind: 'screening',
        title: {
          el: 'Εξέταση από τη φτέρνα (Ε.Π.Π.Ε.Ν., «Guthrie»)',
          en: 'Heel-prick test (national newborn screening)',
        },
        detail: {
          el: 'Μετά την 3η μέρα και 48 ώρες σίτισης. Δωρεάν, για 33 παθήσεις (π.χ. φαινυλκετονουρία, υποθυρεοειδισμός, G6PD, κυστική ίνωση). Αν όλα είναι καλά, δεν θα σας ειδοποιήσουν· τα αποτελέσματα βγαίνουν και στο results.eppen.gr.',
          en: 'After day 3 and 48 hours of feeding. Free, for 33 conditions (e.g. PKU, hypothyroidism, G6PD, cystic fibrosis). No news is good news; results are also online at results.eppen.gr.',
        },
      },
      {
        id: 'hearing',
        kind: 'screening',
        title: { el: 'Έλεγχος ακοής (ωτοακουστικές εκπομπές)', en: 'Hearing screening' },
        detail: {
          el: 'Γρήγορη, ανώδυνη εξέταση πριν την έξοδο. Ρωτήστε αν έγινε.',
          en: 'A quick, painless test before discharge. Ask whether it was done.',
        },
      },
      {
        id: 'nirsevimab',
        kind: 'vaccine',
        title: { el: 'Αντίσωμα κατά του RSV (nirsevimab)', en: 'RSV antibody (nirsevimab)' },
        detail: {
          el: 'Για μωρά που γεννιούνται 1 Νοεμβρίου – 31 Μαρτίου, αν η μαμά δεν έκανε το εμβόλιο RSV: μία ένεση πριν την έξοδο ή την πρώτη εβδομάδα.',
          en: 'For babies born 1 November – 31 March whose mum didn’t have the RSV vaccine: one injection before discharge or in the first week.',
        },
      },
      {
        id: 'birth-registration',
        kind: 'paperwork',
        title: { el: 'Δήλωση γέννησης (έως 10 μέρες)', en: 'Birth registration (within 10 days)' },
        detail: {
          el: 'Γίνεται ψηφιακά από το μαιευτήριο. Βλέπε «Χαρτιά & γραφειοκρατία».',
          en: 'Done digitally at the hospital. See “Paperwork”.',
        },
      },
    ],
  },
  {
    id: 'week-1-2',
    age: { el: '1–2 εβδομάδων', en: '1–2 weeks' },
    offset: { weeks: 1 },
    events: [
      {
        id: 'visit-1-2w',
        kind: 'checkup',
        title: { el: 'Πρώτη επίσκεψη στον παιδίατρο', en: 'First paediatrician visit' },
        detail: {
          el: 'Βάρος, τάισμα, ίκτερος, ομφαλός, ισχία.',
          en: 'Weight, feeding, jaundice, cord stump, hips.',
        },
      },
      {
        id: 'vitamin-d',
        kind: 'supplement',
        title: { el: 'Βιταμίνη D σε σταγόνες', en: 'Vitamin D drops' },
        detail: {
          el: 'Συστήνεται σε μωρά που θηλάζουν αποκλειστικά, τουλάχιστον τους πρώτους 6 μήνες. Τη δόση τη δίνει ο παιδίατρος.',
          en: 'Recommended for exclusively breastfed babies, for at least the first 6 months. Your paediatrician gives the dose.',
        },
      },
    ],
  },
  {
    id: 'week-6',
    age: { el: '4–6 εβδομάδων', en: '4–6 weeks' },
    offset: { weeks: 4 },
    events: [
      {
        id: 'hip-ultrasound',
        kind: 'screening',
        title: { el: 'Υπέρηχος ισχίων', en: 'Hip ultrasound' },
        detail: {
          el: 'Το Βιβλιάριο Υγείας το συστήνει για μωρά με ισχιακή προβολή ή οικογενειακό ιστορικό (κυρίως κορίτσια). Πολλοί παιδίατροι το ζητούν σε όλα. Ρωτήστε τον δικό σας.',
          en: 'The Child Health Booklet recommends it for breech babies or a family history (mainly girls). Many paediatricians order it for all babies; ask yours.',
        },
      },
      {
        id: 'mum-check',
        kind: 'checkup',
        title: { el: 'Έλεγχος λοχείας για τη μαμά', en: 'Postnatal check for mum' },
        detail: {
          el: 'Στον γυναικολόγο, γύρω στις 6 εβδομάδες.',
          en: 'With the obstetrician, at around 6 weeks.',
        },
      },
    ],
  },
  {
    id: 'month-2',
    age: { el: '2 μηνών', en: '2 months' },
    offset: { months: 2 },
    events: [
      {
        id: 'visit-2m',
        kind: 'checkup',
        title: { el: 'Προληπτικός έλεγχος', en: 'Check-up' },
        detail: {
          el: 'Ανάπτυξη, ισχία, μάτια (στραβισμός), εξέλιξη.',
          en: 'Growth, hips, eyes (squint), development.',
        },
      },
      {
        id: 'vax-2m',
        kind: 'vaccine',
        title: {
          el: 'Εξαδύναμο (1η δόση), πνευμονιόκοκκος, μηνιγγιτιδόκοκκος B, ροταϊός (από το στόμα)',
          en: '6-in-1 (dose 1), pneumococcal, meningococcal B, rotavirus (oral)',
        },
        detail: {
          el: 'Το εξαδύναμο καλύπτει διφθερίτιδα, τέτανο, κοκκύτη, πολιομυελίτιδα, αιμόφιλο b και ηπατίτιδα B.',
          en: 'The 6-in-1 covers diphtheria, tetanus, whooping cough, polio, Hib and hepatitis B.',
        },
      },
    ],
  },
  {
    id: 'month-4',
    age: { el: '4 μηνών', en: '4 months' },
    offset: { months: 4 },
    events: [
      {
        id: 'visit-4m',
        kind: 'checkup',
        title: { el: 'Προληπτικός έλεγχος', en: 'Check-up' },
      },
      {
        id: 'vax-4m',
        kind: 'vaccine',
        title: {
          el: 'Εξαδύναμο (2η), πνευμονιόκοκκος (2η), μηνιγγιτιδόκοκκος B (2η), ροταϊός (2η)',
          en: '6-in-1 (2nd), pneumococcal (2nd), meningococcal B (2nd), rotavirus (2nd)',
        },
      },
    ],
  },
  {
    id: 'month-6',
    age: { el: '6 μηνών', en: '6 months' },
    offset: { months: 6 },
    events: [
      {
        id: 'visit-6m',
        kind: 'checkup',
        title: { el: 'Προληπτικός έλεγχος', en: 'Check-up' },
        detail: {
          el: 'Συζήτηση για τις πρώτες στερεές τροφές.',
          en: 'Talk about starting solid foods.',
        },
      },
      {
        id: 'vax-6m',
        kind: 'vaccine',
        title: { el: 'Εξαδύναμο (3η δόση)', en: '6-in-1 (3rd dose)' },
        detail: {
          el: 'Και 3η δόση ροταϊού, μόνο αν χρησιμοποιείται το εμβόλιο τριών δόσεων.',
          en: 'Plus a 3rd rotavirus dose, only with the three-dose vaccine.',
        },
      },
      {
        id: 'flu-child',
        kind: 'vaccine',
        title: { el: 'Αντιγριπικό κάθε φθινόπωρο', en: 'Flu vaccine every autumn' },
        detail: {
          el: 'Για όλα τα παιδιά από 6 μηνών έως 5 ετών. Την πρώτη χρονιά, 2 δόσεις με διαφορά 4 εβδομάδων.',
          en: 'For all children from 6 months to 5 years. The first season needs 2 doses 4 weeks apart.',
        },
      },
    ],
  },
  {
    id: 'month-9',
    age: { el: '9 μηνών', en: '9 months' },
    offset: { months: 9 },
    events: [
      { id: 'visit-9m', kind: 'checkup', title: { el: 'Προληπτικός έλεγχος', en: 'Check-up' } },
    ],
  },
  {
    id: 'month-10',
    age: { el: '10 μηνών', en: '10 months' },
    offset: { months: 10 },
    events: [
      {
        id: 'vax-10m',
        kind: 'vaccine',
        title: { el: 'Μηνιγγιτιδόκοκκος C (1 δόση)', en: 'Meningococcal C (1 dose)' },
      },
    ],
  },
  {
    id: 'month-12',
    age: { el: '12–15 μηνών', en: '12–15 months' },
    offset: { months: 12 },
    events: [
      { id: 'visit-12m', kind: 'checkup', title: { el: 'Προληπτικός έλεγχος', en: 'Check-up' } },
      {
        id: 'vax-12m',
        kind: 'vaccine',
        title: {
          el: 'Ιλαρά-παρωτίτιδα-ερυθρά (MMR), ανεμευλογιά, αναμνηστικά πνευμονιόκοκκου και μηνιγγιτιδόκοκκου B',
          en: 'MMR, chickenpox, pneumococcal and meningococcal B boosters',
        },
        detail: {
          el: 'Ο πνευμονιόκοκκος στους 12 μήνες. MMR και ανεμευλογιά μπορούν να γίνουν μαζί (MMRV).',
          en: 'Pneumococcal at 12 months. MMR and chickenpox can be combined (MMRV).',
        },
      },
    ],
  },
  {
    id: 'month-18',
    age: { el: '15–18 μηνών', en: '15–18 months' },
    offset: { months: 15 },
    events: [
      {
        id: 'visit-18m',
        kind: 'checkup',
        title: { el: 'Προληπτικός έλεγχος (18 μηνών)', en: 'Check-up (18 months)' },
      },
      {
        id: 'vax-18m',
        kind: 'vaccine',
        title: {
          el: 'Αναμνηστικό διφθερίτιδας-τετάνου-κοκκύτη-πολιομυελίτιδας και αιμόφιλου',
          en: 'Diphtheria-tetanus-whooping cough-polio and Hib booster',
        },
        detail: {
          el: 'Συνήθως ως πενταδύναμο. Ηπατίτιδα B: η 3η δόση γίνεται έως τους 18 μήνες.',
          en: 'Usually as a 5-in-1. Hepatitis B: the 3rd dose is due by 18 months.',
        },
      },
    ],
  },
  {
    id: 'year-2',
    age: { el: '2–3 ετών', en: '2–3 years' },
    offset: { months: 24 },
    events: [
      { id: 'visit-2y', kind: 'checkup', title: { el: 'Προληπτικός έλεγχος', en: 'Check-up' } },
      {
        id: 'vax-2y',
        kind: 'vaccine',
        title: {
          el: 'MMR και ανεμευλογιά (2η δόση), ηπατίτιδα A (2 δόσεις)',
          en: 'MMR and chickenpox (2nd dose), hepatitis A (2 doses)',
        },
        detail: {
          el: 'MMR/ανεμευλογιά στους 24–35 μήνες. Ηπατίτιδα A: 2 δόσεις με διαφορά 6 μηνών, σε ηλικία 2–6 ετών. Αναμνηστικά διφθερίτιδας-τετάνου-κοκκύτη-πολιομυελίτιδας ξανά στα 4–6 χρόνια.',
          en: 'MMR/chickenpox at 24–35 months. Hepatitis A: 2 doses 6 months apart, between ages 2 and 6. Diphtheria-tetanus-whooping cough-polio boosters again at 4–6 years.',
        },
      },
    ],
  },
]

export const vaccineColumns: readonly VaccineColumn[] = [
  { id: 'birth', label: { el: 'Γέννηση', en: 'Birth' } },
  { id: '2m', label: { el: '2 μ.', en: '2 m' } },
  { id: '4m', label: { el: '4 μ.', en: '4 m' } },
  { id: '6m', label: { el: '6 μ.', en: '6 m' } },
  { id: '10m', label: { el: '10 μ.', en: '10 m' } },
  { id: '12m', label: { el: '12–15 μ.', en: '12–15 m' } },
  { id: '18m', label: { el: '15–18 μ.', en: '15–18 m' } },
  { id: '2y', label: { el: '2–3 ετ.', en: '2–3 y' } },
]

export const vaccineRows: readonly VaccineRow[] = [
  {
    id: 'rsv',
    name: { el: 'Αντίσωμα RSV', en: 'RSV antibody' },
    abbreviation: 'nirsevimab',
    doses: ['birth'],
    note: {
      el: 'Μωρά Νοεμβρίου–Μαρτίου, αν η μαμά δεν εμβολιάστηκε',
      en: 'November–March babies, if mum wasn’t vaccinated',
    },
  },
  {
    id: 'hexa',
    name: {
      el: 'Εξαδύναμο (διφθερίτιδα, τέτανος, κοκκύτης, πολιο, αιμόφιλος b, ηπατίτιδα B)',
      en: '6-in-1 (diphtheria, tetanus, whooping cough, polio, Hib, hepatitis B)',
    },
    abbreviation: 'DTaP-IPV-Hib-HepB',
    doses: ['2m', '4m', '6m'],
  },
  {
    id: 'booster',
    name: { el: 'Αναμνηστικό (πενταδύναμο)', en: 'Booster (5-in-1)' },
    abbreviation: 'DTaP-IPV-Hib',
    doses: ['18m'],
    note: { el: 'Ξανά στα 4–6 χρόνια', en: 'Again at 4–6 years' },
  },
  {
    id: 'pcv',
    name: { el: 'Πνευμονιόκοκκος', en: 'Pneumococcal' },
    abbreviation: 'PCV',
    doses: ['2m', '4m', '12m'],
  },
  {
    id: 'menb',
    name: { el: 'Μηνιγγιτιδόκοκκος B', en: 'Meningococcal B' },
    abbreviation: 'MenB',
    doses: ['2m', '4m', '12m'],
  },
  {
    id: 'rota',
    name: { el: 'Ροταϊός (από το στόμα)', en: 'Rotavirus (oral)' },
    abbreviation: 'RV',
    doses: ['2m', '4m', '6m'],
    note: { el: '3η δόση μόνο με το RV5', en: '3rd dose only with RV5' },
  },
  {
    id: 'menc',
    name: { el: 'Μηνιγγιτιδόκοκκος C', en: 'Meningococcal C' },
    abbreviation: 'MenC',
    doses: ['10m'],
  },
  {
    id: 'mmr',
    name: { el: 'Ιλαρά-παρωτίτιδα-ερυθρά', en: 'Measles-mumps-rubella' },
    abbreviation: 'MMR',
    doses: ['12m', '2y'],
  },
  {
    id: 'var',
    name: { el: 'Ανεμευλογιά', en: 'Chickenpox' },
    abbreviation: 'VAR',
    doses: ['12m', '2y'],
  },
  {
    id: 'hepa',
    name: { el: 'Ηπατίτιδα A', en: 'Hepatitis A' },
    abbreviation: 'HepA',
    doses: ['2y'],
    note: { el: '2 δόσεις, σε ηλικία 2–6 ετών', en: '2 doses, between ages 2 and 6' },
  },
  {
    id: 'flu',
    name: { el: 'Γρίπη (κάθε χρόνο)', en: 'Flu (every year)' },
    abbreviation: 'Infl',
    doses: ['6m'],
    note: { el: 'Κάθε φθινόπωρο, 6 μηνών–5 ετών', en: 'Every autumn, 6 months–5 years' },
  },
]

export const paperwork: readonly HealthEvent[] = [
  {
    id: 'digital-registration',
    kind: 'paperwork',
    title: {
      el: 'Δήλωση γέννησης στο μαιευτήριο (έως 10 μέρες)',
      en: 'Birth registration at the hospital (within 10 days)',
    },
    detail: {
      el: 'Και οι δύο γονείς, με ταυτότητες, κινητό, email και ελληνικό IBAN. Βγαίνουν αυτόματα η ληξιαρχική πράξη, ο ΑΜΚΑ του μωρού, η εγγραφή στην ασφάλιση και η αίτηση για το επίδομα γέννησης.',
      en: 'Both parents, with ID cards, a mobile number, email and a Greek IBAN. The birth certificate, baby’s AMKA, health-insurance registration and the birth-allowance application are all created automatically.',
    },
  },
  {
    id: 'naming',
    kind: 'paperwork',
    title: { el: 'Ονοματοδοσία', en: 'Registering the name' },
    detail: {
      el: 'Ξεχωριστά από τη δήλωση γέννησης: στο ληξιαρχείο, ηλεκτρονικά στο gov.gr ή με τη βάπτιση. Δωρεάν και χωρίς προθεσμία, αλλά δεν αλλάζει χωρίς δικαστική απόφαση.',
      en: 'Separate from birth registration: at the registry office, online on gov.gr, or through the baptism. Free and with no deadline, but it can’t be changed without a court decision.',
    },
  },
  {
    id: 'birth-allowance',
    kind: 'paperwork',
    title: { el: 'Επίδομα γέννησης (ΟΠΕΚΑ)', en: 'Birth allowance (OPEKA)' },
    detail: {
      el: '2.400 € για το 1ο παιδί, σε δύο δόσεις, με ισοδύναμο οικογενειακό εισόδημα έως 40.000 €. Η αίτηση γίνεται αυτόματα με την ψηφιακή δήλωση, αλλιώς ηλεκτρονικά μέσα σε 3 μήνες.',
      en: '€2,400 for a first child, paid in two instalments, for equivalised family income up to €40,000. The application is automatic with the digital registration; otherwise apply online within 3 months.',
    },
  },
  {
    id: 'health-booklet',
    kind: 'paperwork',
    title: { el: 'Βιβλιάριο Υγείας του Παιδιού', en: 'Child Health Booklet' },
    detail: {
      el: 'Σας το δίνουν στο μαιευτήριο. Παίρνετέ το σε κάθε επίσκεψη και κάθε εμβόλιο.',
      en: 'You get it at the hospital. Bring it to every check-up and vaccination.',
    },
  },
]

export const healthSources: readonly Source[] = [
  {
    id: 'moh-schedule-2026',
    topic: 'health',
    title: {
      el: 'Εθνικό Πρόγραμμα Εμβολιασμών Παιδιών και Εφήβων 2026',
      en: 'National Childhood Immunisation Programme 2026',
    },
    publisher: 'Υπουργείο Υγείας',
    url: 'https://www.moh.gov.gr/articles/health/dieythynsh-dhmosias-ygieinhs/emboliasmoi/ethniko-programma-emboliasmwn-epe-paidiwn-kai-efhbwn/14081-ethniko-programma-emboliasmwn-paidiwn-kai-efhbwn-2026-xronodiagramma-kai-systaseis',
    lang: 'el',
  },
  {
    id: 'moh-adult-2026',
    topic: 'health',
    title: {
      el: 'Εθνικό Πρόγραμμα Εμβολιασμών Ενηλίκων 2026–2027 (εμβόλια εγκυμοσύνης)',
      en: 'National Adult Immunisation Programme 2026–2027 (pregnancy vaccines)',
    },
    publisher: 'Υπουργείο Υγείας',
    url: 'https://www.moh.gov.gr/articles/health/dieythynsh-dhmosias-ygieinhs/emboliasmoi/ethniko-programma-emboliasmwn-epe-enhlikwn/14936-laquo-ethniko-programma-emboliasmwn-enhlikwn-2026-2027-xronodiagramma-kai-systaseis-raquo',
    lang: 'el',
  },
  {
    id: 'eppen-expanded',
    topic: 'health',
    title: {
      el: 'Διευρυμένος προληπτικός έλεγχος νεογνών (33 παθήσεις)',
      en: 'Expanded newborn screening (33 conditions)',
    },
    publisher: 'Ε.Π.Π.Ε.Ν. – Ινστιτούτο Υγείας του Παιδιού',
    url: 'https://www.eppen.gr/expandedscreening/',
    lang: 'el',
  },
  {
    id: 'eppen-parents',
    topic: 'health',
    title: { el: 'Πληροφορίες για νέους γονείς', en: 'Information for new parents' },
    publisher: 'Ε.Π.Π.Ε.Ν. – Ινστιτούτο Υγείας του Παιδιού',
    url: 'https://www.eppen.gr/new_parents/',
    lang: 'el',
  },
  {
    id: 'eppen-results',
    topic: 'health',
    title: {
      el: 'Αποτελέσματα εξέτασης από τη φτέρνα',
      en: 'Heel-prick test results',
    },
    publisher: 'Ε.Π.Π.Ε.Ν.',
    url: 'https://results.eppen.gr/results/',
    lang: 'el',
  },
  {
    id: 'child-health-booklet',
    topic: 'health',
    title: { el: 'Βιβλιάριο Υγείας Παιδιού (PDF)', en: 'Child Health Booklet (PDF)' },
    publisher: 'Υπουργείο Υγείας',
    url: 'https://moh.gov.gr/articles/health/dieythynsh-prwtobathmias-frontidas-ygeias/draseis-kai-programmata-agwghs-ygeias/oikogeneiakos-programmatismos/4392-bibliario-ygeias-paidioy?fdl=10824',
    lang: 'el',
  },
  {
    id: 'gov-birth-registration',
    topic: 'health',
    title: { el: 'Ψηφιακή δήλωση γέννησης', en: 'Digital birth registration' },
    publisher: 'gov.gr',
    url: 'https://www.gov.gr/org/ypes/gennese/birthregistration',
    lang: 'el',
  },
  {
    id: 'gov-birth-allowance',
    topic: 'health',
    title: { el: 'Επίδομα γέννησης', en: 'Birth allowance' },
    publisher: 'gov.gr – ΟΠΕΚΑ',
    url: 'https://www.gov.gr/org/opeka/gennese/epidoma-genneses',
    lang: 'el',
  },
  {
    id: 'mitos-naming',
    topic: 'health',
    title: { el: 'Ονοματοδοσία ανηλίκου', en: 'Registering a child’s name' },
    publisher: 'mitos.gov.gr',
    url: 'https://mitos.gov.gr/index.php/%CE%94%CE%94:%CE%9F%CE%BD%CE%BF%CE%BC%CE%B1%CF%84%CE%BF%CE%B4%CE%BF%CF%83%CE%AF%CE%B1_%CE%B1%CE%BD%CE%B7%CE%BB%CE%AF%CE%BA%CE%BF%CF%85',
    lang: 'el',
  },
]
