import type { Localized } from '../i18n/types'

/**
 * "What to look for" when buying: the features worth checking per item, keyed by item id.
 * Kept short (2–5 points) so it reads as a checklist in the shop.
 */
export const lookFor: Readonly<Partial<Record<string, readonly Localized[]>>> = {
  // ── Sleep
  crib: [
    { el: 'Πρότυπο ασφαλείας EN 716', en: 'EN 716 safety standard' },
    {
      el: 'Βάση στρώματος σε 2–3 ύψη (χαμηλώνει όταν το μωρό σηκώνεται)',
      en: 'Mattress base with 2–3 heights (lower it once baby can pull up)',
    },
    {
      el: 'Μη τοξικό φινίρισμα, χωρίς κενά ή προεξοχές που πιάνουν ρούχα',
      en: 'Non-toxic finish, no gaps or knobs that can catch clothing',
    },
    {
      el: 'Κάγκελα που αφαιρούνται, αν θέλετε να γίνει κρεβατάκι αργότερα',
      en: 'Removable side bars if you want it to convert to a toddler bed',
    },
  ],
  'crib-mattress': [
    {
      el: 'Σκληρό: πιέστε το με το χέρι, πρέπει να επανέρχεται αμέσως',
      en: 'Firm: press it with your hand; it should spring straight back',
    },
    {
      el: 'Αφαιρούμενο κάλυμμα που πλένεται στους 60 °C',
      en: 'Removable cover, washable at 60 °C',
    },
    {
      el: 'Αεριζόμενο υλικό (π.χ. κοκοφοίνικας, αφρός με κανάλια)',
      en: 'Breathable core (e.g. coconut fibre, ventilated foam)',
    },
    { el: 'Πιστοποίηση Oeko-Tex ή αντίστοιχη', en: 'Oeko-Tex or similar certification' },
  ],
  'mattress-protector': [
    {
      el: 'Αδιάβροχο αλλά αεριζόμενο, όχι νάιλον που «τρίζει»',
      en: 'Waterproof but breathable, not crinkly plastic',
    },
    { el: 'Λάστιχο σε όλη την περίμετρο', en: 'Elastic all the way round' },
    { el: 'Πλένεται στους 60 °C', en: 'Washable at 60 °C' },
  ],
  'fitted-sheets': [
    { el: '100% βαμβάκι (ζέρσεϊ ή φανέλα)', en: '100% cotton (jersey or flannel)' },
    {
      el: 'Λάστιχο παντού, να μη φεύγει από τις γωνίες',
      en: 'Fully elasticated so it can’t slip off the corners',
    },
  ],
  'sleeping-bag': [
    {
      el: 'Σωστό TOG για την εποχή: 2.5 τον χειμώνα, 0.5–1 το καλοκαίρι',
      en: 'The right TOG for the season: 2.5 in winter, 0.5–1 in summer',
    },
    {
      el: 'Εφαρμοστός λαιμός και μανίκια, ώστε το κεφάλι να μη γλιστρά μέσα',
      en: 'Fitted neck and armholes so baby’s head can’t slip inside',
    },
    { el: 'Χωρίς κουκούλα', en: 'No hood' },
    {
      el: 'Φερμουάρ με προστατευτικό στο πηγούνι, ιδανικά ανοίγει από κάτω για αλλαγή πάνας',
      en: 'Zip with a chin guard, ideally opening from the bottom for nappy changes',
    },
  ],
  bassinet: [
    {
      el: 'Κουνουπιέρα: πολύτιμη τους ζεστούς μήνες',
      en: 'A mosquito net, invaluable in the warm months',
    },
    {
      el: 'Ρυθμιζόμενο ύψος, ώστε να ευθυγραμμίζεται με το κρεβάτι σας',
      en: 'Adjustable height so it lines up with your bed',
    },
    {
      el: 'Πλευρά που ανοίγει και ιμάντες στερέωσης στο κρεβάτι (για next-to-me)',
      en: 'A side that drops and straps to fix it to your bed (bedside cribs)',
    },
    {
      el: 'Πλαϊνά από δίχτυ για αερισμό, ροδάκια με φρένο',
      en: 'Breathable mesh sides, wheels with brakes',
    },
    { el: 'Πρότυπο ασφαλείας EN 1130', en: 'EN 1130 safety standard' },
  ],
  'baby-monitor': [
    {
      el: 'Τοπική σύνδεση (όχι Wi-Fi) ή κρυπτογραφημένη εφαρμογή, για ιδιωτικότητα',
      en: 'Local connection (not Wi-Fi) or an encrypted app, for privacy',
    },
    {
      el: 'Εμβέλεια και διάρκεια μπαταρίας για όλο το σπίτι',
      en: 'Enough range and battery life for your whole home',
    },
    {
      el: 'Νυχτερινή όραση και ένδειξη θερμοκρασίας δωματίου',
      en: 'Night vision and a room-temperature reading',
    },
  ],
  'white-noise': [
    {
      el: 'Ρυθμιζόμενη ένταση και χρονοδιακόπτης',
      en: 'Adjustable volume and a timer',
    },
    { el: 'Συνεχής ήχος χωρίς επαναλήψεις-«κλικ»', en: 'Seamless sound with no looping clicks' },
  ],
  'night-light': [
    {
      el: 'Ζεστό, ρυθμιζόμενο φως (όχι μπλε ή λευκό)',
      en: 'Warm, dimmable light (not blue or white)',
    },
    { el: 'Δεν ζεσταίνεται, χρονοδιακόπτης', en: 'Stays cool to the touch, has a timer' },
  ],

  // ── Out & about
  'travel-system': [
    {
      el: 'Μετρήστε το πορτμπαγκάζ σας και συγκρίνετε με τις διαστάσεις διπλωμένου',
      en: 'Measure your car boot and compare it with the folded size',
    },
    {
      el: 'Καλή ανάρτηση και μεγάλοι τροχοί για τα ελληνικά πεζοδρόμια',
      en: 'Good suspension and big wheels for uneven pavements',
    },
    {
      el: 'Βάρος: θα το σηκώνετε σε σκάλες και πορτμπαγκάζ',
      en: 'Weight: you’ll lift it up stairs and into the boot',
    },
    {
      el: 'Πορτ-μπεμπέ για τους πρώτους μήνες, κάθισμα που γυρίζει προς εσάς, κάλυμμα βροχής',
      en: 'A lie-flat carrycot for the early months, a parent-facing seat, a rain cover',
    },
    {
      el: 'Το κάθισμα αυτοκινήτου να είναι i-Size (R129)',
      en: 'The included car seat is i-Size (R129)',
    },
  ],
  'car-seat': [
    {
      el: 'Πορτοκαλί ετικέτα έγκρισης R129 (i-Size)',
      en: 'An orange R129 (i-Size) approval label',
    },
    {
      el: 'Καλά αποτελέσματα σε ανεξάρτητα crash tests (π.χ. ADAC)',
      en: 'Good results in independent crash tests (e.g. ADAC)',
    },
    {
      el: 'Προστασία πλευρικής πρόσκρουσης και μαξιλαράκι νεογέννητου',
      en: 'Side-impact protection and a newborn insert',
    },
    {
      el: 'Δοκιμάστε την τοποθέτηση στο δικό σας αυτοκίνητο πριν την αγορά',
      en: 'Test-fit it in your own car before you buy',
    },
  ],
  'isofix-base': [
    {
      el: 'Συμβατή με το συγκεκριμένο κάθισμα και στη λίστα συμβατότητας του αυτοκινήτου σας',
      en: 'Compatible with your exact seat, and on your car’s compatibility list',
    },
    {
      el: 'Πόδι στήριξης και ενδείξεις (πράσινο/κόκκινο) σωστής τοποθέτησης',
      en: 'A support leg and green/red indicators for correct fitting',
    },
  ],
  'baby-carrier': [
    {
      el: 'Εργονομική στάση «Μ» για υγιή ισχία',
      en: 'An ergonomic “M” position for healthy hips',
    },
    {
      el: 'Κατάλληλος από τη γέννηση (ρυθμιζόμενο πλάτος ή ένθετο)',
      en: 'Suitable from birth (adjustable panel or an insert)',
    },
    { el: 'Στήριξη κεφαλιού και μέσης για εσάς', en: 'Head support, and lumbar support for you' },
    { el: 'Αεριζόμενο ύφασμα για το καλοκαίρι', en: 'Breathable fabric for the summer' },
  ],
  'diaper-bag': [
    {
      el: 'Εσωτερική επένδυση που σκουπίζεται, στρωματάκι αλλαγής',
      en: 'Wipe-clean lining and a changing mat',
    },
    {
      el: 'Θερμομονωτική θήκη για μπιμπερό, γάντζοι για το καρότσι',
      en: 'An insulated bottle pocket and pushchair clips',
    },
  ],
  footmuff: [
    {
      el: 'Ανοίγματα για ζώνη 5 σημείων, ταιριάζει στο καρότσι σας',
      en: 'Slots for a 5-point harness, fits your pushchair',
    },
    {
      el: 'Αδιάβροχο εξωτερικό, επάνω μέρος που ανοίγει όταν ζεσταίνεται',
      en: 'Water-resistant outside, a top that unzips when it gets warm',
    },
  ],

  // ── Feeding
  bottles: [
    {
      el: 'Σύστημα κατά των κολικών (βαλβίδα εξαερισμού)',
      en: 'An anti-colic vent',
    },
    {
      el: 'Φαρδύς λαιμός για εύκολο καθάρισμα, μπαίνει στο πλυντήριο πιάτων',
      en: 'A wide neck for easy cleaning, dishwasher-safe',
    },
    {
      el: 'Συμβατά με το θήλαστρο που σκοπεύετε να πάρετε',
      en: 'Compatible with the breast pump you plan to buy',
    },
  ],
  teats: [
    {
      el: 'Αργή ροή (0m+) για νεογέννητο',
      en: 'Slow flow (0m+) for a newborn',
    },
    { el: 'Σιλικόνη: πιο ανθεκτική από το καουτσούκ', en: 'Silicone lasts longer than latex' },
  ],
  sterilizer: [
    {
      el: 'Χωράει όσα μπιμπερό θέλετε (και τα φαρδιά)',
      en: 'Fits as many bottles as you need, wide-neck ones included',
    },
    {
      el: 'Λειτουργία στεγνώματος και αυτόματη διακοπή',
      en: 'A drying function and auto shut-off',
    },
    { el: 'Μέγεθος που χωράει στον πάγκο σας', en: 'A size that fits your worktop' },
  ],
  'bottle-warmer': [
    {
      el: 'Ήπιο πρόγραμμα για μητρικό γάλα και ξεπάγωμα',
      en: 'A gentle setting for breast milk, plus defrosting',
    },
    { el: 'Χωράει φαρδιά μπιμπερό, αυτόματη διακοπή', en: 'Fits wide bottles, auto shut-off' },
  ],
  'nursing-pillow': [
    {
      el: 'Γέμισμα που κρατά το σχήμα του (όχι πολύ μαλακό)',
      en: 'Filling that holds its shape (not too soft)',
    },
    { el: 'Αφαιρούμενο κάλυμμα που πλένεται', en: 'Removable, washable cover' },
  ],
  'breast-pump': [
    {
      el: 'Κλειστό σύστημα (το γάλα δεν φτάνει στη μηχανή)',
      en: 'A closed system (milk can’t reach the motor)',
    },
    {
      el: 'Ρυθμιζόμενη αναρρόφηση και ρυθμός δύο φάσεων',
      en: 'Adjustable suction and two-phase rhythm',
    },
    {
      el: 'Διάφορα μεγέθη χοάνης (το σωστό μέγεθος μετράει)',
      en: 'Several breast-shield sizes (the right fit matters)',
    },
    {
      el: 'Διπλό ηλεκτρικό, αν επιστρέφετε στη δουλειά',
      en: 'A double electric pump if you’re going back to work',
    },
  ],
  pacifiers: [
    { el: 'Μέγεθος για την ηλικία (0–6 μηνών)', en: 'The right size for the age (0–6 months)' },
    {
      el: 'Ασπίδα με τρύπες αερισμού, από ένα κομμάτι',
      en: 'A one-piece design with ventilation holes in the shield',
    },
  ],
  muslins: [
    {
      el: '100% βαμβάκι, μεγάλο μέγεθος (70×70 ή 120×120)',
      en: '100% cotton, large (70×70 or 120×120)',
    },
  ],

  // ── Nappy changing
  diapers: [
    {
      el: 'Νο1 με εγκοπή για τον ομφάλιο λώρο',
      en: 'Size 1 with a cut-out for the umbilical cord',
    },
    { el: 'Δείκτης υγρασίας', en: 'A wetness indicator' },
  ],
  wipes: [
    {
      el: 'Χωρίς άρωμα, με λίγα συστατικά και πολύ νερό',
      en: 'Fragrance-free, few ingredients, mostly water',
    },
  ],
  'diaper-cream': [{ el: 'Οξείδιο ψευδαργύρου, χωρίς άρωμα', en: 'Zinc oxide, fragrance-free' }],
  'changing-pad': [
    { el: 'Ανασηκωμένα πλαϊνά', en: 'Raised sides' },
    {
      el: 'Αδιάβροχο, σκουπίζεται, αντιολισθητική βάση',
      en: 'Waterproof, wipe-clean, with a non-slip base',
    },
    { el: 'Ταιριάζει στο έπιπλο που θα το βάλετε', en: 'Fits the furniture you’ll put it on' },
  ],
  'changing-table': [
    {
      el: 'Ύψος επιφάνειας 85–95 cm για να μην πονάει η μέση',
      en: 'A changing height of 85–95 cm to spare your back',
    },
    {
      el: 'Προστατευτικό γύρω-γύρω και συρτάρια σε απόσταση χεριού',
      en: 'A guard rail and drawers within reach',
    },
    { el: 'Στερέωση στον τοίχο κατά της ανατροπής', en: 'An anti-tip wall fixing' },
  ],

  // ── Bath & grooming
  bathtub: [
    {
      el: 'Αντιολισθητικός πάτος και κλίση που στηρίζει το νεογέννητο',
      en: 'A non-slip base and a slope that supports a newborn',
    },
    {
      el: 'Τάπα αποχέτευσης, χωράει στη μπανιέρα ή στη βάση σας',
      en: 'A drain plug, and it fits your bath or a stand',
    },
    { el: 'Πτυσσόμενο, αν το μπάνιο είναι μικρό', en: 'Foldable if your bathroom is small' },
  ],
  'bath-support': [
    {
      el: 'Κατάλληλο από τη γέννηση, με βεντούζες που κρατούν σταθερά',
      en: 'Suitable from birth, with suction feet that hold firm',
    },
    { el: 'Στεγνώνει γρήγορα (δίχτυ ή σιλικόνη)', en: 'Dries quickly (mesh or silicone)' },
  ],
  'hooded-towels': [
    {
      el: 'Μαλακό βαμβάκι ή μπαμπού, τουλάχιστον 75×75 cm',
      en: 'Soft cotton or bamboo, at least 75×75 cm',
    },
  ],
  'baby-wash': [
    {
      el: 'Χωρίς άρωμα, ουδέτερο pH, δεν τσούζει στα μάτια',
      en: 'Fragrance-free, pH-neutral, tear-free',
    },
  ],
  'nail-kit': [
    {
      el: 'Ψαλιδάκι με στρογγυλεμένες άκρες και λίμα',
      en: 'Round-tipped scissors and a file',
    },
  ],

  // ── Health
  thermometer: [
    {
      el: 'Ψηφιακό (ποτέ υδραργύρου), γρήγορη μέτρηση ~10 δευτερολέπτων',
      en: 'Digital (never mercury), with a quick ~10-second reading',
    },
    { el: 'Μνήμη και ειδοποίηση πυρετού', en: 'Memory and a fever alert' },
  ],
  'nasal-aspirator': [
    {
      el: 'Καθαρίζεται εύκολα, μαλακό ρύγχος',
      en: 'Easy to clean, with a soft tip',
    },
    {
      el: 'Στα ηλεκτρικά: ρυθμιζόμενη αναρρόφηση',
      en: 'Electric ones: adjustable suction',
    },
  ],
  humidifier: [
    {
      el: 'Ψυχρού ατμού (υπερήχων), αθόρυβος',
      en: 'Cool mist (ultrasonic) and quiet',
    },
    {
      el: 'Αυτόματη διακοπή όταν αδειάσει, εύκολος καθαρισμός',
      en: 'Auto shut-off when empty, easy to clean',
    },
  ],

  // ── Clothes
  bodysuits: [
    {
      el: '100% βαμβάκι, επίπεδες ραφές',
      en: '100% cotton, flat seams',
    },
    {
      el: 'Κρουαζέ ή λαιμόκοψη «φάκελος» που περνά εύκολα από το κεφάλι',
      en: 'Wrap-over or envelope necks that go on easily',
    },
  ],
  sleepsuits: [
    {
      el: 'Φερμουάρ με προστατευτικό πηγουνιού ή κουμπιά ως το πόδι',
      en: 'A zip with a chin guard, or poppers down the leg',
    },
    {
      el: 'Αναδιπλούμενα γαντάκια στα μανίκια',
      en: 'Fold-over scratch mitts on the sleeves',
    },
  ],
  'pram-suit': [
    {
      el: 'Κουκούλα, αναδιπλούμενα γαντάκια και καλτσάκια',
      en: 'A hood, fold-over mitts and feet',
    },
    { el: 'Φερμουάρ σε όλο το μήκος', en: 'A full-length zip' },
  ],
  'nursing-bra': [
    {
      el: 'Χωρίς μπανέλα, κλιπ που ανοίγει με ένα χέρι',
      en: 'Wire-free, with one-hand clips',
    },
    {
      el: 'Ελαστικό ύφασμα (το στήθος αλλάζει μέγεθος)',
      en: 'Stretchy fabric (your size will change)',
    },
  ],

  // ── Play
  bouncer: [
    {
      el: 'Ζώνη ασφαλείας και σταθερή, φαρδιά βάση',
      en: 'A safety harness and a wide, stable base',
    },
    {
      el: 'Θέσεις ανάκλισης και κάλυμμα που πλένεται',
      en: 'Recline positions and a washable cover',
    },
  ],
  'play-gym': [
    {
      el: 'Χαλάκι που πλένεται, παιχνίδια που αλλάζουν θέση',
      en: 'A washable mat, toys you can move around',
    },
    { el: 'Αντικείμενα με έντονες αντιθέσεις', en: 'High-contrast toys' },
  ],
  mobile: [
    {
      el: 'Στερεώνεται γερά, μακριά από τα χέρια του μωρού',
      en: 'Clamps on firmly, out of baby’s reach',
    },
    { el: 'Χρονοδιακόπτης και ρυθμιζόμενη ένταση', en: 'A timer and adjustable volume' },
  ],
}
