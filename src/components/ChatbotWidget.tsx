'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabaseClient'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  options?: string[] // quick-reply buttons
}

/** Conversational stages for lead gen flow */
type Stage =
  | 'welcome'
  | 'awaiting_intent'
  | 'ask_make_model'
  | 'ask_year'
  | 'ask_condition'
  | 'ask_postcode'
  | 'ask_name'
  | 'ask_phone'
  | 'ask_email'
  | 'confirm'
  | 'submitted'
  | 'faq'

interface LeadData {
  vehicleMakeModel: string
  vehicleYear: string
  vehicleCondition: string
  postcode: string
  name: string
  phone: string
  email: string
}

const EMPTY_LEAD: LeadData = {
  vehicleMakeModel: '',
  vehicleYear: '',
  vehicleCondition: '',
  postcode: '',
  name: '',
  phone: '',
  email: '',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function msgId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

/** Pick a random item from an array */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─── Response pools for variety ──────────────────────────────────────────


const MAKE_MODEL_REACTIONS = [
  (car: string) => `Nice — a ${car}! What year is it?`,
  (car: string) => `Oh lovely, a ${car}! And what year would that be?`,
  (car: string) => `A ${car} — great choice! Do you know what year it is?`,
  (car: string) => `${car}, brilliant! What year are we looking at?`,
]

const CONDITION_PROMPTS = [
  "Got it! How would you describe the overall condition?",
  "Thanks for that! And how's the condition looking?",
  "Noted! How would you say the car's condition is?",
  "Perfect. And condition-wise, how's it going?",
]

const POSTCODE_TRANSITIONS = [
  "You're doing great! What's your postcode? That way we can make sure we've got someone near you.",
  "Wonderful, thanks for that! What postcode are you in? We want to make sure we can get to you easily.",
  "Nearly there! Pop in your postcode and we'll check we've got coverage in your area.",
  "Awesome! What's your postcode so we can line up someone close by?",
]

const NAME_PROMPTS = [
  "Lovely! And what's your name? Just so we know who we're chatting with.",
  "Perfect! What's your name? I'd love to stop calling you 'mate'!",
  "Great stuff! And who do I have the pleasure of chatting with?",
  "Brilliant! What's your name so our team knows who to look after?",
]

const PHONE_TRANSITIONS = [
  (name: string) => `Thanks ${name}! What's the best phone number to reach you on?`,
  (name: string) => `Lovely to meet you, ${name}! What's a good number to give you a call on?`,
  (name: string) => `Great to chat with you, ${name}! What phone number works best for you?`,
  (name: string) => `Cheers ${name}! What's the best number to reach you?`,
]

const EMAIL_PROMPTS = [
  "Awesome, last one — what's your email address? We'll send your quote straight to your inbox.",
  "Nearly done! What email should we send your quote to?",
  "Just one more — what's your email? That's where we'll pop your quote.",
  "And finally, what's your email address? We'll have your quote over to you in no time.",
]

const SUBMIT_SUCCESS = [
  (name: string, year: string, car: string) =>
    `You're all set, ${name}! Our team will review your ${year} ${car} and get back to you within a few hours with a quote. We're really looking forward to helping you out — chat to you soon!`,
  (name: string, year: string, car: string) =>
    `Brilliant, ${name}! Your ${year} ${car} details are with our team now. You'll hear back from us within a few hours. Thanks so much for reaching out — we'll take great care of you!`,
  (name: string, year: string, car: string) =>
    `All done, ${name}! We've got your ${year} ${car} in our system and our team is on it. Expect to hear from us soon with your quote. Really appreciate you choosing Auto-Sell.ai!`,
  (name: string, year: string, car: string) =>
    `Thank you so much, ${name}! Your ${year} ${car} quote request is locked in. Our team will be in touch within a few hours. We can't wait to help you get the best price!`,
]

/** Very light validation helpers */
const looksLikeYear = (s: string) => /^(19|20)\d{2}$/.test(s.trim())
const looksLikePostcode = (s: string) => /^\d{4}$/.test(s.trim())
const looksLikePhone = (s: string) => /^[\d\s\-+()]{8,15}$/.test(s.replace(/\s/g, ''))
const looksLikeEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())

