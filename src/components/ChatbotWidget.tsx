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

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      botSay(
        "G'day! I'm the Auto-Sell.ai assistant. I can get you a free car valuation in under 2 minutes — or answer any questions you have.\n\nWhat can I help you with?",
        ['Get a free valuation', 'I have a question']
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
  }, [])

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
    // Parse make/model into separate fields as best we can
    const parts = finalLead.vehicleMakeModel.trim().split(/\s+/)
    const make = parts[0] || ''
    const model = parts.slice(1).join(' ') || ''

    const row = {
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
    }

    try {
      const { error } = await supabase.from('inquiries').insert([row])
      if (error) throw error
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
          botSay("Awesome — let's get you a valuation!\n\nWhat's the make and model of your car? (e.g. Toyota Corolla)")
        } else if (
          lower.includes('question') ||
          lower.includes('faq') ||
          lower.includes('info')
        ) {
          setStage('faq')
          botSay(
            "Sure thing! Here are some common topics:\n\n• Pricing & fees\n• How inspections work\n• Payment process\n• Damaged or non-running cars\n\nWhat would you like to know about?",
            ['Pricing & fees', 'Inspections', 'Payment', 'Damaged cars', 'Get a valuation']
          )
        } else {
          // Try to detect if they just typed car details directly
          if (lower.match(/\b(toyota|mazda|hyundai|kia|ford|holden|honda|nissan|subaru|mitsubishi|bmw|mercedes|audi|volkswagen|vw|suzuki|jeep|isuzu|lexus|volvo|peugeot|renault)\b/)) {
            setLead(prev => ({ ...prev, vehicleMakeModel: msg }))
            setStage('ask_year')
            botSay("Great choice! What year is your " + msg + "?")
          } else {
            setStage('ask_make_model')
            botSay("I'd love to help! Let me get you a quick valuation.\n\nWhat's the make and model of your car? (e.g. Toyota Corolla)")
          }
        }
        break
      }

      // ─── FAQ branch ───────────────────────────────────────────────
      case 'faq': {
        let answer = ''
        if (lower.includes('pric') || lower.includes('fee') || lower.includes('cost') || lower.includes('commission') || lower.includes('free')) {
          answer = "Our service is 100% FREE — no fees, no commissions, no hidden costs. We make money by reselling, not by charging you. Free pickup Australia-wide and same-day OSKO payment."
        } else if (lower.includes('inspect') || lower.includes('visit') || lower.includes('come')) {
          answer = "We come to you! Available 7 days a week, anywhere in Australia. Usually within 24–48 hours. The inspection takes about 30 minutes at your driveway, office, or wherever suits you."
        } else if (lower.includes('pay') || lower.includes('osko') || lower.includes('bank') || lower.includes('transfer') || lower.includes('money')) {
          answer = "We pay instantly via OSKO transfer — straight to your bank account. Once the inspection and paperwork are done, money hits your account within minutes, not days."
        } else if (lower.includes('damage') || lower.includes('broken') || lower.includes('not running') || lower.includes('wreck') || lower.includes('accident')) {
          answer = "We buy cars in ANY condition — running or not, accident damage, mechanical issues, high mileage. No car is too far gone. We'll give you a fair price based on what we can work with."
        } else if (lower.includes('valuation') || lower.includes('quote') || lower.includes('sell') || lower.includes('get a')) {
          setStage('ask_make_model')
          botSay("Let's do it! What's the make and model of your car? (e.g. Toyota Corolla)")
          return
        } else {
          answer = "I can help with questions about pricing, inspections, payment, or damaged cars. Or if you're ready, I can get you a free valuation right now!"
        }
        botSay(answer + "\n\nAnything else, or ready for a free valuation?", ['Get a free valuation', 'Another question'])
        break
      }

      // ─── Collect vehicle details ──────────────────────────────────
      case 'ask_make_model': {
        setLead(prev => ({ ...prev, vehicleMakeModel: msg }))
        setStage('ask_year')
        botSay(`Nice — a ${msg}! What year is it?`)
        break
      }

      case 'ask_year': {
        if (looksLikeYear(msg)) {
          setLead(prev => ({ ...prev, vehicleYear: msg.trim() }))
          setStage('ask_condition')
          botSay(
            "Got it. How would you describe the condition?",
            ['Excellent', 'Good', 'Fair', 'Poor / not running']
          )
        } else {
          botSay("That doesn't look like a valid year — could you enter a 4-digit year? (e.g. 2018)")
        }
        break
      }

      case 'ask_condition': {
        setLead(prev => ({ ...prev, vehicleCondition: msg }))
        setStage('ask_postcode')
        botSay("Almost there! What's your postcode so we can check availability in your area?")
        break
      }

      case 'ask_postcode': {
        if (looksLikePostcode(msg)) {
          setLead(prev => ({ ...prev, postcode: msg.trim() }))
          setStage('ask_name')
          botSay("Perfect. And what's your name?")
        } else {
          botSay("I need a 4-digit Australian postcode — could you try again?")
        }
        break
      }

      // ─── Collect contact details ──────────────────────────────────
      case 'ask_name': {
        setLead(prev => ({ ...prev, name: msg }))
        setStage('ask_phone')
        botSay(`Thanks ${msg}! What's the best phone number to reach you on?`)
        break
      }

      case 'ask_phone': {
        if (looksLikePhone(msg)) {
          setLead(prev => ({ ...prev, phone: msg.trim() }))
          setStage('ask_email')
          botSay("And your email address? (we'll send your valuation there)")
        } else {
          botSay("That doesn't look right — could you double-check the phone number?")
        }
        break
      }

      case 'ask_email': {
        if (looksLikeEmail(msg)) {
          const updatedLead = { ...lead, email: msg.trim() }
          setLead(updatedLead)
          setStage('confirm')
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
          botSay("That doesn't look like a valid email — could you try again?")
        }
        break
      }

      // ─── Confirm & submit ─────────────────────────────────────────
      case 'confirm': {
        if (lower.includes('yes') || lower.includes('submit') || lower.includes('correct') || lower.includes('looks good')) {
          setStage('submitted')
          setIsTyping(true)
          const finalLead = { ...lead, email: lead.email || msg.trim() }
          submitLead(finalLead).then(ok => {
            setIsTyping(false)
            if (ok) {
              addMsg(
                `You're all set, ${finalLead.name}! 🎉\n\nOur team will review your ${finalLead.vehicleYear} ${finalLead.vehicleMakeModel} and get back to you within a few hours with a valuation.\n\nIf you have any other questions in the meantime, just ask!`,
                false
              )
            } else {
              addMsg(
                "Hmm, something went wrong submitting your details. Please try our online form at Auto-Sell.ai or call us directly. Sorry about that!",
                false
              )
            }
          })
        } else if (lower.includes('no') || lower.includes('fix') || lower.includes('change') || lower.includes('wrong')) {
          setStage('ask_make_model')
          setLead(EMPTY_LEAD)
          botSay("No worries — let's start again. What's the make and model of your car?")
        } else {
          botSay("Just need a quick yes or no — does the summary look correct?", ['Yes, submit!', 'No, let me fix something'])
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
        botSay("I'm here to help! Would you like a free car valuation, or do you have a question?", ['Get a free valuation', 'I have a question'])
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
