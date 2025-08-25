'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Crown, Calendar, CreditCard } from 'lucide-react';

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => Promise<void>;
  subscription: any;
  isProcessing: boolean;
}

const CANCELLATION_REASONS = [
  'Слишком дорого',
  'Не использую все функции',
  'Нашел лучшую альтернативу',
  'Технические проблемы',
  'Временно не нужно',
  'Другое'
];

export function CancelSubscriptionDialog({
  isOpen,
  onClose,
  onConfirm,
  subscription,
  isProcessing
}: CancelSubscriptionDialogProps) {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [customReason, setCustomReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleReasonChange = (reason: string, checked: boolean) => {
    if (checked) {
      setSelectedReasons(prev => [...prev, reason]);
    } else {
      setSelectedReasons(prev => prev.filter(r => r !== reason));
    }
  };

  const handleConfirm = async () => {
    const reasons = [...selectedReasons];
    if (customReason.trim()) {
      reasons.push(customReason.trim());
    }
    
    await onConfirm(reasons.join(', '));
  };

  const getSubscriptionEndDate = () => {
    if (!subscription?.end_date) return 'неизвестно';
    
    return new Date(subscription.end_date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Отмена подписки
          </DialogTitle>
          <DialogDescription>
            Мы сожалеем, что вы хотите отменить подписку PetCare PRO
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Информация о текущей подписке */}
          <Alert>
            <Crown className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Текущий план:</span>
                  <span className="text-sm">PRO (299₽/месяц)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Действует до:</span>
                  <span className="text-sm">{getSubscriptionEndDate()}</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>

          {/* Что произойдет после отмены */}
          <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <Calendar className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <div className="space-y-1">
                <p className="font-medium">После отмены подписки:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• PRO функции будут доступны до {getSubscriptionEndDate()}</li>
                  <li>• Затем аккаунт перейдет на бесплатный план</li>
                  <li>• Ограничение: максимум 2 питомца</li>
                  <li>• Ограничение: 5 записей в дневнике/месяц</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>

          {/* Причины отмены */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Помогите нам стать лучше. Почему вы отменяете подписку?
            </Label>
            
            <div className="space-y-2">
              {CANCELLATION_REASONS.map((reason) => (
                <div key={reason} className="flex items-center space-x-2">
                  <Checkbox
                    id={reason}
                    checked={selectedReasons.includes(reason)}
                    onCheckedChange={(checked) => 
                      handleReasonChange(reason, checked === true)
                    }
                  />
                  <Label htmlFor={reason} className="text-sm">
                    {reason}
                  </Label>
                </div>
              ))}
            </div>

            {selectedReasons.includes('Другое') && (
              <div className="space-y-2">
                <Label htmlFor="custom-reason" className="text-sm">
                  Расскажите подробнее:
                </Label>
                <Textarea
                  id="custom-reason"
                  placeholder="Ваш комментарий..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Подтверждение */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="confirm-cancellation"
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked === true)}
            />
            <Label htmlFor="confirm-cancellation" className="text-sm">
              Я понимаю, что подписка будет отменена
            </Label>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            Оставить подписку
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!confirmed || isProcessing}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {isProcessing ? 'Отмена...' : 'Отменить подписку'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}