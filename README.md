# useLanguageMap

A React hook for mapping words to the active language's words.

# How to use:

## Installation

```bash
yarn add use-language-map
# or
npm install use-language-map
```

## Import

```js
import { useLanguageMap } from 'use-language-map';
// or
const { useLanguageMap } = require('use-language-map');
```

## Usage

```jsx
/**
 * YOU MUST DEFINE THE LANGUAGE MAP OUTSIDE THE COMPONENT,
 * or memoize it
 * Failure to do so will cause infinite re-rendering
 */
const languageMap = {
  de: {
    of: 'von',
    pages: 'Seiten'
  },
  es: {
    of: 'de',
    pages: 'páginas'
  }
};

function MyComponent() {
  const t = useLanguageMap(languageMap, { isPrecise: false });

  return (
    <p>
      1 {t('of')} 4 {t('pages')}
    </p>
  );
}
```
