import type { Tip } from './types'

export const tips: readonly Tip[] = [
  {
    id: 'safe-sleep',
    icon: 'sleep',
    page: 'guide',
    title: { el: 'Ασφαλής ύπνος', en: 'Safe sleep' },
    points: [
      { el: 'Πάντα ανάσκελα, σε κάθε ύπνο.', en: 'Always on the back, for every sleep.' },
      {
        el: 'Σκληρό, επίπεδο στρώμα που εφαρμόζει στην κούνια, μόνο με σεντόνι με λάστιχο.',
        en: 'A firm, flat mattress that fits the cot, with just a fitted sheet.',
      },
      {
        el: 'Στο δωμάτιο των γονιών αλλά στο δικό του κρεβάτι, ιδανικά τους πρώτους 6 μήνες.',
        en: 'In your room but in their own bed, ideally for the first 6 months.',
      },
      {
        el: 'Χωρίς κάπνισμα μέσα στο σπίτι ή στο αυτοκίνητο.',
        en: 'No smoking in the home or the car.',
      },
    ],
  },
  {
    id: 'winter',
    icon: 'winter',
    page: 'guide',
    title: { el: 'Μωρό του χειμώνα', en: 'A winter baby' },
    points: [
      {
        el: 'Θερμοκρασία δωματίου 16–20 °C. Το θερμόμετρο δωματίου βοηθά να μην το παραζεστάνετε.',
        en: 'Keep the room at 16–20 °C. A room thermometer helps you avoid overheating.',
      },
      {
        el: 'Στο αυτοκίνητο, όχι χοντρό μπουφάν ή φόρμα εξόδου κάτω από τους ιμάντες. Λεπτά ρούχα, και η κουβέρτα από πάνω.',
        en: 'In the car, no bulky coat or pram suit under the harness. Dress in thin layers and put the blanket over the straps.',
      },
      {
        el: 'Για τον ύπνο, υπνόσακος TOG 2.5 αντί για κουβέρτες, και χωρίς σκουφάκι μέσα στο σπίτι.',
        en: 'For sleep, a TOG 2.5 sleeping bag instead of blankets, and no hat indoors.',
      },
      {
        el: 'Ποδόσακος και κάλυμμα βροχής κάνουν τις χειμωνιάτικες βόλτες εφικτές.',
        en: 'A footmuff and a rain cover make winter walks possible.',
      },
    ],
  },
  {
    id: 'hospital',
    icon: 'hospital',
    page: 'guide',
    title: { el: 'Από το μαιευτήριο στο σπίτι', en: 'From hospital to home' },
    points: [
      {
        el: 'Το κάθισμα αυτοκινήτου χρειάζεται από την πρώτη διαδρομή. Τοποθετήστε το και δοκιμάστε το πριν τη γέννα.',
        en: 'You need the car seat for the very first ride. Install and test it before the birth.',
      },
      {
        el: 'Το νεογέννητο ταξιδεύει πάντα με την πλάτη προς τη φορά, και ποτέ μπροστά σε ενεργό αερόσακο.',
        en: 'Newborns always ride rear-facing, and never in front of an active airbag.',
      },
      {
        el: 'Η βαλίτσα του μαιευτηρίου να είναι έτοιμη από την 36η εβδομάδα.',
        en: 'Have the hospital bag packed by week 36.',
      },
      {
        el: 'Ρωτήστε την κλινική τι δίνει (πάνες, μωρομάντηλα, γάλα), ώστε να μην τα κουβαλάτε άσκοπα.',
        en: 'Ask the clinic what they provide (nappies, wipes, formula) so you don’t pack them for nothing.',
      },
    ],
  },
  {
    id: 'smart-buying',
    icon: 'smart',
    page: 'checklist',
    title: { el: 'Έξυπνες αγορές', en: 'Buy smart' },
    points: [
      {
        el: 'Τα απαραίτητα έως την 34η–36η εβδομάδα. Τα προαιρετικά μπορούν να περιμένουν, αφού οι παραγγελίες φτάνουν σε 1–3 μέρες.',
        en: 'Essentials by week 34–36. Optional items can wait, since online orders arrive in 1–3 days.',
      },
      {
        el: 'Πολλά βρεφικά καταστήματα κάνουν «λίστα μωρού» για τα δώρα, ώστε να μη σας έρθουν τρία ίδια ριλάξ.',
        en: 'Many Greek baby shops run a baby gift list (λίστα μωρού), so you don’t receive three identical bouncers.',
      },
      {
        el: 'Τα μεταχειρισμένα είναι εντάξει για ρούχα, μπανάκι, ριλάξ και παιχνίδια. Όχι για κάθισμα αυτοκινήτου, και καλύτερα όχι για στρώμα.',
        en: 'Second-hand is fine for clothes, bath, bouncer and toys. Not for car seats, and ideally not for mattresses.',
      },
      {
        el: 'Μην κάνετε μεγάλα αποθέματα σε πάνες Νο1 ή γάλα πριν δείτε τι ταιριάζει στο μωρό.',
        en: 'Don’t stockpile size-1 nappies or formula until you see what suits your baby.',
      },
    ],
  },
  {
    id: 'health',
    icon: 'health',
    page: 'guide',
    title: { el: 'Υγεία: τα βασικά', en: 'Health basics' },
    points: [
      {
        el: 'Πυρετός 38 °C ή πάνω σε μωρό κάτω των 3 μηνών: καλέστε αμέσως τον παιδίατρο.',
        en: 'A temperature of 38 °C or higher in a baby under 3 months: call your paediatrician straight away.',
      },
      {
        el: 'Φάρμακα (π.χ. παρακεταμόλη) μόνο στη δόση που ορίζει ο παιδίατρος, βάσει βάρους.',
        en: 'Medicines such as paracetamol only at the dose your paediatrician gives, based on weight.',
      },
      {
        el: 'Αποθηκεύστε στο κινητό τον παιδίατρο και το Κέντρο Δηλητηριάσεων (210 7793777). Σε επείγον: 166 ή 112.',
        en: 'Save your paediatrician and the Greek Poison Centre (210 7793777) in your phone. Emergencies: 166 or 112.',
      },
    ],
  },
]
