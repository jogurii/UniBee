# Ringkasan Lengkap Aplikasi UniBee - Hub Kemahasiswaan BINUS

## Deskripsi Umum Aplikasi

**UniBee** adalah aplikasi mobile-first untuk hub kemahasiswaan yang dirancang menggunakan React dengan Vite, menggunakan Radix UI dan TailwindCSS untuk komponen UI. Aplikasi ini berfungsi sebagai platform terpusat bagi mahasiswa BINUS untuk mengelola acara kampus, poin SAT, jam komunitas (Comserv), dan interaksi sosial.

**Tech Stack:**
- React 18.3 + Vite 6
- React Router 7 untuk routing
- TailwindCSS 4.1 untuk styling
- Radix UI untuk accessible components
- Framer Motion untuk animasi
- Lucide React untuk icons
- TypeScript-ready structure

---

## KONSEP HCI (Human Computer Interaction) YANG DITERAPKAN

### 1. prinsip Usability

| Prinsip | Implementasi dalam Aplikasi |
|---------|----------------------------|
| **Learnability** | Splash screen dengan animasi, pola navigasi konsisten, bottom nav yang familiar |
| **Efficiency** | One-click RSVP, bottom nav akses cepat, progress tracking visual |
| **Memorability** | Ikon yang konsisten (lucide-react), pola UI yang berulang di semua halaman |
| **Error Prevention** | Konfirmasi sebelum batalkan RSVP, disable button saat kuota penuh |
| **Satisfaction** | Animasi transisi halus (Framer Motion), feedback visual untuk setiap aksi |

### 2. prinsip User Interface Design

| Prinsip | Implementasi |
|---------|--------------|
| **Visibility of System Status** | Loading spinner, toast notification, scan feedback overlay |
| **Match Between System & Real World** | Terminologi kampus (SAT Points, Comserv, TFI) |
| **User Control & Freedom** | Back button di setiap halaman, cancel RSVP dengan konfirmasi |
| **Consistency & Standards** | Komponen UI konsisten, padding/margin seragam |
| **Error Recovery** | Manual input fallback di scanner, pop-up konfirmasi |
| **Flexibility & Efficiency** | Dark mode toggle, shortcut ke halaman frequently accessed |

### 3. Design Patterns yang Digunakan

- **Splash Screen** - Loading state dengan branding
- **Bottom Navigation Bar** - Familiar pattern untuk mobile apps
- **Card-based UI** - Event cards, ticket cards, achievement cards
- **Modal/Sheet** - Ticket detail modal, confirmation dialogs
- **Progress Indicators** - SAT points bar, quota bar, ring progress
- **Toast Notifications** - Feedback after actions
- **Skeleton Loading** - (component available)
- **Carousel** - Featured events on dashboard
- **FAB (Floating Action Button)** - Quick ticket access di bottom nav
- **Error/Success Overlays** - Scan feedback di Committee Scanner

---

## FITUR UTAMA APLIKASI

###  Sistem Login Multi-Tahap

- **Single Sign-On (SSO)** dengan email kampus
- **Two-Factor Authentication (2FA)** dengan 3 metode:
  - OTP via Email
  - Biometric/Fingerprint
  - Student Card Verification
- Loading state dengan animasi
- Success/failure feedback

###  Dashboard/Home

- Greeting section dengan info user
- Progress tracking (SAT Points & Comserv Hours)
- Featured events carousel
- Upcoming schedule preview
- Quick access notification bell

###  Explore/Halaman Pencarian

- Fixed header dengan search functionality
- Filter chips (Semua, TFI Comserv, SAT Points, Seminar)
- Event cards dengan TFI verified badge
- Infinite scroll dengan snap behavior

###  Detail Event

- Full-screen header image
- TFI badge integration
- Info event lengkap (tanggal, waktu, lokasi)
- Google Maps integration
- Rewards breakdown (SAT Points, Certificate, E-Wallet)
- Quota indicator dengan animasi
- One-click RSVP dengan state management

