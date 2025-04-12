# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



## File Structure

/VendorManager
│
├── /assets
├── /components
│   ├── VendorPage.js
│   ├── DailyTransactionPage.js
│   └── ReportPage.js
├── /services
│   ├── dbService.js
│   ├── vendorService.js
│   ├── transactionService.js
│   └── reportService.js
├── App.js
└── /utils
    └── utils.js

## To create new project and add dependancies
```bash
npx create-expo-app@latest VendorManager
cd VendorManager
npx expo install sqlite3 react-native-pdf react-native-datepicker
npm install @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install expo-print
npx expo install expo-sqlite
npm install react-native-fs react-native-sqlite-storage
npm install @react-native-picker/picker
npm install @react-native-community/datetimepicker
npm install react-native-vector-icons
npm install @react-native-async-storage/async-storage

```
## To reset cache and build
```bash
npm start -- --reset-cache
```
## To build APK file
```bash
npm install -g eas-cli
eas build --profile preview --platform android
eas build --profile development --platform android

```
# TODO
1. App 
   - Tabs - Trans Vendor Report More
   - Navigation - 
   
2. Vendor
   - List - 
      - UI - Design
      - Fields - Name Rate - 
      - Buttons -Add Edit Delete - 
   - Add
      - UI - Design
      - Fields - Name Rate
      - Buttons - Save Back
   - Edit 
      - UI - Design
      - Fields - Name Rate
      - Buttons - Update Delete Back
   - Delete - Confirm Alert
3. Transaction
   - List
      - UI - Design
      - Fields - 
      - Buttons - Add Edit
   - Add
      - UI - Design
      - Fields -
      - Buttons - Save Back
   - Edit
      - UI - Design
      - Fields -
      - Buttons - Update Delete Back
         - Delete - Confirm Alert
4. Reports
      - View Reports
      - Export Reports


TO DO

Set Initial Script - Done
Add Default Vendor Entry - Done
Set Application Icon - Done
Set Delete Button Condition - Done
Resolve run twice Initial Script - Done

Remove Demo Tab
Set Proper Tab Navigation 
Set Proper Month Navigation
Set Theam
Set Dashboard - Outstanding Amount
Add Setting Page
	Theam
	Clear Data
Report
	View Report with filter
	Export PDF
Payment
Verify Sonar
Migration with Versioning
