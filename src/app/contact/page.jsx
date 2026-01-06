import React from "react";
import Container from "@/components/ui/Container";
import Image from "next/image";
import ContactForm from "@/components/Forms/LoginForm/ContactForm";
import { Mail, Phone, MapPin, Globe, Send, MessageCircle, Compass } from "lucide-react";

export const metadata = {
  title: "Contact Bayard Vacations | Start Your Travel Adventure Today",
  description:
    "Have questions or need assistance planning your trip? Contact Bayard Vacations! Our travel experts are here to help you design the perfect getaway. Reach out today!",
  keywords:
    "Bayard Vacations contact, travel planning assistance, vacation support, customized travel queries, contact travel experts, plan your trip",
};

const ContactPage = () => {
  return (
    <section className="pb-24 pt-32 lg:pt-48 relative overflow-hidden bg-slate-50/50">
      {/* High-Impact Banner Image Hero */}
      <div className="absolute top-0 left-0 w-full h-[650px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Contact Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/40 to-slate-50/50"></div>
        <div className="absolute inset-0 bg-[url('/wave-pattern.png')] opacity-10 bg-repeat"></div>
      </div>

      {/* Luxury Mesh Gradients - The "Interest" Factor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[600px] left-[-10%] w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-[800px] right-[-10%] w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-[120px] animate-floatSlow" />
      </div>

      {/* Floating Travel Assets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        <div className="absolute top-[12%] left-[4%] animate-floatSlow opacity-40">
          <div className="p-4 bg-white/20 backdrop-blur-3xl rounded-3xl border-2 border-white/40 shadow-2xl rotate-12">
            <Globe className="w-14 h-14 text-blue-600" />
          </div>
        </div>
        <div className="absolute top-[35%] right-[6%] animate-float opacity-30 delay-1000">
          <div className="p-4 bg-white/20 backdrop-blur-3xl rounded-3xl border-2 border-white/40 shadow-2xl -rotate-6">
            <Send className="w-12 h-12 text-sky-500" />
          </div>
        </div>
      </div>

      <Container className="relative z-30">
        <div className="text-center mb-24 animate-fadeInUp">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border-2 border-white text-brand-blue font-black text-sm mb-8 shadow-2xl shadow-blue-200/50">
            <div className="w-2 h-2 bg-brand-blue rounded-full animate-ping" />
            <span className="tracking-widest uppercase">Direct line to excellence</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 mb-8 drop-shadow-sm tracking-tighter">
            Let's Plan Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-sky-500 to-indigo-600 italic">Masterpiece</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-600 leading-relaxed max-w-3xl mx-auto font-medium tracking-tight">
            Elevating travel into art. Tell us your vision, and we'll weave the narrative.
          </p>
        </div>

        {/* Global Trust Badges - Luxury Edition */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 animate-fadeInUp delay-300">
          {[
            { label: "Elite Concierge", desc: "Private support 24/7", icon: <Phone className="w-6 h-6" /> },
            { label: "Curation Team", desc: "Top 1% world experts", icon: <Globe className="w-6 h-6" /> },
            { label: "Price Mastery", desc: "Exclusive luxury rates", icon: <Send className="w-6 h-6" /> },
            { label: "Global Footprint", desc: "Access to 150+ countries", icon: <MapPin className="w-6 h-6" /> },
          ].map((badge, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-2xl border-2 border-white p-8 rounded-[48px] text-center group hover:bg-white hover:shadow-2xl hover:shadow-blue-200/50 transition-all duration-700 hover:-translate-y-3">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xl">
                {badge.icon}
              </div>
              <h5 className="font-black text-slate-950 text-xl mb-2">{badge.label}</h5>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{badge.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-12 lg:grid-cols-12 max-w-7xl mx-auto items-start">
          {/* Contact Info Cards - Side Column */}
          <div className="lg:col-span-4 space-y-8 order-2 lg:order-1 animate-fadeInLeft">
            {[
              { 
                title: "Our Studio", 
                content: "144, 9th Main Rd, 4th Block, Kanteerava Nagar, Nandini Layout, Bengaluru", 
                icon: <MapPin className="w-8 h-8" />,
                grad: "from-blue-500 to-brand-blue"
              },
              { 
                title: "Private Line", 
                content: "+91 63631 98911", 
                sub: "Priority Support Active",
                icon: <Phone className="w-8 h-8" />,
                grad: "from-emerald-400 to-teal-600"
              },
              { 
                title: "Digital Desk", 
                content: "info@bayardvacations.com", 
                sub: "Response within 4 hours",
                icon: <Mail className="w-8 h-8" />,
                grad: "from-orange-400 to-red-600"
              }
            ].map((card, idx) => (
              <div key={idx} className="group relative bg-white/60 backdrop-blur-3xl p-10 rounded-[56px] overflow-hidden transition-all duration-700 hover:scale-[1.03] border-2 border-white shadow-xl hover:shadow-2xl hover:shadow-blue-200/40">
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${card.grad} rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-transform duration-500 group-hover:rotate-12`}>
                    <div className="text-white">{card.icon}</div>
                  </div>
                  <h4 className="text-3xl font-black text-slate-950 mb-4">{card.title}</h4>
                  <p className="text-slate-600 leading-relaxed text-lg font-bold">{card.content}</p>
                  {card.sub && (
                    <div className="mt-4 inline-flex px-4 py-1.5 bg-blue-50 text-brand-blue rounded-full font-black text-xs uppercase tracking-widest border border-blue-100">
                      {card.sub}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Luxury Form Card - Main Column */}
          <div className="lg:col-span-8 order-1 lg:order-2 animate-fadeInRight">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 via-cyan-50 to-indigo-100 rounded-[48px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
              <div className="relative bg-white/70 backdrop-blur-2xl border-2 border-white/50 p-8 md:p-12 rounded-[40px] shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-50 relative">
                    <div className="absolute inset-1.5 bg-brand-blue/5 rounded-xl animate-pulse"></div>
                    <Compass className="w-8 h-8 text-brand-blue relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-950 leading-tight tracking-tight">Adventure Planner</h3>
                    <p className="text-brand-blue font-black uppercase tracking-[0.2em] text-[10px] mt-1 opacity-70">Personalized Concierge Request</p>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>

            {/* High-Contrast Luxury Map Container */}
            <div className="mt-12 relative group animate-fadeInUp delay-500">
              <div className="absolute -inset-4 bg-blue-50/50 rounded-[48px] opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-2xl"></div>
              <div className="relative h-[500px] overflow-hidden rounded-[40px] shadow-lg border-8 border-white p-0.5 bg-slate-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.0374837334227!2d77.52887181482946!3d13.016276090831987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d992c8d6cfd%3A0x5b343906dc2ad0af!2sBayard%20Vacations!5e0!3m2!1sen!2sin!4v1676992146250!5m2!1sen!2sin"
                  className="size-full border-0 grayscale hover:grayscale-0 transition-all duration-1000 opacity-90 hover:opacity-100"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bayard Vacations Location"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactPage;
