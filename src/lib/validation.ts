import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{7,15}$/, 'Phone number must be 7-15 digits'),
  countryCode: z
    .string()
    .regex(/^\+[0-9]{1,4}$/, 'Invalid country code'),
  role: z.enum(['student', 'professional', 'client'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Authentication validation schema
 */
export const authSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be less than 128 characters'),
});

export type AuthData = z.infer<typeof authSchema>;

/**
 * Profile message validation schema
 */
export const profileMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(5, 'Message must be at least 5 characters')
    .max(2000, 'Message must be less than 2000 characters'),
});

export type ProfileMessageData = z.infer<typeof profileMessageSchema>;

/**
 * Profile update validation schema
 */
export const profileUpdateSchema = z.object({
  mobile: z
    .string()
    .trim()
    .regex(/^[+]?[0-9\s()-]{7,20}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  altEmail: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .optional()
    .or(z.literal('')),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

/**
 * Validation result type
 */
export type ValidationResult<T> = 
  | { success: true; data: T }
  | { success: false; errors: string[] };

/**
 * Validate data against a schema and return formatted errors
 */
export const validateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> => {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors = result.error.issues.map((issue) => issue.message);
  return { success: false, errors };
};
