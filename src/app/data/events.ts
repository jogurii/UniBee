export type EventReward = {
  satPoints?: string;
  certificate?: string;
  eWallet?: string;
};

export type CampusEvent = {
  id: number;
  title: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  mapsQuery: string;
  image: string;
  description: string;
  reward: string;
  rewards: EventReward;
  type: "Comserv" | "Seminar";
  isTFI: boolean;
  quotaRemaining: number;
  quotaTotal: number;
};

export const EVENTS: CampusEvent[] = [
  {
    id: 1,
    title: "Relawan Dokumentasi Ekonomi Pulau Sibandang",
    organizer: "Teach For Indonesia",
    date: "20 Nov 2025",
    time: "08:00 – 16:00 WIB",
    location: "Pulau Sibandang, Sumatera Utara",
    mapsQuery: "Pulau+Sibandang+Sumatera+Utara",
    image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80",
    description:
      "Program relawan dokumentasi ekonomi masyarakat Pulau Sibandang. Peserta akan terlibat langsung dalam pendataan UMKM, wawancara, dan pelaporan dampak sosial untuk kebutuhan TFI.",
    reward: "+10 Jam Comserv",
    rewards: {
      certificate: "Sertifikat Relawan TFI",
      eWallet: "Voucher E-Wallet Rp50.000",
    },
    type: "Comserv",
    isTFI: true,
    quotaRemaining: 15,
    quotaTotal: 100,
  },
  {
    id: 2,
    title: "Workshop UI/UX: Design for Sustainability",
    organizer: "HIMTI BINUS",
    date: "18 Mei 2026",
    time: "13:00 – 17:00 WIB",
    location: "Xperience Space Lt.1, BINUS @Medan",
    mapsQuery: "Xperience+Space+Lt.1,+BINUS+@Medan",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?auto=format&fit=crop&w=1200&q=80",
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
  },
  {
    id: 3,
    title: "Penanaman Pohon di Panti Jompo Karya Kasih",
    organizer: "Teach For Indonesia",
    date: "25 Mei 2026",
    time: "07:30 – 12:00 WIB",
    location: "Panti Jompo Karya Kasih, Medan Johor",
    mapsQuery: "Medan+Johor",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
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
  },
];

export function getEventById(id: string | undefined): CampusEvent | undefined {
  const parsed = Number(id);
  if (Number.isNaN(parsed)) return undefined;
  return EVENTS.find((event) => event.id === parsed);
}
