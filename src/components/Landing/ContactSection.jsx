"use client";
import { useState } from "react";
import { storePotentialLead } from "@/utils/firebase";
import { toast } from "sonner";
import Container from "@/components/ui/Container";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await storePotentialLead({
        ...formData,
        email: `${formData.phone}@temp.com`,
      });

      if (response) {
        toast.success("Form submitted successfully!", {
          description: "Our team will get in touch with you soon.",
        });
        setFormData({ name: "", phone: "", description: "" });
      }
    } catch (error) {
      toast.error("Submission failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/30 py-24 lg:py-32">
      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3">
              Let's Plan Your
              <span className="block text-brand-blue font-bold">
                Dream Vacation
              </span>
            </h2>
            <p className="text-base text-slate-500 font-normal">
              Share your details and we'll create the perfect journey for you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-600 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all text-slate-700 text-sm"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-xs font-semibold text-slate-600 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  maxLength={10}
                  required
                  className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all text-slate-700 text-sm"
                  placeholder="9876543210"
                />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="description" className="block text-xs font-semibold text-slate-600 mb-2">
                Your Message (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 outline-none transition-all text-slate-700 text-sm resize-none"
                placeholder="Tell us about your dream destination..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-blue text-white font-semibold text-base py-4 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? "Submitting..." : "Get Started"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-10 text-center">
            <p className="text-xs text-slate-400 mb-3">Or reach us directly</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <a 
                href="tel:+918069365050" 
                className="flex items-center gap-1.5 text-brand-blue font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 80693 65050
              </a>
              <span className="text-slate-200">•</span>
              <a 
                href="mailto:contact@bayardvacations.com" 
                className="flex items-center gap-1.5 text-brand-blue font-medium hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                contact@bayardvacations.com
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
