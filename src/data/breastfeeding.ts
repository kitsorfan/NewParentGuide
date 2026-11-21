import type { Localized } from '../i18n/types'
import type { AgeRange } from '../lib/age'
import type { CardIcon, InfoCard } from './types'

/**
 * The breastfeeding guide. Based on WHO, NHS, UNICEF UK Baby Friendly and the Academy of
 * Breastfeeding Medicine (mastitis protocol #36, milk-storage protocol #8). See the Sources page.
 */

export interface StomachSize {
  readonly id: string
  readonly age: Localized
  readonly like: Localized
  readonly volume: string
  /** Drawn diameter in px, roughly proportional to the cube root of the volume. */
  readonly size: number
}

export interface FeedingPosition {
  readonly id: string
  readonly name: Localized
  readonly text: Localized
}

export const POO_KINDS = ['meconium', 'changing', 'yellow'] as const
export type PooKind = (typeof POO_KINDS)[number]

/** One row of the "is baby getting enough?" nappy chart. */
export interface NappyRow extends AgeRange {
  readonly age: Localized
  /** Minimum wet nappies a day (drawn as that many drops). */
  readonly wet: number
  readonly wetText: Localized
  readonly poo: PooKind
  readonly pooText: Localized
}

export interface FeedingProblem {
  readonly id: string
  readonly title: Localized
  readonly signs: Localized
  readonly helps: readonly Localized[]
  /** When to get it checked. */
  readonly doctor?: Localized
}

export interface StorageRule {
  readonly id: string
  readonly icon: CardIcon
  readonly place: Localized
  readonly temperature: Localized
  readonly time: Localized
  readonly note?: Localized
}

export interface SupportContact {
  readonly id: string
  readonly name: Localized
  readonly detail: Localized
  readonly phone?: string
  readonly url?: string
}

export const firstDaysCards: readonly InfoCard[] = [
  {
    id: 'skin-to-skin',
    icon: 'skin',
    title: { el: 'Δέρμα με δέρμα', en: 'Skin to skin' },
    points: [
      {
        el: 'Από την πρώτη ώρα μετά τη γέννα, και μετά από καισαρική όταν γίνεται. Το μωρό συχνά βρίσκει μόνο του το στήθος.',
        en: 'From the first hour after birth, and after a caesarean when possible. Babies often find the breast by themselves.',
      },
      {
        el: 'Κρατά το μωρό ζεστό και ήρεμο, και βοηθά να ξεκινήσει το γάλα.',
        en: 'It keeps baby warm and calm, and helps your milk get going.',
      },
      {
        el: 'Ζητήστε από τη μαία να δει ένα τάισμα και να σας βοηθήσει με το πιάσιμο πριν φύγετε από το μαιευτήριο.',
        en: 'Ask the midwife to watch a feed and help with the latch before you leave the hospital.',
      },
    ],
  },
  {
    id: 'colostrum',
    icon: 'droplet',
    title: { el: 'Πρωτόγαλα, και μετά γάλα', en: 'Colostrum, then milk' },
    points: [
      {
        el: 'Τις πρώτες μέρες βγαίνει λίγο, πηχτό, κιτρινωπό πρωτόγαλα, γεμάτο αντισώματα. Είναι ακριβώς όσο χρειάζεται το μωρό.',
        en: 'In the first days you make small amounts of thick, yellowish colostrum, full of antibodies. It is exactly what baby needs.',
      },
      {
        el: 'Το γάλα «κατεβαίνει» συνήθως 2–4 μέρες μετά τη γέννα (λίγο αργότερα μετά από καισαρική): το στήθος γίνεται πιο γεμάτο, ζεστό και βαρύ.',
        en: 'Your milk usually comes in 2–4 days after the birth (a little later after a caesarean): breasts feel fuller, warmer and heavier.',
      },
    ],
  },
  {
    id: 'on-cue',
    icon: 'clock',
    title: { el: 'Συχνά, όποτε το ζητά', en: 'Often, whenever baby asks' },
    points: [
      {
        el: '8–12 ή και περισσότερα ταΐσματα το 24ωρο, και τη νύχτα.',
        en: '8–12 or more feeds in 24 hours, including at night.',
      },
      {
        el: 'Σημάδια πείνας: γυρίζει το κεφάλι ψάχνοντας, βάζει τα χέρια στο στόμα, ρουφάει, μουσουδίζει. Το κλάμα είναι αργό σημάδι.',
        en: 'Hunger cues: turning the head and rooting, hands to mouth, sucking and lip-smacking. Crying is a late sign.',
      },
      {
        el: 'Τις πρώτες μέρες, ξυπνήστε το αν έχουν περάσει πάνω από 3 ώρες από το προηγούμενο τάισμα.',
        en: 'In the first days, wake baby if it has been more than 3 hours since the last feed.',
      },
    ],
  },
  {
    id: 'a-feed',
    icon: 'timer',
    title: { el: 'Ένα τάισμα', en: 'A feed' },
    points: [
      {
        el: 'Αφήστε το να τελειώσει το πρώτο στήθος (αφήνει μόνο του τη θηλή) και μετά προσφέρετε το δεύτερο.',
        en: 'Let baby finish the first breast (they come off by themselves), then offer the second.',
      },
      {
        el: 'Κρατά συνήθως 10–40 λεπτά· κάθε μωρό έχει τον ρυθμό του.',
        en: 'It usually lasts 10–40 minutes; every baby has their own rhythm.',
      },
      {
        el: 'Τα συνεχόμενα βραδινά ταΐσματα για ώρες (cluster feeding) είναι φυσιολογικά και δεν σημαίνουν ότι δεν έχετε γάλα.',
        en: 'Feeding on and off for hours in the evening (cluster feeding) is normal and doesn’t mean you’re low on milk.',
      },
    ],
  },
]

