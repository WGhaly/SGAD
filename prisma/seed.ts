import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const BCRYPT_ROUNDS = 12;

// ─── Admin Accounts ───────────────────────────────────────────────────────────
// Passwords must be provided via environment variable — NEVER hardcode them.
// Usage: SEED_ADMIN_PASSWORD="YourStrongPassword" npx prisma db seed
const seedPassword = process.env.SEED_ADMIN_PASSWORD;
if (!seedPassword) {
  console.error("❌  SEED_ADMIN_PASSWORD env var is required. Example:");
  console.error('   SEED_ADMIN_PASSWORD="YourStrongPassword" npx prisma db seed');
  process.exit(1);
}

const adminUsers = [
  {
    email: "admin@sgad.com",
    name: "Admin",
    password: seedPassword,
  },
  {
    email: "emad@sgad.com",
    name: "Emad Al-Safwa",
    password: seedPassword,
  },
  {
    email: "operations@sgad.com",
    name: "Operations Manager",
    password: seedPassword,
  },
];

// ─── Initial Gallery Projects ─────────────────────────────────────────────────
const initialProjects = [
  {
    title: "EGBank Network Expansion",
    description:
      "Comprehensive fitout of 13 branches across Egypt plus administrative floors and renovation works, establishing a cohesive, modern identity for one of Egypt's leading private banks.",
    category: "banking",
    location: "Multiple Locations, Egypt",
    coverImage: "/portfolio/Egbank.jpeg",
    status: "published",
    sortOrder: 1,
  },
  {
    title: "Arab International Bank (AIB) — Branch Portfolio",
    description:
      "Full interior design and fitout of three prime-location branches — Arabella Plaza, Antoniades Gardens (Alexandria) and Mohi El Din Abu El-Ezz — delivering a premium customer experience aligned with AIB's refined corporate identity.",
    category: "banking",
    location: "Cairo & Alexandria, Egypt",
    coverImage: "/portfolio/AIB.jpeg",
    status: "published",
    sortOrder: 2,
  },
  {
    title: "Casa Cook El Gouna",
    description:
      "Boutique hotel fitout on the Red Sea coast for TUI's lifestyle brand Casa Cook, blending raw natural materials with curated Bohemian-Mediterranean aesthetics for an unforgettable coastal retreat.",
    category: "hospitality",
    location: "El Gouna, Red Sea, Egypt",
    coverImage: "/portfolio/Casacook.jpeg",
    status: "published",
    sortOrder: 3,
  },
  {
    title: "Conrad Corniche Nile",
    description:
      "Interior fitout for Conrad Hotel's riverfront property on the Nile Corniche, marrying five-star luxury with panoramic river views and sophisticated Egyptian craftsmanship.",
    category: "hospitality",
    location: "Cairo, Egypt",
    coverImage: "/portfolio/Conrad.jpeg",
    status: "published",
    sortOrder: 4,
  },
  {
    title: "Mado — Concord Plaza Mall",
    description:
      "Full interior fit-out of the flagship Mado restaurant and patisserie inside Concord Plaza Mall — a Turkish-inspired dessert destination with a refined, welcoming atmosphere and custom botanical details.",
    category: "restaurants",
    location: "Heliopolis, Cairo, Egypt",
    coverImage: "/portfolio/MADO.jpeg",
    status: "published",
    sortOrder: 5,
  },
];

async function main() {
  console.log("🌱  Starting seed...\n");

  // ── Users ──────────────────────────────────────────────────────────────────
  for (const u of adminUsers) {
    const hashed = await bcrypt.hash(u.password, BCRYPT_ROUNDS);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        name: u.name,
        password: hashed,
        role: "admin",
      },
    });
    console.log(`✔  User: ${user.email}`);
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  for (const p of initialProjects) {
    const existing = await prisma.project.findFirst({
      where: { title: p.title },
    });
    if (!existing) {
      const project = await prisma.project.create({ data: p });
      console.log(`✔  Project created: ${project.title}`);
    } else {
      console.log(`⏭  Project already exists: ${existing.title}`);
    }
  }

  console.log("\n✅  Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
