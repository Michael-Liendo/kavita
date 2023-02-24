import { useRouter } from 'next/router';
import translations from './translations';

export default function useTranslation(component: string, textIdentifier: string) {
  const { locale, defaultLocale } = useRouter();

  try {
    if (locale && defaultLocale) {
      return (
        translations[locale][component][textIdentifier] ||
        translations[defaultLocale][component][textIdentifier] ||
        textIdentifier
      );
    }
  } catch {
    return textIdentifier;
  }

  return textIdentifier;
}
