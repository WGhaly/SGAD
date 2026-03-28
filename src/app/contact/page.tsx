"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const subjects = [
  "Banking & Financial Interiors",
  "Hotels & Hospitality",
  "Restaurants & Retail",
  "Corporate & Commercial",
  "General Enquiry",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // Simulate async submit — connect to real API/email service as needed
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  }

  return (
    <>
      {/* Page Hero */}
      <section className="relative h-[50vh] min-h-[360px] bg-[#0A0A0C] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=2000&q=80"
          alt="Contact SGAD"
          fill
          className="object-cover opacity-35"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C]/60 via-transparent to-[#0A0A0C]/80" />
        <div className="relative z-10 h-full flex items-end pb-16 lg:pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <p className="eyebrow mb-3">Let&apos;s Talk</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-py bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16">
            {/* Info panel */}
            <SectionReveal direction="left">
              <p className="eyebrow mb-4">Our Coordinates</p>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#1A1F35] gold-line mb-8">
                Get in Touch
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A1F35] flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#1A1F35]/40 font-semibold mb-1">
                      Office Address
                    </p>
                    <p className="text-[#1A1F35] text-sm leading-relaxed">
                      23 Samir Moukhtar Street<br />
                      Ard Al Golf, Heliopolis<br />
                      Cairo, Egypt
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A1F35] flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#1A1F35]/40 font-semibold mb-1">
                      Phone
                    </p>
                    <a href="tel:+201050057511" className="text-[#1A1F35] text-sm hover:text-[#C9A96E] transition-colors block">
                      +20 105 005 7511
                    </a>
                    <a href="tel:+201050057544" className="text-[#1A1F35] text-sm hover:text-[#C9A96E] transition-colors block mt-1">
                      +20 105 005 7544
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A1F35] flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#1A1F35]/40 font-semibold mb-1">
                      Email
                    </p>
                    <a href="mailto:info@sgad.com.eg" className="text-[#1A1F35] text-sm hover:text-[#C9A96E] transition-colors">
                      info@sgad.com.eg
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1A1F35] flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-[#C9A96E]" />
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[0.15em] uppercase text-[#1A1F35]/40 font-semibold mb-1">
                      Office Hours
                    </p>
                    <p className="text-[#1A1F35] text-sm">Sunday – Thursday</p>
                    <p className="text-[#1A1F35]/50 text-sm">9:00 AM – 5:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/201050057511"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center gap-3 bg-[#25D366] text-white text-[11px] tracking-[0.15em] uppercase font-semibold px-6 py-3.5 hover:bg-[#1fb558] transition-colors w-fit group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.117 1.523 5.845L.057 23.43a.5.5 0 0 0 .614.614l5.604-1.468A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.116-1.409l-.36-.215-3.733.978.998-3.649-.235-.374A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Chat on WhatsApp
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </SectionReveal>

            {/* Form */}
            <SectionReveal direction="right" delay={0.1}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center gap-6">
                  <CheckCircle size={56} className="text-[#C9A96E]" />
                  <h3 className="font-serif text-2xl font-bold text-[#1A1F35]">
                    Message Received
                  </h3>
                  <p className="text-[#1A1F35]/55 max-w-xs leading-relaxed">
                    Thank you for reaching out. A member of our team will be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1A1F35]/50 mb-2">
                        Full Name <span className="text-[#C9A96E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your name"
                        className="w-full bg-white border border-[#1A1F35]/15 px-4 py-3.5 text-sm text-[#1A1F35] placeholder:text-[#1A1F35]/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1A1F35]/50 mb-2">
                        Email Address <span className="text-[#C9A96E]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@company.com"
                        className="w-full bg-white border border-[#1A1F35]/15 px-4 py-3.5 text-sm text-[#1A1F35] placeholder:text-[#1A1F35]/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1A1F35]/50 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+20 100 000 0000"
                        className="w-full bg-white border border-[#1A1F35]/15 px-4 py-3.5 text-sm text-[#1A1F35] placeholder:text-[#1A1F35]/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1A1F35]/50 mb-2">
                        Company / Organisation
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Your organisation"
                        className="w-full bg-white border border-[#1A1F35]/15 px-4 py-3.5 text-sm text-[#1A1F35] placeholder:text-[#1A1F35]/30 focus:outline-none focus:border-[#C9A96E] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1A1F35]/50 mb-2">
                      Project Type <span className="text-[#C9A96E]">*</span>
                    </label>
                    <select
                      name="subject"
                      required
                      defaultValue=""
                      className="w-full bg-white border border-[#1A1F35]/15 px-4 py-3.5 text-sm text-[#1A1F35] focus:outline-none focus:border-[#C9A96E] transition-colors appearance-none"
                    >
                      <option value="" disabled>Select a category</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase font-semibold text-[#1A1F35]/50 mb-2">
                      Message <span className="text-[#C9A96E]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us about your project — location, scale, timeline and any specific requirements…"
                      className="w-full bg-white border border-[#1A1F35]/15 px-4 py-3.5 text-sm text-[#1A1F35] placeholder:text-[#1A1F35]/30 focus:outline-none focus:border-[#C9A96E] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-3 bg-[#1A1F35] text-white text-[11px] tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-[#C9A96E] hover:text-[#0A0A0C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                    {!submitting && <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />}
                  </button>
                </form>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <section className="h-[400px] bg-[#1A1F35]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.9247!2d31.3264!3d30.0861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA1JzEwLjAiTiAzMcKwMTknMzUuMCJF!5e0!3m2!1sen!2seg!4v1600000000000!5m2!1sen!2seg"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(1) invert(0.9) contrast(0.85)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SGAD Office Location — Heliopolis, Cairo"
        />
      </section>
    </>
  );
}
