# Plant Tracker Assistant 🌱

A comprehensive houseplant care management application that helps users track watering and fertilizer schedules, identify plants from photos, and receive reminders for overdue tasks.

## Features

✅ **Plant Management**
- Add and track multiple houseplants
- Store plant information (species, location, care notes)
- Track watering and fertilizer schedules
- Quick action buttons to mark tasks complete

✅ **Plant Identification**
- Upload photos to identify unknown plants
- Get comprehensive care information
- Add identified plants directly to your collection

✅ **Care Reminders**
- Automatic tracking of watering and fertilizer schedules
- Visual indicators for overdue tasks
- Dashboard showing all upcoming tasks
- Categorized task view (overdue, today, upcoming)

✅ **Data Storage**
- Firebase integration for cloud storage and authentication
- Local storage fallback for offline use
- Automatic syncing when Firebase is available

## Technologies Used

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Responsive design with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Dynamic functionality and API integration

### APIs
1. **OpenFarm API** - Plant identification and care information
   - Endpoint: `https://openfarm.cc/api/v1`
   - Used for plant database and care requirements

2. **Firebase** - Backend database and authentication
   - Firestore for data storage
   - Firebase Auth for user authentication

## Project Structure

```
wdd330-final/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js              # Main application logic
├── plant-api.js        # OpenFarm API integration
├── firebase-config.js  # Firebase configuration
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls

### Installation

1. **Clone or download the project files**

2. **Set up Firebase (Optional but recommended)**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Firestore Database
   - Enable Email/Password Authentication
   - Copy your Firebase config

3. **Configure Firebase credentials**
   - Open `firebase-config.js`
   - Replace the placeholder values with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_PROJECT.appspot.com",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

4. **Add Firebase SDK**
   - Include Firebase in the HTML before loading scripts. Add this to `index.html` head:
   ```html
   <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js"></script>
   <script src="https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"></script>
   ```

5. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server: `python -m http.server 8000` (Python 3)

## Usage Guide

### Adding a Plant
1. Click **"My Plants"** tab
2. Click **"+ Add Plant"** button
3. Fill in plant details:
   - **Plant Name*** - Common name for your plant
   - **Species** - Scientific or botanical name
   - **Location** - Where the plant is located
   - **Watering Frequency*** - Days between waterings
   - **Last Watered** - Most recent watering date
   - **Fertilizer Frequency** - Days between fertilizing (optional)
   - **Last Fertilized** - Most recent fertilizing date (optional)
   - **Notes** - Any additional care instructions
4. Click **"Save Plant"**

### Identifying a Plant
1. Click **"Identify Plant"** tab
2. Click **"Upload Photo"** button
3. Select a plant photo from your device
4. View identification results with care information
5. Click **"Add This Plant"** to add it to your collection

### Tracking Tasks
1. Click **"Care Tasks"** tab
2. Filter tasks by:
   - **All** - All pending tasks
   - **Overdue** - Tasks past due
   - **Today** - Tasks due today
   - **Upcoming** - Tasks due soon
3. Click **"Complete"** to mark a task done
4. Or use quick action buttons on plant cards

### Dashboard
- View total plants count
- See overdue tasks count
- Check tasks due today
- Review upcoming tasks this week
- See recent care reminders

## API Integration Details

### OpenFarm API
- **Base URL**: `https://openfarm.cc/api/v1`
- **Endpoints used**:
  - `GET /crops?filter={plantName}` - Search for plants
  - `GET /crops/{cropId}` - Get plant details

**Rate Limits**: No authentication required for basic queries

### Firebase Integration
- **Authentication**: Email/password sign-up and login
- **Database**: Firestore with user-based plant collections
- **Data Structure**:
  ```
  users/{uid}/plants/{plantId}
  ```

## Features in Detail

### Dashboard
- **Real-time Statistics**: Plant count, overdue tasks, today's tasks, upcoming tasks
- **Recent Reminders**: Prioritized list of care tasks
- **Quick Actions**: Direct task completion from reminders

### Plant Cards
- Plant name and species
- Location badge
- Watering schedule and status
- Fertilizer schedule and status
- Visual overdue indicators
- Quick action buttons

### Task Management
- **Task Filtering**: All, Overdue, Today, Upcoming
- **Status Tracking**: Clear indication of task urgency
- **Quick Completion**: Mark tasks done with one click
- **Detailed View**: See full plant information with task history

### Reminders System
- Automatic calculation of due dates
- Overdue detection with day count
- Notification toast messages
- Periodic checks (every minute)

## Data Storage

### Local Storage (Demo Mode)
- Plants stored in browser's localStorage
- No server required
- Data persists across sessions
- Perfect for testing

### Firebase (Production)
- Cloud database storage
- User authentication
- Multi-device sync
- Cloud backup

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Responsive Design

- Desktop: Full feature set with optimized layout
- Tablet: Adjusted grid layout, touch-friendly
- Mobile: Single-column layout, optimized buttons

## Troubleshooting

### Firebase not connecting?
- Check API credentials are correct
- Ensure Firebase SDK is loaded
- Check browser console for errors
- The app falls back to localStorage automatically

### Plant identification not working?
- Check internet connection
- Ensure OpenFarm API is accessible
- Try with different plant images
- Check console for API errors

### Data not saving?
- Check if browser allows localStorage
- For Firebase, verify authentication
- Check browser console for errors
- Try clearing browser cache

## Future Enhancements

- 📸 Image upload with cloud storage
- 🔔 Browser push notifications
- 📊 Plant health analytics
- 🌍 Plant care community forum
- 📱 Mobile app (React Native)
- 🗣️ Voice command reminders
- 🌡️ Temperature and humidity tracking
- 📷 Plant photo gallery
- 🤖 AI-powered plant health analysis

## License

This project is open source and available for educational purposes.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review browser console for error messages
3. Verify API credentials and connectivity
4. Test with sample data

---

**Happy Plant Tracking! 🌿🌱🌳**
