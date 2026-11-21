import type { Localized } from '../i18n/types'
import type { AgeRange } from '../lib/age'
import type { CardIcon, InfoCard } from './types'

/**
 * The sleep guide. Safe-sleep advice follows the AAP (2022), NHS and Lullaby Trust; sleep needs
 * follow the AAP/AASM ranges. Nap counts and awake times are typical, not targets.
 */

export interface SafeSleepRule {
  readonly id: string
  readonly icon: CardIcon
  readonly title: Localized
  readonly text: Localized
}

export interface SleepBand extends AgeRange {
  readonly age: Localized
  /** Total sleep in 24 hours, naps included. */
  readonly total: Localized
  readonly naps: Localized
  /** How long baby is typically happy awake between sleeps. */
  readonly awake: Localized
  readonly note: Localized
}

export interface TogBand {
  /** Room temperature, warmest first. */
  readonly id: 'hot' | 'warm' | 'mild' | 'cool' | 'cold'
  readonly room: Localized
  readonly tog: number
  readonly wear: Localized
}

export const safeSleepRules: readonly SafeSleepRule[] = [
  {
    id: 'back',
    icon: 'baby',
    title: { el: 'Ανάσκελα, σε κάθε ύπνο', en: 'On their back, every sleep' },
    text: {
      el: 'Μέρα και νύχτα, και στους μικρούς υπνάκους. Όταν αρχίσει να γυρίζει μόνο του και προς τις δύο πλευρές, δεν χρειάζεται να το ξαναγυρίζετε· εσείς όμως συνεχίστε να το ξαπλώνετε ανάσκελα.',
      en: 'Night and day, naps included. Once baby rolls both ways on their own you don’t need to turn them back, but keep putting them down on their back.',
    },
  },
  {
    id: 'alone',
    icon: 'bed',
    title: { el: 'Στο δικό του κρεβάτι, στο δωμάτιό σας', en: 'In their own bed, in your room' },
    text: {
      el: 'Σε κούνια ή λίκνο δίπλα στο κρεβάτι σας, τουλάχιστον τους πρώτους 6 μήνες. Όχι στο κρεβάτι των γονιών, και ποτέ σε καναπέ ή πολυθρόνα.',
      en: 'In a cot or Moses basket next to your bed, for at least the first 6 months. Not in the parents’ bed, and never on a sofa or armchair.',
    },
  },
  {
    id: 'clear',
    icon: 'shield',
    title: { el: 'Άδεια κούνια, σκληρό στρώμα', en: 'A clear cot, a firm mattress' },
    text: {
      el: 'Σκληρό, επίπεδο στρώμα που εφαρμόζει, μόνο με σεντόνι με λάστιχο. Χωρίς μαξιλάρια, πάντες, κουβέρτες, πάπλωμα ή λούτρινα.',
      en: 'A firm, flat, well-fitting mattress with just a fitted sheet. No pillows, bumpers, loose blankets, duvets or soft toys.',
    },
  },
]

export const safeSleepDos: readonly Localized[] = [
  {
    el: 'Δωμάτιο στους 16–20 °C, και υπνόσακος στο σωστό TOG αντί για κουβέρτα.',
    en: 'Keep the room at 16–20 °C, and use a sleeping bag of the right TOG instead of a blanket.',
  },
  {
    el: 'Αν βάλετε κουβέρτα: πόδια στο κάτω άκρο της κούνιας, κουβέρτα ως τους ώμους, καλά χωμένη στο στρώμα.',
    en: 'If you use a blanket: feet at the foot of the cot, blanket no higher than the shoulders and tucked in firmly.',
  },
  {
    el: 'Ο θηλασμός μειώνει τον κίνδυνο αιφνίδιου βρεφικού θανάτου.',
    en: 'Breastfeeding lowers the risk of sudden infant death.',
  },
  {
    el: 'Η πιπίλα στον ύπνο μπορεί να μειώσει τον κίνδυνο. Αν θηλάζετε, περιμένετε 3–4 εβδομάδες. Αν πέσει όταν αποκοιμηθεί, μην την ξαναβάζετε.',
    en: 'A dummy at sleep time may lower the risk. If you breastfeed, wait 3–4 weeks first. If it falls out once baby is asleep, leave it out.',
  },
  {
    el: 'Τα εμβόλια στην ώρα τους συνδέονται με μικρότερο κίνδυνο αιφνίδιου βρεφικού θανάτου.',
    en: 'Vaccines on schedule are linked to a lower risk of sudden infant death.',
  },
  {
    el: 'Χρόνος μπρούμυτα (tummy time) κάθε μέρα, μόνο όταν είναι ξύπνιο και το προσέχετε.',
    en: 'Tummy time every day, but only while baby is awake and watched.',
  },
]

