/**
 * Date parsing utilities for event data
 * Centralizes all date manipulation logic to avoid duplication across components
 */

// Tanggal timeline pada prototipe ditetapkan ke 15 Mei 2026
const PROTOTYPE_DATE = new Date(2026, 4, 15);

export interface ParsedDate {
  day: number;
  month: string;
  fullMonth: string;
}

/**
 * Parse event date string like "16 Mei 2026" into structured components
 * @param dateString - Date string in Indonesian format (e.g., "16 Mei 2026")
 * @returns Parsed date components or fallback defaults
 */
export function parseEventDate(dateString: string): ParsedDate {
  if (!dateString) {
    return { day: 16, month: "Mei", fullMonth: "Mei" };
  }

  const parts = dateString.trim().split(" ");
  const day = parseInt(parts[0], 10);
  const month = parts[1] || "Mei";
  const year = parts[2] || PROTOTYPE_DATE.getFullYear().toString();

  return { day, month, fullMonth: `${month} ${year}` };
}

/**
 * Format month for display (first 3 characters)
 * @param month - Full month name in Indonesian
 * @returns Abbreviated month name
 */
export function formatEventMonth(month: string): string {
  return month.slice(0, 3);
}

/**
 * Check if an event date is in the past
 * @param dateString - Date string in Indonesian format
 * @returns boolean
 */
export function isEventPast(dateString: string): boolean {
  const { day, month } = parseEventDate(dateString);
  const monthIndex = getMonthIndex(month);
  const currentYear = PROTOTYPE_DATE.getFullYear();

  const eventDate = new Date(currentYear, monthIndex, day);
  const today = new Date(PROTOTYPE_DATE);
  today.setHours(0, 0, 0, 0);

  return eventDate < today;
}

/**
 * Get month index from Indonesian month name
 * @param month - Month name in Indonesian
 * @returns Month index (0-11)
 */
function getMonthIndex(month: string): number {
  const months: Record<string, number> = {
   Januari: 0,
    Februari: 1,
    Maret: 2,
    April: 3,
    Mei: 4,
    Juni: 5,
    Juli: 6,
    Agustus: 7,
    September: 8,
    Oktober: 9,
    November: 10,
    Desember: 11,
  };

  return months[month] ?? 4; // Default to May (Mei)
}

/**
 * Check if an event date is within a certain number of days from today
 * @param dateString - Date string in Indonesian format
 * @param days - Number of days
 * @returns boolean
 */
export function isEventWithinDays(dateString: string, days: number): boolean {
  const { day, month } = parseEventDate(dateString);
  const monthIndex = getMonthIndex(month);
  const currentYear = PROTOTYPE_DATE.getFullYear();

  const eventDate = new Date(currentYear, monthIndex, day);
  const today = new Date(PROTOTYPE_DATE);
  today.setHours(0, 0, 0, 0);

  const differenceInTime = eventDate.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return differenceInDays >= 0 && differenceInDays <= days;
}
