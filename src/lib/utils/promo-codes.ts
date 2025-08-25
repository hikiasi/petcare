import { supabase } from '@/lib/supabase/client';

export interface PromoCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PromoCodeValidation {
  isValid: boolean;
  discount: number;
  discountType: 'percentage' | 'fixed';
  error?: string;
}

export class PromoCodeManager {
  /**
   * Валидация промокода
   */
  static async validatePromoCode(code: string): Promise<PromoCodeValidation> {
    try {
      const { data: promoCode, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .single();

      if (error || !promoCode) {
        return {
          isValid: false,
          discount: 0,
          discountType: 'percentage',
          error: 'Промокод не найден или неактивен'
        };
      }

      // Проверяем срок действия
      if (promoCode.expires_at && new Date(promoCode.expires_at) < new Date()) {
        return {
          isValid: false,
          discount: 0,
          discountType: 'percentage',
          error: 'Срок действия промокода истек'
        };
      }

      // Проверяем лимит использований
      if (promoCode.max_uses && promoCode.current_uses >= promoCode.max_uses) {
        return {
          isValid: false,
          discount: 0,
          discountType: 'percentage',
          error: 'Промокод исчерпан'
        };
      }

      return {
        isValid: true,
        discount: promoCode.discount_value,
        discountType: promoCode.discount_type,
      };
    } catch (error) {
      console.error('Error validating promo code:', error);
      return {
        isValid: false,
        discount: 0,
        discountType: 'percentage',
        error: 'Ошибка проверки промокода'
      };
    }
  }

  /**
   * Применение промокода (увеличение счетчика использований)
   */
  static async applyPromoCode(code: string): Promise<boolean> {
    try {
      const { error } = await supabase.rpc('increment_promo_code_usage', {
        promo_code: code.toUpperCase()
      });

      return !error;
    } catch (error) {
      console.error('Error applying promo code:', error);
      return false;
    }
  }

  /**
   * Расчет финальной цены с учетом промокода
   */
  static calculateDiscountedPrice(
    originalPrice: number, 
    discount: number, 
    discountType: 'percentage' | 'fixed'
  ): number {
    if (discountType === 'percentage') {
      return Math.max(0, originalPrice - (originalPrice * discount / 100));
    } else {
      return Math.max(0, originalPrice - discount);
    }
  }

  /**
   * Создание нового промокода (только для админов)
   */
  static async createPromoCode(promoCode: {
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    max_uses?: number;
    expires_at?: string;
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from('promo_codes')
        .insert({
          code: promoCode.code.toUpperCase(),
          discount_type: promoCode.discount_type,
          discount_value: promoCode.discount_value,
          max_uses: promoCode.max_uses || null,
          expires_at: promoCode.expires_at || null,
          current_uses: 0,
          is_active: true,
        });

      if (error) {
        if (error.code === '23505') { // unique constraint violation
          return { success: false, error: 'Промокод уже существует' };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Error creating promo code:', error);
      return { success: false, error: 'Ошибка создания промокода' };
    }
  }

  /**
   * Получение всех промокодов (для админов)
   */
  static async getAllPromoCodes(): Promise<PromoCode[]> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching promo codes:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      return [];
    }
  }

  /**
   * Деактивация промокода
   */
  static async deactivatePromoCode(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('promo_codes')
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error deactivating promo code:', error);
      return false;
    }
  }

  /**
   * Активация промокода
   */
  static async activatePromoCode(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('promo_codes')
        .update({ is_active: true, updated_at: new Date().toISOString() })
        .eq('id', id);

      return !error;
    } catch (error) {
      console.error('Error activating promo code:', error);
      return false;
    }
  }
}

// SQL функция для безопасного увеличения счетчика использований
export const incrementPromoCodeUsageSQL = `
CREATE OR REPLACE FUNCTION increment_promo_code_usage(promo_code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE promo_codes 
  SET 
    current_uses = current_uses + 1,
    updated_at = NOW()
  WHERE 
    code = promo_code 
    AND is_active = true
    AND (expires_at IS NULL OR expires_at > NOW())
    AND (max_uses IS NULL OR current_uses < max_uses);
END;
$$ LANGUAGE plpgsql;
`;