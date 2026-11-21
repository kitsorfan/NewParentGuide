import type { ReferencePurchase } from './types'

/**
 * A real order placed by another parent in 2024 at a Greek baby shop
 * (transcribed from AnateloOrder.pdf). Prices are what was paid at the time.
 */
export const REFERENCE_ORDER_YEAR = 2024

/** Order total as printed on the PDF. */
export const REFERENCE_ORDER_TOTAL = 960.32

export const referenceOrder: readonly ReferencePurchase[] = [
  {
    itemId: 'bath-support',
    product: {
      el: 'Ok Baby «Jelly» βάση μπάνιου, γκρι',
      en: 'Ok Baby “Jelly” bath support, grey',
    },
    quantity: 1,
    unitPrice: 26.99,
    lineTotal: 26.99,
  },
  {
    itemId: 'crib-mattress',
    product: {
      el: 'Grecostrom στρώμα παρκοκρέβατου «Ιόλη», κοκοφοίνικας, αντιβακτηριδιακό ύφασμα, 60×120 cm',
      en: 'Grecostrom “Ioli” coconut-fibre cot mattress, antibacterial cover, 60×120 cm',
    },
    quantity: 1,
    unitPrice: 62.1,
    lineTotal: 62.1,
  },
  {
    itemId: 'travel-system',
    product: {
      el: 'BebeStars Nammas βρεφικό σύστημα μεταφοράς 3-σε-1, Ocean',
      en: 'BebeStars Nammas 3-in-1 travel system, Ocean',
    },
    quantity: 1,
    unitPrice: 499.9,
    lineTotal: 499.9,
  },
  {
    itemId: 'crib',
    product: {
      el: 'X-Treme Baby παρκοκρέβατο 125×65 cm, Mint Grey',
      en: 'X-Treme Baby travel cot 125×65 cm, Mint Grey',
    },
    quantity: 1,
    unitPrice: 59.9,
    lineTotal: 59.9,
  },
  {
    itemId: 'bathtub',
    product: {
      el: 'Thermobaby εργονομικό μπάνιο, λευκό',
      en: 'Thermobaby ergonomic baby bath, white',
    },
    quantity: 1,
    unitPrice: 29.9,
    lineTotal: 29.9,
  },
  {
    itemId: 'sterilizer',
    product: {
      el: 'Chicco ηλεκτρικός αποστειρωτής 3-σε-1',
      en: 'Chicco 3-in-1 electric steriliser',
    },
    quantity: 1,
    unitPrice: 75.91,
    lineTotal: 75.91,
  },
  {
    itemId: 'bottles',
    product: {
      el: 'Chicco γυάλινο μπιμπερό Well-Being 240 ml, 0m+',
      en: 'Chicco Well-Being glass bottle 240 ml, 0m+',
    },
    quantity: 3,
    unitPrice: 9.41,
    lineTotal: 28.22,
  },
  {
    itemId: 'pacifiers',
    product: {
      el: 'Chicco Physio Air ορθοδοντική πιπίλα σιλικόνης 0–6m, ροζ (2 τεμ.)',
      en: 'Chicco Physio Air orthodontic silicone soother 0–6m, pink (2-pack)',
    },
    quantity: 1,
    unitPrice: 4.74,
    lineTotal: 4.74,
  },
  {
    itemId: 'teats',
    product: {
      el: 'Dr. Brown’s θηλές σιλικόνης Options+ επίπεδο 0m+, φαρδύς λαιμός (2 τεμ.)',
      en: 'Dr. Brown’s Options+ silicone teats, level 0m+, wide neck (2-pack)',
    },
    quantity: 1,
    unitPrice: 6,
    lineTotal: 6,
  },
  {
    itemId: 'changing-pad',
    product: {
      el: 'X-Treme Baby μαλακή αλλαξιέρα 70×44 cm, Indian Grey',
      en: 'X-Treme Baby soft changing mat 70×44 cm, Indian Grey',
    },
    quantity: 1,
    unitPrice: 28.9,
    lineTotal: 28.9,
  },
  {
    itemId: 'bassinet-sheets',
    product: {
      el: 'Baby Oliver σελτεδάκι με κέντημα 50×70 cm',
      en: 'Baby Oliver embroidered sheet 50×70 cm',
    },
    quantity: 2,
    unitPrice: 7.92,
    lineTotal: 15.84,
  },
  {
    itemId: 'nail-kit',
    product: {
      el: 'Nuby σετ μανικιούρ με ψαλιδάκι, νυχοκόπτη και λίμα',
      en: 'Nuby manicure set with scissors, clipper and file',
    },
    quantity: 1,
    unitPrice: 6,
    lineTotal: 6,
  },
  {
    itemId: 'brush-comb',
    product: {
      el: 'Thermobaby σετ βούρτσα-χτένα',
      en: 'Thermobaby brush & comb set',
    },
    quantity: 1,
    unitPrice: 6.6,
    lineTotal: 6.6,
  },
  {
    itemId: 'mattress-protector',
    product: {
      el: 'Grecostrom αδιάβροχο κάλυμμα στρώματος Air Proof Baby 60×120 cm',
      en: 'Grecostrom Air Proof Baby waterproof mattress protector 60×120 cm',
    },
    quantity: 2,
    unitPrice: 21.6,
    lineTotal: 43.2,
  },
  {
    itemId: 'bassinet-mattress',
    product: {
      el: 'Grecostrom στρώμα καλαθούνας «Έκτωρ» Foam, αντιβακτηριδιακό ύφασμα, 40×80 cm',
      en: 'Grecostrom “Ektor” foam bassinet mattress, antibacterial cover, 40×80 cm',
    },
    quantity: 1,
    unitPrice: 17.1,
    lineTotal: 17.1,
  },
  {
    itemId: 'bottle-brush',
    product: {
      el: 'Chicco βούρτσα καθαρισμού για μπιμπερό και θηλές',
      en: 'Chicco bottle & teat cleaning brush',
    },
    quantity: 1,
    unitPrice: 6.56,
    lineTotal: 6.56,
  },
  {
    itemId: 'pacifier-case',
    product: {
      el: 'Chicco Easy Box θήκη για 2 πιπίλες, σιέλ',
      en: 'Chicco Easy Box case for 2 soothers, light blue',
    },
    quantity: 1,
    unitPrice: 6.56,
    lineTotal: 6.56,
  },
  {
    itemId: 'nursing-pillow',
    product: {
      el: 'Baby Star μαξιλάρι θηλασμού Large, Spring',
      en: 'Baby Star Large nursing pillow, Spring',
    },
    quantity: 1,
    unitPrice: 35.9,
    lineTotal: 35.9,
  },
]
