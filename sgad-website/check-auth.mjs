import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const ROUNDS = 12;

// Read credentials from environment variables — NEVER hardcode passwords
// Usage: EMAIL=admin@sgad.com NAME="Admin" PASSWORD="YourSecurePassword" node check-auth.mjs
const email = process.env.EMAIL;
const name = process.env.NAME;
const password = process.env.PASSWORD;

if (!email || !name || !password) {
  console.error('Usage: EMAIL=x NAME=y PASSWORD=z node check-auth.mjs');
  process.exit(1);
}

const hashed = await bcrypt.hash(password, ROUNDS);
await prisma.user.upsert({
  where: { email },
  update: { password: hashed, name },
  create: { email, name, password: hashed, role: 'admin' },
});
console.log('updated:', email);

await prisma.$disconnect();
