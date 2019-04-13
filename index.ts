import { useState, useEffect, useCallback } from 'react';

interface WordMap {
  [s: string]: string;
}

interface LanguageMap {
  [s: string]: WordMap;
}

interface Options {
  isPrecise?: boolean;
}

function getActiveMaps(maps: LanguageMap, languages = navigator.languages) {
  return languages.map(language => maps[language]).filter(x => !!x);
}

/**
 * ### Example:
 * ```jsx
function MyComponent() {
  const translate = useLanguageMap({
    'de': {
      of: 'von',
      pages: 'Seiten'
    },
    'es': {
      of: 'de',
      pages: 'páginas'
    }
  }, { isPrecise: false })

  return (
    <p>1 {translate('of')} 2 {translate('pages'})</p>
  )
}
```
 */
export function useLanguageMap(
  maps: LanguageMap,
  { isPrecise = true }: Options
) {
  const [activeMaps, setActiveMaps] = useState<WordMap[]>([]);

  useEffect(() => {
    let activeMaps: WordMap[];

    if (isPrecise) {
      activeMaps = getActiveMaps(maps);
    } else {
      const languages = navigator.languages.map(
        language => language.split('-')[0]
      );
      activeMaps = getActiveMaps(maps, languages);
    }

    setActiveMaps(activeMaps);
  }, [maps, isPrecise, setActiveMaps, navigator.languages]);

  return useCallback(
    (word: string) => {
      for (const map of activeMaps) {
        const translatedWord = map[word];

        if (translatedWord) {
          return translatedWord;
        }
      }

      return word;
    },
    [activeMaps]
  );
}
