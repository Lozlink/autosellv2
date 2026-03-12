'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabaseClient'


const australianStates = [
  { value: 'NSW', label: 'NSW' },
  { value: 'VIC', label: 'VIC' },
  { value: 'QLD', label: 'QLD' },
  { value: 'SA', label: 'SA' },
  { value: 'WA', label: 'WA' },
  { value: 'TAS', label: 'TAS' },
  { value: 'NT', label: 'NT' },
  { value: 'ACT', label: 'ACT' },
];

const inputClass = "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-base liquid-glass-input";
const labelClass = "block text-xs md:text-sm font-light text-gray-500/90 mb-0.5 md:mb-1 tracking-wide";
const formFont = { fontFamily: 'var(--font-montserrat), system-ui, sans-serif' };

export default function CarSellForm() {
  const [step, setStep] = useState(1);
  const [manualEntry, setManualEntry] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vinOrReg: '',
    state: '',
    postcode: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleBadge: '',
    vehicleYear: '',
    vehicleDescription: '',
    message: ''
  })
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  const [notMyCar, setNotMyCar] = useState(false);

  const [regoLookupResult, setRegoLookupResult] = useState<{
    make?: string;
    model?: string;
    year?: string;
    badge?: string;
    colour?: string;
    bodyType?: string;
    transmission?: string;
    engineSize?: string;
  } | null>(null);

  const handleRegoLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!formData.vinOrReg || !formData.state) {
      setError('Please enter your registration/VIN and select your state.');
      setLoading(false);
      return;
    }

    // Save lead to Supabase
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      vin_or_reg: formData.vinOrReg,
      enquiry_type: 'lead_capture',
      created_at: new Date().toISOString(),
    };

    const { error: supabaseError } = await supabase.from('leads').insert([leadData]);
    if (supabaseError) {
      console.error('Lead save error:', supabaseError);
    }

    // Call AutoGrab API via our server-side proxy
    try {
      const res = await fetch(
        `/api/autograb?plate=${encodeURIComponent(formData.vinOrReg)}&state=${encodeURIComponent(formData.state)}`
      );

      if (res.ok) {
        const data = await res.json();
        const vehicle = data?.vehicle;

        if (vehicle) {
          setRegoLookupResult({
            make: vehicle.make || undefined,
            model: vehicle.model || undefined,
            year: vehicle.year || undefined,
            badge: vehicle.badge || undefined,
            colour: data.colour || undefined,
            bodyType: vehicle.body_type || undefined,
            transmission: vehicle.transmission || undefined,
            engineSize: vehicle.capacity_cc ? `${vehicle.capacity_cc}cc` : undefined,
          });
        } else {
          setRegoLookupResult(null);
        }
      } else {
        console.error('AutoGrab lookup failed:', res.status);
        setRegoLookupResult(null);
      }
    } catch (err) {
      console.error('AutoGrab lookup error:', err);
      setRegoLookupResult(null);
    }

    // Move to step 2
    setStep(2);
    setLoading(false);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!formData.vehicleMake || !formData.vehicleModel || !formData.vehicleYear) {
      setError('Please fill in Make, Model, and Year.');
      setLoading(false);
      return;
    }

    if (!/^\d{4}$/.test(formData.vehicleYear)) {
      setError('Please enter a valid 4-digit year.');
      setLoading(false);
      return;
    }

    const supabaseData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      enquiry_type: 'sell',
      vehicle_make: formData.vehicleMake,
      vehicle_model: formData.vehicleModel,
      vehicle_year: formData.vehicleYear,
      vehicle_odometer: '',
      vehicle_condition: '',
      vehicle_description: formData.vehicleDescription || `${formData.vehicleBadge ? 'Badge: ' + formData.vehicleBadge : ''}`,
      message: formData.message || `Quote request for ${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}${formData.vehicleBadge ? ' ' + formData.vehicleBadge : ''}`,
      budget: "",
      preferred_location: formData.postcode,
      vin_or_reg: 'manual_entry',
    };

    const { error: supabaseError } = await supabase.from('inquiries').insert([supabaseData]);
    if (supabaseError) {
      setError('Failed to save your quote request. Please try again.');
      setLoading(false);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supabaseData),
      });
      if (!res.ok) throw new Error('Email send failed');
      setSuccess(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        vinOrReg: '',
        state: '',
        postcode: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleBadge: '',
        vehicleYear: '',
        vehicleDescription: '',
        message: ''
      });
      setManualEntry(false);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch {
      setError('Your quote request was saved, but email notification failed.');
      setLoading(false);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleRegoConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (notMyCar) {
      if (!formData.vehicleMake || !formData.vehicleModel || !formData.vehicleYear) {
        setError('Please fill in Make, Model, and Year.');
        setLoading(false);
        return;
      }
      if (!/^\d{4}$/.test(formData.vehicleYear)) {
        setError('Please enter a valid 4-digit year.');
        setLoading(false);
        return;
      }
    }

    const supabaseData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      postcode: formData.postcode,
      enquiry_type: 'sell',
      vehicle_make: notMyCar ? formData.vehicleMake : (regoLookupResult?.make || formData.vehicleMake),
      vehicle_model: notMyCar ? formData.vehicleModel : (regoLookupResult?.model || formData.vehicleModel),
      vehicle_year: notMyCar ? formData.vehicleYear : (regoLookupResult?.year || formData.vehicleYear),
      vehicle_odometer: '',
      vehicle_condition: '',
      vehicle_description: notMyCar
        ? `${formData.vehicleBadge ? 'Badge: ' + formData.vehicleBadge : ''}`
        : (formData.vehicleDescription || ''),
      message: formData.message || `Quote request via rego lookup: ${formData.vinOrReg} (${formData.state})`,
      budget: "",
      preferred_location: formData.postcode,
      vin_or_reg: notMyCar ? 'manual_entry' : formData.vinOrReg,
    };

    const { error: supabaseError } = await supabase.from('inquiries').insert([supabaseData]);
    if (supabaseError) {
      setError('Failed to save your quote request. Please try again.');
      setLoading(false);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supabaseData),
      });
      if (!res.ok) throw new Error('Email send failed');
      setSuccess(true);
      setLoading(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        vinOrReg: '',
        state: '',
        postcode: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleBadge: '',
        vehicleYear: '',
        vehicleDescription: '',
        message: ''
      });
      setRegoLookupResult(null);
      setNotMyCar(false);
      setStep(1);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch {
      setError('Your quote request was saved, but email notification failed.');
      setLoading(false);
      setTimeout(() => {
        if (feedbackRef.current) feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Restrict vehicleYear to digits only, max 4 characters
    if (name === 'vehicleYear') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
      setFormData({ ...formData, [name]: digitsOnly });
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Step progress indicator
  const StepIndicator = ({ current }: { current: 1 | 2 }) => (
    <div className="flex items-center justify-center gap-0 mb-3 md:mb-8">
      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 ${current >= 1 ? 'step-node-active' : 'step-node-inactive'}`}>
        1
      </div>
      <div className={`flex-1 h-px max-w-24 md:max-w-32 transition-all duration-300 ${current >= 2 ? 'step-connector-active' : 'step-connector-inactive'}`} />
      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-xs md:text-sm font-semibold transition-all duration-300 ${current >= 2 ? 'step-node-active' : 'step-node-inactive'}`}>
        2
      </div>
    </div>
  );

  // Step 1: Vehicle info + Contact details
  if (step === 1) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-8"
        style={formFont}
      >
        <h1 className="text-2xl sm:text-3xl font-black leading-tight text-gray-900 text-center mb-3 lg:hidden">
          Sell Your Car Today
          <span className="block text-[#FFC325]">Get The Best Price Guaranteed</span>
        </h1>
        <StepIndicator current={1} />

        <div ref={feedbackRef} />
        {error && (
          <div className="glass-alert-error px-4 py-2.5 rounded-xl mb-2 md:mb-6 flex items-center justify-between text-sm" role="alert">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="ml-4 font-bold text-lg leading-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity">&times;</button>
          </div>
        )}
        {success && (
          <div className="glass-alert-success px-4 py-2.5 rounded-xl mb-2 md:mb-6 flex items-center justify-between text-sm" role="alert">
            <span><strong>Quote Submitted!</strong> We&apos;ll contact you within 30 minutes with your offer.</span>
            <button onClick={() => setSuccess(false)} className="ml-4 font-bold text-lg leading-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity">&times;</button>
          </div>
        )}

        <form onSubmit={manualEntry ? handleManualSubmit : handleRegoLookup} className="space-y-3 md:space-y-5">
          {/* Vehicle Identification */}
          {!manualEntry ? (
            <div className="space-y-3 md:space-y-4">
              <div className="glass-section-header">Your Vehicle</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="vinOrReg" className={labelClass}>
                    Registration or VIN
                  </label>
                  <input
                    type="text"
                    id="vinOrReg"
                    name="vinOrReg"
                    required
                    value={formData.vinOrReg}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. ABC123 or 17-digit VIN"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className={labelClass}>
                  Registration State
                </label>
                <select
                  id="state"
                  name="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select State</option>
                  {australianStates.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setManualEntry(true)}
                className="text-sm font-bold  text-[#FFC325] hover:text-black underline cursor-pointer transition-colors"
              >
                Or enter car details manually
              </button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              <div className="glass-section-header">Vehicle Details</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label htmlFor="vehicleMake" className={labelClass}>Make</label>
                  <input type="text" id="vehicleMake" name="vehicleMake" required value={formData.vehicleMake} onChange={handleChange} className={inputClass} placeholder="e.g. Toyota" />
                </div>
                <div>
                  <label htmlFor="vehicleModel" className={labelClass}>Model</label>
                  <input type="text" id="vehicleModel" name="vehicleModel" required value={formData.vehicleModel} onChange={handleChange} className={inputClass} placeholder="e.g. Camry" />
                </div>
                <div>
                  <label htmlFor="vehicleYear" className={labelClass}>Year</label>
                  <input type="text" id="vehicleYear" name="vehicleYear" required inputMode="numeric" maxLength={4} value={formData.vehicleYear} onChange={handleChange} className={inputClass} placeholder="e.g. 2019" />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Additional Info</label>
                <input type="text" id="message" name="message" value={formData.message} onChange={handleChange} className={inputClass} placeholder="Any additional details..." />
              </div>

              <button
                type="button"
                onClick={() => setManualEntry(false)}
                className="text-sm text-gray-900 hover:text-black underline cursor-pointer transition-colors"
              >
                Use registration/VIN instead
              </button>
            </div>
          )}

          {/* Contact Details */}
          <div className="pt-1 md:pt-3">
            <div className="glass-section-header mb-3">Your Details</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
              <div>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Mobile</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="0400 000 000" />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="w-full cursor-pointer btn-liquid-gold py-3.5 px-6 md:py-4 rounded-xl text-lg md:text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {loading ? (manualEntry ? 'Submitting...' : 'Finding Your Car...') : manualEntry ? 'Get My Free Quote' : 'Find My Car'}
          </motion.button>
        </form>

        <div className="mt-2 md:mt-6 text-center">
          <p className="text-[11px] md:text-xs text-gray-500 flex items-center justify-center gap-1.5 md:gap-2">
            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your information is secure and will not be shared with third parties
          </p>
        </div>
      </motion.div>
    );
  }

  // Step 2: Rego lookup confirmation
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-8"
      style={formFont}
    >
      <StepIndicator current={2} />

      {/* Back link */}
      <button
        onClick={() => setStep(1)}
        className="mb-3 md:mb-6 text-sm text-gray-500 hover:text-gray-900 cursor-pointer transition-colors flex items-center gap-1"
      >
        &larr; Back
      </button>

      <div ref={feedbackRef} />
      {loading && (
        <div className="glass-alert-warning px-4 py-3 rounded-xl mb-3 md:mb-6 flex items-center justify-between text-sm" role="alert">
          <span><strong>Processing...</strong> Getting your quote ready.</span>
          <button onClick={() => setLoading(false)} className="ml-4 font-bold text-lg leading-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity">&times;</button>
        </div>
      )}
      {error && (
        <div className="glass-alert-error px-4 py-3 rounded-xl mb-3 md:mb-6 flex items-center justify-between text-sm" role="alert">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-4 font-bold text-lg leading-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity">&times;</button>
        </div>
      )}
      {success && (
        <div className="glass-alert-success px-4 py-3 rounded-xl mb-3 md:mb-6 flex items-center justify-between text-sm" role="alert">
          <span><strong>Quote Submitted!</strong> We&apos;ll contact you within 30 minutes with your offer.</span>
          <button onClick={() => setSuccess(false)} className="ml-4 font-bold text-lg leading-none cursor-pointer opacity-60 hover:opacity-100 transition-opacity">&times;</button>
        </div>
      )}

      <p className="text-sm text-gray-500 mb-4 md:mb-6">
        We looked up <strong className="text-gray-700">{formData.vinOrReg}</strong> ({formData.state}). Please confirm below.
      </p>

      {/* Vehicle details from API or manual entry */}
      {notMyCar ? (
        <div className="liquid-glass-card rounded-xl p-4 md:p-5 mb-4 md:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label htmlFor="vehicleMake" className={labelClass}>Make</label>
              <input type="text" id="vehicleMake" name="vehicleMake" required value={formData.vehicleMake} onChange={handleChange} className={inputClass} placeholder="e.g. Toyota" />
            </div>
            <div>
              <label htmlFor="vehicleModel" className={labelClass}>Model</label>
              <input type="text" id="vehicleModel" name="vehicleModel" required value={formData.vehicleModel} onChange={handleChange} className={inputClass} placeholder="e.g. Camry" />
            </div>
            <div>
              <label htmlFor="vehicleBadge" className={labelClass}>Badge</label>
              <input type="text" id="vehicleBadge" name="vehicleBadge" value={formData.vehicleBadge} onChange={handleChange} className={inputClass} placeholder="e.g. SR5" />
            </div>
            <div>
              <label htmlFor="vehicleYear" className={labelClass}>Year</label>
              <input type="text" id="vehicleYear" name="vehicleYear" required inputMode="numeric" maxLength={4} value={formData.vehicleYear} onChange={handleChange} className={inputClass} placeholder="e.g. 2019" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setNotMyCar(false)}
            className="mt-3 text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 cursor-pointer transition-colors"
          >
            Use the looked-up vehicle instead
          </button>
        </div>
      ) : regoLookupResult ? (
        <div className="liquid-glass-card rounded-xl p-4 md:p-5 mb-4 md:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {regoLookupResult.year && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Year</span><span className="font-medium text-gray-900">{regoLookupResult.year}</span></div>
            )}
            {regoLookupResult.make && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Make</span><span className="font-medium text-gray-900">{regoLookupResult.make}</span></div>
            )}
            {regoLookupResult.model && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Model</span><span className="font-medium text-gray-900">{regoLookupResult.model}</span></div>
            )}
            {regoLookupResult.badge && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Badge</span><span className="font-medium text-gray-900">{regoLookupResult.badge}</span></div>
            )}
            {regoLookupResult.colour && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Colour</span><span className="font-medium text-gray-900">{regoLookupResult.colour}</span></div>
            )}
            {regoLookupResult.bodyType && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Body</span><span className="font-medium text-gray-900">{regoLookupResult.bodyType}</span></div>
            )}
            {regoLookupResult.transmission && (
              <div className="flex justify-between gap-2 py-1 border-b border-white/40"><span className="text-gray-500 shrink-0">Trans</span><span className="font-medium text-gray-900 text-right">{regoLookupResult.transmission}</span></div>
            )}
            {regoLookupResult.engineSize && (
              <div className="flex justify-between py-1 border-b border-white/40"><span className="text-gray-500">Engine</span><span className="font-medium text-gray-900">{regoLookupResult.engineSize}</span></div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setNotMyCar(true)}
            className="mt-4 text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 cursor-pointer transition-colors"
          >
            Not your car? Enter details manually
          </button>
        </div>
      ) : (
        <div className="liquid-glass-card rounded-xl p-4 md:p-5 mb-4 md:mb-6">
          <p className="text-sm text-gray-500">We couldn&apos;t find vehicle details for this registration. You can still get a quote by entering your vehicle details manually below.</p>
          <button
            type="button"
            onClick={() => setNotMyCar(true)}
            className="mt-3 text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2 cursor-pointer transition-colors"
          >
            Enter details manually
          </button>
        </div>
      )}

      <form onSubmit={handleRegoConfirmSubmit} className="space-y-3 md:space-y-5">
        <div>
          <label htmlFor="message" className={labelClass}>Additional Info</label>
          <input type="text" id="message" name="message" value={formData.message} onChange={handleChange} className={inputClass} placeholder="Any additional details..." />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full cursor-pointer btn-liquid-gold py-4 px-6 rounded-xl text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Getting Your Quote...' : 'Get My Free Quote Now'}
        </motion.button>
      </form>

      <div className="mt-4 md:mt-6 text-center">
        <p className="text-[11px] md:text-sm text-gray-500 flex items-center justify-center gap-1.5 md:gap-2">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Your information is secure and will not be shared with third parties
        </p>
        <p className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          We&apos;ll contact you within 30 minutes with your competitive offer
        </p>
      </div>
    </motion.div>
  );
}
