# Using Plant Tracker - Demo & Setup Modes

## Quick Start (No Setup Required - Demo Mode)

The Plant Tracker Assistant works immediately without any Firebase setup!

### Demo Mode Features:
- ✅ Add and manage plants (data stored locally on your device)
- ✅ Track watering and fertilizer schedules
- ✅ Identify plants from photos using OpenFarm API
- ✅ View care tasks and reminders
- ✅ Works offline (data stays on your computer)

### How to Use Demo Mode:

1. **Open index.html** in your browser
2. **Load sample data** (optional):
   - Open browser DevTools (F12 or right-click → Inspect)
   - Click Console tab
   - Type: `loadSampleData()`
   - Press Enter
   - Page will reload with 5 sample plants
3. **Start using the app** - All features work without login

### Demo Mode Limitations:
- ⚠️ Data stored only on this computer/browser
- ⚠️ Not synced across devices
- ⚠️ Lost if browser cache is cleared
- ⚠️ No cloud backup

---

## Production Mode (With Firebase Setup)

For real-world use with cloud sync and login, set up Firebase:

### Requirements:
- Free Firebase account (go to firebase.google.com)
- 10-15 minutes for setup

### Setup Steps:

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Click "Add Project"
   - Follow the prompts

2. **Get Firebase Credentials**
   - In Firebase Console → Project Settings
   - Find your Web config
   - Copy all the values

3. **Update firebase-config.js**
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",           // From Firebase
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

4. **Enable Authentication**
   - In Firebase Console → Authentication
   - Click "Get Started"
   - Enable "Email/Password"

5. **Enable Firestore Database**
   - In Firebase Console → Firestore Database
   - Click "Create Database"
   - Start in Test Mode
   - Click "Enable"

6. **Done!**
   - Login button now works with cloud sync
   - See FIREBASE_SETUP.md for detailed instructions

### Production Mode Features:
- ✅ Cloud backup of all plants
- ✅ User authentication
- ✅ Access from any device
- ✅ Automatic data sync
- ✅ Secure storage
- ✅ No local storage limitations

---

## Troubleshooting

### "Login doesn't work" - Firebase Not Set Up
**Solution**: Just use demo mode! Data stores locally without login.

### Want to use production mode?
1. Follow the "Production Mode" setup above
2. Check browser console (F12) for any errors
3. Verify all Firebase credentials are correct
4. See FIREBASE_SETUP.md for detailed help

### Data disappearing?
- **Demo Mode**: Clear browser cache will delete data
- **Production Mode**: Backup to cloud (with Firebase)
- **Solution**: Set up Firebase to prevent data loss

### App not loading?
- Clear browser cache and reload
- Try a different browser
- Check browser console for errors (F12)

---

## Testing Features

### Without Firebase (Demo):
```javascript
// In browser console (F12 → Console):

// Load sample plants
loadSampleData()

// View all data
console.log(window.plants)

// Clear all data
clearSampleData()

// Check local storage
localStorage.getItem('plants')
```

### With Firebase:
- Use the Login button to create account
- Try adding a plant - saves to cloud
- Logout and login - data persists
- Check Firebase Console to see data stored

---

## Choosing Your Mode

### Use Demo Mode If:
- You want to test the app quickly
- You don't need multi-device access
- You prefer keeping data locally
- You don't want to set up Firebase

### Use Production Mode If:
- You want permanent cloud backup
- You need access from multiple devices
- You want secure authentication
- You're planning long-term use

---

## Sample Data for Testing

The app includes 5 sample plants to test with:
1. **Monstera Deliciosa** - Living Room
2. **Pothos** - Bedroom
3. **Snake Plant** - Bathroom
4. **Spider Plant** - Kitchen
5. **Succulent Mix** - Desk

To load: Open console (F12) → Type `loadSampleData()` → Press Enter

---

## File Locations

- **Local Demo Data**: Stored in browser's localStorage
- **Cloud Data**: Firebase Firestore (with production setup)
- **Configuration**: firebase-config.js

---

## Important Notes

⚠️ **Demo Mode**
- Changes are only saved locally
- Clearing browser cache deletes everything
- Not synced across browsers/devices

✅ **Production Mode**
- Requires Firebase setup (5-10 minutes)
- Automatic cloud backup
- Works across all devices
- Recommended for real use

---

## Next Steps

1. **Try the app now** - Open index.html (demo mode works!)
2. **Load sample data** - Type `loadSampleData()` in console
3. **Add your own plants** - Create your plant collection
4. **Set up Firebase** - When ready for cloud sync (optional)

---

**Questions?** Check FIREBASE_SETUP.md for detailed Firebase instructions.
**Ready to use?** Open index.html and start tracking your plants! 🌱
