import type { Source } from './types'

/** Every URL here was checked to resolve (November 2026). Health-schedule sources live in health.ts. */
export const sources: readonly Source[] = [
  // ── Safe sleep
  {
    id: 'aap-safe-sleep',
    topic: 'sleep',
    title: { el: 'Ασφαλής ύπνος (Safe Sleep)', en: 'Safe Sleep' },
    publisher: 'American Academy of Pediatrics',
    url: 'https://www.aap.org/safesleep',
    lang: 'en',
  },
  {
    id: 'hc-safe-sleep',
    topic: 'sleep',
    title: { el: 'Οδηγός ασφαλούς ύπνου για γονείς', en: 'A parent’s guide to safe sleep' },
    publisher: 'HealthyChildren.org (AAP)',
    url: 'https://www.healthychildren.org/English/ages-stages/baby/sleep/Pages/a-parents-guide-to-safe-sleep.aspx',
    lang: 'en',
  },
  {
    id: 'bw-safe-sleep-greek',
    topic: 'sleep',
    title: {
      el: 'Ασφαλής ύπνος για το μωρό μου (φυλλάδιο στα ελληνικά, PDF)',
      en: 'Safe sleep for my baby (leaflet in Greek, PDF)',
    },
    publisher: 'Υπουργείο Κοινωνικών Υποθέσεων Βάδης-Βυρτεμβέργης',
    url: 'https://sozialministerium.baden-wuerttemberg.de/fileadmin/redaktion/m-sm/intern/downloads/Publikationen/Sicherer-Schlaf-fuer-mein-Baby_2024_GR.pdf',
    lang: 'el',
  },
  {
    id: 'nhs-sids',
    topic: 'sleep',
    title: {
      el: 'Μείωση του κινδύνου αιφνίδιου βρεφικού θανάτου',
      en: 'Reduce the risk of sudden infant death syndrome',
    },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/caring-for-a-newborn/reduce-the-risk-of-sudden-infant-death-syndrome/',
    lang: 'en',
  },
  {
    id: 'lullaby-room-temp',
    topic: 'sleep',
    title: { el: 'Θερμοκρασία δωματίου μωρού', en: 'Room temperature for baby' },
    publisher: 'The Lullaby Trust',
    url: 'https://www.lullabytrust.org.uk/safer-sleep-advice/room-temperature/',
    lang: 'en',
  },
  {
    id: 'nhs-sleep',
    topic: 'sleep',
    title: { el: 'Πώς να βοηθήσετε το μωρό να κοιμηθεί', en: 'Helping your baby to sleep' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/conditions/baby/caring-for-a-newborn/helping-your-baby-to-sleep/',
    lang: 'en',
  },

  // ── Car & home safety
  {
    id: 'hc-car-seats',
    topic: 'car',
    title: {
      el: 'Καθίσματα αυτοκινήτου: πληροφορίες για οικογένειες',
      en: 'Car seats: information for families',
    },
    publisher: 'HealthyChildren.org (AAP)',
    url: 'https://www.healthychildren.org/English/safety-prevention/on-the-go/Pages/Car-Safety-Seats-Information-for-Families.aspx',
    lang: 'en',
  },
  {
    id: 'mapfre-r44',
    topic: 'car',
    title: {
      el: 'Τέλος πώλησης καθισμάτων R44 στην ΕΕ (Σεπτ. 2024)',
      en: 'End of sales of R44 child seats in the EU (Sept 2024)',
    },
    publisher: 'Fundación MAPFRE',
    url: 'https://fundacionmapfre.org/en/blog/ban-on-the-sale-of-approved-child-restraint-systems',
    lang: 'en',
  },
  {
    id: 'hc-walkers',
    topic: 'car',
    title: { el: 'Στράτες: μια επικίνδυνη επιλογή', en: 'Baby walkers: a dangerous choice' },
    publisher: 'HealthyChildren.org (AAP)',
    url: 'https://www.healthychildren.org/English/safety-prevention/at-home/Pages/Baby-Walkers-A-Dangerous-Choice.aspx',
    lang: 'en',
  },
  {
    id: 'nhs-safety',
    topic: 'car',
    title: { el: 'Ασφάλεια μωρών και νηπίων στο σπίτι', en: 'Baby and toddler safety' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/first-aid-and-safety/safety/baby-and-toddler-safety/',
    lang: 'en',
  },
  {
    id: 'nhs-cpr',
    topic: 'car',
    title: { el: 'ΚΑΡΠΑ σε μωρό ή παιδί', en: 'How to resuscitate a baby or child' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/first-aid-and-safety/first-aid/how-to-resuscitate-a-child/',
    lang: 'en',
  },

  // ── Feeding
  {
    id: 'who-feeding',
    topic: 'feeding',
    title: { el: 'Διατροφή βρεφών και μικρών παιδιών', en: 'Infant and young child feeding' },
    publisher: 'World Health Organization',
    url: 'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding',
    lang: 'en',
  },
  {
    id: 'nhs-sterilising',
    topic: 'feeding',
    title: { el: 'Αποστείρωση μπιμπερό', en: 'Sterilising baby bottles' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/breastfeeding-and-bottle-feeding/bottle-feeding/sterilising-baby-bottles/',
    lang: 'en',
  },
  {
    id: 'nhs-weaning',
    topic: 'feeding',
    title: { el: 'Ξεκινώντας τις στερεές τροφές', en: 'Weaning: starting solid foods' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/best-start-in-life/baby/weaning/',
    lang: 'en',
  },
  {
    id: 'nhs-foods-to-avoid',
    topic: 'feeding',
    title: {
      el: 'Τροφές που δεν δίνουμε σε μωρά',
      en: 'Foods to avoid giving babies and young children',
    },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/',
    lang: 'en',
  },

  // ── Health & care
  {
    id: 'nhs-fever',
    topic: 'health',
    title: { el: 'Πυρετός στα παιδιά', en: 'High temperature (fever) in children' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/conditions/fever-in-children/',
    lang: 'en',
  },
  {
    id: 'nhs-jaundice',
    topic: 'health',
    title: { el: 'Ίκτερος του νεογέννητου', en: 'Newborn jaundice' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/conditions/jaundice-newborn/',
    lang: 'en',
  },
  {
    id: 'nhs-bathing',
    topic: 'health',
    title: { el: 'Πλύσιμο και μπάνιο του μωρού', en: 'Washing and bathing your baby' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/caring-for-a-newborn/washing-and-bathing-your-baby/',
    lang: 'en',
  },
  {
    id: 'nhs-nappy',
    topic: 'health',
    title: { el: 'Πώς να αλλάξετε πάνα', en: 'How to change your baby’s nappy' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/caring-for-a-newborn/how-to-change-your-babys-nappy/',
    lang: 'en',
  },
  {
    id: 'nhs-teeth',
    topic: 'health',
    title: { el: 'Φροντίδα των παιδικών δοντιών', en: 'Taking care of children’s teeth' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/',
    lang: 'en',
  },
  {
    id: 'nhs-pnd',
    topic: 'health',
    title: { el: 'Επιλόχεια κατάθλιψη', en: 'Postnatal depression' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/mental-health/conditions/post-natal-depression/overview/',
    lang: 'en',
  },

  {
    id: 'nhs-hospital-bag',
    topic: 'health',
    title: { el: 'Τι να πάρετε στη βαλίτσα του μαιευτηρίου', en: 'Pack your bag for labour' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/pregnancy/labour-and-birth/preparing-for-the-birth/pack-your-bag-for-labour/',
    lang: 'en',
  },

  // ── Development
  {
    id: 'nhs-development',
    topic: 'development',
    title: { el: 'Η εξέλιξη του μωρού', en: 'Your baby’s development' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/babys-development/',
    lang: 'en',
  },
  {
    id: 'nhs-crying',
    topic: 'development',
    title: { el: 'Πώς να ηρεμήσετε ένα μωρό που κλαίει', en: 'Soothing a crying baby' },
    publisher: 'NHS',
    url: 'https://www.nhs.uk/baby/caring-for-a-newborn/soothing-a-crying-baby/',
    lang: 'en',
  },

  // ── Prices
  {
    id: 'skroutz',
    topic: 'prices',
    title: { el: 'Σύγκριση τιμών', en: 'Price comparison' },
    publisher: 'Skroutz.gr',
    url: 'https://www.skroutz.gr/',
    lang: 'el',
  },
  {
    id: 'bestprice',
    topic: 'prices',
    title: { el: 'Σύγκριση τιμών', en: 'Price comparison' },
    publisher: 'BestPrice.gr',
    url: 'https://www.bestprice.gr/',
    lang: 'el',
  },
]
