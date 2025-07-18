export default {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{js,jsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],
  '*.{json,yml,yaml}': ['prettier --write'],
  '*.md': (filenames) => {
    // Only format markdown files that are NOT in the docs/ folder
    const filesToFormat = filenames.filter((file) => !file.includes('/docs/'));
    return filesToFormat.length > 0 ? `prettier --write ${filesToFormat.join(' ')}` : [];
  },
};
