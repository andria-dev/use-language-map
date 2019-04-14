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

export function useLanguageMap(
  maps: LanguageMap,
  { isPrecise = true }: Options = {}
) {
  const [activeMaps, setActiveMaps] = useState<WordMap[]>([]);
  const updateActiveMaps = useCallback(() => {
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
  }, [maps, isPrecise, setActiveMaps]);

  useEffect(() => {
    updateActiveMaps();
    window.addEventListener('languagechange', updateActiveMaps);

    return () => {
      window.removeEventListener('languagechange', updateActiveMaps);
    };
  }, [updateActiveMaps]);

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