export const stomachSizes: readonly StomachSize[] = [
  {
    id: 'day-1',
    age: { el: '1η μέρα', en: 'Day 1' },
    like: { el: 'σαν κεράσι', en: 'a cherry' },
    volume: '5–7 ml',
    size: 22,
  },
  {
    id: 'day-3',
    age: { el: '3η μέρα', en: 'Day 3' },
    like: { el: 'σαν καρύδι', en: 'a walnut' },
    volume: '22–27 ml',
    size: 34,
  },
  {
    id: 'week-1',
    age: { el: '1 εβδομάδα', en: '1 week' },
    like: { el: 'σαν βερίκοκο', en: 'an apricot' },
    volume: '45–60 ml',
    size: 44,
  },
  {
    id: 'month-1',
    age: { el: '1 μήνας', en: '1 month' },
    like: { el: 'σαν αυγό', en: 'an egg' },
    volume: '80–150 ml',
    size: 56,
  },
]

export const latchSteps: readonly Localized[] = [
  {
    el: 'Βολευτείτε, με την πλάτη στηριγμένη και τους ώμους χαλαρούς. Φέρτε το μωρό στο στήθος, όχι το στήθος στο μωρό.',
    en: 'Get comfortable, back supported and shoulders relaxed. Bring baby to the breast, not the breast to baby.',
  },
  {
    el: 'Το σώμα του κολλητά στο δικό σας, κοιλιά με κοιλιά, με αυτί, ώμο και γοφό σε μια ευθεία.',
    en: 'Baby’s body close to yours, tummy to tummy, with ear, shoulder and hip in a straight line.',
  },
  {
    el: 'Η μύτη του απέναντι από τη θηλή, με το κεφάλι ελαφρώς προς τα πίσω.',
    en: 'Nose opposite the nipple, with the head tilted slightly back.',
  },
  {
    el: 'Περιμένετε να ανοίξει πολύ το στόμα, σαν χασμουρητό. Ακουμπήστε τη θηλή στο πάνω χείλος για να το ενθαρρύνετε.',
    en: 'Wait for a wide-open mouth, like a yawn. Brush the nipple against the top lip to encourage it.',
  },
  {
    el: 'Φέρτε το γρήγορα στο στήθος, πρώτα το πηγούνι, ώστε να πάρει μεγάλη μπουκιά από τη θηλαία άλω και όχι μόνο τη θηλή.',
    en: 'Bring baby on quickly, chin first, so they take a big mouthful of the areola, not just the nipple.',
  },
  {
    el: 'Αν πονάει μετά τα πρώτα δευτερόλεπτα, βάλτε καθαρό δάχτυλο στη γωνία του στόματος για να σπάσει το κενό, και ξαναδοκιμάστε.',
    en: 'If it still hurts after the first few seconds, slip a clean finger into the corner of baby’s mouth to break the suction, and try again.',
  },
]

export const latchSigns: readonly Localized[] = [
  {
    el: 'Το πηγούνι ακουμπά το στήθος και η μύτη είναι ελεύθερη.',
    en: 'The chin touches the breast and the nose is clear.',
  },
  {
    el: 'Το στόμα είναι ορθάνοιχτο και τα χείλη γυρισμένα προς τα έξω.',
    en: 'The mouth is wide open and the lips are turned out.',
  },
  {
    el: 'Φαίνεται περισσότερη θηλαία άλω πάνω από το πάνω χείλος παρά κάτω από το κάτω.',
    en: 'More of the areola shows above the top lip than below the bottom lip.',
  },
  {
    el: 'Τα μάγουλα είναι στρογγυλά, όχι βαθουλωτά.',
    en: 'The cheeks are full and round, not sucked in.',
  },
  {
    el: 'Ρουφάει αργά και ρυθμικά, με παύσεις, και ακούτε ή βλέπετε να καταπίνει.',
    en: 'Slow, rhythmic sucks with pauses, and you can hear or see swallowing.',
  },
  {
    el: 'Δεν πονάει, και η θηλή βγαίνει στρογγυλή, όχι πλακωμένη.',
    en: 'It doesn’t hurt, and the nipple comes out round, not flattened.',
  },
]

