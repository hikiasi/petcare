-- Функция для автоматического создания профиля при регистрации
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, subscription_type)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'user'),
    'free'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для создания профиля при регистрации
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Функция для обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггеры для обновления updated_at на всех таблицах
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER pets_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER health_records_updated_at BEFORE UPDATE ON health_records
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER expenses_updated_at BEFORE UPDATE ON expenses
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER reminders_updated_at BEFORE UPDATE ON reminders
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER vaccinations_updated_at BEFORE UPDATE ON vaccinations
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER usage_stats_updated_at BEFORE UPDATE ON usage_stats
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER promo_codes_updated_at BEFORE UPDATE ON promo_codes
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER system_settings_updated_at BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();