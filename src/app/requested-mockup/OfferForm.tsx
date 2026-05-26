'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const GOLD = '#FFC403'
const GRAPHITE_DEEP = '#2B303A'

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'] as const
type StateCode = (typeof STATES)[number]

const STATE_LABEL: Record<StateCode, string> = {
  NSW: 'New South Wales',
  VIC: 'Victoria',
  QLD: 'Queensland',
  WA: 'Western Australia',
  SA: 'South Australia',
  TAS: 'Tasmania',
  ACT: 'Australian Capital Territory',
  NT: 'Northern Territory',
}

type Step = 1 | 2 | 3

type FormState = {
  // Step 1 — vehicle
  unregistered: boolean
  rego: string
  state: StateCode | ''
  // Step 1 (unregistered mode) — vehicle details
  make: string
  model: string
  year: string
  kilometres: string
  notes: string
  // Step 2 — personal details
  name: string
  phone: string
  email: string
  postcode: string
}

const EMPTY: FormState = {
  unregistered: false,
  rego: '',
  state: '',
  make: '',
  model: '',
  year: '',
  kilometres: '',
  notes: '',
  name: '',
  phone: '',
  email: '',
  postcode: '',
}

// ─── Icons ────────────────────────────────────────────────────────────────

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function SparkleIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

function ChevronIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// ─── Validation ───────────────────────────────────────────────────────────

const AU_PHONE_RE = /^(?:\+?61|0)[2-578](?:[ -]?\d){8}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const POSTCODE_RE = /^\d{4}$/

type Errors = Partial<Record<keyof FormState, string>>

function validateStep1(s: FormState): Errors {
  const errs: Errors = {}
  if (!s.state) errs.state = 'Select your state'
  if (s.unregistered) {
    if (!s.make.trim()) errs.make = 'Enter the make'
    if (!s.model.trim()) errs.model = 'Enter the model'
    if (s.kilometres) {
      const km = Number(s.kilometres.replace(/[^\d]/g, ''))
      if (Number.isNaN(km) || km < 0 || km > 1_000_000) errs.kilometres = 'Invalid kilometres'
    }
  } else {
    if (!s.rego.trim() || s.rego.trim().length < 2) errs.rego = 'Enter your rego'
  }
  return errs
}

function validateStep2(s: FormState): Errors {
  const errs: Errors = {}
  if (!s.name.trim() || s.name.trim().length < 2) errs.name = 'Enter your full name'
  if (!AU_PHONE_RE.test(s.phone.trim())) errs.phone = 'Enter a valid phone number'
  if (!EMAIL_RE.test(s.email.trim())) errs.email = 'Enter a valid email'
  if (!POSTCODE_RE.test(s.postcode.trim())) errs.postcode = 'Enter a 4-digit postcode'
  return errs
}

// ─── Component ────────────────────────────────────────────────────────────

