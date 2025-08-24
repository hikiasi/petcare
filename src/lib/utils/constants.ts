// App constants
export const APP_CONFIG = {
  name: 'PetCare',
  description: 'Простой органайзер для владельцев питомцев',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

// Subscription limits
export const SUBSCRIPTION_LIMITS = {
  free: {
    pets: 2,
    healthRecordsPerMonth: 5,
  },
  pro: {
    pets: Infinity,
    healthRecordsPerMonth: Infinity,
  },
} as const;

// Pricing
export const PRICING = {
  pro: {
    monthly: 299,
    currency: 'RUB',
    trialDays: 14,
  },
} as const;

// File upload limits
export const UPLOAD_LIMITS = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
  maxFiles: 5,
} as const;

// Validation constants
export const VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 128,
  },
  petName: {
    minLength: 1,
    maxLength: 50,
  },
  description: {
    maxLength: 1000,
  },
} as const;

// Date formats
export const DATE_FORMATS = {
  display: 'dd.MM.yyyy',
  input: 'yyyy-MM-dd',
  datetime: 'dd.MM.yyyy HH:mm',
} as const;