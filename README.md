# Mock Interview

A simple React Native (Expo) app for practicing interview answers. Pick a
category (Behavioral, Technical, Leadership), answer each question out loud
within a 90-second timer, and see a summary at the end.

No backend, no navigation library, no extra dependencies — just React Native
core components, so it's easy to read and extend.

## Project structure

```
mock-interview-app/
├── App.js              # all app logic and UI (single file, 3 screens)
├── app.json            # Expo app config (name, icons, bundle IDs)
├── eas.json             # EAS Build/Submit profiles
├── babel.config.js
├── package.json
├── assets/              # icon, splash, favicon (placeholders — swap these)
└── .gitignore

