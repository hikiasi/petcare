'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PromoCodeManager, PromoCodeValidation } from '@/lib/utils/promo-codes';
import { SUBSCRIPTION_PRICES } from '@/lib/utils/subscription';
import { Check, AlertCircle, Tag, Percent } from 'lucide-react';

interface PromoCodeInputProps {
  onPromoApplied: (validation: PromoCodeValidation & { code: string }) => void;
  onPromoRemoved: () => void;
  disabled?: boolean;
}

export function PromoCodeInput({ onPromoApplied, onPromoRemoved, disabled }: PromoCodeInputProps) {
  const [promoCode, setPromoCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<(PromoCodeValidation & { code: string }) | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleValidatePromo = async () => {
    if (!promoCode.trim()) return;

    setIsValidating(true);
    setError(null);

    try {
      const validation = await PromoCodeManager.validatePromoCode(promoCode.trim());
      
      if (validation.isValid) {
        const promoData = { ...validation, code: promoCode.trim().toUpperCase() };
        setAppliedPromo(promoData);
        onPromoApplied(promoData);
        setPromoCode('');
      } else {
        setError(validation.error || 'Промокод недействителен');
      }
    } catch (error) {
      setError('Ошибка проверки промокода');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setError(null);
    onPromoRemoved();
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    
    return PromoCodeManager.calculateDiscountedPrice(
      SUBSCRIPTION_PRICES.pro,
      appliedPromo.discount,
      appliedPromo.discountType
    );
  };

  const getDiscountText = () => {
    if (!appliedPromo) return '';
    
    if (appliedPromo.discountType === 'percentage') {
      return `${appliedPromo.discount}%`;
    } else {
      return `${appliedPromo.discount}₽`;
    }
  };

  if (appliedPromo) {
    return (
      <div className="space-y-3">
        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20">
          <Check className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Промокод {appliedPromo.code} применен!</span>
                <div className="text-sm mt-1">
                  Скидка: {getDiscountText()} 
                  {appliedPromo.discountType === 'percentage' && (
                    <span className="ml-1">(-{SUBSCRIPTION_PRICES.pro - calculateDiscount()}₽)</span>
                  )}
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRemovePromo}
                disabled={disabled}
              >
                Убрать
              </Button>
            </div>
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Итого к оплате:</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              {Math.round(calculateDiscount())}₽
            </div>
            {appliedPromo.discountType === 'percentage' && (
              <div className="text-sm text-gray-500 line-through">
                {SUBSCRIPTION_PRICES.pro}₽
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div>
        <Label htmlFor="promo-code" className="text-sm font-medium">
          Промокод (необязательно)
        </Label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="promo-code"
              placeholder="Введите промокод"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleValidatePromo()}
              className="pl-10"
              disabled={disabled || isValidating}
            />
          </div>
          <Button 
            variant="outline" 
            onClick={handleValidatePromo}
            disabled={!promoCode.trim() || disabled || isValidating}
          >
            {isValidating ? 'Проверка...' : 'Применить'}
          </Button>
        </div>
      </div>

      {error && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <div className="text-xs text-gray-500">
        Промокоды дают скидку на первый месяц подписки
      </div>
    </div>
  );
}