###  Tiket Saya (MyTickets)

- Tab-based navigation (Akan Datang / Selesai)
- Physical ticket design dengan perforasi
- QR Code expansion modal
- RSVP cancellation dengan konfirmasi
- TFI reflection claim untuk Comserv

###  Jadwal (Schedule)

- Horizontal date picker
- Timeline-based event listing
- Status badge (Upcoming, Confirmed)
- Empty state handling

###  Pencapaian (Achievements)

- Tab navigation (Overview, SAT Points, TFI Comserv)
- Circular progress rings dengan animasi
- SAT category breakdown (bar chart)
- Activity history dengan status (Verified, Pending)

###  Scanner Committee

- Camera viewport simulation
- Scan box overlay dengan corner frames
- Laser scan animation
- Success/error feedback overlay
- Manual NIM input fallback
- Flashlight toggle

###  Notifikasi (Notifications)

- Categorized notification types (Reminder, Reward, Action, Status)
- Unread indicator dengan pulse animation
- Mark all as read functionality
- Action-triggered popup (TFI reflection)

###  Profil (Profile)

- Avatar dengan biometric indicator
- Biodata card
- Transcript download dengan progress state
- Dark mode toggle
- Navigation links ke Achievement & Scanner

---

## PENJELASAN PER HALAMAN (Page-by-Page)

### Halaman 1: SplashScreen (`/`)

**Route:** `/`

| Aspek HCI | Penjelasan |
|-----------|-----------|
| **Purpose** | Initial loading state yang menampilkan branding |
| **Elemen UI** | Logo container, app name, version info |
| **Feedback** | Auto-navigate setelah 2 detik (loading simulation) |
| **Motion** | Scale + opacity animation untuk smooth appearance |
| **HCI Principle** | Sets expectation, builds anticipation |
| **Konsep** | Onboarding/loading state, system status visibility |

---

### Halaman 2: LoginPage (`/login`)

**Route:** `/login`

| Tahap | Fungsi | Prinsip HCI |
|-------|--------|-------------|
| **Initial** | Welcome screen dengan CTA | Affordance, clear call-to-action |
| **SSO** | Email input dengan keamanan | User control, consistency |
| **Loading** | Verifikasi visual | System status visibility |
| **2FA** | 3 metode verifikasi | Flexibility, user choice |
| **Success** | Konfirmasi login | Feedback, closure |

**Elemen HCI:**
- Back button untuk navigasi mundur
- Shield icon untuk trust indicator
- Progress feedback saat verifikasi
- Clear error messaging
- Multiple authentication methods untuk accessibility

---

### Halaman 3: Dashboard (`/dashboard`)

**Route:** `/dashboard`

**Struktur Header:**
- Profile avatar dengan gradient ring
- Greeting text dengan dynamic info
- Notification bell dengan unread badge

**Main Content:**

1. **Progress Section (Clickable)**
   - SAT Points progress bar (85/120 = 70%)
   - Comserv Hours progress bar (15/30 = 50%)
   - Tap to navigate to Achievements
   - Visual feedback dengan hover state
   - Gradient progress bars dengan animasi

2. **Featured Events Carousel**
   - Horizontal scroll dengan snap
   - Event cards dengan gradient overlay
   - Badge untuk event type (Comserv/SAT)
   - Tap untuk detail event
   - Image zoom on hover

3. **Upcoming Schedule Card**
   - Date block visualization ("Besok")
   - Event info (title, time, location)
   - Quick ticket access button
   - Hierarchical information grouping

**HCI Principles:**
- Progressive disclosure (detail tersembunyi di carousel)
- Quick access patterns
- Visual hierarchy dengan section breaks
- Touch targets minimum 44px
- Clickable progress cards untuk navigation

---

### Halaman 4: Explore (`/explore`)

**Route:** `/explore`

