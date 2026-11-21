import type { Lang } from './types'

const el = {
  documentTitle: 'Οδηγός Νεογέννητου',
  brand: 'Οδηγός Νεογέννητου',
  brandTagline: 'Για νέους γονείς',
  skipToContent: 'Μετάβαση στο περιεχόμενο',
  languageLabel: 'Γλώσσα',
  themeLabel: 'Θέμα εμφάνισης',
  themes: {
    auto: 'Αυτόματο (όπως η συσκευή)',
    light: 'Φωτεινό',
    dark: 'Σκούρο',
    night: 'Νυχτερινό (χαμηλό, ζεστό φως για τα βραδινά ταΐσματα)',
  },
  print: 'Εκτύπωση',
  menuOpen: 'Άνοιγμα μενού',
  menuClose: 'Κλείσιμο μενού',
  mainNav: 'Ενότητες οδηγού',

  nav: {
    checklist: 'Λίστα αγορών',
    bag: 'Βαλίτσα μαιευτηρίου',
    guide: 'Οδηγός ανά ηλικία',
    health: 'Εμβόλια & εξετάσεις',
    sources: 'Πηγές',
  },
  navHint: {
    checklist: 'Τι να πάρετε, πόσα και πόσο κοστίζουν',
    bag: 'Τι να πάρετε μαζί σας στη γέννα',
    guide: 'Τι να περιμένετε κάθε μήνα',
    health: 'Τι γίνεται και πότε',
    sources: 'Οδηγίες, φωτογραφίες, σημειώσεις',
  },

  sectionLabels: {
    avoid: 'Τι να μην αγοράσετε',
    tips: 'Έξυπνες αγορές',
    always: 'Ισχύει πάντα',
    timeline: 'Χρονολόγιο',
    vaccines: 'Πίνακας εμβολίων',
    paperwork: 'Χαρτιά & γραφειοκρατία',
    guidance: 'Οδηγίες & πηγές',
    photos: 'Φωτογραφίες',
    notes: 'Σημείωση',
  },
  nextUp: 'Επόμενο',

  // ── Checklist page
  checklistKicker: 'Λίστα αγορών',
  checklistTitle: 'Τι χρειάζεται πραγματικά ένα νεογέννητο;',
  checklistLead:
    'Τι είναι απαραίτητο και τι μπορεί να περιμένει, πόσα κομμάτια να πάρετε και πόσο να υπολογίζετε στην Ελλάδα. Δίπλα σε κάθε είδος, ό,τι αγόρασε πραγματικά ένας άλλος γονιός.',
  budgetTitle: 'Ενδεικτικός προϋπολογισμός',
  budgetEssentials: 'Μόνο τα απαραίτητα',
  budgetRecommended: '+ Συνιστώμενα',
  budgetAll: 'Όλη η λίστα',
  budgetTypical: 'συνήθως ~{amount}',
  budgetItems: '{count} είδη',
  referenceTitle: 'Παραγγελία αναφοράς',
  referenceBody: '{count} προϊόντα, 2024',
  progressLabel: 'Έχετε {done} από {total}',
  progressRemaining: 'απομένουν ~{amount}',
  clearOwned: 'Μηδενισμός',
  confirmClear: 'Να καθαριστούν όλα τα τσεκαρισμένα είδη;',

  legendHint: 'Περάστε το ποντίκι πάνω από ένα είδος (ή πατήστε το ⓘ) για να δείτε γιατί αξίζει.',
  priority: {
    essential: 'Απαραίτητο',
    recommended: 'Συνιστάται',
    optional: 'Προαιρετικό',
  },
  priorityDescription: {
    essential: 'Πριν έρθει το μωρό σπίτι',
    recommended: 'Κάνει τη ζωή πιο εύκολη',
    optional: 'Μπορεί να περιμένει',
  },
  timing: {
    beforeBirth: 'Πριν τη γέννα',
    firstWeeks: 'Πρώτες εβδομάδες',
    later: 'Από 2–3 μηνών',
  },
  units: {
    piece: { one: 'τεμ.', other: 'τεμ.' },
    pack: { one: 'συσκευασία', other: 'συσκευασίες' },
    pair: { one: 'ζευγάρι', other: 'ζευγάρια' },
    set: { one: 'σετ', other: 'σετ' },
    box: { one: 'κουτί', other: 'κουτιά' },
  },

  searchLabel: 'Αναζήτηση',
  searchPlaceholder: 'Αναζήτηση, π.χ. μπιμπερό',
  filterPriority: 'Προτεραιότητα',
  hideOwned: 'Κρύψε όσα έχω',
  onlyReference: 'Μόνο της παραγγελίας',
  resetFilters: 'Καθαρισμός',
  resultsCount: '{count} από {total}',
  noResults: 'Κανένα είδος δεν ταιριάζει με τα φίλτρα.',

  categoryCount: '{count} είδη',
  categoryEstimate: '~{amount}',
  quantityLabel: 'Ποσότητα',
  priceLabel: 'Τιμή μονάδας',
  priceSingleLabel: 'Τιμή',
  totalLabel: 'Σύνολο',
  whenLabel: 'Πότε',
  whyTitle: 'Γιατί να το πάρω;',
  lookForTitle: 'Τι να προσέξετε',
  tipTitle: 'Συμβουλή',
  showWhy: 'Γιατί να πάρω: {name}',
  ownedShort: 'Το έχω',
  ownedLabel: 'Το έχω: {name}',
  referenceLabel: 'Η επιλογή τους (2024)',
  notInBudget: 'Εκτός συνόλου',
  skroutzLink: 'Skroutz',
  skroutzLinkLabel: 'Σύγκριση τιμών για «{name}» στο Skroutz (νέα καρτέλα)',

  avoidTitle: 'Τι να ΜΗΝ αγοράσετε',
  avoidLead: 'Πωλούνται παντού, αλλά οι παιδίατροι συστήνουν να τα αποφύγετε, ή απλώς δεν αξίζουν.',
  avoidSafety: 'Για λόγους ασφάλειας',
  avoidMoney: 'Συνήθως πεταμένα λεφτά',
  shoppingTipsTitle: 'Έξυπνες αγορές',

  // ── Hospital bag page
  bagKicker: 'Βαλίτσα μαιευτηρίου',
  bagTitle: 'Τι να πάρετε μαζί σας στο μαιευτήριο',
  bagLead:
    'Για τη μαμά, το μωρό και τον σύντροφο, μαζί με τα έγγραφα. Τσεκάρετε ό,τι μπαίνει στη βαλίτσα· η λίστα μένει αποθηκευμένη σε αυτή τη συσκευή.',
  bagProgress: '{done} από {total} έτοιμα',
  bagTipsTitle: 'Πριν κλείσετε τη βαλίτσα',
  bagInList: 'Λίστα αγορών',
  bagInListLabel: 'Δείτε «{name}» στη λίστα αγορών',
  packedLabel: 'Έτοιμο: {name}',

  // ── Guide page
  guideKicker: 'Οδηγός ανά ηλικία',
  guideTitle: 'Τι να περιμένετε, μήνα με τον μήνα',
  guideLead:
    'Τάισμα, ύπνος, εξέλιξη και ασφάλεια από τις πρώτες μέρες ως τον πρώτο χρόνο, και πότε να πάρετε τηλέφωνο τον παιδίατρο. Κάθε μωρό έχει τον δικό του ρυθμό· οι ηλικίες είναι ενδεικτικές.',
  topics: {
    feeding: 'Τάισμα',
    sleep: 'Ύπνος',
    development: 'Εξέλιξη',
    care: 'Φροντίδα & υγεία',
    safety: 'Ασφάλεια',
    parents: 'Για εσάς',
  },
  redFlagsTitle: 'Καλέστε τον παιδίατρο αν δείτε',
  alwaysTitle: 'Ισχύει πάντα',
  youAreHere: 'Είστε εδώ',

  birthDateLabel: 'Ημερομηνία γέννησης (ή πιθανή ημερομηνία τοκετού)',
  birthDateHint:
    'Μένει μόνο σε αυτή τη συσκευή. Τη χρησιμοποιούμε για να δείξουμε ημερομηνίες και το στάδιο του μωρού.',
  birthDateClear: 'Καθαρισμός',
  babyAgeDays: 'Το μωρό είναι {count} ημερών',
  babyAgeWeeks: 'Το μωρό είναι {count} εβδομάδων',
  babyAgeMonths: 'Το μωρό είναι {count} μηνών',
  dueInDays: 'Απομένουν ~{count} μέρες ως τη γέννα',
  dueInWeeks: 'Απομένουν ~{count} εβδομάδες ως τη γέννα',

  // ── Health page
  healthKicker: 'Εμβόλια & εξετάσεις',
  healthTitle: 'Τι πρέπει να γίνει, και πότε',
  healthLead:
    'Εξετάσεις στο μαιευτήριο, προληπτικοί έλεγχοι στον παιδίατρο και το Εθνικό Πρόγραμμα Εμβολιασμών για τα δύο πρώτα χρόνια. Ο παιδίατρος θα σας καθοδηγήσει και θα τα καταγράφει στο Βιβλιάριο Υγείας του Παιδιού.',
  eventKinds: {
    vaccine: 'Εμβόλιο',
    screening: 'Εξέταση',
    checkup: 'Έλεγχος',
    supplement: 'Συμπλήρωμα',
    paperwork: 'Χαρτιά',
  },
  vaccineMatrixTitle: 'Πρόγραμμα εμβολιασμών με μια ματιά',
  vaccineColumn: 'Εμβόλιο',
  doseLabel: 'Δόση',
  healthDisclaimer:
    'Το πρόγραμμα αλλάζει από καιρό σε καιρό. Ακολουθήστε πάντα τις οδηγίες του παιδιάτρου σας.',

  // ── Sources page
  sourcesKicker: 'Πηγές',
  sourcesTitle: 'Πηγές & επίσημες οδηγίες',
  sourcesLead:
    'Οι προτεραιότητες, οι ποσότητες και οι οδηγίες βασίζονται σε παιδιατρικούς φορείς και επίσημες πηγές. Οι τιμές προέρχονται από το Skroutz, το BestPrice και ελληνικά καταστήματα.',
  sourceTopics: {
    sleep: 'Ασφαλής ύπνος',
    car: 'Ασφάλεια στο αυτοκίνητο & στο σπίτι',
    feeding: 'Τάισμα',
    health: 'Υγεία & φροντίδα',
    development: 'Εξέλιξη',
    prices: 'Τιμές',
    schedule: 'Εμβόλια & εξετάσεις',
  },
  sourceLangGreek: 'Ελληνικά',
  sourceLangEnglish: 'Αγγλικά',
  opensInNewTab: '(ανοίγει σε νέα καρτέλα)',
  photoCreditsTitle: 'Φωτογραφίες',
  photoCreditsLead:
    'Οι φωτογραφίες είναι ενδεικτικές του τύπου του προϊόντος. Οι περισσότερες είναι ελεύθερης άδειας (Creative Commons). Όσες σημειώνονται με © είναι φωτογραφίες καταστημάτων ή κατασκευαστών, ανήκουν στους κατόχους τους και χρησιμοποιούνται μόνο ενδεικτικά. Όλες έχουν περικοπεί και σμικρυνθεί για τον οδηγό.',
  photoBy: '{title}, από {creator}',
  disclaimerTitle: 'Σημαντική σημείωση',
  disclaimer:
    'Οι τιμές είναι ενδεικτικές ({date}) και αλλάζουν συχνά. Ο οδηγός συνοψίζει δημόσιες οδηγίες και δεν αντικαθιστά τη συμβουλή του παιδιάτρου σας.',
  priceDate: 'Νοέμβριος 2026',

  footerNote: 'Ενδεικτικές τιμές · Δεν αντικαθιστά τον παιδίατρο',
  footerSources: 'Πηγές & σημειώσεις',
}

