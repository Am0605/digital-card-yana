export const wedding = {
  couple: {
    partnerOne: "Imran",
    partnerTwo: "Liyana",
  },
  names: "Imran & Liyana",
  monogram: "I & L",
  music: {
    src: "/music/Enchanted.mp3",
    title: "Enchanted",
  },
  tagline:
    "Together with their families, request the pleasure of your company as they celebrate their marriage",
  dateLabel: "Saturday, November 7, 2026",
  timeLabel: "Eleven o'clock in the morning",
  start: "2026-11-07T11:00:00+08:00",
  end: "2026-11-07T16:30:00+08:00",
  timezone: "Asia/Singapore",
  rsvpDeadline: "November 1, 2026",
  contact: {
    note: "Questions about the day, directions, or seating — we are happy to help.",
    phone: "",
    whatsapp: "",
  },
  venue: {
    name: "Dewan Jubli Perak",
    hall: "Shah Alam Sultan Abdul Aziz",
    address: "Seksyen 5 Shah Alam",
    city: "Selangor",
    details:
      "The ceremony begins promptly in the Dewan Jubli Perak.",
    mapQuery: "Dewan Jubli Perak Shah Alam Selangor",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dewan+Jubli+Perak+Shah+Alam+Selangor",
  },
  dressCode: {
    title: "Garden Formal",
    description:
      "Soft yellow for the groom's (man) side, sage green for the bride's (female) side. Think champagne light, garden florals, and a little evening sparkle. We cannot wait to see you dressed for a summer celebration.",
    notes: [
      "Guests representing the groom's side are encouraged to wear attire in soft yellow tones.",
      "Guests representing the bride's side are encouraged to wear attire in sage green tones.",
    ],
    palette: [
      { name: "Soft Yellow", body: "(Groom's side)", hex: "#FFF5C3" },
      { name: "Sage Green", body: "(Bride's side)", hex: "#A3B18A" },
    ],
  },
  story: [
    {
      year: "2019",
      title: "A chance meeting",
      body: "Jumpa Imran kat kedai mamak. Makan nasi lemak bersama. Tarik duit tuh korang kena.",
    },
    {
      year: "2021",
      title: "Becoming home",
      body: "Couple nyahh",
    },
    {
      year: "2026",
      title: "Tunang",
      body: "Tunang fuh style.",
    },
    {
      year: "2026",
      title: "The celebration",
      body: "Surrounded by the people they love most, they will promise forever. Your presence is the greatest gift they could ask for.",
    },
  ],
} as const;

export type WeddingConfig = typeof wedding;