**Fitur Utama:**

1. **Fixed Header dengan Search**
   - Sticky header saat scroll
   - Hide/show berdasarkan scroll direction (hide on scroll down)
   - Search input dengan icon
   - Filter button

2. **Filter Chips**
   - Horizontal scrollable
   - Active state dengan gradient
   - "TFI Comserv" dengan pulse animation
   - Clear visual states for selection

3. **Event List**
   - Cards dengan hover lift effect
   - TFI Verified badge (jika applicable)
   - Category badge (bottom-right)
   - Loading state support
   - Empty state design
   - Image zoom on hover

**HCI Concepts:**
- Search as primary discovery
- Filter untuk refine results
- Visual scanning pattern (F-pattern)
- Touch-friendly card sizing
- Sticky header untuk context preservation

---

### Halaman 5: EventDetail (`/event/:id`)

**Route:** `/event/:id`

**Layout Sections:**

1. **Hero Image**
   - Full-width dengan gradient overlay
   - Back button dengan safe area (`pt-safe-nav`)
   - TFI badge (jika applicable)
   - Image dengan parallax-like overlay

2. **Info Card**
   - Organizer badge
   - Event title
   - TFI integration info box (HeartHandshake icon)
   - Date/Time/Location dengan icons
   - Maps link integration (`ExternalLink` icon)
   - Description text
   - Card dengan rounded corners dan shadow

3. **Rewards Section**
   - Gradient border container
   - Icon + label + value pattern
   - Visual hierarchy dengan icons (Award, Certificate, Wallet)
   - Color-coded reward types

4. **Quota Section**
   - Progress bar dengan animasi
   - Dynamic styling (warning/red saat low quota)
   - Animated progress fill
   - Call-to-action text
   - Urgency indication untuk low quota

5. **Sticky Bottom Button**
   - Fixed position dengan safe area (`pb-safe-nav`)
   - Dynamic state (Register/Sudah Terdaftar/Kuota Penuh)
   - Urgency indicator text
   - `whileTap` feedback
   - Disabled state untuk quota penuh

**HCI Principles:**
- One-hand reachability untuk primary action
- Information chunking
- Clear visual hierarchy
- Error prevention (disabled state saat penuh)
- Direct mapping (icons match real-world objects)
- Concise information presentation

---

### Halaman 6: MyTickets (`/tickets`)

**Route:** `/tickets`

**Fitur:**

1. **Tab Navigation**
   - Akan Datang / Selesai
   - Animated underline indicator (motion.div dengan spring)
   - Smooth transition dengan AnimatePresence

2. **Ticket Cards**
   - Physical ticket design aesthetic
   - Perforated line divider (dashed border `border-dashed`)
   - QR code preview icon
   - Status indicator
   - Image thumbnail
   - Location and date info
   - Code visibility

3. **Expanded Modal**
   - Full-screen QR code display
   - Large scannable QR (200x200)
   - Action buttons berdasarkan status
   - TFI reflection prompt (jika applicable)
   - Cancel RSVP dengan konfirmasi dialog
   - Safe area awareness

4. **Confirmation Dialog**
   - AlertDialog style overlay
   - Destructive action warning (red theme)
   - Cancel/Confirm buttons

5. **Toast Notification**
   - Animated entrance (`y: 50`, `scale: 0.9`)
   - Success feedback message
   - Auto-dismiss setelah 3 detik

**HCI Concepts:**
- Physical metaphor (ticket design)
- Modal untuk focused interaction
- Confirmation dialog untuk destructive action
- Visual feedback untuk state changes
- Empty state design (kurang tiket)
- Context preservation (hide bottom nav saat modal)

---

### Halaman 7: Schedule (`/schedule`)

**Route:** `/schedule`

**Elemen:**

1. **Header dengan Mini Calendar**
   - Horizontal date picker
   - Selected date animation (scale, gradient)
   - Active state dengan gradient background
   - Safe area padding

