import { z } from 'zod';
export const checkoutSchema = z.object({
  name: z.string().min(3, 'Ad Soyad en az 3 karakter'),
  email: z.string().email('Geçerli e-posta girin'),
  phone: z
    .string()
    .regex(/^0?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/, 'Geçerli TR telefon girin (05xx xxx xx xx)'),
  city: z.string().min(2, 'İl gerekli'),
  district: z.string().min(2, 'İlçe gerekli'),
  address: z.string().min(10, 'Adres en az 10 karakter'),
  kvkk: z.literal(true, { errorMap: () => ({ message: 'KVKK onayı gerekli' }) }),
  shipping: z.enum(['standart', 'hizli']),
  cardNo: z
    .string()
    .regex(/^[0-9 ]{19}$/, 'Kart 16 hane olmalı')
    .refine((v) => v.replace(/ /g, '').length === 16, 'Kart 16 hane olmalı'),
  exp: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'SKT AA/YY olmalı'),
  cvv: z.string().regex(/^\d{3}$/, 'CVV 3 hane olmalı'),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