export type Messages = typeof el

const en: Messages = {
  documentTitle: 'Newborn Guide',
  brand: 'Newborn Guide',
  brandTagline: 'For new parents',
  skipToContent: 'Skip to content',
  languageLabel: 'Language',
  themeLabel: 'Appearance',
  themes: {
    auto: 'Automatic (like your device)',
    light: 'Light',
    dark: 'Dark',
    night: 'Night (dim, warm light for night feeds)',
  },
  print: 'Print',
  menuOpen: 'Open menu',
  menuClose: 'Close menu',
  mainNav: 'Guide sections',

  nav: {
    checklist: 'Shopping list',
    bag: 'Hospital bag',
    guide: 'Month by month',
    health: 'Vaccines & check-ups',
    sources: 'Sources',
  },
  navHint: {
    checklist: 'What to buy, how many, what it costs',
    bag: 'What to pack for the birth',
    guide: 'What to expect each month',
    health: 'What happens, and when',
    sources: 'Guidance, photos, notes',
  },

  sectionLabels: {
    avoid: 'What not to buy',
    tips: 'Buy smart',
    always: 'Always true',
    timeline: 'Timeline',
    vaccines: 'Vaccine chart',
    paperwork: 'Paperwork',
    guidance: 'Guidance & sources',
    photos: 'Photos',
    notes: 'Note',
  },
  nextUp: 'Next up',

  checklistKicker: 'Shopping list',
  checklistTitle: 'What does a newborn actually need?',
  checklistLead:
    'What is essential and what can wait, how many to get, and what to expect to pay in Greece. Next to each item is what another parent actually bought.',
  budgetTitle: 'Estimated budget',
  budgetEssentials: 'Essentials only',
  budgetRecommended: '+ Recommended',
  budgetAll: 'The whole list',
  budgetTypical: 'typically ~{amount}',
  budgetItems: '{count} items',
  referenceTitle: 'Reference order',
  referenceBody: '{count} products, 2024',
  progressLabel: 'You have {done} of {total}',
  progressRemaining: '~{amount} to go',
  clearOwned: 'Reset',
  confirmClear: 'Clear every item you ticked?',

  legendHint: 'Hover over an item (or tap ⓘ) to see why it is worth buying.',
  priority: {
    essential: 'Essential',
    recommended: 'Recommended',
    optional: 'Optional',
  },
  priorityDescription: {
    essential: 'Before baby comes home',
    recommended: 'Makes life easier',
    optional: 'Can wait',
  },
  timing: {
    beforeBirth: 'Before birth',
    firstWeeks: 'First weeks',
    later: 'From 2–3 months',
  },
  units: {
    piece: { one: 'pc', other: 'pcs' },
    pack: { one: 'pack', other: 'packs' },
    pair: { one: 'pair', other: 'pairs' },
    set: { one: 'set', other: 'sets' },
    box: { one: 'box', other: 'boxes' },
  },

  searchLabel: 'Search',
  searchPlaceholder: 'Search, e.g. bottle',
  filterPriority: 'Priority',
  hideOwned: 'Hide what I have',
  onlyReference: 'Only the order’s items',
  resetFilters: 'Clear',
  resultsCount: '{count} of {total}',
  noResults: 'No items match these filters.',

  categoryCount: '{count} items',
  categoryEstimate: '~{amount}',
  quantityLabel: 'Quantity',
  priceLabel: 'Unit price',
  priceSingleLabel: 'Price',
  totalLabel: 'Total',
  whenLabel: 'When',
  whyTitle: 'Why buy it?',
  lookForTitle: 'What to look for',
  tipTitle: 'Tip',
  showWhy: 'Why buy: {name}',
  ownedShort: 'Got it',
  ownedLabel: 'I have: {name}',
  referenceLabel: 'Their pick (2024)',
  notInBudget: 'Not in totals',
  skroutzLink: 'Skroutz',
  skroutzLinkLabel: 'Compare prices for “{name}” on Skroutz (new tab)',

  avoidTitle: 'What NOT to buy',
  avoidLead:
    'Sold everywhere, but paediatricians advise against them, or they simply aren’t worth it.',
  avoidSafety: 'For safety reasons',
  avoidMoney: 'Usually a waste of money',
  shoppingTipsTitle: 'Buy smart',

  bagKicker: 'Hospital bag',
  bagTitle: 'What to pack for the hospital',
  bagLead:
    'For mum, baby and the birth partner, plus the documents. Tick off what goes in the bag; the list is saved on this device.',
  bagProgress: '{done} of {total} packed',
  bagTipsTitle: 'Before you zip it up',
  bagInList: 'Shopping list',
  bagInListLabel: 'See “{name}” on the shopping list',
  packedLabel: 'Packed: {name}',

  guideKicker: 'Month by month',
  guideTitle: 'What to expect, month by month',
  guideLead:
    'Feeding, sleep, development and safety from the first days to the first birthday, and when to call the paediatrician. Every baby has their own pace; ages are typical, not deadlines.',
  topics: {
    feeding: 'Feeding',
    sleep: 'Sleep',
    development: 'Development',
    care: 'Care & health',
    safety: 'Safety',
    parents: 'For you',
  },
  redFlagsTitle: 'Call the paediatrician if you notice',
  alwaysTitle: 'Always true',
  youAreHere: 'You are here',

  birthDateLabel: 'Birth date (or due date)',
  birthDateHint: 'Stays on this device. Used only to show dates and your baby’s current stage.',
  birthDateClear: 'Clear',
  babyAgeDays: 'Baby is {count} days old',
  babyAgeWeeks: 'Baby is {count} weeks old',
  babyAgeMonths: 'Baby is {count} months old',
  dueInDays: '~{count} days until the due date',
  dueInWeeks: '~{count} weeks until the due date',

  healthKicker: 'Vaccines & check-ups',
  healthTitle: 'What needs to happen, and when',
  healthLead:
    'Tests at the maternity hospital, routine paediatric check-ups and the Greek National Immunisation Programme for the first two years. Your paediatrician will guide you and record everything in the Child Health Booklet.',
  eventKinds: {
    vaccine: 'Vaccine',
    screening: 'Test',
    checkup: 'Check-up',
    supplement: 'Supplement',
    paperwork: 'Paperwork',
  },
  vaccineMatrixTitle: 'Vaccination schedule at a glance',
  vaccineColumn: 'Vaccine',
  doseLabel: 'Dose',
  healthDisclaimer:
    'The schedule changes from time to time. Always follow your paediatrician’s advice.',

  sourcesKicker: 'Sources',
  sourcesTitle: 'Sources & official guidance',
  sourcesLead:
    'Priorities, quantities and advice are based on paediatric bodies and official sources. Prices come from Skroutz, BestPrice and Greek shops.',
  sourceTopics: {
    sleep: 'Safe sleep',
    car: 'Car & home safety',
    feeding: 'Feeding',
    health: 'Health & care',
    development: 'Development',
    prices: 'Prices',
    schedule: 'Vaccines & check-ups',
  },
  sourceLangGreek: 'Greek',
  sourceLangEnglish: 'English',
  opensInNewTab: '(opens in a new tab)',
  photoCreditsTitle: 'Photos',
  photoCreditsLead:
    'Photos illustrate the type of product. Most are openly licensed (Creative Commons). Those marked © are shop or manufacturer photos that belong to their owners and are used for illustration only. All have been cropped and resized for this guide.',
  photoBy: '{title}, by {creator}',
  disclaimerTitle: 'Please note',
  disclaimer:
    'Prices are indicative ({date}) and change often. This guide summarises public guidance and does not replace advice from your paediatrician.',
  priceDate: 'November 2026',

  footerNote: 'Indicative prices · Not a substitute for your paediatrician',
  footerSources: 'Sources & notes',
}

export const messages: Readonly<Record<Lang, Messages>> = { el, en }