2. **Day Summary**
   - Event count ("3 Acara")
   - No clash indicator (emerald badge)
   - Clear status communication

3. **Timeline List**
   - Time column (`10:00`, `13:00`)
   - Vertical connector line (dashed)
   - Event cards dengan color coding (orange, blue, emerald)
   - Location/time info
   - Status badge (Confirmed indicator)
   - Color-coded type badges
   - Staggered entry animation

4. **Empty State**
   - Visual illustration
   - Helpful message
   - Centered layout

**HCI Concepts:**
- Time-based organization
- Quick date switching
- Visual time context
- Empty state design
- Progressive disclosure
- Color coding untuk quick identification

---

### Halaman 8: Achievements (`/achievements`)

**Route:** `/achievements`

**Struktur:**

1. **Tab Navigation**
   - Overview / SAT Points / TFI Comserv
   - Animated background indicator
   - Tab-specific color (orange/blue)
   - Spring animation untuk underline movement

2. **Progress Rings**
   - SVG-based circular progress
   - Animated fill (`strokeDashoffset`)
   - Center text (percentage, value, label)
   - Color-coded (Orange for SAT, Blue/Cyan for Comserv)
   - Glow effect via drop-shadow
   - Responsive sizing

3. **SAT Category Breakdown**
   - Bar chart visualization
   - Category labels (Seminar, Organisasi, Lomba)
   - Animated progress bars
   - Color coding per category (orange, amber, rose)
   - Staggered animation

4. **Activity History**
   - List dengan status icons
   - Filter berdasarkan tab
   - Verified status (CheckCircle2 icon)
   - Pending status (Clock icon)
   - Date + points + status display
   - Color-coded point type (SAT = orange, Jam = cyan)

5. **Background Animation**
   - Blue gradient overlay untuk TFI tab
   - Opacity transition based on tab

**HCI Concepts:**
- Data visualization principles
- Progress feedback
- Gamification elements
- Category organization
- Tab-based navigation dengan visual feedback
- Seamless tab transition (Tanpa flash/blank)

---

### Halaman 9: CommitteeScanner (`/scanner`)

**Route:** `/scanner`

**Fitur UI:**

1. **Camera Viewport**
   - Full black background
   - Simulated camera placeholder
   - Zap icon (flashlight indicator)
   - Centered scan area positioning

2. **Scan Frame Overlay**
   - Rounded corner markers (L-shaped)
   - Orange color untuk visibility
   - Laser scan animation (horizontal motion)
   - Shadow glow effect
   - Clear targeting zone

3. **Top HUD**
   - Back button (glassmorphism style)
   - Check-in counter ("45 / 100")
   - Flashlight toggle button
   - Glass/blur effect background

4. **Feedback Overlays**
   - Success state (emerald overlay + glass)
   - Error state (red overlay + glass)
   - Modal-style card dengan icon
   - Name/Campus info display
   - Message display ("Berhasil!", "Gagal")
   - Animated entrance (`scale: 0.5, y: 20`)

5. **Manual Input Fallback**
   - Toggle button激活 input mode
   - Number input field
   - Submit button
   - Close button
   - Glassmorphism container

6. **Test Triggers** (Demo Only)
   - Test Success button
   - Test Error button
   - Low opacity, visible on hover

**HCI Principles:**
- Single-focus task
- Clear scan targeting
- Immediate feedback
- Error recovery mechanism
- Offline capability design
- Backup input method (manual NIM)
- Professional/distinct interface

---

### Halaman 10: Notifications (`/notifications`)

**Route:** `/notifications`

**Fitur:**

1. **Header**
   - Back button
   - Title
   - Mark all as read button (conditional visibility)
   - Unread count summary
   - Glass/blur effect background

2. **Notification Cards**
   - Category icon (color-coded)
   - Title + message
   - Timestamp (relative format)
   - Unread indicator (pulse orange dot)
   - Background color based on type
   - Staggered entry animation
   - Click handler untuk interaction

