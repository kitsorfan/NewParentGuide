import type { Localized } from '../i18n/types'

export const BAG_GROUP_ICONS = ['documents', 'labour', 'mum', 'baby', 'partner', 'home'] as const
export type BagGroupIcon = (typeof BAG_GROUP_ICONS)[number]

export interface BagItem {
  readonly id: string
  readonly name: Localized
  readonly note?: Localized
  /** Matching item on the shopping list, if any. */
  readonly itemId?: string
}

export interface BagGroup {
  readonly id: string
  readonly icon: BagGroupIcon
  readonly title: Localized
  readonly items: readonly BagItem[]
}

/** Before-you-pack tips. */
export const bagTips: readonly Localized[] = [
  {
    el: 'Έτοιμη βαλίτσα από την 36η εβδομάδα, δίπλα στην πόρτα ή στο αυτοκίνητο.',
    en: 'Have the bag ready by week 36, by the door or in the car.',
  },
  {
    el: 'Κάθε μαιευτήριο έχει τη δική του λίστα. Ρωτήστε τι δίνουν (πάνες, μωρομάντηλα, σερβιέτες, γάλα).',
    en: 'Every maternity hospital has its own list. Ask what they provide (nappies, wipes, pads, formula).',
  },
  {
    el: 'Βάλτε τα ρούχα του μωρού σε διάφανα σακουλάκια με ετικέτα, ένα για κάθε μέρα.',
    en: 'Pack baby’s clothes in clear, labelled bags, one per day.',
  },
  {
    el: 'Τα έγγραφα σε ξεχωριστό φάκελο, εύκολα προσβάσιμο.',
    en: 'Keep documents in a separate, easy-to-reach folder.',
  },
]