export default function OfferForm() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }

  function next() {
    const errs =
      step === 1 ? validateStep1(form) : step === 2 ? validateStep2(form) : {}
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s))
  }

  function back() {
    setErrors({})
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s))
  }

  async function submit() {
    setSubmitting(true)
    setSubmitError(null)

    // Rego mode: enrich with AutoGrab before saving. Same proxy
    // (/api/autograb) the legacy CarSellForm uses. Best-effort — if it fails
    // or returns nothing, we still submit with the rego as a fallback so the
    // email endpoint (which requires make/model/year) doesn't 400.
    let lookup: { make?: string; model?: string; year?: string; badge?: string } | null = null
    if (!form.unregistered && form.rego && form.state) {
      try {
        const res = await fetch(
          `/api/autograb?plate=${encodeURIComponent(form.rego)}&state=${encodeURIComponent(form.state)}`
        )
        if (res.ok) {
          const data = await res.json()
          const v = data?.vehicle
          if (v) {
            lookup = {
              make: v.make || undefined,
              model: v.model || undefined,
              year: v.year ? String(v.year) : undefined,
              badge: v.badge || undefined,
            }
          }
        }
      } catch (e) {
        console.warn('[OfferForm] AutoGrab lookup failed (continuing)', e)
      }
    }

    // Reshape into the existing Auto-Sell inquiries schema so it slots into
    // the same CRM + email pipeline the legacy CarSellForm uses (Supabase
    // `inquiries` table + /api/close-lead + /api/send-email).
    const make = form.unregistered ? form.make.trim() : (lookup?.make || '')
    const model = form.unregistered ? form.model.trim() : (lookup?.model || '')
    const year = form.unregistered ? form.year.trim() : (lookup?.year || '')

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      postcode: form.postcode.trim(),
      enquiry_type: 'sell',
      // If AutoGrab returned nothing for a rego submission, fall back to the
      // rego itself so send-email's required-field check passes. The CRM
      // payload still includes the raw rego under `vin_or_reg`.
      vehicle_make: make || (form.unregistered ? '' : `Rego ${form.rego}`),
      vehicle_model: model || (form.unregistered ? '' : 'Pending lookup'),
      vehicle_year: year || (form.unregistered ? '' : 'Unknown'),
      vehicle_odometer: form.kilometres.replace(/[^\d]/g, ''),
      vehicle_condition: '',
      vehicle_description: form.unregistered ? form.notes.trim() : (lookup?.badge || ''),
      message: form.unregistered
        ? `Unregistered vehicle via /requested-mockup: ${form.make} ${form.model}${form.year ? ' ' + form.year : ''}${form.notes ? ` — ${form.notes}` : ''}`
        : `Rego lookup via /requested-mockup: ${form.rego} (${form.state})${lookup ? ` — matched ${lookup.year || ''} ${lookup.make || ''} ${lookup.model || ''}`.trimEnd() : ''}`,
      budget: '',
      preferred_location: form.postcode,
      vin_or_reg: form.unregistered ? 'manual_entry' : form.rego.trim(),
    }

    try {
      // 1. Persist to Supabase. Mirrors CarSellForm.handleRegoConfirmSubmit.
      const { error: supabaseError } = await supabase.from('inquiries').insert([payload])
      if (supabaseError) throw new Error(supabaseError.message)

      // 2. Fire Close CRM lead creation — non-blocking, same as legacy.
      void fetch('/api/close-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          vehicle_make: payload.vehicle_make,
          vehicle_model: payload.vehicle_model,
          vehicle_year: payload.vehicle_year,
          vehicle_description: payload.vehicle_description,
          vin_or_reg: payload.vin_or_reg,
          postcode: payload.postcode,
          message: payload.message,
        }),
      }).catch((e) => console.error('[OfferForm] Close CRM sync failed', e))

      // 2b. SMS notify the team. Non-blocking — if Twilio is misconfigured
      //     in dev or the API hits an error, the lead has still been saved
      //     to Supabase and the user still sees success.
      void fetch('/api/notify-lead-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          postcode: payload.postcode,
          vehicle_make: payload.vehicle_make,
          vehicle_model: payload.vehicle_model,
          vehicle_year: payload.vehicle_year,
          vin_or_reg: payload.vin_or_reg,
          source: '/requested-mockup',
        }),
      }).catch((e) => console.error('[OfferForm] notify-lead-sms failed', e))

      // 3. Send quote email (best-effort — if this fails we still show success
      //    because the lead is already saved in Supabase).
      try {
        const res = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) console.warn('[OfferForm] send-email returned', res.status)
      } catch (e) {
        console.warn('[OfferForm] send-email failed', e)
      }

      setSubmitted(true)
    } catch (e) {
      console.error('[OfferForm] submission failed', e)
      setSubmitError('Something went wrong. Please try again or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  function reset() {
    setForm(EMPTY)
    setErrors({})
    setStep(1)
    setSubmitted(false)
  }

  const stepLabels = ['Vehicle', 'Your Details', 'Confirm']

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5), 0 18px 36px -12px rgba(0,0,0,0.35)' }}
    >
      {/* Dark header */}
      <div className="relative px-6 md:px-7 py-5" style={{ backgroundColor: GRAPHITE_DEEP }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold tracking-[0.22em]" style={{ color: GOLD }}>
              AUTO-SELL.AI
            </div>
            <h2 className="text-2xl md:text-[26px] font-black mt-1 text-white leading-tight">
              {submitted ? 'Offer request received!' : 'Get Your Offer Now'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {submitted ? 'We’ll be in touch shortly with your offer.' : 'Priority quote lane · no dealer runaround'}
            </p>
          </div>
          <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-900 flex-shrink-0"
            style={{ backgroundColor: GOLD }}
            aria-hidden="true"
          >
            <SparkleIcon className="w-5 h-5" />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ backgroundColor: GOLD }} />
      </div>

      {/* Body */}
      <div className="bg-white px-6 md:px-7 py-6">
        {submitted ? (
          <SuccessState form={form} onReset={reset} />
        ) : (
          <>
            <StepIndicator step={step} labels={stepLabels} />

            {step === 1 &&
              (form.unregistered ? (
                <Step1Unregistered form={form} errors={errors} onChange={set} />
              ) : (
                <Step1Rego form={form} errors={errors} onChange={set} />
              ))}
            {step === 2 && <Step2Personal form={form} errors={errors} onChange={set} />}
            {step === 3 && <Step3Confirm form={form} />}

            {submitError && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700">
                {submitError}
              </div>
            )}

            <div className="mt-5 flex items-center gap-3">
              {step > 1 && (
                <button
                  type="button"
                  onClick={back}
                  className="px-5 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={step < 3 ? next : submit}
                disabled={submitting}
                className="flex-1 rounded-xl py-4 text-base font-black tracking-wider text-slate-900 transition-transform hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(180deg, ${GOLD}, #E6A500)`,
                  boxShadow:
                    '0 1px 0 rgba(180, 120, 0, 0.4) inset, 0 8px 24px rgba(255, 195, 37, 0.45), 0 16px 40px rgba(255, 195, 37, 0.25)',
                }}
              >
                {submitting ? 'SENDING…' : ctaLabel(step)}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 text-[12px] text-slate-500">
              <CheckIcon className="w-3.5 h-3.5" />
              <span>Free · No obligation · 30 second offer</span>
            </div>

            <div className="flex items-center gap-3 my-4 text-[10px] font-bold text-slate-400">
              <div className="flex-1 h-px bg-slate-200" />
              <span>OR</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <a href="tel:0492858699" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-900">
              <PhoneIcon className="w-4 h-4" />
              Call 0492 858 699
            </a>
          </>
        )}
      </div>
    </div>
  )
}

