import { redirect } from 'next/navigation';

export default function Home() {
  // Перенаправляем на лендинг
  redirect('/(landing)');
}