export const bagGroups: readonly BagGroup[] = [
  {
    id: 'documents',
    icon: 'documents',
    title: { el: 'Έγγραφα', en: 'Documents' },
    items: [
      {
        id: 'ids',
        name: {
          el: 'Ταυτότητες και των δύο γονέων',
          en: 'ID cards for both parents',
        },
        note: {
          el: 'Χρειάζονται και για την ψηφιακή δήλωση γέννησης.',
          en: 'Also needed for the digital birth registration.',
        },
      },
      {
        id: 'insurance',
        name: {
          el: 'ΑΜΚΑ και στοιχεία ασφάλισης (και ιδιωτικής, αν υπάρχει)',
          en: 'AMKA and insurance details (including private, if any)',
        },
      },
      {
        id: 'pregnancy-file',
        name: {
          el: 'Φάκελος εγκυμοσύνης: υπέρηχοι, αιματολογικές, ομάδα αίματος',
          en: 'Pregnancy file: scans, blood tests, blood group',
        },
      },
      {
        id: 'registration-details',
        name: {
          el: 'Κινητό, email και IBAN για τη δήλωση γέννησης',
          en: 'Mobile number, email and IBAN for the birth registration',
        },
      },
    ],
  },
  {
    id: 'labour',
    icon: 'labour',
    title: { el: 'Για τη μαμά: τοκετός', en: 'For mum: labour' },
    items: [
      {
        id: 'nightdresses',
        name: {
          el: '2–3 νυχτικά ή μπλουζάκια που ανοίγουν μπροστά',
          en: '2–3 nightdresses or tops that open at the front',
        },
        note: { el: 'Βολεύουν για τον θηλασμό.', en: 'Handy for breastfeeding.' },
      },
      {
        id: 'robe',
        name: { el: 'Ρόμπα και αντιολισθητικές παντόφλες', en: 'Robe and non-slip slippers' },
      },
      { id: 'socks-mum', name: { el: 'Ζεστές κάλτσες', en: 'Warm socks' } },
      {
        id: 'lip-balm',
        name: { el: 'Lip balm και λαστιχάκια μαλλιών', en: 'Lip balm and hair ties' },
        note: { el: 'Τα χείλη ξεραίνονται στον τοκετό.', en: 'Lips get dry during labour.' },
      },
      {
        id: 'water-snacks',
        name: {
          el: 'Μπουκάλι νερό με καλαμάκι και σνακ',
          en: 'Water bottle with a straw, and snacks',
        },
      },
      {
        id: 'charger',
        name: {
          el: 'Φορτιστής κινητού με μακρύ καλώδιο',
          en: 'Phone charger with a long cable',
        },
      },
    ],
  },
  {
    id: 'mum',
    icon: 'mum',
    title: { el: 'Για τη μαμά: μετά τη γέννα', en: 'For mum: after the birth' },
    items: [
      {
        id: 'pads',
        name: { el: 'Σερβιέτες λοχείας', en: 'Maternity pads' },
        itemId: 'maternity-pads',
      },
      {
        id: 'underwear',
        name: {
          el: 'Εσώρουχα μιας χρήσης ή βαμβακερά ψηλόμεσα',
          en: 'Disposable or high-waisted cotton underwear',
        },
        itemId: 'postpartum-underwear',
      },
      { id: 'bras', name: { el: 'Σουτιέν θηλασμού', en: 'Nursing bras' }, itemId: 'nursing-bra' },
      {
        id: 'breast-pads',
        name: { el: 'Επιθέματα στήθους', en: 'Breast pads' },
        itemId: 'nursing-pads',
      },
      { id: 'nipple', name: { el: 'Κρέμα θηλών', en: 'Nipple cream' }, itemId: 'nipple-cream' },
      {
        id: 'toiletries',
        name: {
          el: 'Είδη υγιεινής: οδοντόβουρτσα, σαμπουάν, πετσέτα',
          en: 'Toiletries: toothbrush, shampoo, towel',
        },
      },
      {
        id: 'going-home-mum',
        name: { el: 'Φαρδιά, άνετα ρούχα εξόδου', en: 'Loose, comfortable clothes to go home in' },
        note: {
          el: 'Η κοιλιά θα είναι ακόμα φουσκωμένη για μερικές εβδομάδες.',
          en: 'Your tummy will still be rounded for a few weeks.',
        },
      },
    ],
  },
  {
    id: 'baby',
    icon: 'baby',
    title: { el: 'Για το μωρό', en: 'For the baby' },
    items: [
      {
        id: 'bodysuits',
        name: { el: '3–4 κορμάκια (μέγεθος 50/56)', en: '3–4 bodysuits (size 50/56)' },
        itemId: 'bodysuits',
      },
      {
        id: 'sleepsuits',
        name: { el: '3–4 φορμάκια με πατουσάκι', en: '3–4 footed sleepsuits' },
        itemId: 'sleepsuits',
      },
      {
        id: 'hat-socks',
        name: { el: 'Σκουφάκι, καλτσάκια, γαντάκια', en: 'Hat, socks, scratch mittens' },
        itemId: 'hats',
      },
      {
        id: 'blanket',
        name: { el: 'Κουβέρτα αγκαλιάς', en: 'Receiving blanket' },
        itemId: 'blankets',
      },
      {
        id: 'outfit',
        name: { el: 'Σετ εξόδου μαιευτηρίου', en: 'Going-home outfit' },
        itemId: 'hospital-outfit',
      },
      {
        id: 'nappies',
        name: { el: 'Πάνες νεογέννητου και μωρομάντηλα', en: 'Newborn nappies and wipes' },
        note: {
          el: 'Ρωτήστε πρώτα αν τα δίνει το μαιευτήριο.',
          en: 'Check first whether the hospital provides them.',
        },
        itemId: 'diapers',
      },
      {
        id: 'muslins',
        name: { el: '2–3 μουσελίνες', en: '2–3 muslin squares' },
        itemId: 'muslins',
      },
    ],
  },
  {
    id: 'partner',
    icon: 'partner',
    title: { el: 'Για τον σύντροφο', en: 'For the birth partner' },
    items: [
      {
        id: 'clothes',
        name: {
          el: 'Αλλαξιά ρούχα και άνετα παπούτσια',
          en: 'A change of clothes and comfy shoes',
        },
      },
      { id: 'powerbank', name: { el: 'Powerbank και φορτιστές', en: 'Power bank and chargers' } },
      {
        id: 'coins',
        name: {
          el: 'Σνακ, νερό και ψιλά για αυτόματους πωλητές ή πάρκινγκ',
          en: 'Snacks, water and change for vending machines or parking',
        },
      },
      {
        id: 'contacts',
        name: { el: 'Λίστα με όσους θα ενημερώσετε', en: 'A list of people to call' },
      },
    ],
  },
  {
    id: 'home',
    icon: 'home',
    title: { el: 'Για την επιστροφή στο σπίτι', en: 'For the trip home' },
    items: [
      {
        id: 'car-seat',
        name: {
          el: 'Κάθισμα αυτοκινήτου, τοποθετημένο και δοκιμασμένο',
          en: 'Car seat, installed and tested',
        },
        note: {
          el: 'Χωρίς χοντρό μπουφάν κάτω από τους ιμάντες· κουβέρτα από πάνω.',
          en: 'No bulky coat under the straps; put a blanket on top.',
        },
        itemId: 'car-seat',
      },
      {
        id: 'cover',
        name: { el: 'Ποδόσακος ή κουβέρτα για το κρύο', en: 'Footmuff or blanket for the cold' },
        itemId: 'footmuff',
      },
      {
        id: 'baby-on-board',
        name: {
          el: 'Σήμα «Μωρό στο αυτοκίνητο» στο πίσω τζάμι',
          en: '“Baby on board” sign in the rear window',
        },
        itemId: 'baby-on-board',
      },
    ],
  },
]