export const feedingPositions: readonly FeedingPosition[] = [
  {
    id: 'cross-cradle',
    name: { el: 'Χιαστί αγκαλιά', en: 'Cross-cradle hold' },
    text: {
      el: 'Στηρίζετε το κεφάλι με το αντίθετο χέρι. Ιδανική τις πρώτες μέρες και για μικρά μωρά.',
      en: 'You support the head with the opposite hand. Ideal in the first days and for small babies.',
    },
  },
  {
    id: 'cradle',
    name: { el: 'Κλασική αγκαλιά', en: 'Cradle hold' },
    text: {
      el: 'Η πιο γνωστή. Πιο εύκολη όταν έχετε πάρει τον αέρα του θηλασμού.',
      en: 'The best known. Easier once you have the hang of feeding.',
    },
  },
  {
    id: 'rugby',
    name: { el: 'Θέση «ράγκμπι» (μασχάλης)', en: 'Rugby (football) hold' },
    text: {
      el: 'Το μωρό στο πλάι σας, κάτω από το μπράτσο. Καλή μετά από καισαρική, για δίδυμα ή για μεγάλο στήθος.',
      en: 'Baby at your side, under your arm. Good after a caesarean, for twins or for larger breasts.',
    },
  },
  {
    id: 'side-lying',
    name: { el: 'Ξαπλωτή στο πλάι', en: 'Lying on your side' },
    text: {
      el: 'Για ξεκούραση και μετά από καισαρική. Αν νυστάζετε, βάλτε μετά το μωρό στην κούνια του.',
      en: 'For resting and after a caesarean. If you feel sleepy, put baby back in their cot afterwards.',
    },
  },
  {
    id: 'laid-back',
    name: { el: 'Ημι-ξαπλωτή', en: 'Laid-back' },
    text: {
      el: 'Γέρνετε πίσω και το μωρό είναι μπρούμυτα πάνω σας. Αξιοποιεί τα ένστικτά του και βοηθά όταν το γάλα τρέχει γρήγορα.',
      en: 'You lean back with baby tummy-down on you. It uses baby’s instincts and helps when your milk flows fast.',
    },
  },
]

/** UNICEF UK Baby Friendly / NHS. Day 1 is the day of birth. */
export const nappyChart: readonly NappyRow[] = [
  {
    id: 'days-1-2',
    age: { el: 'Μέρα 1–2', en: 'Days 1–2' },
    from: { days: 0 },
    to: { days: 2 },
    wet: 1,
    wetText: { el: '1–2 ή περισσότερες', en: '1–2 or more' },
    poo: 'meconium',
    pooText: {
      el: '1 ή περισσότερες, μαύρες-πράσινες και κολλώδεις (μηκώνιο)',
      en: '1 or more, black-green and sticky (meconium)',
    },
  },
  {
    id: 'days-3-4',
    age: { el: 'Μέρα 3–4', en: 'Days 3–4' },
    from: { days: 2 },
    to: { days: 4 },
    wet: 3,
    wetText: { el: '3 ή περισσότερες, πιο βαριές', en: '3 or more, getting heavier' },
    poo: 'changing',
    pooText: {
      el: '2 ή περισσότερες, πιο μαλακές, καφέ-πράσινες',
      en: '2 or more, softer, brown-green',
    },
  },
  {
    id: 'days-5-6',
    age: { el: 'Μέρα 5–6', en: 'Days 5–6' },
    from: { days: 4 },
    to: { days: 6 },
    wet: 5,
    wetText: { el: '5 ή περισσότερες, βαριές', en: '5 or more, heavy' },
    poo: 'yellow',
    pooText: { el: '2 ή περισσότερες, κίτρινες και μαλακές', en: '2 or more, yellow and soft' },
  },
  {
    id: 'weeks-1-4',
    age: { el: '1–4 εβδομάδων', en: '1–4 weeks' },
    from: { days: 6 },
    to: { weeks: 4 },
    wet: 6,
    wetText: { el: '6 ή περισσότερες, βαριές', en: '6 or more, heavy' },
    poo: 'yellow',
    pooText: {
      el: '2 ή περισσότερες, κίτρινες, νερουλές, «με σποράκια», τουλάχιστον όσο ένα κέρμα των 2 €',
      en: '2 or more, yellow, runny and “seedy”, at least the size of a €2 coin',
    },
  },
]

