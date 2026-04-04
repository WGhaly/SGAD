import Image from "next/image";
import type { Metadata } from "next";
import SectionReveal from "@/components/SectionReveal";
import ClientsSection from "@/components/home/ClientsSection";

export const metadata: Metadata = {
  title: "Our Clients",
  description:
    "SGAD has delivered exceptional interiors for 285+ clients across banking, hospitality, restaurants and corporate sectors in Egypt.",
};

const sectors = [
  {
    id: "banking",
    title: "Banking & Finance",
    clients: [
      "EGBank", "Arab International Bank", "FABMISR", "Arab African International Bank",
      "Abu Dhabi Islamic Bank", "Attijariwafa Bank",
    ],
  },
  {
    id: "hospitality",
    title: "Hotels & Hospitality",
    clients: ["Casa Cook Hotels", "Conrad Hotels & Resorts", "Three Corners Hotels & Resorts"],
  },
  {
    id: "restaurants",
    title: "Restaurants & F&B",
    clients: ["Wahet Omar"],
  },
];

export default function ClientsPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80"
          alt="SGAD Clients"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/80" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <p className="eyebrow mb-3">Trusted By</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Our Clients
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal direction="left">
              <p className="eyebrow mb-4">285+ Active Client Relationships</p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1F35] gold-line mb-6">
                Egypt&apos;s Most Trusted Brands Trust SGAD
              </h2>
              <p className="text-[#1A1F35]/55 leading-relaxed">
                From international hotel groups to Egypt&apos;s largest financial institutions,
                our client roster is a testament to the quality, consistency and reliability
                that defines every SGAD project. Over 30% of our annual volume comes from
                returning clients — the most honest measure of our performance.
              </p>
            </SectionReveal>
            <SectionReveal direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { v: "285+", l: "Clients Served" },
                  { v: "30%+", l: "Repeat Business" },
                  { v: "15+", l: "Years of Trust" },
                  { v: "18+", l: "Active Projects" },
                ].map(({ v, l }) => (
                  <div key={l} className="bg-[#1A1F35] p-6">
                    <p className="font-serif text-3xl font-bold text-[#C9A96E]">{v}</p>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-white/40 font-medium mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Tabbed logo grid */}
      <section className="bg-[#F0EDE7]">
        <ClientsSection />
      </section>

      {/* By Sector */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionReveal className="mb-16">
            <p className="eyebrow mb-3">By Sector</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#1A1F35] gold-line">
              Client Roster
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {sectors.map((sector, i) => (
              <SectionReveal key={sector.id} delay={i * 0.1}>
                <h3 className="font-serif text-lg font-bold text-[#1A1F35] mb-5 pb-4 border-b border-[#1A1F35]/10">
                  {sector.title}
                </h3>
                <ul className="space-y-3">
                  {sector.clients.map((client) => (
                    <li key={client} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-[#C9A96E] flex-shrink-0" />
                      <span className="text-[#1A1F35]/60 text-sm">{client}</span>
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
