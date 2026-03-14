import twilio from 'twilio';

let client: twilio.Twilio | null = null;

function getTwilioClient() {
  if (!client) {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;
    const smsNumber = process.env.TWILIO_SMS_NUMBER;

    if (!accountSid || !authToken || !whatsappNumber || !smsNumber) {
      throw new Error('Missing Twilio environment variables');
    }

    client = twilio(accountSid, authToken);
  }
  return client;
}

export interface MessageData {
  to: string;
  body: string;
  from?: string;
  messagingServiceSid?: string;
}

export interface ChatbotResponse {
  message: string;
  shouldEscalate: boolean;
  nextStep?: string;
}

// Automated responses for common queries
const automatedResponses = {
  greeting: {
    keywords: ['hello', 'hi', 'hey', 'start', 'help'],
    response: "Hi! I'm Auto-Sell.ai's assistant. I can help you with:\n\n Getting a car valuation\n Understanding our pricing\n Booking an inspection\n General questions\n\nWhat would you like to know?",
    shouldEscalate: false,
    nextStep: 'waiting_for_query'
  },
  
  valuation: {
    keywords: ['quote', 'valuation', 'price', 'value', 'worth', 'how much'],
    response: "Great! I can help you get a free car valuation. To get started, I'll need:\n\n• Your car's make and model\n• Year and odometer reading\n• General condition\n• Your postcode\n\nWould you like to provide these details now, or would you prefer to fill out our online form at Auto-Sell.ai?",
    shouldEscalate: false,
    nextStep: 'collecting_car_details'
  },
  
  pricing: {
    keywords: ['pricing', 'fees', 'cost', 'charge', 'free', 'commission'],
    response: "Our service is completely FREE! \n\n No fees or commissions\n No hidden costs\n Free pickup anywhere in Australia\n Same-day payment via OSKO\n\nWe make money by reselling your car, not by charging you. Ready to get your free quote?",
    shouldEscalate: false,
    nextStep: 'ready_for_quote'
  },
  
  inspection: {
    keywords: ['inspection', 'visit', 'come', 'when', 'schedule', 'booking'],
    response: "We can inspect your car at your convenience! \n\n• Available 7 days a week\n• We come to you anywhere in Australia\n• Usually within 24-48 hours\n• Takes about 30 minutes\n\nWhat's your postcode? I can check availability in your area.",
    shouldEscalate: false,
    nextStep: 'collecting_location'
  },
  
  payment: {
    keywords: ['payment', 'pay', 'money', 'osko', 'bank', 'transfer', 'when'],
    response: "We pay instantly via OSKO transfer! \n\n• Same-day payment after inspection\n• Direct to your bank account\n• Usually processed within minutes\n• No waiting for checks or cash\n\nOnce we agree on the price and complete paperwork, you'll have the money in your account within hours!",
    shouldEscalate: false,
    nextStep: 'ready_for_quote'
  },
  
  condition: {
    keywords: ['damaged', 'broken', 'not running', 'accident', 'wreck', 'condition'],
    response: "We buy cars in ANY condition! \n\n Running or not running\n Accident damage\n Mechanical issues\n High mileage\n Old or new\n\nNo car is too damaged for us. We'll give you a fair price based on what we can salvage. Want to get a quote for your damaged car?",
    shouldEscalate: false,
    nextStep: 'ready_for_quote'
  },
  
  escalation: {
    keywords: ['speak', 'human', 'manager', 'complaint', 'problem', 'issue', 'complex'],
    response: "I understand you'd like to speak with someone. Let me connect you with our team right away! \n\nOne of our car buying specialists will call you within 15 minutes to discuss your specific needs.\n\nIn the meantime, could you tell me your name and phone number?",
    shouldEscalate: true,
    nextStep: 'collecting_contact_for_escalation'
  }
};

export function analyzeMessage(message: string): ChatbotResponse {
  const lowerMessage = message.toLowerCase();
  
  // Check for greeting patterns
  if (automatedResponses.greeting.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.greeting.response,
      shouldEscalate: automatedResponses.greeting.shouldEscalate,
      nextStep: automatedResponses.greeting.nextStep
    };
  }
  
  // Check for valuation requests
  if (automatedResponses.valuation.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.valuation.response,
      shouldEscalate: automatedResponses.valuation.shouldEscalate,
      nextStep: automatedResponses.valuation.nextStep
    };
  }
  
  // Check for pricing questions
  if (automatedResponses.pricing.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.pricing.response,
      shouldEscalate: automatedResponses.pricing.shouldEscalate,
      nextStep: automatedResponses.pricing.nextStep
    };
  }
  
  // Check for inspection requests
  if (automatedResponses.inspection.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.inspection.response,
      shouldEscalate: automatedResponses.inspection.shouldEscalate,
      nextStep: automatedResponses.inspection.nextStep
    };
  }
  
  // Check for payment questions
  if (automatedResponses.payment.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.payment.response,
      shouldEscalate: automatedResponses.payment.shouldEscalate,
      nextStep: automatedResponses.payment.nextStep
    };
  }
  
  // Check for condition questions
  if (automatedResponses.condition.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.condition.response,
      shouldEscalate: automatedResponses.condition.shouldEscalate,
      nextStep: automatedResponses.condition.nextStep
    };
  }
  
  // Check for escalation requests
  if (automatedResponses.escalation.keywords.some(keyword => lowerMessage.includes(keyword))) {
    return {
      message: automatedResponses.escalation.response,
      shouldEscalate: automatedResponses.escalation.shouldEscalate,
      nextStep: automatedResponses.escalation.nextStep
    };
  }
  
  // Default response for unrecognized messages
  return {
    message: "I'm here to help with your car selling needs! I can assist with:\n\n Getting a free car valuation\n Explaining our pricing\n Booking an inspection\n Answering questions\n\nWhat would you like to know?",
    shouldEscalate: false,
    nextStep: 'waiting_for_query'
  };
}

export async function sendSMS(data: MessageData): Promise<void> {
  try {
    const twilioClient = getTwilioClient();
    await twilioClient.messages.create({
      body: data.body,
      from: process.env.TWILIO_SMS_NUMBER,
      to: data.to
    });
  } catch (error) {
    console.error('SMS sending failed:', error);
    throw error;
  }
}

export async function sendWhatsApp(data: MessageData): Promise<void> {
  try {
    const twilioClient = getTwilioClient();
    await twilioClient.messages.create({
      body: data.body,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${data.to}`
    });
  } catch (error) {
    console.error('WhatsApp sending failed:', error);
    throw error;
  }
}

export async function sendMessage(data: MessageData, platform: 'sms' | 'whatsapp' = 'sms'): Promise<void> {
  if (platform === 'whatsapp') {
    await sendWhatsApp(data);
  } else {
    await sendSMS(data);
  }
}

export { getTwilioClient };
