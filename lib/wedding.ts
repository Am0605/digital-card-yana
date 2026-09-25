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
    "Bersama keluarga, kami mempersilakan kehadiran anda untuk meraikan majlis perkahwinan ini",
  dateLabel: "Sabtu, 7 November 2026",
  timeLabel: "11:30 pagi - 4:30 petang",
  start: "2026-11-07T11:00:00+08:00",
  end: "2026-11-07T16:30:00+08:00",
  timezone: "Asia/Singapore",
  rsvpDeadline: "1 November 2026",
  contact: {
    groups: [
      {
        title: "Pihak lelaki",
        sections: [
          {
            label: "",
            people: [
              {
                name: "Khairuddin",
                role: "Bapa pihak lelaki",
                phone: "0123275452",
                whatsapp: "",
              },
            ],
          },
          {
            label: "",
            people: [
              { name: "Kak Nor", role: "", phone: "0123276450", whatsapp: "" },
              { name: "Hawa", role: "", phone: "0122881452", whatsapp: "" },
              { name: "Adam", role: "", phone: "0176358633", whatsapp: "" },
            ],
          },
        ],
      },
      {
        title: "Pihak perempuan",
        sections: [
          {
            label: "",
            people: [
              {
                name: "Rosnani",
                role: "Ibu pihak perempuan",
                phone: "0122578552",
                whatsapp: "",
              },
              { name: "Intan", role: "", phone: "0109264100", whatsapp: "" },
              { name: "Angah", role: "", phone: "01170144211", whatsapp: "" },
            ],
          },
        ],
      },
    ],
  },
  venue: {
    name: "Dewan Jubli Perak",
    hall: "Shah Alam Sultan Abdul Aziz",
    address: "Seksyen 5 Shah Alam",
    city: "Selangor",
    details: "Majlis akan bermula tepat pada waktunya di Dewan Jubli Perak.",
    mapQuery: "Dewan Jubli Perak Shah Alam Selangor",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dewan+Jubli+Perak+Shah+Alam+Selangor",
    wazeUrl:
      "https://waze.com/ul?q=Dewan+Jubli+Perak+Shah+Alam+Selangor&navigate=yes",
  },
  dressCode: {
    title: "Pakaian Rasmi",
    description:
      "Kuning lembut untuk pihak pengantin lelaki, hijau sage untuk pihak pengantin perempuan. Pilih warna lembut, corak bunga, dan sedikit kilauan. Kami tidak sabar melihat anda berpakaian untuk majlis ini.",
    notes: [
      "Tetamu pihak pengantin lelaki digalakkan memakai pakaian berwarna kuning lembut.",
      "Tetamu pihak pengantin perempuan digalakkan memakai pakaian berwarna hijau sage.",
    ],
    palette: [
      { name: "Kuning Lembut", body: "(Pihak lelaki)", hex: "#FFF5C3" },
      { name: "Hijau Sage", body: "(Pihak perempuan)", hex: "#A3B18A" },
    ],
  },
  note: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    greeting: "Assalamualaikum warahmatullahi wabarakatuh",
    opening: "Dengan penuh kesyukuran ke hadrat Ilahi, kami",
    groomFather: "Khairuddin bin Hanuddin",
    groomMother: "Hashimah binti Hassan Bessri",
    brideFather: "Yahaya bin Mohamad",
    brideMother: "Rosnani binti Idris",
    invitation:
      "mempersilakan tuan-tuan dan puan-puan seisi keluarga hadir ke majlis perkahwinan putera dan puteri kami",
    couple: ["Imran Nurdin bin Khairuddin", "Norliyana Natasha binti Yahaya"],
    closing:
      "Kehadiran serta doa restu anda amat kami hargai. Semoga majlis ini diberkati Allah SWT.",
  },
} as const;

export type WeddingConfig = typeof wedding;
