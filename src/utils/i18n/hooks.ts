import { useRouter } from 'next/router';
import translations from './translations';

export default function useTranslation(textIdentifier: string) {
  const { locale, defaultLocale } = useRouter();

  try {
    return (
      translations[locale][textIdentifier] ||
      translations[defaultLocale][textIdentifier] ||
      textIdentifier
    );
  } catch {
    return textIdentifier;
  }
}