function ctaLabel(step: Step) {
  if (step === 1) return 'CONTINUE → YOUR DETAILS'
  if (step === 2) return 'CONTINUE → CONFIRM'
  return 'GET MY INSTANT OFFER →'
}

// ─── Step indicator ───────────────────────────────────────────────────────

function StepIndicator({ step, labels }: { step: Step; labels: string[] }) {
  return (
    <>
      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-2 text-slate-500">
        <span className="text-slate-900">Step {step} of 3</span>
        <span>{labels[step - 1]}</span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 rounded-full mb-5">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%`, backgroundColor: GOLD }}
        />
      </div>
    </>
  )
}

// ─── Step 1: Rego mode ────────────────────────────────────────────────────

function Step1Rego({
  form,
  errors,
  onChange,
}: {
  form: FormState
  errors: Errors
  onChange: <K extends keyof FormState>(k: K, v: FormState[K]) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="relative rounded-2xl px-4 py-4 border-2 border-dashed flex items-center justify-between gap-3 mb-2"
        style={{ backgroundColor: 'rgba(255, 195, 3, 0.10)', borderColor: GOLD }}
      >
        <input
          type="text"
          value={form.rego}
          onChange={(e) => onChange('rego', e.target.value.toUpperCase().slice(0, 7))}
          placeholder="ENTER REGO"
          className="flex-1 bg-transparent outline-none text-base font-black tracking-widest text-slate-900 placeholder:text-amber-800/55"
          aria-label="Vehicle registration"
        />
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-black text-white"
            style={{ backgroundColor: GRAPHITE_DEEP }}
          >
            {form.state || 'STATE'}
            <ChevronIcon className="w-3 h-3" />
          </button>
          {open && (
            <StateMenu
              value={form.state}
              onPick={(s) => {
                onChange('state', s)
                setOpen(false)
              }}
            />
          )}
        </div>
      </div>
      {(errors.rego || errors.state) && (
        <div className="text-xs text-red-600 font-bold mb-2">{errors.rego || errors.state}</div>
      )}

      <button
        type="button"
        onClick={() => onChange('unregistered', true)}
        className="text-xs font-bold mb-1 hover:underline"
        style={{ color: '#92560A' }}
      >
        No plate? Unregistered car? Click here →
      </button>
    </>
  )
}

