import type { Localized } from '../i18n/types'
import type { AgeOffset } from '../lib/dates'

export const STAGE_TOPICS = [
  'feeding',
  'sleep',
  'development',
  'care',
  'safety',
  'parents',
] as const
export type StageTopicId = (typeof STAGE_TOPICS)[number]

export interface StageTopic {
  readonly id: StageTopicId
  readonly points: readonly Localized[]
}

export interface Stage {
  readonly id: string
  readonly ageLabel: Localized
  readonly title: Localized
  readonly intro: Localized
  /** Age range the stage covers, used to highlight "you are here". */
  readonly from: AgeOffset
  readonly to: AgeOffset
  readonly topics: readonly StageTopic[]
  /** When to call the paediatrician. */
  readonly redFlags: readonly Localized[]
}

/**
 * What to expect, age by age. Based on NHS, WHO and AAP guidance (see the Sources page).
 * Every baby develops at their own pace; ages are typical ranges, not deadlines.
 */
export const stages: readonly Stage[] = [
  {
    id: 'first-2-weeks',
    ageLabel: { el: '0–2 εβδομάδων', en: '0–2 weeks' },
    title: { el: 'Οι πρώτες δύο εβδομάδες', en: 'The first two weeks' },
    intro: {
      el: 'Γνωριμία, πολύ τάισμα και λίγος ύπνος. Ο στόχος είναι απλός: φαγητό, ζεστασιά, ασφαλής ύπνος και ξεκούραση για εσάς.',
      en: 'Getting to know each other, lots of feeding and little sleep. The goal is simple: food, warmth, safe sleep and rest for you.',
    },
    from: { days: 0 },
    to: { weeks: 2 },
    topics: [
      {
        id: 'feeding',
        points: [
          {
            el: '8–12 ταΐσματα το 24ωρο (κάθε 2–3 ώρες), και τη νύχτα.',
            en: '8–12 feeds in 24 hours (every 2–3 hours), including at night.',
          },
          {
            el: 'Από την 5η μέρα: τουλάχιστον 6 βαριές βρεγμένες πάνες και 2 κίτρινες κενώσεις τη μέρα σημαίνει ότι τρώει αρκετά.',
            en: 'From day 5: at least 6 heavy wet nappies and 2 yellow poos a day mean baby is getting enough.',
          },
          {
            el: 'Μια μικρή απώλεια βάρους τις πρώτες μέρες είναι φυσιολογική. Τα περισσότερα μωρά ξαναπιάνουν το βάρος γέννησης μέσα σε 2 εβδομάδες.',
            en: 'Losing a little weight in the first days is normal. Most babies are back to birth weight within 2 weeks.',
          },
        ],
      },
      {
        id: 'sleep',
        points: [
          {
            el: 'Περίπου 16 ώρες ύπνου τη μέρα, σε μικρά διαστήματα. Μέρα και νύχτα δεν ξεχωρίζουν ακόμα.',
            en: 'About 16 hours of sleep a day, in short stretches. Day and night aren’t different yet.',
          },
          {
            el: 'Πάντα ανάσκελα, στη δική του κούνια, στο δικό σας δωμάτιο.',
            en: 'Always on the back, in their own cot, in your room.',
          },
        ],
      },
      {
        id: 'care',
        points: [
          {
            el: 'Ο ομφάλιος λώρος ξεραίνεται και πέφτει συνήθως σε 1–2 εβδομάδες. Κρατήστε τον καθαρό και στεγνό.',
            en: 'The umbilical cord stump dries and falls off, usually within 1–2 weeks. Keep it clean and dry.',
          },
          {
            el: 'Ελαφρύς ίκτερος (κιτρινίλα) τη 2η–3η μέρα είναι συχνός και συνήθως φεύγει έως τις 2 εβδομάδες.',
            en: 'Mild jaundice (yellowish skin) on days 2–3 is common and usually fades by 2 weeks.',
          },
          {
            el: 'Πρώτη επίσκεψη στον παιδίατρο τις πρώτες μέρες μετά την έξοδο από το μαιευτήριο.',
            en: 'First paediatrician visit in the first days after leaving the hospital.',
          },
        ],
      },
      {
        id: 'development',
        points: [
          {
            el: 'Βλέπει καλύτερα πρόσωπα σε απόσταση 20–30 cm και αναγνωρίζει τη φωνή σας.',
            en: 'Sees faces best at 20–30 cm and recognises your voice.',
          },
          {
            el: 'Τα «τινάγματα» (αντανακλαστικό Moro) στον ύπνο είναι φυσιολογικά.',
            en: 'Sudden startles in sleep (the Moro reflex) are normal.',
          },
        ],
      },
      {
        id: 'parents',
        points: [
          {
            el: 'Η «μελαγχολία της λοχείας» (κλάμα, άγχος) τις πρώτες μέρες είναι πολύ συχνή και περνά σε 2 εβδομάδες. Αν κρατάει περισσότερο ή βαραίνει, μιλήστε στον γιατρό σας.',
            en: '“Baby blues” (tearfulness, anxiety) in the first days are very common and pass within 2 weeks. If they last longer or feel heavy, talk to your doctor.',
          },
          {
            el: 'Δεχτείτε βοήθεια για μαγείρεμα και δουλειές, και κοιμηθείτε όταν κοιμάται το μωρό.',
            en: 'Accept help with cooking and chores, and sleep when the baby sleeps.',
          },
        ],
      },
    ],
    redFlags: [
      { el: 'Θερμοκρασία 38 °C ή πάνω', en: 'A temperature of 38 °C or higher' },
      {
        el: 'Ίκτερος το πρώτο 24ωρο, ή κιτρινίλα που χειροτερεύει',
        en: 'Jaundice in the first 24 hours, or yellowing that gets worse',
      },
      {
        el: 'Λίγες βρεγμένες πάνες, τρώει ελάχιστα ή είναι ασυνήθιστα νυσταγμένο',
        en: 'Few wet nappies, feeding poorly or unusually sleepy',
      },
      {
        el: 'Δυσκολία στην αναπνοή ή μελάνιασμα στα χείλη',
        en: 'Difficulty breathing or bluish lips',
      },
      {
        el: 'Κοκκινίλα, έκκριμα ή άσχημη μυρωδιά στον ομφαλό',
        en: 'Redness, discharge or a bad smell around the cord',
      },
    ],
  },
  {
    id: 'first-month',
    ageLabel: { el: '2–4 εβδομάδων', en: '2–4 weeks' },
    title: { el: 'Ο πρώτος μήνας', en: 'The rest of the first month' },
    intro: {
      el: 'Αρχίζετε να γνωρίζετε τους ρυθμούς του. Οι εκρήξεις ανάπτυξης και το περισσότερο κλάμα είναι φυσιολογικά.',
      en: 'You start to learn baby’s rhythms. Growth spurts and more crying are normal.',
    },
    from: { weeks: 2 },
    to: { months: 1 },
    topics: [
      {
        id: 'feeding',
        points: [
          {
            el: 'Γύρω στις 2–3 εβδομάδες μπορεί να θέλει να τρώει συνέχεια (cluster feeding). Είναι έκρηξη ανάπτυξης, όχι έλλειψη γάλακτος.',
            en: 'Around 2–3 weeks baby may want to feed constantly (cluster feeding). It’s a growth spurt, not a lack of milk.',
          },
          {
            el: 'Μόνο γάλα: δεν χρειάζεται νερό, χαμομήλι ή άλλα υγρά πριν τους 6 μήνες.',
            en: 'Milk only: no water, chamomile or other drinks are needed before 6 months.',
          },
        ],
      },
      {
        id: 'sleep',
        points: [
          {
            el: 'Βοηθήστε το να ξεχωρίσει μέρα και νύχτα: φως και κίνηση τη μέρα, ησυχία και σκοτάδι τη νύχτα.',
            en: 'Help baby tell day from night: light and activity by day, quiet and dark at night.',
          },
        ],
      },
      {
        id: 'development',
        points: [
          {
            el: 'Σηκώνει για λίγο το κεφάλι όταν είναι μπρούμυτα και παρακολουθεί πρόσωπα.',
            en: 'Briefly lifts the head when on the tummy and follows faces.',
          },
          {
            el: 'Ξεκινήστε tummy time: λίγα λεπτά, μερικές φορές τη μέρα, ξύπνιο και με επίβλεψη.',
            en: 'Start tummy time: a few minutes, a few times a day, awake and supervised.',
          },
        ],
      },
      {
        id: 'care',
        points: [
          {
            el: 'Το κλάμα αυξάνεται από τις 2 εβδομάδες και κορυφώνεται γύρω στις 6–8 εβδομάδες. Νανούρισμα, αγκαλιά και βόλτα βοηθούν.',
            en: 'Crying increases from 2 weeks and peaks around 6–8 weeks. Rocking, cuddles and walks help.',
          },
          {
            el: 'Βιταμίνη D σε σταγόνες, αν τη συστήσει ο παιδίατρος.',
            en: 'Vitamin D drops, if your paediatrician recommends them.',
          },
        ],
      },
      {
        id: 'safety',
        points: [
          {
            el: 'Ποτέ μην ταρακουνάτε το μωρό. Αν νιώθετε ότι δεν αντέχετε, αφήστε το με ασφάλεια στην κούνια και πάρτε μια ανάσα.',
            en: 'Never shake a baby. If it all gets too much, put baby down safely in the cot and take a breather.',
          },
        ],
      },
      {
        id: 'parents',
        points: [
          {
            el: 'Η μαμά έχει τον δικό της έλεγχο στον γυναικολόγο γύρω στις 6 εβδομάδες.',
            en: 'Mum has her own check-up with the gynaecologist at around 6 weeks.',
          },
        ],
      },
    ],
    redFlags: [
      { el: 'Θερμοκρασία 38 °C ή πάνω', en: 'A temperature of 38 °C or higher' },
      {
        el: 'Εκτινασσόμενοι έμετοι μετά από κάθε τάισμα, ή πράσινος εμετός',
        en: 'Projectile vomiting after every feed, or green vomit',
      },
      {
        el: 'Κλάμα πολύ διαφορετικό από το συνηθισμένο ή που δεν σταματά με τίποτα',
        en: 'Crying that is very different from usual or won’t settle at all',
      },
      { el: 'Ίκτερος μετά τις 2 εβδομάδες', en: 'Jaundice that lasts beyond 2 weeks' },
    ],
  },
  {
    id: 'months-1-3',
    ageLabel: { el: '1–3 μηνών', en: '1–3 months' },
    title: { el: 'Τα πρώτα χαμόγελα', en: 'The first smiles' },
    intro: {
      el: 'Το μωρό «ξυπνάει» στον κόσμο: χαμογελά, βγάζει ήχους και κρατά καλύτερα το κεφάλι. Ξεκινούν και τα εμβόλια.',
      en: 'Baby “wakes up” to the world: smiling, cooing and holding the head better. Vaccinations begin too.',
    },
    from: { months: 1 },
    to: { months: 3 },
    topics: [
      {
        id: 'development',
        points: [
          {
            el: 'Το πρώτο κοινωνικό χαμόγελο έρχεται συνήθως γύρω στις 6–8 εβδομάδες.',
            en: 'The first social smile usually comes around 6–8 weeks.',
          },
          {
            el: 'Βγάζει ήχους («γκου»), ακολουθεί αντικείμενα με τα μάτια και φέρνει τα χέρια στο στόμα.',
            en: 'Coos, follows objects with the eyes and brings hands to the mouth.',
          },
          {
            el: 'Έως τους 3 μήνες κρατά πιο σταθερά το κεφάλι και σπρώχνει με τα χέρια όταν είναι μπρούμυτα.',
            en: 'By 3 months holds the head steadier and pushes up on the arms when on the tummy.',
          },
        ],
      },
      {
        id: 'feeding',
        points: [
          {
            el: 'Τα ταΐσματα γίνονται πιο γρήγορα και πιο αραιά. Συνεχίστε να ταΐζετε όταν το ζητάει.',
            en: 'Feeds get quicker and further apart. Keep feeding on demand.',
          },
        ],
      },
      {
        id: 'sleep',
        points: [
          {
            el: 'Μερικά μωρά αρχίζουν να κοιμούνται μεγαλύτερα διαστήματα τη νύχτα. Μια σταθερή ρουτίνα ύπνου (μπάνιο, τάισμα, νανούρισμα) βοηθά.',
            en: 'Some babies start sleeping longer stretches at night. A simple bedtime routine (bath, feed, lullaby) helps.',
          },
        ],
      },
      {
        id: 'care',
        points: [
          {
            el: 'Τα εμβόλια ξεκινούν στους 2 μήνες. Δείτε τη σελίδα «Εμβόλια & εξετάσεις».',
            en: 'Vaccinations start at 2 months. See the “Vaccines & check-ups” page.',
          },
          {
            el: 'Ρωτήστε τον παιδίατρο για τον υπέρηχο ισχίων.',
            en: 'Ask your paediatrician about the hip ultrasound.',
          },
        ],
      },
    ],
    redFlags: [
      {
        el: 'Πυρετός 38 °C ή πάνω σε μωρό κάτω των 3 μηνών',
        en: 'A temperature of 38 °C or higher under 3 months',
      },
      {
        el: 'Δεν χαμογελά ή δεν παρακολουθεί πρόσωπα έως τους 3 μήνες (αναφέρετέ το στον έλεγχο)',
        en: 'Not smiling or following faces by 3 months (mention it at the check-up)',
      },
      {
        el: 'Λιγότερες βρεγμένες πάνες, βυθισμένη πηγή (μαλακό σημείο) στο κεφάλι',
        en: 'Fewer wet nappies or a sunken soft spot on the head',
      },
    ],
  },
  {
    id: 'months-3-6',
    ageLabel: { el: '3–6 μηνών', en: '3–6 months' },
    title: { el: 'Γέλια, κυλίσματα και αρπαγές', en: 'Laughing, rolling and grabbing' },
    intro: {
      el: 'Το μωρό γίνεται πιο κινητικό και κοινωνικό. Ώρα να ετοιμάσετε το σπίτι και να σκεφτείτε τις πρώτες τροφές.',
      en: 'Baby becomes more mobile and sociable. Time to prepare the home and think about first foods.',
    },
    from: { months: 3 },
    to: { months: 6 },
    topics: [
      {
        id: 'development',
        points: [
          {
            el: 'Γελάει, πιάνει παιχνίδια και τα βάζει στο στόμα.',
            en: 'Laughs, grabs toys and puts them in the mouth.',
          },
          {
            el: 'Αρχίζει να κυλάει (συνήθως 4–6 μηνών) και κάθεται με στήριξη.',
            en: 'Starts rolling over (usually 4–6 months) and sits with support.',
          },
        ],
      },
      {
        id: 'sleep',
        points: [
          {
            el: 'Μόλις αρχίσει να γυρίζει, σταματήστε τη φάσκα και χρησιμοποιήστε υπνόσακο με ελεύθερα χέρια.',
            en: 'Once baby starts rolling, stop swaddling and use a sleeping bag with arms free.',
          },
          {
            el: 'Συνεχίστε να το βάζετε ανάσκελα. Όταν γυρίζει μόνο του και από τις δύο μεριές, δεν χρειάζεται να το ξαναγυρίζετε.',
            en: 'Keep putting baby down on the back. Once they can roll both ways by themselves, you don’t need to turn them back.',
          },
        ],
      },
      {
        id: 'feeding',
        points: [
          {
            el: 'Οι στερεές τροφές ξεκινούν γύρω στους 6 μήνες, όχι πριν τους 4. Σημάδια ετοιμότητας: κάθεται με στήριξη, κρατά σταθερά το κεφάλι, φέρνει τροφή στο στόμα και την καταπίνει.',
            en: 'Solid foods start around 6 months, not before 4. Signs of readiness: sits with support, holds the head steady, brings food to the mouth and swallows it.',
          },
        ],
      },
      {
        id: 'safety',
        points: [
          {
            el: 'Μην το αφήνετε ποτέ μόνο σε κρεβάτι, καναπέ ή αλλαξιέρα: κυλάει απρόβλεπτα.',
            en: 'Never leave baby alone on a bed, sofa or changing table: they roll unexpectedly.',
          },
          {
            el: 'Μικρά αντικείμενα, μπαταρίες-κουμπιά και καυτά ροφήματα μακριά από τα χέρια του.',
            en: 'Keep small objects, button batteries and hot drinks out of reach.',
          },
        ],
      },
    ],
    redFlags: [
      {
        el: 'Δεν κρατά το κεφάλι του έως τους 4 μήνες',
        en: 'Can’t hold the head up by 4 months',
      },
      {
        el: 'Δεν αντιδρά σε δυνατούς ήχους ή δεν ακολουθεί κινούμενα αντικείμενα',
        en: 'Doesn’t react to loud sounds or follow moving objects',
      },
    ],
  },
  {
    id: 'months-6-12',
    ageLabel: { el: '6–12 μηνών', en: '6–12 months' },
    title: { el: 'Πρώτες τροφές, πρώτα βήματα', en: 'First foods, first steps' },
    intro: {
      el: 'Στερεές τροφές, μπουσούλημα και ίσως οι πρώτες λέξεις. Το σπίτι χρειάζεται «θωράκιση».',
      en: 'Solid food, crawling and maybe first words. The home needs baby-proofing.',
    },
    from: { months: 6 },
    to: { months: 12 },
    topics: [
      {
        id: 'feeding',
        points: [
          {
            el: 'Στερεές τροφές μαζί με το γάλα. Προτιμήστε τροφές πλούσιες σε σίδηρο και προσφέρετε νερό σε ποτηράκι με τα γεύματα.',
            en: 'Solid food alongside milk. Favour iron-rich foods and offer water in a cup with meals.',
          },
          {
            el: 'Τα αλλεργιογόνα (αυγό, φυστικοβούτυρο σε κρέμα κ.ά.) μπαίνουν από τους 6 μήνες, ένα-ένα.',
            en: 'Allergens (egg, smooth peanut butter, etc.) can be introduced from 6 months, one at a time.',
          },
          {
            el: 'Όχι μέλι πριν τον 1 χρόνο, όχι αλάτι ή ζάχαρη, ποτέ ολόκληροι ξηροί καρποί. Το αγελαδινό γάλα ως κύριο ρόφημα μετά τον 1 χρόνο.',
            en: 'No honey before age 1, no added salt or sugar, never whole nuts. Cow’s milk as a main drink only after age 1.',
          },
        ],
      },
      {
        id: 'development',
        points: [
          {
            el: 'Κάθεται χωρίς στήριξη, μπουσουλάει, λέει «μα-μα», «μπα-μπα» και σηκώνεται όρθιο κρατώντας έπιπλα.',
            en: 'Sits unsupported, crawls, babbles “ma-ma”, “ba-ba” and pulls up to stand on furniture.',
          },
          {
            el: 'Τα πρώτα βήματα έρχονται από 9 έως 18 μηνών. Το εύρος είναι μεγάλο και φυσιολογικό.',
            en: 'First steps come anywhere from 9 to 18 months. That wide range is normal.',
          },
        ],
      },
      {
        id: 'care',
        points: [
          {
            el: 'Με το πρώτο δοντάκι, βούρτσισμα με ελάχιστη οδοντόκρεμα με φθόριο και πρώτη επίσκεψη στον οδοντίατρο.',
            en: 'From the first tooth, brush with a smear of fluoride toothpaste and book a first dentist visit.',
          },
        ],
      },
      {
        id: 'safety',
        points: [
          {
            el: 'Πορτάκια στις σκάλες, κάλυμμα στις πρίζες, στερέωση επίπλων στον τοίχο, κλειδαριές στα ντουλάπια με χημικά και φάρμακα.',
            en: 'Stair gates, socket covers, furniture anchored to the wall, locks on cupboards with chemicals and medicines.',
          },
          {
            el: 'Το κάθισμα αυτοκινήτου μένει με την πλάτη προς τη φορά τουλάχιστον έως τους 15 μήνες.',
            en: 'The car seat stays rear-facing until at least 15 months.',
          },
          {
            el: 'Ένα σεμινάριο πρώτων βοηθειών για βρέφη (πνιγμονή, ΚΑΡΠΑ) αξίζει τον χρόνο του.',
            en: 'A baby first-aid course (choking, CPR) is well worth the time.',
          },
        ],
      },
    ],
    redFlags: [
      {
        el: 'Δεν κάθεται με στήριξη έως τους 9 μήνες ή δεν βγάζει συλλαβές',
        en: 'Can’t sit with support by 9 months or isn’t babbling',
      },
      {
        el: 'Χάνει δεξιότητες που είχε ήδη αποκτήσει',
        en: 'Loses skills they already had',
      },
    ],
  },
]
