'use client';

import { useState } from 'react';
import { Copy, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createAdminInviteLink } from '@/lib/supabase/auth';
import { useAuth } from '@/hooks/useAuth';

export function AdminInviteGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState('24');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  const { user } = useAuth();

  const generateInviteLink = async () => {
    if (!user) return;

    try {
      setIsGenerating(true);
      setError(null);
      
      const inviteData = await createAdminInviteLink(user.id, parseInt(expiresIn));
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
      const inviteUrl = `${baseUrl}/auth/admin-register?token=${inviteData.token}`;
      
      setGeneratedLink(inviteUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при создании ссылки');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!generatedLink) return;

    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Создать приглашение администратора
        </CardTitle>
        <CardDescription>
          Сгенерируйте ссылку для регистрации нового администратора
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="expires">Срок действия ссылки</Label>
          <Select value={expiresIn} onValueChange={setExpiresIn}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 час</SelectItem>
              <SelectItem value="6">6 часов</SelectItem>
              <SelectItem value="24">24 часа</SelectItem>
              <SelectItem value="72">3 дня</SelectItem>
              <SelectItem value="168">7 дней</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={generateInviteLink} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Генерация...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Создать ссылку
            </>
          )}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {generatedLink && (
          <div className="space-y-3">
            <Label>Ссылка для приглашения:</Label>
            <div className="flex gap-2">
              <Input 
                value={generatedLink} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button 
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Скопировано!' : 'Копировать'}
              </Button>
            </div>
            <Alert>
              <AlertDescription>
                Ссылка действительна в течение {expiresIn} {
                  expiresIn === '1' ? 'часа' : 
                  parseInt(expiresIn) < 5 ? 'часов' : 'часов'
                }. 
                Отправьте её новому администратору для регистрации.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}