const { useLanguageMap } = require('.');
const { renderHook, cleanup, act } = require('react-hooks-testing-library');

afterEach(cleanup);

global.navigator = { languages: [] };
function setLanguages(...languages) {
  navigator.languages = languages;
}

const { result } = renderHook(() =>
  useLanguageMap({
    de: { of: 'von' },
    es: { of: 'de' }
  })
);

test('grabs correct item based on first language', () => {
  setLanguages('de');

  const languageMap = {
    de: { of: 'von' },
    es: { of: 'de' }
  };

  const { result } = renderHook(() => useLanguageMap(languageMap));

  console.log(result);
  expect(result.current('of')).toBe('von');
});