// ─── Step 1: Unregistered mode ────────────────────────────────────────────

function Step1Unregistered({
  form,
  errors,
  onChange,
}: {
  form: FormState
  errors: Errors
  onChange: <K extends keyof FormState>(k: K, v: FormState[K]) => void
}) {
  return (
    <div className="rounded-2xl p-4 mb-1" style={{ backgroundColor: 'rgba(255, 195, 3, 0.06)', border: `1px solid rgba(255, 195, 3, 0.30)` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-black uppercase tracking-wider" style={{ color: '#92560A' }}>
          Unregistered vehicle
        </span>
        <button
          type="button"
          onClick={() => onChange('unregistered', false)}
          className="text-xs font-bold hover:underline"
          style={{ color: '#92560A' }}
        >
          Use rego instead
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <FieldText
          placeholder="Make (e.g. Toyota)"
          value={form.make}
          onChange={(v) => onChange('make', v)}
          error={errors.make}
        />
        <FieldText
          placeholder="Model (e.g. Corolla)"
          value={form.model}
          onChange={(v) => onChange('model', v)}
          error={errors.model}
        />
        <FieldText
          placeholder="Year"
          value={form.year}
          onChange={(v) => onChange('year', v.replace(/[^\d]/g, '').slice(0, 4))}
          inputMode="numeric"
        />
        <FieldText
          placeholder="Kilometres"
          value={form.kilometres}
          onChange={(v) => {
            const n = v.replace(/[^\d]/g, '')
            onChange('kilometres', n ? Number(n).toLocaleString('en-AU') : '')
          }}
          inputMode="numeric"
          error={errors.kilometres}
        />
      </div>
      <div className="mt-2.5">
        <StateSelect value={form.state} onChange={(v) => onChange('state', v)} error={errors.state} />
      </div>
      <textarea
        value={form.notes}
        onChange={(e) => onChange('notes', e.target.value.slice(0, 500))}
        placeholder="Notes — condition, damage, missing parts, etc. (optional)"
        rows={3}
        className="mt-2.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-amber-400 resize-none"
      />
    </div>
  )
}

// ─── Step 2: Personal Details ─────────────────────────────────────────────

function Step2Personal({
  form,
  errors,
  onChange,
}: {
  form: FormState
  errors: Errors
  onChange: <K extends keyof FormState>(k: K, v: FormState[K]) => void
}) {
  return (
    <div className="space-y-3">
      <FieldText
        label="Full name"
        placeholder="Jane Smith"
        value={form.name}
        onChange={(v) => onChange('name', v)}
        error={errors.name}
      />
      <div className="grid grid-cols-2 gap-3">
        <FieldText
          label="Mobile"
          placeholder="0400 000 000"
          value={form.phone}
          onChange={(v) => onChange('phone', v)}
          error={errors.phone}
          inputMode="tel"
        />
        <FieldText
          label="Postcode"
          placeholder="2000"
          value={form.postcode}
          onChange={(v) => onChange('postcode', v.replace(/[^\d]/g, '').slice(0, 4))}
          error={errors.postcode}
          inputMode="numeric"
        />
      </div>
      <FieldText
        label="Email"
        placeholder="you@email.com"
        value={form.email}
        onChange={(v) => onChange('email', v)}
        error={errors.email}
        inputMode="email"
      />
      <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
        By submitting, you agree to be contacted regarding your offer.
      </p>
    </div>
  )
}

// ─── Step 3: Confirm ──────────────────────────────────────────────────────

function Step3Confirm({ form }: { form: FormState }) {
  const rows: { label: string; value: string }[] = [
    {
      label: 'Vehicle',
      value: form.unregistered
        ? `${form.make} ${form.model}${form.year ? ` (${form.year})` : ''}`
        : `${form.rego} · ${form.state ? STATE_LABEL[form.state as StateCode] : ''}`,
    },
  ]
  if (form.unregistered && form.kilometres) rows.push({ label: 'Kilometres', value: `${form.kilometres} km` })
  if (form.unregistered && form.state) rows.push({ label: 'Location', value: STATE_LABEL[form.state as StateCode] })
  rows.push({ label: 'Name', value: form.name })
  rows.push({ label: 'Mobile', value: form.phone })
  rows.push({ label: 'Email', value: form.email })
  rows.push({ label: 'Postcode', value: form.postcode })
  if (form.unregistered && form.notes) rows.push({ label: 'Notes', value: form.notes })

  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
        <div className="text-[11px] font-black uppercase tracking-wider text-slate-700 mb-3">
          Confirm your details
        </div>
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          {rows.map((r) => (
            <div key={r.label} className="contents">
              <dt className="col-span-1 text-slate-500">{r.label}</dt>
              <dd className="col-span-2 text-slate-900 font-semibold break-words">{r.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="text-[11px] text-slate-500 leading-relaxed mt-3">
        Check everything looks right, then hit submit and we&apos;ll send your offer within minutes.
      </p>
    </div>
  )
}

// ─── Reusable primitives ──────────────────────────────────────────────────

function FieldText({
  label,
  value,
  onChange,
  placeholder,
  error,
  inputMode,
}: {
  label?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
  inputMode?: 'tel' | 'email' | 'numeric' | 'text'
}) {
  return (
    <label className="block">
      {label && <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">{label}</div>}
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-colors bg-white ${
          error ? 'border-red-300 bg-red-50/30' : 'border-slate-200 focus:border-amber-400'
        }`}
      />
      {error && <div className="text-xs text-red-600 font-bold mt-1">{error}</div>}
    </label>
  )
}

function StateSelect({
  value,
  onChange,
  error,
}: {
  value: StateCode | ''
  onChange: (v: StateCode) => void
  error?: string
}) {
  return (
    <label className="block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as StateCode)}
        className={`w-full rounded-lg border px-3 py-2.5 text-sm font-medium text-slate-900 outline-none transition-colors bg-white ${
          error ? 'border-red-300' : 'border-slate-200 focus:border-amber-400'
        }`}
      >
        <option value="">State (where the car is)</option>
        {STATES.map((s) => (
          <option key={s} value={s}>{STATE_LABEL[s]}</option>
        ))}
      </select>
      {error && <div className="text-xs text-red-600 font-bold mt-1">{error}</div>}
    </label>
  )
}

function StateMenu({
  value,
  onPick,
}: {
  value: StateCode | ''
  onPick: (s: StateCode) => void
}) {
  return (
    <div
      role="listbox"
      className="absolute z-20 top-full right-0 mt-2 w-40 rounded-lg bg-white border border-slate-200 shadow-xl py-1 max-h-64 overflow-auto"
    >
      {STATES.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onPick(s)}
          className={`w-full text-left px-3 py-2 text-sm font-bold hover:bg-amber-50 ${
            value === s ? 'bg-amber-50 text-slate-900' : 'text-slate-700'
          }`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

// ─── Success state ────────────────────────────────────────────────────────

function SuccessState({ form, onReset }: { form: FormState; onReset: () => void }) {
  return (
    <div className="text-center py-2">
      <div className="mx-auto w-14 h-14 rounded-full inline-flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16A34A' }}>
        <CheckIcon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-black text-slate-900">Your offer request has been received.</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-xs mx-auto">
        Thanks {form.name.split(' ')[0] || 'there'} — our team will be in touch within 10 minutes with a fair offer.
      </p>
      <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4 text-left text-xs">
        <div className="font-bold text-slate-900 mb-2">Submission summary</div>
        <dl className="grid grid-cols-2 gap-y-1.5 text-slate-600">
          <dt>Vehicle</dt>
          <dd className="text-slate-900 font-semibold">
            {form.unregistered ? `${form.make} ${form.model}` : `${form.rego} · ${form.state}`}
          </dd>
          {form.unregistered && form.kilometres && (
            <>
              <dt>Kilometres</dt>
              <dd className="text-slate-900 font-semibold">{form.kilometres} km</dd>
            </>
          )}
          <dt>Contact</dt>
          <dd className="text-slate-900 font-semibold">{form.phone}</dd>
        </dl>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-sm font-bold text-slate-600 hover:text-slate-900"
      >
        Submit another offer →
      </button>
    </div>
  )
}