export const safeSleepDonts: readonly Localized[] = [
  {
    el: 'Να αποκοιμηθείτε με το μωρό αγκαλιά σε καναπέ ή πολυθρόνα: είναι το πιο επικίνδυνο μέρος. Αν νυστάζετε, βάλτε το στην κούνια.',
    en: 'Falling asleep with baby on a sofa or armchair: the most dangerous place of all. If you feel sleepy, put baby in the cot.',
  },
  {
    el: 'Κάπνισμα στην εγκυμοσύνη, μέσα στο σπίτι ή στο αυτοκίνητο.',
    en: 'Smoking in pregnancy, in the home or in the car.',
  },
  {
    el: 'Πάντες, φωλιές (baby nests), σφήνες και στηρίγματα θέσης, υπνόσακους ή κουβέρτες με βάρος.',
    en: 'Bumpers, baby nests, wedges and sleep positioners, weighted sleeping bags or blankets.',
  },
  {
    el: 'Ανασηκωμένο στρώμα ή κεκλιμένη επιφάνεια, ακόμη και για παλινδρόμηση. Ο ύπνος γίνεται πάντα σε επίπεδη επιφάνεια.',
    en: 'Raising the mattress or sleeping on a slope, even for reflux. Sleep always happens on a flat surface.',
  },
  {
    el: 'Πολύωρο ύπνο σε κάθισμα αυτοκινήτου, ριλάξ, κούνια-ρηλάξ ή μάρσιπο. Όταν φτάσετε, μεταφέρετε το μωρό σε επίπεδη επιφάνεια.',
    en: 'Long sleeps in a car seat, bouncer, swing or carrier. When you arrive, move baby to a flat surface.',
  },
  {
    el: 'Σκουφάκι ή πολλά ρούχα μέσα στο σπίτι, θερμοφόρες και ηλεκτρικές κουβέρτες.',
    en: 'Hats or too many layers indoors, hot-water bottles and electric blankets.',
  },
  {
    el: 'Καλώδια (π.χ. της ενδοεπικοινωνίας) και κορδόνια σε απόσταση που φτάνει το μωρό.',
    en: 'Cables (e.g. the baby monitor’s) and cords within baby’s reach.',
  },
]

/** Lullaby Trust: if you do share a bed, make it as safe as possible. */
export const bedSharing = {
  title: { el: 'Αν κοιμηθείτε μαζί στο κρεβάτι', en: 'If you share a bed with your baby' },
  lead: {
    el: 'Οι παιδίατροι συστήνουν το μωρό να κοιμάται στο δικό του κρεβάτι. Επειδή όμως συμβαίνει, ειδικά με τα νυχτερινά ταΐσματα, κάντε το όσο πιο ασφαλές γίνεται:',
    en: 'Paediatricians recommend that baby sleeps in their own bed. As it often happens anyway, especially with night feeds, make it as safe as you can:',
  },
  points: [
    {
      el: 'Σκληρό στρώμα, μαξιλάρια και πάπλωμα μακριά από το μωρό. Ανάσκελα, δίπλα στη μαμά, όχι ανάμεσα στους γονείς.',
      en: 'A firm mattress, with pillows and the duvet away from baby. On their back, next to mum, not between the parents.',
    },
    {
      el: 'Όχι κατοικίδια ή άλλα παιδιά στο ίδιο κρεβάτι.',
      en: 'No pets or other children in the bed.',
    },
  ],
  never: [
    {
      el: 'εσείς ή ο σύντροφός σας καπνίζετε',
      en: 'you or your partner smoke',
    },
    {
      el: 'έχετε πιει αλκοόλ ή πάρει φάρμακα ή ουσίες που φέρνουν υπνηλία',
      en: 'you have drunk alcohol or taken drugs or medicines that make you drowsy',
    },
    { el: 'είστε εξαντλημένοι', en: 'you are exhausted' },
    {
      el: 'το μωρό γεννήθηκε πρόωρο (πριν τις 37 εβδομάδες) ή μικρό (κάτω από 2,5 kg)',
      en: 'baby was born premature (before 37 weeks) or small (under 2.5 kg)',
    },
  ],
} as const satisfies {
  title: Localized
  lead: Localized
  points: readonly Localized[]
  never: readonly Localized[]
}

