import fs from "fs";

const path = "src/app/components/Dashboard.tsx";
const lines = fs.readFileSync(path, "utf8").split(/\r?\n/);

const start = lines.findIndex((l) =>
  l.includes('className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"')
);

let endIdx = -1;
for (let i = start + 1; i < lines.length; i++) {
  if (lines[i] === "          </motion.div>" && lines[i + 1] === "        </motion.section>") {
    endIdx = i;
    break;
  }
}

if (start === -1 || endIdx === -1) {
  console.error("markers not found", { start, endIdx });
  process.exit(1);
}

const d = "div";
const block = [
  `          <${d} className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6">`,
  "            {EVENTS.map((event) => (",
  `              <${d}`,
  "                key={event.id}",
  '                role="button"',
  "                tabIndex={0}",
  "                onClick={() => navigate(`/event/${event.id}`)}",
  '                onKeyDown={(e) => e.key === "Enter" && navigate(`/event/${event.id}`)}',
  '                className="min-w-[280px] h-40 rounded-3xl relative overflow-hidden snap-center group cursor-pointer shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/10"',
  "              >",
  '                <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />',
  `                <${d} className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/60 to-transparent" />`,
  "                {event.isTFI && (",
  '                  <span className="absolute top-3 left-3 px-2 py-1 bg-white/95 text-slate-900 text-[9px] font-black uppercase tracking-wider rounded-lg shadow-md">TFI</span>',
  "                )}",
  `                <${d} className="absolute bottom-0 left-0 p-4 w-full">`,
  "                  <span",
  "                    className={`inline-block px-2 py-1 text-[10px] font-bold rounded-md mb-2 backdrop-blur-sm border ${",
  '                      event.type === "Comserv"',
  '                        ? "bg-blue-500/20 border-blue-400/40 text-blue-200"',
  '                        : "bg-orange-500/20 border-orange-400/40 text-orange-200"',
  "                    }`}",
  "                  >",
  "                    {event.reward}",
  "                  </span>",
  '                  <h3 className="font-bold text-white text-sm leading-tight mb-1 drop-shadow-md line-clamp-2">{event.title}</h3>',
  '                  <p className="text-xs text-slate-200 flex items-center gap-1 truncate"><MapPin className="w-3 h-3 shrink-0" />{event.location}</p>',
  `                </${d}>`,
  `              </${d}>`,
  "            ))}",
  `          </${d}>`,
];

const out = [...lines.slice(0, start), ...block, ...lines.slice(endIdx + 1)];
fs.writeFileSync(path, out.join("\n"));
console.log("ok");
