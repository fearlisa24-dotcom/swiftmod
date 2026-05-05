# SwiftMod Android App

Companion native Android client for the SwiftMod web library. **This folder is NOT built by the web project** — open it in Android Studio.

## What's in here
- `app/src/main/java/app/swiftmod/MainActivity.kt` — Compose UI, game grid, search, rewarded-ad gated downloads
- `app/src/main/java/app/swiftmod/DownloadWorker.kt` — WorkManager worker that uses Android `DownloadManager`
- `app/src/main/java/app/swiftmod/AdsManager.kt` — Unity Ads wrapper (rewarded video)
- `app/src/main/java/app/swiftmod/Repo.kt` — fetches games JSON from a remote URL
- `app/src/main/AndroidManifest.xml` — permissions + FileProvider for installs
- `app/build.gradle.kts` — dependency snippet
- `games.sample.json` — example feed format

## Setup
1. Open Android Studio → New Project → Empty Compose Activity (`minSdk 24`, package `app.swiftmod`).
2. Replace generated files with the ones in this folder.
3. In `AdsManager.kt`, set your Unity Ads **Game ID** and **Placement ID** (https://dashboard.unity3d.com).
4. Set `FEED_URL` in `Repo.kt` to your hosted JSON (GitHub raw, gist, S3, Firebase Hosting, etc.).
5. Build → Generate Signed APK.

## Distribution
- Host the APK on GitHub Releases / your own server.
- Landing page button → direct APK link.
- Tell users to enable "Install unknown apps" for their browser.

## JSON feed format (`games.sample.json`)
```json
[
  { "id": "1", "title": "Game Name", "version": "1.2.3", "icon": "https://…/icon.png", "url": "https://…/file.apk" }
]
```