// ─── Component ───────────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [stage, setStage] = useState<Stage>('welcome')
  const [lead, setLead] = useState<LeadData>(EMPTY_LEAD)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sessionIdRef = useRef<string>(`web_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`)

  /** Fire-and-forget save to conversations table */
  const logConvo = useCallback((incoming?: string, outgoing?: string) => {
    fetch('/api/chatbot/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionIdRef.current,
        incoming_message: incoming || null,
        outgoing_message: outgoing || null,
      }),
    }).catch(() => {}) // silent — don't break chat if logging fails
  }, [])

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      botSay(
        "G'day! Welcome to Auto-Sell.ai — so glad you stopped by! I can get you a free car quote in under 2 minutes, or happy to answer any questions you might have.\n\nWhat can I help you with today?",
        ['Get a free quote', 'I have a question', 'Talk to someone']
      )
      setStage('awaiting_intent')
    }
    // Focus input on open
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // ── Message helpers ──────────────────────────────────────────────────────

  const addMsg = useCallback((text: string, isUser: boolean, options?: string[]) => {
    setMessages(prev => [
      ...prev,
      { id: msgId(), text, isUser, timestamp: new Date(), options },
    ])
    if (isUser) logConvo(text, undefined)
    else logConvo(undefined, text)
  }, [logConvo])

  /** Simulate bot typing then add message */
  const botSay = useCallback(
    (text: string, options?: string[]) => {
      setIsTyping(true)
      setTimeout(() => {
        addMsg(text, false, options)
        setIsTyping(false)
      }, 500 + Math.min(text.length * 4, 800))
    },
    [addMsg]
  )

  // ── Lead submission ─────────────────────────────────────────────────────

  async function submitLead(finalLead: LeadData) {
    const hasCarDetails = finalLead.vehicleMakeModel.trim() !== ''

    try {
      if (hasCarDetails) {
        // Full valuation request → inquiries table
        const parts = finalLead.vehicleMakeModel.trim().split(/\s+/)
        const make = parts[0] || ''
        const model = parts.slice(1).join(' ') || ''

        const { error } = await supabase.from('inquiries').insert([{
          name: finalLead.name,
          email: finalLead.email,
          phone: finalLead.phone,
          postcode: finalLead.postcode,
          enquiry_type: 'sell',
          vehicle_make: make,
          vehicle_model: model,
          vehicle_year: finalLead.vehicleYear,
          vehicle_condition: finalLead.vehicleCondition,
          vehicle_description: `${finalLead.vehicleYear} ${finalLead.vehicleMakeModel} — condition: ${finalLead.vehicleCondition}`,
          message: `Chatbot lead: ${finalLead.vehicleYear} ${finalLead.vehicleMakeModel}, condition ${finalLead.vehicleCondition}, postcode ${finalLead.postcode}`,
          preferred_location: finalLead.postcode,
          vin_or_reg: 'chatbot_entry',
          budget: '',
          vehicle_odometer: '',
          created_at: new Date().toISOString(),
        }])
        if (error) throw error
      } else {
        // Callback request (no car details) → leads table
        const { error } = await supabase.from('leads').insert([{
          name: finalLead.name,
          email: finalLead.email,
          phone: finalLead.phone,
          enquiry_type: 'chatbot_callback',
          message: 'Callback requested via chatbot',
          created_at: new Date().toISOString(),
        }])
        if (error) throw error
      }
      return true
    } catch (err) {
      console.error('Lead submission failed:', err)
      return false
    }
  }

  // ── Conversation engine ─────────────────────────────────────────────────

  function processUserMessage(text: string) {
    const msg = text.trim()
    const lower = msg.toLowerCase()
    addMsg(msg, true)
    setInputText('')

    switch (stage) {
      // ─── Intent detection ─────────────────────────────────────────
      case 'awaiting_intent': {
        if (
          lower.includes('leave my') ||
          lower.includes('leave details') ||
          lower.includes('call me') ||
          lower.includes('callback') ||
          lower.includes('call back')
        ) {
          setStage('ask_name')
          botSay("Absolutely! I'll just grab a few details so our team can reach out to you. What's your name?")
        } else if (
          lower.includes('valuation') ||
          lower.includes('quote') ||
          lower.includes('sell') ||
          lower.includes('value') ||
          lower.includes('free') ||
          lower.includes('worth') ||
          lower.includes('how much') ||
          lower.includes('get a free')
        ) {
          setStage('ask_make_model')
          botSay("Awesome — let's get you a quote!\n\nWhat's the make and model of your car? (e.g. Toyota Corolla)")
        } else if (
          lower.includes('talk to') ||
          lower.includes('speak') ||
          lower.includes('call') ||
          lower.includes('human') ||
          lower.includes('someone') ||
          lower.includes('contact') ||
          lower.includes('phone') ||
          lower.includes('email')
        ) {
          botSay(
            "Of course! Our team would love to hear from you. Here's how you can reach us:\n\n" +
            "📞  0492 858 699\n" +
            "📧  info@auto-sell.ai\n\n" +
            "We're available 7 days a week. Or I can take your details right now and have someone call you back — whatever works best for you!",
            ['Leave my details', 'Get a free quote', 'I have a question']
          )
        } else if (
          lower.includes('question') ||
          lower.includes('faq') ||
          lower.includes('info')
        ) {
          setStage('faq')
          botSay(
            "Sure thing! Here are some common topics:\n\n• Pricing & fees\n• How inspections work\n• Payment process\n• Damaged or non-running cars\n\nWhat would you like to know about?",
            ['Pricing & fees', 'Inspections', 'Payment', 'Damaged cars', 'Get a quote']
          )
        } else {
          // Try to detect if they just typed car details directly
          if (lower.match(/\b(toyota|mazda|hyundai|kia|ford|holden|honda|nissan|subaru|mitsubishi|bmw|mercedes|audi|volkswagen|vw|suzuki|jeep|isuzu|lexus|volvo|peugeot|renault)\b/)) {
            setLead(prev => ({ ...prev, vehicleMakeModel: msg }))
            setStage('ask_year')
            botSay("Great choice! What year is your " + msg + "?")
          } else {
            setStage('ask_make_model')
            botSay("I'd love to help! Let me get you a quick quote.\n\nWhat's the make and model of your car? (e.g. Toyota Corolla)")
          }
        }
        break
      }

      // ─── FAQ branch ───────────────────────────────────────────────
      case 'faq': {
        // ── Valuation intent (check BEFORE pricing so "free valuation" isn't caught by "free") ──
        if (lower.includes('valuation') || lower.includes('quote') || lower.includes('sell') || lower.includes('get a free')) {
          setStage('ask_make_model')
          botSay("Let's do it! What's the make and model of your car? (e.g. Toyota Corolla)")
          return
        }

        // ── "I have another question" / generic re-entry → show FAQ menu again ──
        if (lower.includes('another question') || lower.includes('question') || lower.includes('faq') || lower.includes('info')) {
          botSay(
            "Sure thing! Here are some common topics:\n\n• Pricing & fees\n• How inspections work\n• Payment process\n• Damaged or non-running cars\n\nWhat would you like to know about?",
            ['Pricing & fees', 'Inspections', 'Payment', 'Damaged cars', 'Get a quote']
          )
          return
        }

        // ── Callback / leave details ──
        if (lower.includes('leave my') || lower.includes('leave details') || lower.includes('call me') || lower.includes('callback') || lower.includes('call back')) {
          setStage('ask_name')
          botSay("Absolutely! I'll just grab a few details so our team can reach out. What's your name?")
          return
        }

        // ── Talk to someone ──
        if (lower.includes('talk') || lower.includes('speak') || lower.includes('human') || lower.includes('someone') || lower.includes('contact')) {
          botSay(
            "Of course! Our team would love to hear from you:\n\n" +
            "📞  0492 858 699\n" +
            "📧  info@auto-sell.ai\n\n" +
            "We're available 7 days a week. Or I can take your details and have someone reach out to you — whatever's easiest!",
            ['Leave my details', 'Get a free quote', 'I have another question']
          )
          return
        }

        // ── Specific FAQ topics ──
        let answer = ''
        if (lower.includes('pric') || lower.includes('fee') || lower.includes('cost') || lower.includes('commission') || lower.includes('free')) {
          answer = "Great question! Our service is 100% FREE — no fees, no commissions, no hidden costs. We make money by reselling, not by charging you. That includes free pickup anywhere in Australia and same-day OSKO payment. We want to make this as easy as possible for you."
        } else if (lower.includes('inspect') || lower.includes('visit') || lower.includes('come')) {
          answer = "We'd love to come to you! We're available 7 days a week, anywhere in Australia — usually within 24–48 hours. The inspection only takes about 30 minutes and we'll meet you at your driveway, office, or wherever's most convenient. Super easy."
        } else if (lower.includes('pay') || lower.includes('osko') || lower.includes('bank') || lower.includes('transfer') || lower.includes('money')) {
          answer = "You'll love this — we pay instantly via OSKO transfer, straight to your bank account. Once the inspection and paperwork are done, the money hits your account within minutes. No waiting around for days."
        } else if (lower.includes('damage') || lower.includes('broken') || lower.includes('not running') || lower.includes('wreck') || lower.includes('accident')) {
          answer = "Absolutely, we buy cars in ANY condition — running or not, accident damage, mechanical issues, high mileage, you name it. We'll always give you a fair price, so don't hesitate to reach out even if you think the car's seen better days!"
        } else {
          // Unrecognised topic → re-show FAQ menu
          botSay(
            "I'm happy to help! Here are the topics I can cover:\n\n• Pricing & fees\n• How inspections work\n• Payment process\n• Damaged or non-running cars\n\nWhat would you like to know about?",
            ['Pricing & fees', 'Inspections', 'Payment', 'Damaged cars', 'Get a quote']
          )
          return
        }
        botSay(answer, ['Get a free quote', 'I have another question', 'Talk to someone'])
        break
      }

      // ─── Collect vehicle details ──────────────────────────────────
      case 'ask_make_model': {
        setLead(prev => ({ ...prev, vehicleMakeModel: msg }))
        setStage('ask_year')
        botSay(pick(MAKE_MODEL_REACTIONS)(msg))
        break
      }

      case 'ask_year': {
        if (looksLikeYear(msg)) {
          setLead(prev => ({ ...prev, vehicleYear: msg.trim() }))
          setStage('ask_condition')
          botSay(
            pick(CONDITION_PROMPTS),
            ['Excellent', 'Good', 'Fair', 'Poor / not running']
          )
        } else {
          botSay("No worries — I just need the 4-digit year so I can look it up for you (e.g. 2018)")
        }
        break
      }

      case 'ask_condition': {
        setLead(prev => ({ ...prev, vehicleCondition: msg }))
        setStage('ask_postcode')
        botSay(pick(POSTCODE_TRANSITIONS))
        break
      }

      case 'ask_postcode': {
        if (looksLikePostcode(msg)) {
          setLead(prev => ({ ...prev, postcode: msg.trim() }))
          setStage('ask_name')
          botSay(pick(NAME_PROMPTS))
        } else {
          botSay("Hmm, I just need a 4-digit Australian postcode — mind popping that in for me?")
        }
        break
      }

      // ─── Collect contact details ──────────────────────────────────
      case 'ask_name': {
        setLead(prev => ({ ...prev, name: msg }))
        setStage('ask_phone')
        botSay(pick(PHONE_TRANSITIONS)(msg))
        break
      }

      case 'ask_phone': {
        if (looksLikePhone(msg)) {
          setLead(prev => ({ ...prev, phone: msg.trim() }))
          setStage('ask_email')
          botSay(pick(EMAIL_PROMPTS))
        } else {
          botSay("Hmm, that doesn't quite look right — would you mind double-checking? A mobile or landline is perfect.")
        }
        break
      }

      case 'ask_email': {
        if (looksLikeEmail(msg)) {
          const updatedLead = { ...lead, email: msg.trim() }
          setLead(updatedLead)
          const hasCarDetails = updatedLead.vehicleMakeModel.trim() !== ''
          setStage('confirm')
          if (hasCarDetails) {
            botSay(
              `Great — here's a summary:\n\n` +
              `🚗  ${updatedLead.vehicleYear} ${updatedLead.vehicleMakeModel}\n` +
              `📋  Condition: ${updatedLead.vehicleCondition}\n` +
              `📍  Postcode: ${updatedLead.postcode}\n` +
              `👤  ${updatedLead.name}\n` +
              `📞  ${updatedLead.phone}\n` +
              `📧  ${updatedLead.email}\n\n` +
              `Does everything look correct?`,
              ['Yes, submit!', 'No, let me fix something']
            )
          } else {
            botSay(
              `Perfect, here's what I've got:\n\n` +
              `👤  ${updatedLead.name}\n` +
              `📞  ${updatedLead.phone}\n` +
              `📧  ${updatedLead.email}\n\n` +
              `Shall I send this through so our team can give you a call?`,
              ['Yes, send it!', 'No, let me fix something']
            )
          }
        } else {
          botSay("That doesn't quite look like an email address — would you mind trying again? Something like name@example.com.")
        }
        break
      }

      // ─── Confirm & submit ─────────────────────────────────────────
      case 'confirm': {
        if (lower.includes('yes') || lower.includes('submit') || lower.includes('correct') || lower.includes('looks good') || lower.includes('send')) {
          setStage('submitted')
          setIsTyping(true)
          const finalLead = { ...lead, email: lead.email || msg.trim() }
          const isCallback = finalLead.vehicleMakeModel.trim() === ''
          submitLead(finalLead).then(ok => {
            setIsTyping(false)
            if (ok) {
              addMsg(
                isCallback
                  ? `Thanks so much, ${finalLead.name}! Your details are with our team now — someone will be in touch with you very soon. We really appreciate you reaching out!`
                  : pick(SUBMIT_SUCCESS)(finalLead.name, finalLead.vehicleYear, finalLead.vehicleMakeModel),
                false
              )
            } else {
              addMsg(
                "Hmm, something went wrong submitting your details. Please try our online form at Auto-Sell.ai or give us a call on 0492 858 699. Sorry about that!",
                false
              )
            }
          })
        } else if (lower.includes('no') || lower.includes('fix') || lower.includes('change') || lower.includes('wrong')) {
          const isCallback = lead.vehicleMakeModel.trim() === ''
          setLead(EMPTY_LEAD)
          if (isCallback) {
            setStage('ask_name')
            botSay("No worries at all! Let's try again — what's your name?")
          } else {
            setStage('ask_make_model')
            botSay("No worries at all! Let's go through it again — what's the make and model of your car?")
          }
        } else {
          botSay("No rush — just let me know if everything above looks good and I'll send it through for you!", ['Yes, submit!', 'No, let me fix something'])
        }
        break
      }

      // ─── Already submitted ────────────────────────────────────────
      case 'submitted': {
        if (
          lower.includes('valuation') ||
          lower.includes('another') ||
          lower.includes('sell') ||
          lower.includes('new')
        ) {
          setLead(EMPTY_LEAD)
          setStage('ask_make_model')
          botSay("Sure! What's the make and model of the next car?")
        } else {
          // Answer FAQs even after submission
          setStage('faq')
          processUserMessage(text)
          return
        }
        break
      }

      default:
        botSay("I'm here and happy to help! Would you like a free car quote, have a question, or prefer to chat with our team directly?", ['Get a free quote', 'I have a question', 'Talk to someone'])
        setStage('awaiting_intent')
    }
  }

  // ── Event handlers ──────────────────────────────────────────────────────

  const handleSend = () => {
    if (!inputText.trim() || isTyping) return
    processUserMessage(inputText)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReply = (option: string) => {
    if (isTyping) return
    processUserMessage(option)
  }

  // ── Render ──────────────────────────────────────────────────────────────

  return (
    <>
      {/* Floating chat button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#FFC325] text-white p-2.5 md:p-4 rounded-full shadow-lg hover:bg-[#e6af1f] transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:bottom-24 z-50 sm:w-[370px] h-[min(32rem,calc(100dvh-8rem))] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FFC325] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div>
                <h3 className="font-bold text-sm">Auto-Sell.ai Assistant</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-gray-900 transition-colors p-1"
                aria-label="Close chat"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 overscroll-contain">
              {messages.map((message) => (
                <div key={message.id}>
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        message.isUser
                          ? 'bg-[#FFC325] text-gray-900 rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      {message.text}
                      <p className={`text-[10px] mt-1 ${message.isUser ? 'text-gray-700/60' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  {/* Quick reply buttons (only show on last bot message) */}
                  {!message.isUser && message.options && message === messages[messages.length - 1] && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-1">
                      {message.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleQuickReply(opt)}
                          className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#FFC325] text-[#b8860b] hover:bg-[#FFC325]/10 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-md">
                    <div className="flex space-x-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-gray-100 flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 min-w-0 px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC325]/50 focus:border-[#FFC325]"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-[#FFC325] text-white p-2 rounded-xl hover:bg-[#e6af1f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
