"use client";
import { storePotentialLead } from "@/utils/firebase";
import React, { useState } from "react";
import { toast } from "sonner";
import { MessageCircle, Send, User, Mail, Phone, Compass } from "lucide-react";

const ContactForm = () => {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For phone field, only allow numbers
    if (name === "phone" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required fields
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If validation passes, submit the form and reset
    console.log("Form submitted:", formData);
    // Add your form submission logic here
    try {
      const response = await storePotentialLead({
        ...formData,
      });

      if (response) {
        toast("Success", {
          description:
            "Form submitted, Our team will get in touch with you soon",
        });
      }
    } catch (error) {
      toast("Failed", {
        description: "Form submission failed. Try after sometime",
      });
    } finally {
      setFormData(initialFormState);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="group">
          <label
            htmlFor="name"
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 transition-colors group-focus-within:text-brand-blue"
          >
            Full Name of Voyager
          </label>
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-brand-blue" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-[20px] border-2 bg-slate-50/30 pl-14 pr-6 py-4 text-slate-900 transition-all duration-500 focus:bg-white focus:border-brand-blue/20 focus:shadow-[0_0_30px_rgba(1,70,179,0.05)] outline-none placeholder:text-slate-300 font-bold ${
                errors.name ? "border-red-500/20" : "border-slate-100"
              }`}
              placeholder="e.g. Julian Anderson"
            />
          </div>
          {errors.name && (
            <p className="mt-3 text-[10px] font-black text-red-500 uppercase tracking-widest pl-2">
              {errors.name}
            </p>
          )}
        </div>

        <div className="group">
          <label
            htmlFor="email"
            className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 transition-colors group-focus-within:text-brand-blue"
          >
            Digital Address
          </label>
          <div className="relative">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-brand-blue" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-[20px] border-2 bg-slate-50/30 pl-14 pr-6 py-4 text-slate-900 transition-all duration-500 focus:bg-white focus:border-brand-blue/20 focus:shadow-[0_0_30px_rgba(1,70,179,0.05)] outline-none placeholder:text-slate-300 font-bold ${
                errors.email ? "border-red-500/20" : "border-slate-100"
              }`}
              placeholder="julian@excellence.com"
            />
          </div>
          {errors.email && (
            <p className="mt-3 text-[10px] font-black text-red-500 uppercase tracking-widest pl-2">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="group">
        <label
          htmlFor="phone"
          className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 transition-colors group-focus-within:text-brand-blue"
        >
          Priority Contact Line
        </label>
        <div className="relative">
          <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-brand-blue" />
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className={`w-full rounded-[20px] border-2 bg-slate-50/30 pl-14 pr-24 py-4 text-slate-900 transition-all duration-500 focus:bg-white focus:border-brand-blue/20 focus:shadow-[0_0_30px_rgba(1,70,179,0.05)] outline-none placeholder:text-slate-300 font-bold ${
              errors.phone ? "border-red-500/20" : "border-slate-100"
            }`}
            placeholder="X XXX XXX XXXX"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl border border-slate-100 shadow-sm scale-90">
            <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[9px] font-black text-slate-500 tracking-[0.2em]">IN +91</span>
          </div>
        </div>
        {errors.phone && (
          <p className="mt-3 text-[10px] font-black text-red-500 uppercase tracking-widest pl-2">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="group">
        <label
          htmlFor="description"
          className="mb-3 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 transition-colors group-focus-within:text-brand-blue"
        >
          The Vision For Your Journey
        </label>
        <div className="relative">
          <Compass className="absolute left-5 top-6 w-5 h-5 text-slate-300 transition-colors group-focus-within:text-brand-blue" />
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-[20px] border-2 bg-slate-50/30 pl-14 pr-6 py-4 text-slate-900 transition-all duration-500 focus:bg-white focus:border-brand-blue/20 focus:shadow-[0_0_30px_rgba(1,70,179,0.05)] outline-none placeholder:text-slate-300 font-bold"
            placeholder="What experiences are calling your soul?"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full relative group/btn overflow-hidden rounded-[20px]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-blue-700 to-indigo-600 bg-[length:200%_auto] animate-gradientFlow transition-all duration-700 group-hover/btn:scale-[1.03]" />
        <div className="relative flex items-center justify-center gap-4 px-10 py-5 text-white font-black text-xl tracking-tighter shadow-xl">
          <div className="p-1.5 bg-white/10 rounded-[8px] group-hover/btn:scale-110 transition-all">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span>Initialize Concierge</span>
          <Send className="w-5 h-5 transition-all duration-700 group-hover/btn:translate-x-4 group-hover/btn:-translate-y-2 opacity-70" />
        </div>
      </button>

      <div className="flex items-center justify-center gap-3 py-2">
        <div className="h-px w-6 bg-slate-200"></div>
        <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">
          Uncompromised Privacy
        </p>
        <div className="h-px w-6 bg-slate-200"></div>
      </div>
    </form>
  );
};

export default ContactForm;
