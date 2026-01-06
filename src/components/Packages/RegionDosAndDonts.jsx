"use client";

import Container from "@/components/ui/Container";
import { CheckCircle2, XCircle, Info, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const RegionDosAndDonts = ({ regionName = "this destination", dosAndDonts = null }) => {
  // Default mock data if none provided
  const defaultData = {
    dos: [
      "Respect local customs and dress modestly when visiting religious sites",
      "Try the local cuisine - it's part of the authentic experience",
      "Learn a few basic phrases in the local language",
      "Carry small denominations of local currency for street vendors",
      "Book popular attractions and tours in advance during peak season",
      "Stay hydrated and use sunscreen, especially in summer months"
    ],
    donts: [
      "Don't photograph military installations or government buildings",
      "Avoid drinking tap water - stick to bottled or filtered water",
      "Don't wear revealing clothing in conservative areas",
      "Avoid discussing sensitive political topics in public",
      "Don't exchange money with unofficial street changers",
      "Avoid walking alone in unfamiliar areas late at night"
    ]
  };

  const data = dosAndDonts || defaultData;
  const hasDos = data.dos && data.dos.length > 0;
  const hasDonts = data.donts && data.donts.length > 0;

  if (!hasDos && !hasDonts) return null;

  return (
    <section className="bg-white py-12 md:py-16 relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-green/10 border border-brand-green/20 mb-4">
            <Lightbulb className="w-4 h-4 text-brand-green" />
            <span className="text-sm font-bold text-brand-green uppercase tracking-wider">
              Travel Smart
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            Dos & Don'ts in{" "}
            <span className="text-brand-green capitalize">{regionName}</span>
          </h2>
          <p className="text-xl text-slate-600">
            Essential tips to make your journey smooth and respectful
          </p>
        </div>

        {/* Dos and Don'ts Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* DO's Section */}
          {hasDos && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border-2 border-green-100 h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-black text-green-900">DO's</h3>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  {data.dos.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="text-slate-700 font-medium leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* DON'T's Section */}
          {hasDonts && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-8 border-2 border-red-100 h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center shadow-lg">
                    <XCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-black text-red-900">DON'Ts</h3>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  {data.donts.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 group"
                    >
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0 transition-transform group-hover:scale-110" />
                      <span className="text-slate-700 font-medium leading-relaxed">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Always Travel Responsibly</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                These guidelines help ensure a safe, respectful, and enjoyable experience for you and the local community. When in doubt, ask your tour guide or hotel staff for advice.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default RegionDosAndDonts;
