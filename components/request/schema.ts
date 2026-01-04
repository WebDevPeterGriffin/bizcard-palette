import { z } from 'zod';

export const cardFormSchema = z.object({
    full_name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    role: z.string().max(100).optional().or(z.literal('')),
    company: z.string().max(100).optional().or(z.literal('')),
    emails: z.array(z.object({
        value: z.string().email('Please enter a valid email').or(z.literal(''))
    })).min(1, 'At least one email is required').max(5, 'Maximum 5 emails allowed'),
    phones: z.array(z.object({
        value: z.string().regex(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/, 'Please enter a valid phone number').or(z.literal(''))
    })).max(5, 'Maximum 5 phones allowed'),
    website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
    style_id: z.string().min(1, 'Please select a card style'),
});

export type CardFormData = z.infer<typeof cardFormSchema>;