export const enoughSigns: readonly Localized[] = [
  {
    el: 'Χάνει λίγο βάρος τις πρώτες μέρες (συνήθως λιγότερο από 10%) και το ξαναπιάνει μέσα σε 2 εβδομάδες.',
    en: 'Loses a little weight in the first days (usually less than 10%) and regains it within 2 weeks.',
  },
  {
    el: 'Τρώει 8 ή περισσότερες φορές το 24ωρο, και ακούτε ή βλέπετε να καταπίνει.',
    en: 'Feeds 8 or more times in 24 hours, and you can hear or see swallowing.',
  },
  {
    el: 'Είναι ήρεμο μετά τα περισσότερα ταΐσματα, και ξύπνιο και ζωηρό όταν δεν κοιμάται.',
    en: 'Seems content after most feeds, and alert when awake.',
  },
  {
    el: 'Το στήθος σας είναι πιο μαλακό μετά το τάισμα.',
    en: 'Your breasts feel softer after a feed.',
  },
]

export const feedingProblems: readonly FeedingProblem[] = [
  {
    id: 'sore-nipples',
    title: { el: 'Πονεμένες ή σκασμένες θηλές', en: 'Sore or cracked nipples' },
    signs: {
      el: 'Λίγη ευαισθησία τις πρώτες μέρες είναι συνηθισμένη. Πόνος σε όλο το τάισμα, ή θηλή πλακωμένη στο τέλος, σημαίνει ότι το πιάσιμο θέλει διόρθωση.',
      en: 'Some tenderness in the first days is common. Pain through the whole feed, or a flattened nipple afterwards, means the latch needs work.',
    },
    helps: [
      {
        el: 'Ξαναπιάστε: σπάστε το κενό με το δάχτυλο και ξεκινήστε από την αρχή, με το στόμα ορθάνοιχτο.',
        en: 'Re-latch: break the suction with a finger and start again with a wide-open mouth.',
      },
      { el: 'Αλλάζετε θέσεις θηλασμού.', en: 'Vary your feeding positions.' },
      {
        el: 'Μετά το τάισμα, αφήστε λίγες σταγόνες γάλα να στεγνώσουν στη θηλή. Μια κρέμα λανολίνης βοηθά επίσης.',
        en: 'After feeds, let a few drops of milk dry on the nipple. A lanolin cream helps too.',
      },
    ],
    doctor: {
      el: 'Αν ματώνουν ή δεν βελτιώνονται σε λίγες μέρες, ζητήστε να ελεγχθεί το πιάσιμο και ο χαλινός της γλώσσας.',
      en: 'If they bleed or aren’t better within a few days, ask for a check of the latch and for tongue-tie.',
    },
  },
  {
    id: 'engorgement',
    title: { el: 'Πρήξιμο του στήθους', en: 'Engorgement' },
    signs: {
      el: 'Όταν κατεβαίνει το γάλα, το στήθος μπορεί να γίνει σκληρό, ζεστό και να πονά, και η θηλή να «ισιώσει».',
      en: 'When your milk comes in, breasts can feel hard, warm and painful, and the nipple can flatten.',
    },
    helps: [
      { el: 'Θηλάζετε συχνά, όποτε το ζητά.', en: 'Feed often, whenever baby wants.' },
      {
        el: 'Αν το μωρό δεν μπορεί να πιάσει, βγάλτε λίγο γάλα με το χέρι για να μαλακώσει η θηλαία άλω.',
        en: 'If baby can’t latch, hand-express a little to soften the areola.',
      },
      {
        el: 'Κρύες κομπρέσες μετά το τάισμα. Η παρακεταμόλη και η ιβουπροφαίνη είναι συμβατές με τον θηλασμό.',
        en: 'Cold packs after feeds. Paracetamol and ibuprofen are fine while breastfeeding.',
      },
    ],
  },
  {
    id: 'mastitis',
    title: { el: 'Φραγμένος πόρος ή μαστίτιδα', en: 'Blocked duct or mastitis' },
    signs: {
      el: 'Ένα σκληρό, ζεστό, επώδυνο σημείο στο στήθος, συχνά κόκκινο. Με πυρετό, ρίγη ή αίσθημα γρίπης, μπορεί να είναι μαστίτιδα.',
      en: 'A hard, warm, painful area of the breast, often red. With fever, chills or flu-like aches, it may be mastitis.',
    },
    helps: [
      {
        el: 'Συνεχίστε να θηλάζετε κανονικά και από τις δύο πλευρές. Δεν χρειάζεται να «αδειάζετε» το στήθος με επιπλέον άντληση.',
        en: 'Keep feeding normally from both sides. There’s no need to “empty” the breast with extra pumping.',
      },
      {
        el: 'Κρύες κομπρέσες, ξεκούραση, υγρά, και παρακεταμόλη ή ιβουπροφαίνη.',
        en: 'Cold packs, rest, fluids, and paracetamol or ibuprofen.',
      },
      {
        el: 'Όχι δυνατό μασάζ: μόνο πολύ απαλές κινήσεις πάνω στο δέρμα προς τη μασχάλη.',
        en: 'No deep massage: only very light strokes over the skin towards the armpit.',
      },
    ],
    doctor: {
      el: 'Δείτε γιατρό αν έχετε πυρετό ή δεν βελτιώνεται μέσα σε 12–24 ώρες. Αν χρειαστεί αντιβίωση, υπάρχουν επιλογές συμβατές με τον θηλασμό.',
      en: 'See a doctor if you have a fever or it isn’t better within 12–24 hours. If you need antibiotics, there are options that are fine with breastfeeding.',
    },
  },
  {
    id: 'supply',
    title: { el: '«Δεν έχω αρκετό γάλα»', en: '“I don’t have enough milk”' },
    signs: {
      el: 'Η πιο συχνή ανησυχία, αλλά οι περισσότερες μητέρες έχουν αρκετό. Μαλακό στήθος, συχνά ταΐσματα και οι «εκρήξεις ανάπτυξης» (γύρω στις 2–3 εβδομάδες, τις 6 εβδομάδες και τους 3 μήνες) δεν σημαίνουν λίγο γάλα.',
      en: 'The most common worry, but most mothers make enough. Soft breasts, frequent feeds and growth spurts (around 2–3 weeks, 6 weeks and 3 months) don’t mean low supply.',
    },
    helps: [
      {
        el: 'Όσο περισσότερο θηλάζει, τόσο περισσότερο γάλα φτιάχνετε. Θηλάζετε συχνά και από τα δύο στήθη.',
        en: 'The more baby feeds, the more milk you make. Feed often, from both breasts.',
      },
      {
        el: 'Ελέγξτε το πιάσιμο και κάνετε επαφή δέρμα με δέρμα.',
        en: 'Check the latch and do plenty of skin-to-skin.',
      },
      {
        el: 'Πριν δώσετε συμπλήρωμα ξένου γάλακτος, μιλήστε με τον παιδίατρο ή μια σύμβουλο θηλασμού: τα άσκοπα συμπληρώματα μειώνουν την παραγωγή.',
        en: 'Before giving formula top-ups, talk to your paediatrician or a lactation consultant: unneeded top-ups lower your supply.',
      },
    ],
    doctor: {
      el: 'Οι πάνες και το βάρος είναι ο πιο σίγουρος οδηγός (δείτε τον πίνακα πιο πάνω).',
      en: 'Nappies and weight are the surest guide (see the chart above).',
    },
  },
  {
    id: 'tongue-tie',
    title: { el: 'Χαλινός της γλώσσας', en: 'Tongue-tie' },
    signs: {
      el: 'Δυσκολεύεται να πιάσει ή να μείνει στο στήθος, κάνει «κλικ» όταν ρουφάει, τρώει πολλή ώρα αλλά παίρνει λίγο βάρος, κι εσάς σας πονάει.',
      en: 'Baby struggles to latch or stay on, clicks while feeding, feeds for ages but gains slowly, and it hurts you.',
    },
    helps: [
      {
        el: 'Ζητήστε από τον παιδίατρο να ελέγξει το στόμα του μωρού.',
        en: 'Ask your paediatrician to check baby’s mouth.',
      },
      {
        el: 'Αν χρειαστεί, η τομή του χαλινού είναι μια γρήγορη, απλή επέμβαση.',
        en: 'If needed, releasing the tie is a quick, simple procedure.',
      },
    ],
  },
  {
    id: 'thrush',
    title: { el: 'Μύκητες (καντιντίαση)', en: 'Thrush' },
    signs: {
      el: 'Καυστικός ή «σουβλερός» πόνος στις θηλές μετά το τάισμα, γυαλιστερές ή ξεφλουδισμένες θηλές. Στο μωρό: άσπρες πλάκες στο στόμα που δεν φεύγουν με σκούπισμα.',
      en: 'Burning or shooting nipple pain after feeds, shiny or flaky nipples. In baby: white patches in the mouth that don’t wipe off.',
    },
    helps: [
      {
        el: 'Χρειάζεται θεραπεία για εσάς και το μωρό μαζί. Δείτε γιατρό· μπορείτε να συνεχίσετε τον θηλασμό.',
        en: 'You and baby need treating together. See a doctor; you can keep breastfeeding.',
      },
      {
        el: 'Αποστειρώνετε πιπίλες και εξαρτήματα του θήλαστρου.',
        en: 'Sterilise dummies and breast-pump parts.',
      },
    ],
  },
]

