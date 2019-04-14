const { useLanguageMap } = require('./');
const { renderHook, cleanup, act } = require('react-hooks-testing-library');

afterEach(cleanup);

test('Gets correct word for language', () => {
  setLanguages('de');
  const languageMap = {
    de: { of: 'von' },
    es: { of: 'de' }
  };

  const { result } = renderHook(() => useLanguageMap(languageMap));
  expect(result.current('of')).toBe('von');
});

test('Gets first language match that exists on the map', () => {
  setLanguages('de', 'es', 'whatever');
  const languageMap = {
    es: {
      of: 'de'
    }
  };

  const { result } = renderHook(() => useLanguageMap(languageMap));
  expect(result.current('of')).toBe('de');
});

test('Returns word passed in if no match was found', () => {
  setLanguages('no', 'language');
  const languageMap = {};

  const { result } = renderHook(() => useLanguageMap(languageMap));
  expect(result.current('of')).toBe('of');
});

test('In imprecise mode, the region is disregarded', () => {
  setLanguages('es-PA');
  const languageMap = {
    es: {
      of: 'de'
    }
  };

  const { result } = renderHook(() =>
    useLanguageMap(languageMap, { isPrecise: false })
  );
  expect(result.current('of')).toBe('de');
});