3. **Action Types/Kategorinotifikasi:**
   - **Reminder** - CalendarClock icon, blue theme
   - **Reward** - Award icon, orange theme
   - **Action** - MessageSquareWarning icon, amber theme
   - **Status** - TicketCheck icon, emerald theme

4. **TFI Popup**
   - Triggered by action notif type
   - Full-screen overlay dengan blur backdrop
   - Encouraging message
   - CTA button untuk refleksi
   - Achievement-themed icon (Award)
   - X button untuk close

**HCI Concepts:**
- Notification hierarchy
- Read/unread state differentiation
- Action-oriented design
- Persuasive UI untuk TFI
- Empty state design
- Batch action (Mark All as Read)
- Contextual triggering

---

### Halaman 11: Profile (`/profile`)

**Route:** `/profile`

**Sections:**

1. **Profile Header**
   - Avatar dengan gradient border (orange to amber)
   - Biometric indicator button (Fingerprint sensor)
   - Name + NIM display
   - Decorative gradient blob
   - Elevated z-index untuk depth

2. **Biodata Card**
   - Email info row (Mail icon)
   - Jurusan info row (FileText icon)
   - Consistent icon pattern
   - Rounded container
   - Row height consistent

3. **Download Button**
   - Gradient border button
   - Interactive states:
     - Idle: Download icon
     - Downloading: Loader2 spinner
     - Done: CheckCircle icon
   - Clear feedback for each state
   - Auto-reset after 3 seconds

4. **Activity Menu**
   - Achievements link (Award icon, orange)
   - Scanner link (ScanLine icon, indigo)
   - ChevronRight indicators
   - Consistent list styling
   - Hover state untuk feedback

5. **Settings List**
   - Dark mode toggle (Moon/Sun icon)
   - Notification toggle (Bell icon)
   - Security settings (ShieldCheck icon)
   - Toggle switches dengan slide animation
   - Motion.div untuk switch thumb

6. **Logout Button**
   - Destructive action styling (red)
   - Clear confirmation pattern
   - Clear exit messaging

**HCI Principles:**
- Profile completeness
- Setting discoverability
- Clear affordance untuk toggles
- Destructive action warning
- Progressive disclosure
- Toggle animation untuk feedback
- Version info footer

---

### Halaman 12: MainLayout (Container)

**Route:** Parent container untuk tabbed pages

**Fitur:**
- Bottom Navigation Bar dengan 5 items:
  - Home (Dashboard)
  - Explore (Compass icon)
  - Tickets (FAB style, elevated)
  - Schedule (Calendar icon)
  - Profile (User icon)
- Center FAB button untuk tickets (elevated, floating design)
- Active state dengan glow effect (`drop-shadow`)
- AnimatePresence untuk smooth show/hide
- Context (`BottomNavContext`) untuk visibility control
- Spring physics untuk animation
- Glassmorphism background
- Safe area padding support
- Backdrop blur untuk depth

**HCI Concepts:**
- Thumb-zone friendly navigation
- Primary action emphasis (FAB)
- Consistent access pattern
- State indication untuk current location
- Scrolling-aware (hide on scroll down)
- Mobile-native navigation pattern
- Context-based nav visibility

---

## KOMPONEN UI RADIX YANG DIGUNAKAN