/** Freshly expressed milk. NHS, except room temperature (ABM protocol #8). */
export const milkStorage: readonly StorageRule[] = [
  {
    id: 'room',
    icon: 'home',
    place: { el: 'Σε θερμοκρασία δωματίου', en: 'At room temperature' },
    temperature: { el: 'έως 25 °C', en: 'up to 25 °C' },
    time: { el: 'έως 4 ώρες', en: 'up to 4 hours' },
    note: {
      el: 'Στη ζέστη του καλοκαιριού, βάλτε το κατευθείαν στο ψυγείο.',
      en: 'In summer heat, put it straight in the fridge.',
    },
  },
  {
    id: 'cool-bag',
    icon: 'bag',
    place: { el: 'Σε τσαντάκι-ψυγείο με παγοκύστες', en: 'In a cool bag with ice packs' },
    temperature: { el: 'γάλα ήδη κρύο από το ψυγείο', en: 'milk already chilled in the fridge' },
    time: { el: 'έως 24 ώρες', en: 'up to 24 hours' },
  },
  {
    id: 'fridge',
    icon: 'fridge',
    place: { el: 'Στο ψυγείο, στο πίσω μέρος', en: 'In the fridge, at the back' },
    temperature: { el: '4 °C ή λιγότερο', en: '4 °C or colder' },
    time: { el: 'έως 8 μέρες', en: 'up to 8 days' },
    note: {
      el: 'Αν δεν ξέρετε τη θερμοκρασία του ψυγείου, έως 3 μέρες. Όχι στην πόρτα.',
      en: 'If you’re not sure how cold your fridge is, up to 3 days. Not in the door.',
    },
  },
  {
    id: 'freezer',
    icon: 'freezer',
    place: { el: 'Στην κατάψυξη', en: 'In the freezer' },
    temperature: { el: '−18 °C ή λιγότερο', en: '−18 °C or colder' },
    time: { el: 'έως 6 μήνες', en: 'up to 6 months' },
  },
]

