-- SQL функция для безопасного увеличения счетчика использований промокода
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

-- Добавляем индексы для оптимизации запросов промокодов
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON promo_codes(is_active, expires_at) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_promo_codes_usage ON promo_codes(current_uses, max_uses) WHERE max_uses IS NOT NULL;

-- Добавляем поле для промокода в таблицу платежей (если еще не добавлено)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'payments' AND column_name = 'promo_code') THEN
        ALTER TABLE payments ADD COLUMN promo_code TEXT;
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'payments' AND column_name = 'discount_amount') THEN
        ALTER TABLE payments ADD COLUMN discount_amount DECIMAL(10,2) DEFAULT 0;
    END IF;
END $$;

-- Создаем индекс для поиска платежей по промокоду
CREATE INDEX IF NOT EXISTS idx_payments_promo_code ON payments(promo_code) WHERE promo_code IS NOT NULL;