Object.defineProperty(global.navigator, 'languages', {
  value: [],
  writable: true
});

global.setLanguages = (...languages) => {
  global.navigator.languages = languages;
};
