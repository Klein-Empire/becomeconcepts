
# Firebase Deployment Guide for NewsDaily Kenya

## Prerequisites
- Node.js and npm installed
- Firebase CLI installed: `npm install -g firebase-tools`
- A Google account
- Your project already connected to GitHub

## Step 1: Set up Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project `becomeconcepts-c9b91`
3. Navigate to **Firestore Database** → **Create database**
4. Choose **Start in test mode** for now
5. Select a region (choose closest to Kenya, like `europe-west1`)

## Step 2: Create Firestore Collections

Create these collections in Firestore with sample documents:

### Collection: `news`
```json
{
  "title": "Kenya's Economy Shows Strong Growth",
  "content": "Kenya's economy has shown remarkable resilience...",
  "excerpt": "Economic indicators point to sustained growth",
  "author": "John Doe",
  "category": "Business",
  "date": "2025-06-17",
  "status": "published",
  "featured": true,
  "priority": "high",
  "tags": ["economy", "growth"],
  "media": [],
  "engagement": {
    "views": 0,
    "likes": 0,
    "comments": []
  }
}
```

### Collection: `newsCrawl`
```json
{
  "text": "Breaking: Kenya signs major trade deal with China",
  "image": "https://example.com/image.jpg",
  "isActive": true,
  "order": 1
}
```

### Collection: `adPackages`
```json
{
  "name": "Premium Package",
  "price": "KSh 50,000",
  "period": "per month",
  "features": ["Banner ads", "Sidebar placement", "Analytics"],
  "popular": true,
  "isActive": true
}
```

### Collections to create:
- `publications`
- `teaching`
- `youtube`
- `agriculture`
- `education`
- `advertisements`

## Step 3: Set Firestore Security Rules

Go to **Firestore Database** → **Rules** and update:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents
    match /{document=**} {
      allow read: if true;
      allow write: if true; // Change this to more restrictive rules in production
    }
  }
}
```

## Step 4: Deploy from GitHub

### Option A: Automatic Deployment (Recommended)

1. In Firebase Console, go to **Hosting**
2. Click **Get started**
3. Choose **GitHub** as source
4. Connect your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
6. Deploy

### Option B: Manual Deployment

1. Clone your repository locally:
   ```bash
   git clone [your-repo-url]
   cd [your-repo-name]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Login to Firebase:
   ```bash
   firebase login
   ```

5. Initialize Firebase in your project:
   ```bash
   firebase init hosting
   ```
   - Select your existing project
   - Set public directory to `dist`
   - Configure as single-page app: Yes
   - Set up automatic builds: No (or Yes if you want GitHub integration)

6. Deploy:
   ```bash
   firebase deploy
   ```

## Step 5: Configure Environment

Your Firebase config is already set up in `src/firebase.ts`. No changes needed.

## Step 6: Test Your Deployment

1. Visit your deployed URL: `https://becomeconcepts-c9b91.web.app`
2. Test admin panel at: `https://becomeconcepts-c9b91.web.app/admin`
3. Use password: `admin123`
4. Add some content through the admin panel
5. Verify it displays on the homepage

## Production Considerations

1. **Security Rules**: Update Firestore rules to be more restrictive
2. **Authentication**: Implement proper admin authentication
3. **Environment Variables**: Move sensitive data to environment variables
4. **Performance**: Enable Firebase Performance Monitoring
5. **Analytics**: Set up Google Analytics

## Firestore Indexes

If you get index errors, Firebase will provide links to create required indexes automatically.

Your app should now be live at: `https://becomeconcepts-c9b91.web.app`