export const expressingCards: readonly InfoCard[] = [
  {
    id: 'expressing',
    icon: 'milk',
    title: { el: 'Άντληση', en: 'Expressing' },
    points: [
      {
        el: 'Με το χέρι: ιδανικό τις πρώτες μέρες για το πρωτόγαλα (μαζεύεται με σύριγγα) και για να μαλακώσει το στήθος.',
        en: 'By hand: ideal in the first days for colostrum (collect it in a syringe) and to soften the breast.',
      },
      {
        el: 'Ηλεκτρικό διπλό θήλαστρο αν θα αντλείτε συχνά, π.χ. για τη δουλειά· χειροκίνητο για πού και πού.',
        en: 'A double electric pump if you’ll express often, e.g. for work; a manual one for now and then.',
      },
      {
        el: 'Πλένετε τα εξαρτήματα μετά από κάθε χρήση.',
        en: 'Wash the pump parts after every use.',
      },
      {
        el: 'Αν γίνεται, δώστε μπιμπερό αφού στρώσει ο θηλασμός, συνήθως μετά από 3–4 εβδομάδες.',
        en: 'If you can, wait until breastfeeding is going well, usually 3–4 weeks, before offering a bottle.',
      },
    ],
  },
  {
    id: 'using-milk',
    icon: 'freezer',
    title: { el: 'Κατάψυξη και τάισμα', en: 'Freezing and feeding' },
    points: [
      {
        el: 'Γράψτε ημερομηνία σε κάθε σακουλάκι και φυλάξτε μικρές ποσότητες (60–120 ml), για να μην πετάτε γάλα.',
        en: 'Date every bag and store small amounts (60–120 ml), so less goes to waste.',
      },
      {
        el: 'Ξεπαγώστε το αργά στο ψυγείο ή σε ζεστό νερό, ποτέ στον φούρνο μικροκυμάτων. Το ξεπαγωμένο γάλα δεν ξαναψύχεται.',
        en: 'Thaw it slowly in the fridge or in warm water, never in the microwave. Never refreeze thawed milk.',
      },
      {
        el: 'Το γάλα χωρίζει σε στρώσεις: ανακινήστε το απαλά. Ό,τι περισσέψει στο μπιμπερό μετά το τάισμα, πετιέται.',
        en: 'Milk separates into layers: swirl it gently. Throw away whatever is left in the bottle after a feed.',
      },
      {
        el: 'Μπιμπερό με ρυθμό: το μωρό όρθιο, το μπιμπερό σχεδόν οριζόντιο, με παύσεις, ώστε να τρώει με τον ρυθμό του όπως στο στήθος.',
        en: 'Paced bottle feeding: baby upright, bottle nearly horizontal, with pauses, so baby feeds at their own pace as at the breast.',
      },
    ],
  },
]