| Komponen | Fungsi | Halaman |
|----------|--------|---------|
| `Accordion` | Collapsible content | - |
| `AlertDialog` | Confirmation dialogs | MyTickets (cancel RSVP) |
| `Avatar` | User profile display | Dashboard, Profile |
| `Badge` | Status labels | Event cards, notifications |
| `Button` | Interactive elements | Semua halaman |
| `Calendar` | Date picker | Schedule |
| `Carousel` | Image slider | Dashboard |
| `Checkbox` | Selection controls | - |
| `Dialog` | Modal overlays | MyTickets, Achievements |
| `DropdownMenu` | Navigation menus | - |
| `Form` | Input handling | Login, Profile |
| `Input` | Text entry | Login, Scanner |
| `Label` | Form labels | Login |
| `Popover` | Tooltips/popovers | - |
| `Progress` | Progress indicators | Dashboard, Achievements |
| `RadioGroup` | Selection options | - |
| `Select` | Dropdown selection | - |
| `Separator` | Divider lines | Ticket cards |
| `Sheet` | Side panels | - |
| `Switch` | Toggle controls | Profile (dark mode/notification) |
| `Tabs` | Tab navigation | MyTickets, Achievements |
| `Tooltip` | Hover hints | - |

---

## ANIMASI & MOTION

**Library:** Framer Motion (`motion/react`)

### Efek yang digunakan:

| Efek | Penggunaan |
|------|-------------|
| `initial/animate` | Entrance animations untuk semua komponen |
| `transition` | Spring physics untuk natural feel |
| `AnimatePresence` | Exit animations dan conditional rendering |
| `layoutId` | Shared element transitions (date picker dot) |
| `whileTap` | Press feedback untuk buttons |
| `stagger` | List animations dengan delay |
| `exit` | Smooth element removal |

### Animation Patterns:

1. **Page Entry:** `opacity: 0, y: 20` → `opacity: 1, y: 0`
2. **Spring Config:** `stiffness: 300, damping: 30`
3. **Duration:** 0.4-0.5 detik untuk micro-interactions
4. **Stagger Delay:** 0.1 detik per item dalam list

---

## LAYOUT SYSTEM & VISUAL DESIGN

### Color Palette:

| Warna | Usage |
|-------|-------|
| Orange (`#f97316`) | Primary brand, SAT Points |
| Amber (`#f59e0b`) | Gradient companion to orange |
| Blue (`#3b82f6`) | TFI/Comserv theme |
| Cyan (`#06b6d4`) | TFI Comserv secondary |
| Emerald (`#10b981`) | Success states |
| Red (`#ef4444`) | Error/Destructive states |
| Slate (`#64748b`) | Secondary text |
| Dark (`#0B1120`) | Dark mode background |

### Design Tokens:

- **Border Radius:** `rounded-xl` (cards), `rounded-2xl` (sections), `rounded-full` (buttons)
- **Shadows:** `shadow-lg`, `shadow-xl`, `shadow-2xl` untuk depth hierarchy
- **Spacing:** Consistent padding `px-6`, `py-5`
- **Safe Areas:** `pt-safe-nav`, `pb-safe-nav` untuk device notch handling

---

## KESIMPULAN

Aplikasi **UniBee** mengimplementasikan prinsip-prinsip HCI dengan:

1. **Visibility** - Status jelas, progress visible, loading states
2. **Feedback** - Animasi dan toast untuk setiap aksi, hover states
3. **Consistency** - UI patterns konsisten di semua halaman
4. **Error Prevention** - Konfirmasi untuk aksi kritis, disabled states
5. **Recovery** - Fallback mechanisms (manual input), confirmation dialogs
6. **Guidance** - Clear navigation, labels, icons, empty states
7. **Affordance** - Clear button styles, interactive indicators
8. **Mapping** - Icons match real-world objects (calendar, location, etc.)

### Aplikasi ini menggunakan pendekatan:

- **Mobile-first** design
- Touch targets minimum 44px
- Navigation patterns yang familiar (bottom nav)
- Visual hierarchy yang mendukung scanning behavior
- Progressive disclosure untuk complex information
- Consistent feedback mechanisms
- Accessibility-aware dengan aria labels
- Safe area handling untuk modern devices
- Performance-conscious dengan lazy loading-ready structure

---

*Document ini dibuat untuk memenuhi tugas mata kuliah HCI (Human and Computer Interaction)*
