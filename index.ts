import { useState, useEffect, useCallback } from 'react';

interface WordMap {
  [s: string]: string;
}

interface LanguageMap {
  [s: string]: WordMap;
}

function getActiveMaps(maps: LanguageMap, languages: readonly string[] | string[]=navigator.languages) {
  return navigator.languages.map(language => maps[language]).filter(x => !!x);
}

/**
 * ```
 * function MyComponent() {
 *   const translate = useLanguageMap({
 *     'de-de': { of: 'von' },
 *   }, 'of')
 *
 *   return (
 *     <Typography>1 {translate('of')} 2</Typography>
 *   )
 * }
 * ```
 */
export function useLanguageMap(maps: LanguageMap, fallback: string) {
  const [activeMaps, setActiveMaps] = useState(getActiveMaps(maps));

  useEffect(() => {
    setActiveMaps(getActiveMaps(maps));
  }, [maps]);

  return useCallback((word: string) => {
    if (activeMaps.length) {
      for (const map of activeMaps) {
        const translatedWord = map[word];

        if (translatedWord) {
          return translatedWord;
        }
      }
    }

    return fallback;
  }, [activeMaps, fallback]);
}