export const sleepBands: readonly SleepBand[] = [
  {
    id: 'newborn',
    age: { el: '0–6 εβδομάδων', en: '0–6 weeks' },
    from: { days: 0 },
    to: { weeks: 6 },
    total: { el: '14–17 ώρες', en: '14–17 hours' },
    naps: { el: 'Χωρίς πρόγραμμα', en: 'No pattern yet' },
    awake: { el: '45–60 λεπτά', en: '45–60 minutes' },
    note: {
      el: 'Κοιμάται σε κομμάτια 2–4 ωρών, μέρα και νύχτα, και ξυπνά για να φάει.',
      en: 'Sleeps in 2–4 hour stretches around the clock, waking to feed.',
    },
  },
  {
    id: 'weeks-6-12',
    age: { el: '6 εβδομάδων – 3 μηνών', en: '6 weeks – 3 months' },
    from: { weeks: 6 },
    to: { months: 3 },
    total: { el: '14–17 ώρες', en: '14–17 hours' },
    naps: { el: '4–5', en: '4–5' },
    awake: { el: '1–1½ ώρα', en: '1–1½ hours' },
    note: {
      el: 'Αρχίζει να ξεχωρίζει τη μέρα από τη νύχτα, και συχνά εμφανίζεται ένα μεγαλύτερο κομμάτι ύπνου τη νύχτα.',
      en: 'Starts to tell day from night, and a longer stretch of sleep often appears at night.',
    },
  },
  {
    id: 'months-3-6',
    age: { el: '3–6 μηνών', en: '3–6 months' },
    from: { months: 3 },
    to: { months: 6 },
    total: { el: '12–16 ώρες', en: '12–16 hours' },
    naps: { el: '3–4', en: '3–4' },
    awake: { el: '1½–2½ ώρες', en: '1½–2½ hours' },
    note: {
      el: 'Πολλά κοιμούνται 5–6 ώρες συνεχόμενα τη νύχτα, αλλά τα ξυπνήματα για τάισμα είναι ακόμα φυσιολογικά. Γύρω στους 4 μήνες ο ύπνος συχνά «χαλάει» για λίγο.',
      en: 'Many sleep 5–6 hours in a row at night, but waking to feed is still normal. Around 4 months, sleep often goes wobbly for a while.',
    },
  },
  {
    id: 'months-6-9',
    age: { el: '6–9 μηνών', en: '6–9 months' },
    from: { months: 6 },
    to: { months: 9 },
    total: { el: '12–16 ώρες', en: '12–16 hours' },
    naps: { el: '2–3', en: '2–3' },
    awake: { el: '2–3 ώρες', en: '2–3 hours' },
    note: {
      el: 'Τα περισσότερα κοιμούνται περισσότερες ώρες τη νύχτα. Τα δόντια και το άγχος αποχωρισμού μπορεί να φέρουν πάλι ξυπνήματα.',
      en: 'Most sleep for longer at night. Teething and separation anxiety can bring the wake-ups back.',
    },
  },
  {
    id: 'months-9-12',
    age: { el: '9–12 μηνών', en: '9–12 months' },
    from: { months: 9 },
    to: { months: 12 },
    total: { el: '12–16 ώρες', en: '12–16 hours' },
    naps: { el: '2', en: '2' },
    awake: { el: '2½–4 ώρες', en: '2½–4 hours' },
    note: {
      el: 'Συνήθως δύο υπνάκοι, πρωί και απόγευμα. Μια σταθερή ρουτίνα πριν τον ύπνο βοηθά πολύ.',
      en: 'Usually two naps, morning and afternoon. A steady bedtime routine helps a lot.',
    },
  },
]

