import type { CampusEvent, EventReward, EventStatus } from "../utils/types";

// Re-export for backwards compatibility
export type { CampusEvent, EventReward, EventStatus };

// All types are now defined in ../utils/types.ts

export const EVENTS: CampusEvent[] = [
  {
    id: 1,
    title: "Seminar HCI & User Experience",
    organizer: "HIMTI BINUS",
    date: "16 Mei 2026",
    time: "10:00",
    endTime: "12:00",
    location: "Xperience Space Lt.1, BINUS @Medan",
    mapsQuery: "Xperience+Space+Lt.1+BINUS+Medan",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    description:
      "Seminar tentang Human-Computer Interaction dan User Experience dalam pengembangan aplikasi modern.",
    reward: "+4 SAT Points",
    rewards: {
      satPoints: "+4 SAT Points",
      certificate: "Sertifikat Kehadiran",
    },
    type: "Seminar",
    isTFI: false,
    quotaRemaining: 28,
    quotaTotal: 80,
    status: "Upcoming",
    ticketCode: "UNB-7721-JX",
  },
  {
    id: 2,
    title: "Workshop UI/UX: Design for Sustainability",
    organizer: "HIMTI BINUS",
    date: "18 Mei 2026",
    time: "13:00",
    endTime: "15:00",
    location: "Lab Komputer Lt. 2, BINUS @Medan",
    mapsQuery: "Lab+Komputer+Lt.+2+BINUS+Medan",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=600&q=80",
    description:
      "Workshop intensif desain produk digital berkelanjutan. Pelajari prinsip SDG dalam UX, studi kasus nyata, dan praktik langsung dengan mentor industri.",
    reward: "+4 SAT Points",
    rewards: {
      satPoints: "+4 SAT Points",
      certificate: "Sertifikat Kehadiran",
    },
    type: "Seminar",
    isTFI: false,
    quotaRemaining: 28,
    quotaTotal: 80,
    status: "Upcoming",
    ticketCode: "UNB-8820-XP",
  },
  {
    id: 3,
    title: "Penanaman Pohon (Panti Jompo Karya Kasih)",
    organizer: "Teach For Indonesia",
    date: "14 Mei 2026",
    time: "07:30",
    endTime: "12:00",
    location: "Panti Jompo Karya Kasih, Medan Johor",
    mapsQuery: "Panti+Jompo+Karya+Kasih+Medan+Johor",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    description:
      "Aksi peduli lingkungan bersama warga lansia. Kegiatan meliputi penanaman pohon, edukasi eco-living, dan pendampingan intergenerasi di panti jompo.",
    reward: "+5 Jam Comserv",
    rewards: {
      certificate: "Sertifikat Komunitas",
      eWallet: "Snack Pack & Merchandise",
    },
    type: "Comserv",
    isTFI: true,
    quotaRemaining: 8,
    quotaTotal: 50,
    status: "Past",
    ticketCode: "TFI-9988-PJ",
  },
  {
    id: 4,
    title: "Seminar Career 101",
    organizer: "HIMSI BINUS",
    date: "10 April 2026",
    time: "09:00",
    endTime: "12:00",
    location: "Main Hall, BINUS @Medan",
    mapsQuery: "Main+Hall+BINUS+Medan",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    description:
      "Seminar pengembangan karier di industri IT. Mendapatkan insight dari profesional di bidang teknologi.",
    reward: "+3 SAT Points",
    rewards: {
      satPoints: "+3 SAT Points",
      certificate: "Sertifikat Kehadiran",
    },
    type: "Seminar",
    isTFI: false,
    quotaRemaining: 0,
    quotaTotal: 150,
    status: "Past",
    ticketCode: "UNB-1122-OK",
  },
];

export function getEventById(id: string | undefined): CampusEvent | undefined {
  const parsed = Number(id);
  if (Number.isNaN(parsed)) return undefined;
  return EVENTS.find((event) => event.id === parsed);
}

export function getUpcomingEvents(): CampusEvent[] {
  return EVENTS.filter(e => e.status === "Upcoming");
}

export function getPastEvents(): CampusEvent[] {
  return EVENTS.filter(e => e.status === "Past");
}