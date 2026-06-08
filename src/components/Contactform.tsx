/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, RefreshCw, Send, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

interface ContactFormProps {
  selectedSubject?: string;
  onSubjectChange?: (subject: string) => void;
}

const TIME_SLOTS = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM'
];

export default function ContactForm({ selectedSubject, onSubjectChange }: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Solar Installation', // Default value
    siteAddress: '',
    scheduleDate: '',
    scheduleTime: '',
    message: ''
  });

  useEffect(() => {
    if (selectedSubject) {
      setFormData(prev => ({ ...prev, subject: selectedSubject }));
    }
  }, [selectedSubject]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<'idle' | 'otp_pending' | 'submitting' | 'success'>('idle');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact number is required';
    } else if (!/^[0-9+() \-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.subject === 'Free Site Survey') {
      if (!formData.siteAddress.trim()) {
        newErrors.siteAddress = 'Full site address is required';
      }
      if (!formData.scheduleDate) {
        newErrors.scheduleDate = 'Booking date is required';
      }
      if (!formData.scheduleTime) {
        newErrors.scheduleTime = 'Booking time slot is required';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    if (formData.subject === 'Free Site Survey') {
      setFormState('otp_pending');
    } else {
      setFormState('submitting');
      setTimeout(() => {
        setFormState('success');
      }, 1500);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError('');
    if (enteredOtp !== '123456') {
      setOtpError('Invalid verification code. Please enter 123456 to verify.');
      return;
    }

    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'Solar Installation',
      siteAddress: '',
      scheduleDate: '',
      scheduleTime: '',
      message: ''
    });
    setErrors({});
    setEnteredOtp('');
    setOtpError('');
    setFormState('idle');
  };

  return (
    <section id="contact" className="relative py-28 bg-[#041120] overflow-hidden border-b border-white/5">

      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#FFC107]/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-emerald-600/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-bold tracking-widest text-[#FFC107] uppercase">
            <Mail className="w-3.5 h-3.5" />
            Corporate Communications
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Connect With Our <span className="bg-gradient-to-r from-emerald-400 to-[#FFC107] bg-clip-text text-transparent">Power Experts</span>
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Have a custom requirement, installation request, or maintenance query? Fill out our validated request form below.
          </p>
        </div>

        {/* Form Container Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Corporate Coordinates */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block pb-2 border-b border-white/5">
                Ashonika Headquarters
              </span>

              {/* Dynamic decorative spacing */}
              <div className="h-2" />

              {/* Address rows details */}
              <div className="space-y-4">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-4 items-start group/loc hover:text-emerald-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-500/20 to-emerald-500/5 flex items-center justify-center border border-emerald-500/20 text-emerald-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Operational office
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      124, 4th Floor, Netaji Subhash Place, Pitampura, New Delhi - 110034, India
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+917728023503"
                  className="flex gap-4 items-center group/loc hover:text-[#FFC107] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-amber-500/20 to-amber-500/5 flex items-center justify-center border border-amber-500/20 text-[#FFC107] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Telephone Helpline
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      +91 77280-23503
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:contact@ashonikagreen.com"
                  className="flex gap-4 items-center group/loc hover:text-emerald-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-500/20 to-indigo-500/5 flex items-center justify-center border border-indigo-500/20 text-indigo-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Corporate Mail
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      contact@ashonikagreen.com
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Direct WhatsApp Message Integration option */}
            <div className="pt-6 border-t border-white/5">
              <a
                href="https://wa.me/917728023503?text=Hi%2C%20Ashonika%20Green%20Energy."
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-[#071B2F] border border-[#25D366]/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat On WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Dynamic Form Screen with active state rendering */}
          <div className="lg:col-span-7">
            {formState === 'success' ? (
              <div className="p-8 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-emerald-500/40 shadow-2xl space-y-6 text-center h-full flex flex-col justify-center items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/45 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-300 text-sm max-w-sm mx-auto">
                    Hi <span className="text-[#FFC107] font-semibold">{formData.name}</span>, your request has been recorded. Our specialized engineers will check your details and contact you shortly.
                  </p>
                </div>

                {/* Simulated database/CRM diagnostics block */}
                <div className="p-4 bg-[#051322] rounded-2xl border border-white/5 inline-block text-left w-full max-w-sm font-mono text-[9px] text-emerald-500 space-y-1.5 shadow-inner">
                  <div className="flex justify-between border-b border-white/5 pb-1 select-none">
                    <span className="text-gray-500 font-bold uppercase">Sync State:</span>
                    <span className="font-bold text-emerald-400">STATUS_SUCCESS</span>
                  </div>
                  <p>Target Node: age_leads_relational</p>
                  <p>Lead Reference: {formData.subject}</p>
                  <p>Timestamp: {new Date().toISOString()}</p>
                </div>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : formState === 'otp_pending' ? (
              <form
                onSubmit={handleVerifyOtp}
                className="p-6 md:p-8 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-[#FFC107]/20 shadow-2xl space-y-6 text-center"
              >
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-full bg-[#FFC107]/10 flex items-center justify-center mx-auto text-[#FFC107]">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    OTP Verification Required
                  </h3>
                  <p className="text-gray-300 text-xs max-w-md mx-auto leading-relaxed">
                    To schedule a Free Site Survey, we require interactive verification. We have sent a 6-digit confirmation code to your number: <span className="text-white font-semibold">{formData.phone}</span>
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="otp-input" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Enter OTP Code *
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-Digit Code"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                    className="w-full text-center tracking-widest font-mono font-bold px-4 py-3 rounded-xl bg-[#071626] border border-white/10 text-lg text-[#FFC107] focus:border-amber-500 focus:outline-hidden"
                  />
                  <div className="text-[10px] text-emerald-400 font-mono">
                    🔑 Verification Demo Key: <strong className="underline">123456</strong>
                  </div>
                  {otpError && (
                    <p className="text-xs text-rose-450 font-bold mt-1">
                      ⚠️ {otpError}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormState('idle')}
                    className="w-1/3 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold border border-white/10 text-white transition-all uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest hover:from-emerald-500 transition-colors shadow-lg"
                  >
                    Verify and Submit
                  </button>
                </div>
              </form>
            ) : (
              <form
                id="site-survey-form"
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-3xl bg-linear-to-b from-[#09223c] to-[#041221] border border-white/10 shadow-2xl space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="form-field-name" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      Full Name *
                    </label>
                    <input
                      id="form-field-name"
                      type="text"
                      className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden ${
                        errors.name ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-500'
                      }`}
                      placeholder="e.g. Ashonika"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                    />
                    {errors.name && <p className="text-[10px] text-rose-400 font-semibold">{errors.name}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-field-phone" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      Contact Number *
                    </label>
                    <input
                      id="form-field-phone"
                      type="tel"
                      className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden ${
                        errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-500'
                      }`}
                      placeholder="e.g. +91 77280-23503"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                    />
                    {errors.phone && <p className="text-[10px] text-rose-400 font-semibold">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <label htmlFor="form-field-email" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Email address (Optional)
                  </label>
                  <input
                    id="form-field-email"
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden ${
                      errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-500'
                    }`}
                    placeholder="e.g. ashonika@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                  />
                  {errors.email && <p className="text-[10px] text-rose-400 font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-field-subject" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Subject *
                  </label>
                  <div className="relative">
                    <select
                      id="form-field-subject"
                      className="w-full px-4 py-3 rounded-xl bg-[#071626] border border-white/10 text-xs md:text-sm text-white focus:border-emerald-500 focus:outline-hidden appearance-none cursor-pointer pr-10"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        onSubjectChange?.(e.target.value);
                        // Clear conditional field errors
                        const updatedErrors = { ...errors };
                        delete updatedErrors.siteAddress;
                        delete updatedErrors.scheduleDate;
                        delete updatedErrors.scheduleTime;
                        setErrors(updatedErrors);
                      }}
                    >
                      <option value="Solar Installation">Solar Installation</option>
                      <option value="Solar Maintenance/Repair">Solar Maintenance/Repair</option>
                      <option value="Free Site Survey">Free Site Survey</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <ArrowRight className="w-4 h-4 rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Conditional address layout blocks */}
                {formData.subject === 'Free Site Survey' && (
                  <div className="space-y-5 p-4 rounded-2xl bg-[#051424] border border-[#FFC107]/20 animate-fadeIn">
                    <span className="text-[10px] font-bold text-[#FFC107] uppercase tracking-widest block font-mono">
                      Survey Address Parameters
                    </span>

                    <div className="space-y-1.5">
                      <label htmlFor="form-field-address" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                        Full Site Address *
                      </label>
                      <input
                        id="form-field-address"
                        type="text"
                        className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden ${
                          errors.siteAddress ? 'border-rose-500 focus:border-rose-500' : 'border-[#FFC107]/20 focus:border-[#FFC107]'
                        }`}
                        placeholder="Complete location address where rooftop assessment is needed"
                        value={formData.siteAddress}
                        onChange={(e) => {
                          setFormData({ ...formData, siteAddress: e.target.value });
                          if (errors.siteAddress) setErrors({ ...errors, siteAddress: '' });
                        }}
                      />
                      {errors.siteAddress && <p className="text-[10px] text-rose-400 font-semibold">{errors.siteAddress}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Date Select Row */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="form-field-date" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                          Preferred Date *
                        </label>
                        <input
                          id="form-field-date"
                          type="date"
                          className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden ${
                            errors.scheduleDate ? 'border-rose-500 focus:border-rose-500' : 'border-[#FFC107]/20 focus:border-[#FFC107]'
                          }`}
                          value={formData.scheduleDate}
                          onChange={(e) => {
                            setFormData({ ...formData, scheduleDate: e.target.value });
                            if (errors.scheduleDate) setErrors({ ...errors, scheduleDate: '' });
                          }}
                        />
                        {errors.scheduleDate && <p className="text-[10px] text-rose-400 font-semibold">{errors.scheduleDate}</p>}
                      </div>

                      {/* Time Select Row */}
                      <div className="space-y-1.5 text-left">
                        <label htmlFor="form-field-time" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                          Preferred Time (8:00 AM - 6:00 PM) *
                        </label>
                        <div className="relative">
                          <select
                            id="form-field-time"
                            className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden appearance-none cursor-pointer pr-10 ${
                              errors.scheduleTime ? 'border-rose-500 focus:border-rose-500' : 'border-[#FFC107]/20 focus:border-[#FFC107]'
                            }`}
                            value={formData.scheduleTime}
                            onChange={(e) => {
                              setFormData({ ...formData, scheduleTime: e.target.value });
                              if (errors.scheduleTime) setErrors({ ...errors, scheduleTime: '' });
                            }}
                          >
                            <option value="">Select a time slot</option>
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-450">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                        {errors.scheduleTime && <p className="text-[10px] text-rose-400 font-semibold">{errors.scheduleTime}</p>}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="form-field-message" className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Message *
                  </label>
                  <textarea
                    id="form-field-message"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl bg-[#071626] border text-xs md:text-sm text-white focus:outline-hidden ${
                      errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-emerald-500'
                    }`}
                    placeholder="Provide specific guidelines, dimensions, or inquiries here..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                  />
                  {errors.message && <p className="text-[10px] text-rose-400 font-semibold">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full py-4 rounded-xl bg-[#FFC107] text-[#071B2F] font-extrabold text-xs uppercase tracking-widest hover:bg-[#ffcf40] hover:scale-[1.01] active:translate-y-px transition-all shadow-lg shadow-amber-950/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {formState === 'submitting' ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Your Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
