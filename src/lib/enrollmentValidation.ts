import { z } from "zod";

// Shared validation patterns
const iinPattern = /^\d{12}$/;
const phonePattern = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;
const telegramPattern = /^@[a-zA-Z0-9_]{1,32}$/;
const namePattern = /^[a-zA-ZА-Яа-яӘәІіҢңҒғҮүҰұҚқӨөҺһЁё\s'-]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Participant schema (used for additional team members)
const participantSchema = z.object({
  fullName: z.string()
    .trim()
    .min(1, "Имя участника обязательно")
    .max(100, "Имя должно быть не более 100 символов")
    .regex(namePattern, "Имя может содержать только буквы, пробелы, дефисы и апострофы"),
  iin: z.string()
    .trim()
    .regex(iinPattern, "ИИН должен содержать ровно 12 цифр"),
  phone: z.string()
    .trim()
    .regex(phonePattern, "Телефон должен быть в формате +7 777 777 77 77"),
  school: z.string()
    .trim()
    .min(1, "Школа обязательна")
    .max(200, "Название школы должно быть не более 200 символов"),
  city: z.string()
    .trim()
    .min(1, "Город обязателен")
    .max(100, "Название города должно быть не более 100 символов"),
  grade: z.string()
    .trim()
    .regex(/^\d+$/, "Класс должен быть числом")
    .refine(val => {
      const num = parseInt(val);
      return num >= 1 && num <= 12;
    }, "Класс должен быть от 1 до 12")
});

// Mentor schema (optional fields)
const mentorSchema = z.object({
  fullName: z.string()
    .trim()
    .max(100, "Имя должно быть не более 100 символов")
    .regex(namePattern, "Имя может содержать только буквы, пробелы, дефисы и апострофы")
    .optional(),
  iin: z.string()
    .trim()
    .regex(iinPattern, "ИИН должен содержать ровно 12 цифр")
    .optional()
    .or(z.literal("")),
  phone: z.string()
    .trim()
    .regex(phonePattern, "Телефон должен быть в формате +7 777 777 77 77")
    .optional()
    .or(z.literal("")),
  school: z.string()
    .trim()
    .max(200, "Название школы должно быть не более 200 символов")
    .optional(),
  city: z.string()
    .trim()
    .max(100, "Название города должно быть не более 100 символов")
    .optional(),
  telegram: z.string()
    .trim()
    .regex(telegramPattern, "Telegram должен начинаться с @ и содержать только буквы, цифры и _")
    .optional()
    .or(z.literal(""))
    .or(z.literal("@"))
});

// Main enrollment schema
export const enrollmentSchema = z.object({
  teamName: z.string()
    .trim()
    .min(1, "Название команды обязательно")
    .max(100, "Название команды должно быть не более 100 символов"),
  league: z.string()
    .trim()
    .min(1, "Категория соревнования обязательна")
    .max(50, "Категория должна быть не более 50 символов"),
  captainFullName: z.string()
    .trim()
    .min(1, "ФИО капитана обязательно")
    .max(100, "ФИО должно быть не более 100 символов")
    .regex(namePattern, "ФИО может содержать только буквы, пробелы, дефисы и апострофы"),
  captainIin: z.string()
    .trim()
    .regex(iinPattern, "ИИН должен содержать ровно 12 цифр"),
  captainPhone: z.string()
    .trim()
    .regex(phonePattern, "Телефон должен быть в формате +7 777 777 77 77"),
  captainEmail: z.string()
    .trim()
    .max(255, "Email должен быть не более 255 символов")
    .regex(emailPattern, "Неверный формат email"),
  captainSchool: z.string()
    .trim()
    .min(1, "Школа/место учебы обязательно")
    .max(200, "Название должно быть не более 200 символов"),
  captainCity: z.string()
    .trim()
    .min(1, "Город обязателен")
    .max(100, "Название города должно быть не более 100 символов"),
  captainGrade: z.string()
    .trim()
    .regex(/^\d+$/, "Класс должен быть числом")
    .refine(val => {
      const num = parseInt(val);
      return num >= 1 && num <= 12;
    }, "Класс должен быть от 1 до 12"),
  captainAge: z.string()
    .trim()
    .regex(/^\d+$/, "Возраст должен быть числом")
    .refine(val => {
      const num = parseInt(val);
      return num >= 5 && num <= 100;
    }, "Возраст должен быть от 5 до 100")
    .optional()
    .or(z.literal("")),
  captainTelegram: z.string()
    .trim()
    .regex(telegramPattern, "Telegram должен начинаться с @ и содержать только буквы, цифры и _")
    .optional()
    .or(z.literal(""))
    .or(z.literal("@")),
  source: z.string()
    .trim()
    .max(200, "Источник информации должен быть не более 200 символов")
    .optional(),
  questions: z.string()
    .trim()
    .max(1000, "Вопросы должны быть не более 1000 символов")
    .optional(),
  consent: z.boolean()
    .refine(val => val === true, "Необходимо согласие на обработку персональных данных"),
  
  // Optional participants (validated only if provided)
  participant1: participantSchema.optional(),
  participant2: participantSchema.optional(),
  participant3: participantSchema.optional(),
  participant4: participantSchema.optional(),
  
  // Optional mentor
  mentor: mentorSchema.optional()
});

export type EnrollmentFormData = z.infer<typeof enrollmentSchema>;

// Validation helper with user-friendly error messages
export function validateEnrollmentData(data: any): { success: boolean; errors?: string[] } {
  try {
    enrollmentSchema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return { success: false, errors };
    }
    return { success: false, errors: ["Неизвестная ошибка валидации"] };
  }
}

// Safe parse wrapper that returns detailed error info
export function safeParseEnrollment(data: any) {
  return enrollmentSchema.safeParse(data);
}
