# Firebase Setup Guide

This guide will help you set up Firebase for the Plant Tracker Assistant application.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add Project"**
3. Enter project name (e.g., "plant-tracker-app")
4. Accept terms and click **"Continue"**
5. Enable Google Analytics (optional) and click **"Create Project"**
6. Wait for project creation to complete

## Step 2: Get Firebase Configuration

1. In Firebase Console, click the gear icon and select **"Project Settings"**
2. Under the **"General"** tab, scroll down to find your apps section
3. Click **"Web"** to add a web app
4. Register app with a nickname (e.g., "plant-tracker-web")
5. Firebase will provide a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "plant-tracker-abc123.firebaseapp.com",
  projectId: "plant-tracker-abc123",
  storageBucket: "plant-tracker-abc123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

## Step 3: Enable Firestore Database

1. In Firebase Console, go to **"Build"** > **"Firestore Database"**
2. Click **"Create Database"**
3. Select location (closest to you)
4. Choose **"Start in test mode"** for development
5. Click **"Enable"**

**Security Rules for Development** (Test Mode):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

**Security Rules for Production**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/plants/{document=**} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```

## Step 4: Enable Authentication

1. In Firebase Console, go to **"Build"** > **"Authentication"**
2. Click **"Get Started"**
3. Under **"Sign-in method"**, click **"Email/Password"**
4. Enable **"Email/Password"** option
5. Click **"Save"**

## Step 5: Update Configuration File

1. Open `firebase-config.js` in your project
2. Replace the placeholder config with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",  // Replace with your apiKey
    authDomain: "YOUR_PROJECT.firebaseapp.com",  // Replace
    projectId: "YOUR_PROJECT_ID",  // Replace
    storageBucket: "YOUR_PROJECT.appspot.com",  // Replace
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace
    appId: "YOUR_APP_ID"  // Replace
};
```

## Step 6: Add Firebase SDK to index.html

Add the following script tags to the `<head>` section of `index.html` before other scripts:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
```

## Step 7: Test the Setup

1. Open your application in a web browser
2. Click **"Login"** in the header
3. Try creating a new account with an email and password
4. Add some test plants
5. Check Firebase Console > Firestore to verify data is being saved

## Database Structure

Once configured, your Firestore database will look like:

```
users/
  {userId}/
    plants/
      {plantId}: {
        id: "plant_timestamp",
        name: "Monstera",
        species: "Monstera deliciosa",
        location: "Living Room",
        wateringFrequency: 7,
        lastWatered: "2025-11-28",
        fertilizerFrequency: 30,
        lastFertilized: "2025-11-28",
        notes: "Keep away from direct sun",
        addedDate: "2025-11-28",
        createdAt: timestamp,
        updatedAt: timestamp
      }
```

## Environment Variables (Optional)

For production deployments, consider using environment variables:

```javascript
// firebase-config.js
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // ... etc
};
```

## Troubleshooting

### Firebase Not Connecting
- Check that all API credentials are correct
- Ensure the Firebase SDK script tags are loaded
- Open browser DevTools console to check for errors
- Verify Firebase project is active

### Firestore Permission Denied
- Check security rules are correctly configured
- Verify user is authenticated
- Check that the collection path matches exactly

### "Cannot GET" Errors with APIs
- Ensure internet connection is active
- Check API endpoints are correct
- Verify CORS is not blocking requests

### Authentication Issues
- Clear browser localStorage and try again
- Check email/password format
- Verify Email/Password auth is enabled in Firebase

## Security Best Practices

⚠️ **For Production Only:**

1. **Update Firestore Security Rules** to production rules
2. **Restrict API Key** in Firebase Console:
   - Go to Credentials settings
   - Click on the browser API key
   - Restrict to your domain only
3. **Enable HTTPS** for your application
4. **Keep credentials secure** - Never commit to version control
5. **Use Firebase Authentication** for user verification
6. **Implement data validation** on both client and server

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Security Rules](https://firebase.google.com/docs/firestore/security/start)

---

**Once configured, your Plant Tracker will automatically sync with Firebase!**