export const motherCards: readonly InfoCard[] = [
  {
    id: 'food',
    icon: 'food',
    title: { el: 'Φαγητό και νερό', en: 'Food and drink' },
    points: [
      {
        el: 'Δεν χρειάζεστε ειδική δίαιτα: ποικιλία, φρούτα, λαχανικά, όσπρια, ψάρι. Μην κόβετε τροφές, εκτός αν το μωρό αντιδρά καθαρά σε κάποια.',
        en: 'No special diet needed: variety, fruit, vegetables, pulses, fish. Don’t cut out foods unless baby clearly reacts to one.',
      },
      {
        el: 'Πίνετε όσο διψάτε· ένα μπουκάλι νερό εκεί που θηλάζετε βοηθά.',
        en: 'Drink to thirst; keep a bottle of water where you feed.',
      },
      {
        el: 'Το μωρό χρειάζεται συνήθως σταγόνες βιταμίνης D· ρωτήστε τον παιδίατρο.',
        en: 'Baby usually needs vitamin D drops; ask your paediatrician.',
      },
    ],
  },
  {
    id: 'coffee-alcohol',
    icon: 'coffee',
    title: { el: 'Καφές και αλκοόλ', en: 'Coffee and alcohol' },
    points: [
      {
        el: 'Έως περίπου 200 mg καφεΐνης τη μέρα (περίπου 2 φλιτζάνια καφέ) θεωρούνται ασφαλή.',
        en: 'Up to about 200 mg of caffeine a day (about 2 cups of coffee) is considered safe.',
      },
      {
        el: 'Το πιο ασφαλές είναι να μην πίνετε αλκοόλ. Αν πιείτε ένα ποτό πού και πού, περιμένετε τουλάχιστον 2 ώρες πριν θηλάσετε.',
        en: 'Not drinking is safest. If you have an occasional drink, wait at least 2 hours before breastfeeding.',
      },
      {
        el: 'Η άντληση και το πέταμα του γάλακτος δεν διώχνει πιο γρήγορα το αλκοόλ. Μετά από ποτό, ποτέ ύπνος μαζί με το μωρό.',
        en: 'Pumping and throwing milk away doesn’t clear alcohol faster. After drinking, never sleep with baby.',
      },
    ],
  },
  {
    id: 'medicines',
    icon: 'pill',
    title: { el: 'Φάρμακα και κάπνισμα', en: 'Medicines and smoking' },
    points: [
      {
        el: 'Τα περισσότερα φάρμακα είναι συμβατά. Λέτε πάντα στον γιατρό ή τον φαρμακοποιό ότι θηλάζετε.',
        en: 'Most medicines are compatible. Always tell your doctor or pharmacist that you breastfeed.',
      },
      {
        el: 'Αν καπνίζετε, ο θηλασμός παραμένει η καλύτερη επιλογή. Καπνίστε μετά το τάισμα, έξω, ποτέ κοντά στο μωρό, και ζητήστε βοήθεια για να το κόψετε.',
        en: 'If you smoke, breastfeeding is still best. Smoke after feeds, outside, never near baby, and ask for help to quit.',
      },
      {
        el: 'Ο θηλασμός από μόνος του δεν είναι σίγουρη αντισύλληψη· συζητήστε τις επιλογές σας με τον γυναικολόγο.',
        en: 'Breastfeeding on its own isn’t reliable contraception; talk to your gynaecologist about options.',
      },
    ],
  },
  {
    id: 'how-long',
    icon: 'calendar',
    title: { el: 'Για πόσο καιρό', en: 'How long' },
    points: [
      {
        el: 'Ο ΠΟΥ συστήνει μόνο μητρικό γάλα τους πρώτους 6 μήνες, και μετά θηλασμό μαζί με στερεές τροφές έως 2 ετών ή και περισσότερο.',
        en: 'The WHO recommends only breast milk for the first 6 months, then breastfeeding alongside solid food up to 2 years or beyond.',
      },
      {
        el: 'Ακόμη και στον καύσωνα, ένα μωρό που θηλάζει αποκλειστικά δεν χρειάζεται νερό.',
        en: 'Even in a heatwave, an exclusively breastfed baby doesn’t need water.',
      },
      {
        el: 'Κάθε ποσότητα μητρικού γάλακτος μετράει. Ο μικτός θηλασμός είναι κι αυτός θηλασμός.',
        en: 'Every bit of breast milk counts. Combination feeding is breastfeeding too.',
      },
    ],
  },
  {
    id: 'work',
    icon: 'work',
    title: { el: 'Επιστροφή στη δουλειά', en: 'Back to work' },
    points: [
      {
        el: 'Μετά την άδεια μητρότητας δικαιούστε μειωμένο ωράριο ή ισόχρονη άδεια για τη φροντίδα του παιδιού (τη λεγόμενη «άδεια θηλασμού»). Ρωτήστε το λογιστήριο για τις επιλογές σας.',
        en: 'In Greece, after maternity leave you are entitled to shorter hours, or the same time as a block of leave, to care for your child (the so-called “breastfeeding leave”). Ask payroll about your options.',
      },
      {
        el: 'Ξεκινήστε να αντλείτε και να καταψύχετε γάλα 2–3 εβδομάδες πριν επιστρέψετε.',
        en: 'Start expressing and freezing milk 2–3 weeks before you go back.',
      },
      {
        el: 'Κάντε πρόβα με το μπιμπερό, με άλλο άτομο να το δίνει, πριν την πρώτη μέρα.',
        en: 'Practise with the bottle, given by someone else, before your first day.',
      },
    ],
  },
]

