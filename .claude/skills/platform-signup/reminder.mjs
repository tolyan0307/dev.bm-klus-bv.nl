// Напоминание о внешних площадках: открытые задачи из журнала, ритм «новая площадка раз в 2 дня»
// и следующие кандидаты из очереди. Запускается хуком SessionStart (.claude/settings.local.json)
// или вручную: node .claude/skills/platform-signup/reminder.mjs
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const LOG = join(root, "seo-ops/data/external_actions_log.csv");
const PROFILES = join(root, "seo-ops/data/external_profiles.csv");
const QUEUE = join(root, "seo-ops/reports/seo/backlink_opportunities_2026-10-25/opportunities.csv");
const GOAL_DAYS = 2;
const NEW_PLATFORM_ACTIONS = new Set(["регистрация", "письмо"]);

function parseCsv(path) {
  if (!existsSync(path)) return [];
  const text = readFileSync(path, "utf8").replace(/^﻿/, "");
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v !== "")) rows.push(row);
  const [head, ...body] = rows;
  return body.map((r) => Object.fromEntries(head.map((h, j) => [h.trim(), (r[j] ?? "").trim()])));
}

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const days = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);

const log = parseCsv(LOG);
const lines = ["[Внешние площадки — напоминание для владельца, журнал seo-ops/data/external_actions_log.csv]"];

const open = log.filter((r) => r.task === "open").sort((a, b) => (a.due || "9999").localeCompare(b.due || "9999"));
if (open.length) {
  lines.push("Открытые задачи:");
  for (const r of open) {
    const when = !r.due ? "без срока" : r.due < today ? `ПРОСРОЧЕНО с ${r.due}` : r.due === today ? "сегодня" : `до ${r.due}`;
    lines.push(`- ${r.platform}: ${r.next_step} (${when})`);
  }
} else lines.push("Открытых задач нет.");

const firstTouch = new Map();
for (const r of log) {
  if (NEW_PLATFORM_ACTIONS.has(r.action) && !firstTouch.has(r.platform)) firstTouch.set(r.platform, r.date);
}
const last = [...firstTouch.values()].sort().pop();
if (last) {
  const gap = days(last, today);
  lines.push(`Последняя новая площадка: ${last} (${gap} дн. назад). Цель — раз в ${GOAL_DAYS} дня${gap >= GOAL_DAYS ? " — пора следующую" : ""}.`);
}

const used = new Set([...log, ...parseCsv(PROFILES)].map((r) => r.group).filter(Boolean));
const queue = parseCsv(QUEUE).filter((r) => /^[ABC]\d+$/.test(r.id) && !used.has(r.id));
if (queue.length) {
  lines.push(`Очередь (группы A–C, ещё ${queue.length}): ` + queue.slice(0, 3).map((r) => `${r.id} ${r.platform}`).join("; "));
} else lines.push("Очередь проверенных площадок пуста — новых не регистрировать без новой проверки.");

console.log(lines.join("\n"));