/** Typical sleeping-bag TOG for the room temperature (manufacturers' charts vary a little). */
export const togBands: readonly TogBand[] = [
  {
    id: 'hot',
    room: { el: 'Πάνω από 27 °C', en: 'Above 27 °C' },
    tog: 0.2,
    wear: { el: 'Μόνο πάνα ή κοντομάνικο κορμάκι', en: 'Just a nappy or a short-sleeved bodysuit' },
  },
  {
    id: 'warm',
    room: { el: '24–27 °C', en: '24–27 °C' },
    tog: 0.5,
    wear: { el: 'Κοντομάνικο κορμάκι', en: 'Short-sleeved bodysuit' },
  },
  {
    id: 'mild',
    room: { el: '20–24 °C', en: '20–24 °C' },
    tog: 1,
    wear: { el: 'Μακρυμάνικο κορμάκι ή φορμάκι', en: 'Long-sleeved bodysuit or sleepsuit' },
  },
  {
    id: 'cool',
    room: { el: '16–20 °C', en: '16–20 °C' },
    tog: 2.5,
    wear: { el: 'Κορμάκι και φορμάκι', en: 'Bodysuit and sleepsuit' },
  },
  {
    id: 'cold',
    room: { el: 'Κάτω από 16 °C', en: 'Below 16 °C' },
    tog: 3.5,
    wear: {
      el: 'Κορμάκι και φορμάκι· ζεστάνετε λίγο το δωμάτιο αν γίνεται',
      en: 'Bodysuit and sleepsuit; warm the room a little if you can',
    },
  },
]

export const roomTips: readonly Localized[] = [
  {
    el: 'Για να δείτε αν κρυώνει ή ζεσταίνεται, πιάστε το στήθος ή τον σβέρκο του, όχι τα χέρια και τα πόδια, που είναι συνήθως πιο δροσερά.',
    en: 'To check if baby is too hot or cold, feel their chest or the back of the neck, not hands and feet, which are usually cooler.',
  },
  {
    el: 'Αν ιδρώνει ή καίει στο άγγιγμα, βγάλτε ένα ρούχο.',
    en: 'If baby is sweaty or hot to the touch, take off a layer.',
  },
  {
    el: 'Το καλοκαίρι, κλιματιστικό ή ανεμιστήρας βοηθούν, αρκεί να μη φυσούν κατευθείαν πάνω στο μωρό.',
    en: 'In summer, air conditioning or a fan helps, as long as it doesn’t blow straight at baby.',
  },
  {
    el: 'Όχι σκουφάκι για ύπνο μέσα στο σπίτι: το μωρό αποβάλλει τη ζέστη από το κεφάλι.',
    en: 'No hat for sleep indoors: babies lose heat through their head.',
  },
  {
    el: 'Ο υπνόσακος να έχει το σωστό μέγεθος, ώστε να μη χωράει το κεφάλι να γλιστρήσει μέσα.',
    en: 'Choose the right size of sleeping bag, so baby’s head can’t slip inside.',
  },
]

