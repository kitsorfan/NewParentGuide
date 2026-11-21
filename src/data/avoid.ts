import type { AvoidEntry } from './types'

export const avoidList: readonly AvoidEntry[] = [
  {
    id: 'bumpers',
    kind: 'safety',
    name: { el: 'Πάντες / προστατευτικά κούνιας', en: 'Cot bumpers' },
    why: {
      el: 'Κίνδυνος ασφυξίας και εγκλωβισμού. Η κούνια πρέπει να είναι άδεια: μόνο στρώμα και σεντόνι με λάστιχο.',
      en: 'Suffocation and entrapment risk. The cot should be bare: just the mattress and a fitted sheet.',
    },
  },
  {
    id: 'soft-bedding',
    kind: 'safety',
    name: {
      el: 'Μαξιλάρι, πάπλωμα και λούτρινα μέσα στην κούνια',
      en: 'Pillows, duvets and soft toys in the cot',
    },
    why: {
      el: 'Τα μαλακά αντικείμενα αυξάνουν τον κίνδυνο αιφνίδιου βρεφικού θανάτου. Για ζεστασιά, υπνόσακος.',
      en: 'Soft items raise the risk of sudden infant death. Use a sleeping bag for warmth.',
    },
  },
  {
    id: 'nests',
    kind: 'safety',
    name: {
      el: 'Φωλιές ύπνου (babynest), σφήνες και ρυθμιστές θέσης',
      en: 'Baby nests, wedges and sleep positioners',
    },
    why: {
      el: 'Τα μαλακά τοιχώματα δεν είναι ασφαλή για ύπνο χωρίς επίβλεψη και δεν προλαμβάνουν το σύνδρομο αιφνίδιου θανάτου.',
      en: 'Soft sides are not safe for unsupervised sleep and do not prevent SIDS.',
    },
  },
  {
    id: 'inclined-sleepers',
    kind: 'safety',
    name: { el: 'Κεκλιμένα «υπνωτήρια» μωρού', en: 'Inclined sleepers' },
    why: {
      el: 'Σε κλίση πάνω από 10° το κεφάλι γέρνει και μπορεί να κλείσει ο αεραγωγός. Αν αποκοιμηθεί στο ριλάξ, μεταφέρετέ το στην κούνια.',
      en: 'On an incline over 10° the head slumps and can block the airway. If baby dozes off in a bouncer, move them to the cot.',
    },
  },
  {
    id: 'walkers',
    kind: 'safety',
    name: { el: 'Στράτα (περπατούρα)', en: 'Baby walkers' },
    why: {
      el: 'Προκαλούν πτώσεις και τραυματισμούς και δεν βοηθούν στο περπάτημα. Η Αμερικανική Ακαδημία Παιδιατρικής ζητά την απαγόρευσή τους.',
      en: 'They cause falls and injuries and do not help babies walk. The American Academy of Pediatrics calls for a ban.',
    },
  },
  {
    id: 'amber',
    kind: 'safety',
    name: { el: 'Κεχριμπαρένια κολιέ οδοντοφυΐας', en: 'Amber teething necklaces' },
    why: {
      el: 'Κίνδυνος στραγγαλισμού και πνιγμού, χωρίς αποδεδειγμένο όφελος.',
      en: 'Strangulation and choking risk, with no proven benefit.',
    },
  },
  {
    id: 'used-car-seat',
    kind: 'safety',
    name: {
      el: 'Μεταχειρισμένο κάθισμα αυτοκινήτου άγνωστης προέλευσης',
      en: 'Second-hand car seat with an unknown history',
    },
    why: {
      el: 'Μετά από τρακάρισμα μπορεί να έχει αόρατες ζημιές. Τα παλιά R44 δεν πωλούνται καινούρια στην ΕΕ από τον Σεπτέμβριο του 2024.',
      en: 'It may have invisible crash damage. Older R44 seats can no longer be sold new in the EU since September 2024.',
    },
  },
  {
    id: 'talc',
    kind: 'safety',
    name: { el: 'Ταλκ (πούδρα)', en: 'Talcum powder' },
    why: {
      el: 'Η σκόνη, αν εισπνευστεί, ερεθίζει τους πνεύμονες του μωρού. Μια κρέμα για σύγκαμα αρκεί.',
      en: 'Inhaled powder irritates a baby’s lungs. A barrier cream does the job.',
    },
  },
  {
    id: 'wipe-warmer',
    kind: 'money',
    name: { el: 'Θερμαντήρας μωρομάντηλων', en: 'Wipe warmer' },
    why: {
      el: 'Τα μωρά συνηθίζουν γρήγορα τα μωρομάντηλα σε θερμοκρασία δωματίου.',
      en: 'Babies quickly get used to room-temperature wipes.',
    },
  },
  {
    id: 'newborn-shoes',
    kind: 'money',
    name: { el: 'Παπουτσάκια νεογέννητου', en: 'Newborn shoes' },
    why: {
      el: 'Δεν περπατάει ακόμα. Καλτσάκια ή πλεκτά παπουτσάκια κρατούν τα πόδια ζεστά.',
      en: 'Babies don’t walk yet. Socks or knitted booties keep feet warm.',
    },
  },
  {
    id: 'too-small-clothes',
    kind: 'money',
    name: {
      el: 'Πολλά ρούχα σε μέγεθος νεογέννητου (50)',
      en: 'Lots of newborn-size (50) clothes',
    },
    why: {
      el: 'Πολλά μωρά τα ξεπερνούν σε 2–3 εβδομάδες. Λίγα σε 50/56, τα περισσότερα σε 62.',
      en: 'Many babies outgrow them in 2–3 weeks. A few in 50/56, most in 62.',
    },
  },
  {
    id: 'formula-machine',
    kind: 'money',
    name: { el: 'Μηχανή παρασκευής γάλακτος', en: 'Formula-making machine' },
    why: {
      el: 'Ακριβή και θέλει συχνό καθάρισμα. Αν ταΐσετε με ξένο γάλα και τη χρειαστείτε, παίρνεται αργότερα.',
      en: 'Expensive and needs frequent cleaning. If you formula-feed and want one, buy it later.',
    },
  },
  {
    id: 'refill-bins',
    kind: 'money',
    name: {
      el: 'Κάδος πάνας με ειδικές ανταλλακτικές σακούλες',
      en: 'Nappy bins that need special refill bags',
    },
    why: {
      el: 'Τα ανταλλακτικά κοστίζουν συνέχεια. Ένας απλός κάδος με καπάκι, που αδειάζει συχνά, κάνει την ίδια δουλειά.',
      en: 'The refills cost money forever. A plain lidded bin emptied often does the same job.',
    },
  },
]
