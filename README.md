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
```

## 1. Run it locally

Requires Node.js 18+ and the Expo Go app on your phone (or an
Android/iOS simulator).

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS), or press
`a` / `i` in the terminal to open an emulator/simulator.

## 2. Swap the placeholder icons

`assets/icon.png`, `assets/adaptive-icon.png`, `assets/splash.png`, and
`assets/favicon.png` are auto-generated placeholders. Replace them with your
own artwork before shipping (1024×1024 for icon/adaptive-icon, any size for
splash, 48×48+ for favicon).

## 3. Edit the questions

Everything lives in the `QUESTION_BANK` object at the top of `App.js`. Add,
remove, or rename categories and questions there — no other file needs to
change. `TIME_PER_QUESTION` (seconds) controls the per-question timer.

## 4. Deploy with EAS (recommended)

[EAS Build](https://docs.expo.dev/build/introduction/) builds installable
APK/AAB (Android) and IPA (iOS) files in the cloud — no Xcode/Android Studio
required.

```bash
npm install -g eas-cli
eas login                     # create a free Expo account if you don't have one
eas build:configure           # links this project to your Expo account

# Quick installable APK for testing on a real Android device:
eas build --platform android --profile preview

# Store-ready builds:
eas build --platform android --profile production
eas build --platform ios --profile production

# Submit straight to the Play Store / App Store:
eas submit --platform android
eas submit --platform ios
```

Before an iOS build/submit you'll need an active Apple Developer account
($99/yr); EAS will walk you through certificates and provisioning during
`eas build`.

Before a production Android submit, update the `package` in `app.json` to
your own reverse-domain identifier (e.g. `com.yourname.mockinterview`) —
same for `ios.bundleIdentifier`.

## 5. Alternative: publish an OTA update only

If you're only testing inside Expo Go and don't need a standalone binary,
`npx expo start` and sharing the QR code is enough — no build step needed.

## Extending it

Ideas if you want to grow this beyond a mock:
- Record audio answers with `expo-av` and play them back for review
- Persist session history with `@react-native-async-storage/async-storage`
- Add a navigation library (`@react-navigation/native`) if you add more
  than these three screens