export const settlingCards: readonly InfoCard[] = [
  {
    id: 'day-night',
    icon: 'sun',
    title: { el: 'Μέρα και νύχτα', en: 'Day and night' },
    points: [
      {
        el: 'Τη μέρα: φως, κανονικοί θόρυβοι, παιχνίδι όταν είναι ξύπνιο.',
        en: 'By day: daylight, normal noise, play while awake.',
      },
      {
        el: 'Τη νύχτα: χαμηλό φως, ησυχία, λίγη κουβέντα. Αλλάξτε πάνα μόνο αν χρειάζεται.',
        en: 'At night: dim light, quiet, little talking. Change the nappy only if needed.',
      },
      {
        el: 'Το νυχτερινό θέμα του οδηγού (το φεγγάρι με το αστέρι, στο μενού) κρατά την οθόνη χαμηλή στα βραδινά ταΐσματα.',
        en: 'This guide’s night theme (the moon and star, in the menu) keeps your screen dim for night feeds.',
      },
    ],
  },
  {
    id: 'cues',
    icon: 'eye',
    title: { el: 'Σημάδια νύστας', en: 'Sleepy signs' },
    points: [
      {
        el: 'Χασμουρητό, τρίψιμο ματιών ή αυτιών, βλέμμα στο κενό, γκρίνια.',
        en: 'Yawning, rubbing eyes or ears, staring into space, fussing.',
      },
      {
        el: 'Βάλτε το για ύπνο με τα πρώτα σημάδια: ένα παρακουρασμένο μωρό ηρεμεί πιο δύσκολα.',
        en: 'Put baby down at the first signs: an overtired baby is harder to settle.',
      },
    ],
  },
  {
    id: 'routine',
    icon: 'bath',
    title: { el: 'Ρουτίνα πριν τον ύπνο', en: 'A bedtime routine' },
    points: [
      {
        el: 'Από περίπου 3 μηνών, τα ίδια βήματα με την ίδια σειρά κάθε βράδυ: π.χ. μπάνιο, πιτζάμες, τάισμα, νανούρισμα, κούνια.',
        en: 'From around 3 months, the same steps in the same order every evening: e.g. bath, pyjamas, feed, lullaby, cot.',
      },
      {
        el: 'Αρκούν 20–30 λεπτά. Το σταθερό μετράει περισσότερο από το τέλειο.',
        en: '20–30 minutes is enough. Consistent matters more than perfect.',
      },
    ],
  },
  {
    id: 'drowsy',
    icon: 'bed',
    title: { el: 'Νυσταγμένο αλλά ξύπνιο', en: 'Drowsy but awake' },
    points: [
      {
        el: 'Τους πρώτους μήνες, το να αποκοιμιέται στο στήθος ή στην αγκαλιά είναι φυσιολογικό και δεν το «κακομαθαίνει».',
        en: 'In the first months, falling asleep at the breast or in your arms is normal and won’t “spoil” baby.',
      },
      {
        el: 'Από 3–4 μηνών, δοκιμάστε πού και πού να το αφήνετε στην κούνια νυσταγμένο, για να μάθει να αποκοιμιέται μόνο του.',
        en: 'From 3–4 months, now and then lay baby down drowsy, so they learn to fall asleep on their own.',
      },
      {
        el: 'Μέθοδοι «εκπαίδευσης ύπνου» συνήθως όχι πριν τους 6 μήνες· συζητήστε τες πρώτα με τον παιδίατρο.',
        en: 'Sleep-training methods are usually not for before 6 months; talk to your paediatrician first.',
      },
    ],
  },
  {
    id: 'swaddling',
    icon: 'baby',
    title: { el: 'Φάσκιωμα', en: 'Swaddling' },
    points: [
      {
        el: 'Λεπτό βαμβακερό ύφασμα, χαλαρό στους γοφούς, ώστε τα πόδια να λυγίζουν ελεύθερα.',
        en: 'Thin cotton, loose around the hips so the legs can bend freely.',
      },
      {
        el: 'Μόνο ανάσκελα, και ποτέ όταν κοιμάστε μαζί στο κρεβάτι.',
        en: 'Only on the back, and never when sharing a bed.',
      },
      {
        el: 'Σταματήστε μόλις προσπαθήσει να γυρίσει (συνήθως 2–4 μηνών).',
        en: 'Stop as soon as baby tries to roll (usually at 2–4 months).',
      },
    ],
  },
  {
    id: 'white-noise',
    icon: 'noise',
    title: { el: 'Λευκός θόρυβος', en: 'White noise' },
    points: [
      {
        el: 'Ένας σταθερός, ήπιος ήχος («σσς» ή συσκευή) βοηθά πολλά μωρά να ηρεμήσουν.',
        en: 'A steady, gentle sound (shushing or a machine) helps many babies settle.',
      },
      {
        el: 'Χαμηλή ένταση, και η συσκευή όσο πιο μακριά από την κούνια γίνεται.',
        en: 'Keep the volume low and the machine as far from the cot as you can.',
      },
    ],
  },
  {
    id: 'phases',
    icon: 'phases',
    title: { el: 'Φάσεις που περνούν', en: 'Phases that pass' },
    points: [
      {
        el: 'Γύρω στους 4 μήνες, και ξανά στους 8–10, ο ύπνος συχνά χειροτερεύει για λίγες εβδομάδες.',
        en: 'Around 4 months, and again at 8–10, sleep often gets worse for a few weeks.',
      },
      {
        el: 'Αναπτυξιακά άλματα, δόντια και ιώσεις φέρνουν ξανά ξυπνήματα. Γυρίστε στη ρουτίνα σας μόλις περάσουν.',
        en: 'Developmental leaps, teething and colds bring wake-ups back. Return to your routine once they pass.',
      },
    ],
  },
]