/** Checked November 2026. */
export const supportContacts: readonly SupportContact[] = [
  {
    id: 'alkyoni',
    name: {
      el: 'Γραμμή υποστήριξης θηλασμού «Αλκυόνη»',
      en: '“Alkyoni” breastfeeding helpline',
    },
    detail: {
      el: 'Μαίες και παιδίατροι απαντούν τις εργάσιμες, 09:00–14:00, με αστική χρέωση.',
      en: 'Midwives and paediatricians answer on weekdays, 09:00–14:00, at local-call rates (in Greek).',
    },
    phone: '10525',
    url: 'https://epilegothilasmo.gr/tilefoniki-grammi-ypostirixis-thilas/',
  },
  {
    id: 'lll-greece',
    name: {
      el: 'Σύνδεσμος Θηλασμού Ελλάδος (La Leche League)',
      en: 'La Leche League Greece',
    },
    detail: {
      el: 'Εθελόντριες σύμβουλοι θηλασμού και συναντήσεις μητέρων.',
      en: 'Volunteer breastfeeding counsellors and mothers’ meetings.',
    },
    url: 'https://www.lllgreece.org/',
  },
  {
    id: 'ibclc',
    name: { el: 'Σύμβουλος γαλουχίας IBCLC', en: 'IBCLC lactation consultant' },
    detail: {
      el: 'Πιστοποιημένη επαγγελματίας για πιο δύσκολα προβλήματα. Ρωτήστε το μαιευτήριο ή τον παιδίατρο για κάποια κοντά σας.',
      en: 'A certified professional for harder problems. Ask your hospital or paediatrician for one near you.',
    },
  },
  {
    id: 'midwife',
    name: { el: 'Η μαία και ο παιδίατρός σας', en: 'Your midwife and paediatrician' },
    detail: {
      el: 'Για βάρος, πάνες, ίκτερο, και ό,τι σας ανησυχεί.',
      en: 'For weight, nappies, jaundice, and anything that worries you.',
    },
  },
]

export const breastfeedingRedFlags: readonly Localized[] = [
  {
    el: 'Βρέχει λιγότερες πάνες από όσες λέει ο πίνακας, ή βλέπετε πορτοκαλί-κόκκινους «κρυστάλλους» στην πάνα μετά την 3η μέρα',
    en: 'Fewer wet nappies than the chart shows, or orange-red “crystals” in the nappy after day 3',
  },
  {
    el: 'Δεν έχει κίτρινες κενώσεις ως την 5η μέρα',
    en: 'No yellow poo by day 5',
  },
  {
    el: 'Είναι πολύ νυσταγμένο και δεν ξυπνά για να φάει, ή τρώει λιγότερο από 8 φορές το 24ωρο',
    en: 'Is very sleepy and won’t wake to feed, or feeds fewer than 8 times in 24 hours',
  },
  {
    el: 'Ο ίκτερος (κιτρινίλα) χειροτερεύει ή κρατά πάνω από 2 εβδομάδες',
    en: 'Jaundice (yellow skin) gets worse or lasts beyond 2 weeks',
  },
  {
    el: 'Δεν έχει ξαναπιάσει το βάρος γέννησης στις 2 εβδομάδες',
    en: 'Hasn’t regained birth weight by 2 weeks',
  },
  {
    el: 'Εσείς έχετε πυρετό ή συμπτώματα γρίπης μαζί με πόνο στο στήθος',
    en: 'You have a fever or flu-like symptoms with a painful breast',
  },
]