export const parentCards: readonly InfoCard[] = [
  {
    id: 'rest',
    icon: 'rest',
    title: { el: 'Ξεκούραση για εσάς', en: 'Rest for you' },
    points: [
      {
        el: 'Κοιμηθείτε όταν κοιμάται το μωρό, έστω και λίγο μέσα στη μέρα.',
        en: 'Sleep when baby sleeps, even briefly during the day.',
      },
      {
        el: 'Μοιραστείτε τις νύχτες: ο ένας κοιμάται ενώ ο άλλος έχει βάρδια, π.χ. με αντλημένο γάλα.',
        en: 'Share the nights: one sleeps while the other is on duty, e.g. with expressed milk.',
      },
      {
        el: 'Πείτε «ναι» όταν σας προσφέρουν βοήθεια, και μην οδηγείτε όταν είστε εξαντλημένοι.',
        en: 'Say yes when people offer help, and don’t drive when you’re exhausted.',
      },
      {
        el: 'Αν νιώθετε θλίψη, άγχος ή κενό για πάνω από 2 εβδομάδες, μιλήστε στον γιατρό σας. Ισχύει και για τους μπαμπάδες.',
        en: 'If you feel low, anxious or numb for more than 2 weeks, talk to your doctor. Dads too.',
      },
    ],
  },
  {
    id: 'crying',
    icon: 'crying',
    title: { el: 'Όταν το κλάμα δεν σταματά', en: 'When the crying won’t stop' },
    points: [
      {
        el: 'Το κλάμα είναι φυσιολογικό και κορυφώνεται γύρω στις 6–8 εβδομάδες. Δεν φταίτε εσείς.',
        en: 'Crying is normal and peaks at around 6–8 weeks. It isn’t your fault.',
      },
      {
        el: 'Δοκιμάστε αγκαλιά, λίκνισμα, τραγούδι, λευκό θόρυβο, βόλτα με το καρότσι ή επαφή δέρμα με δέρμα.',
        en: 'Try holding, rocking, singing, white noise, a walk in the pram or skin-to-skin.',
      },
      {
        el: 'Αν νιώσετε ότι δεν αντέχετε, ξαπλώστε το ανάσκελα στην κούνια, βγείτε από το δωμάτιο για λίγα λεπτά, πάρτε ανάσες ή τηλεφωνήστε σε κάποιον. Είναι εντάξει.',
        en: 'If you feel you can’t cope, lay baby on their back in the cot, leave the room for a few minutes, breathe or call someone. That’s OK.',
      },
      {
        el: 'Ποτέ μην ταρακουνάτε ένα μωρό: μπορεί να του προκαλέσει σοβαρή βλάβη στον εγκέφαλο.',
        en: 'Never shake a baby: it can cause serious brain damage.',
      },
    ],
  },
]

export const sleepRedFlags: readonly Localized[] = [
  {
    el: 'Σταματά να αναπνέει για πάνω από 20 δευτερόλεπτα ή μελανιάζει γύρω από τα χείλη: καλέστε αμέσως 166 ή 112',
    en: 'Stops breathing for more than 20 seconds or turns blue around the lips: call 166 or 112 straight away',
  },
  {
    el: 'Ξυπνά πολύ δύσκολα ή είναι ασυνήθιστα νωθρό και «πλαδαρό»',
    en: 'Is very hard to wake, or unusually drowsy and floppy',
  },
  {
    el: 'Ανασαίνει με κόπο, γρήγορα ή με βογκητό, ή ροχαλίζει δυνατά κάθε βράδυ',
    en: 'Breathes with effort, fast or with grunting, or snores loudly every night',
  },
  {
    el: 'Έχει πυρετό 38 °C ή πάνω και είναι κάτω από 3 μηνών',
    en: 'Has a temperature of 38 °C or more and is under 3 months old',
  },
  {
    el: 'Κλαίει με ασυνήθιστο τρόπο (πολύ ψιλά, σαν να πονά) ή δεν ηρεμεί με τίποτα',
    en: 'Cries in an unusual way (high-pitched, as if in pain) or nothing settles them',
  },
]
