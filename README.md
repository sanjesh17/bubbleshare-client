# BubbleShare

## Quick, Lossless Photo Sharing with Interactive Bubbles

BubbleShare makes photo sharing simple, lossless, and fun with interactive bubbles that automatically expire.

![BubbleShare Logo](https://bubbleshare-client.vercel.app/pwa-512x512.png)

## 🌟 Features

- **Ephemeral Sharing**: Create bubbles that automatically expire after 6, 12, or 24 hours
- **Lossless Quality**: Share photos without compression or quality loss
- **Interactive Bubbles**: Engaging and interactive UI for photo viewing and sharing
- **Completely Free**: No hidden costs or premium tiers
- **Progressive Web App**: Install on any device through the browser
- **Native App Experience**: Available as an Android app via Bubblewrap

## 🚀 Live Demo

Try it now: [bubbleshare-client.vercel.app](https://bubbleshare-client.vercel.app)

## 💻 Tech Stack

BubbleShare leverages modern technologies for a seamless experience:

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: PostgreSQL for user data and bubble metadata
- **Caching**: Redis for bubble information with TTL support
- **Storage**: Google Drive API as a cost-effective S3 alternative
- **Hosting**:
  - Frontend: Vercel
  - Backend & Services: Render
- **Native Wrapping**: Google's Bubblewrap for Android app conversion

## 🔧 System Architecture

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ React App   │    │ Node/Express  │    │ Google Drive│
│ (Vercel)    │────│ Backend       │────│ Storage     │
│             │    │ (Render)      │    │             │
└─────────────┘    └──────────────┘    └─────────────┘
                          │
                 ┌────────┴─────────┐
                 │                  │
          ┌──────┴─────┐     ┌──────┴─────┐
          │ PostgreSQL │     │ Redis Cache │
          │ (Render)   │     │ (Render)    │
          └────────────┘     └────────────┘
```

## 🌐 How It Works

1. **Create a Bubble**: Simply log in and upload your photos, then select an expiration time (6, 12, or 24 hours)
2. **Share the Link**: Send the unique bubble link to friends or family
3. **Interactive Viewing**: Recipients enjoy your photos in a fun, interactive bubble interface
4. **Automatic Cleanup**: When the time expires, photos are automatically removed from storage

## 💰 Cost-Effective Engineering

BubbleShare is designed to be completely free to run for small to medium user bases:

- **Storage Solution**: Leverages a centralized Google Drive account instead of expensive S3 buckets
- **No Setup Required**: Just log in and start creating bubbles - no service account configuration needed
- **Automatic Deletion**: Time-based expiration ensures storage never accumulates
- **Free Tier Services**: Utilizes free tiers of Render and Vercel for hosting
- **Scalable Design**: Architecture can handle growth while maintaining minimal costs

## 📱 Installation

### Web App

1. Visit [bubbleshare-client.vercel.app](https://bubbleshare-client.vercel.app)
2. Use the "Add to Home Screen" option in your browser

### Android App

1. Download the APK from our [Releases](https://github.com/sanjesh17/bubbleshare-client/releases) page
2. Install and enjoy a native-like experience

## 🔒 Privacy

### Current Implementation

- All data is currently stored in a centralized Google Drive account
- Photos are deleted permanently after your chosen expiration time
- No personal data is collected beyond what's necessary for the service

### Future Plans

- User-based storage system for enhanced privacy
- Each user will have their own dedicated storage space
- More granular control over shared content

## 👨‍💻 Development

### Prerequisites

- Node.js 16+
- npm or yarn
- PostgreSQL database
- Redis server
- Google Cloud account with Drive API enabled

### Local Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/sanjesh17/bubbleshare-client.git
cd bubbleshare
```

#### 2. Set Up Google Drive Service Account

1. Go to the Google Cloud Console and create a new project
2. Enable the Google Drive API for your project
3. Create a service account with appropriate Drive permissions
4. Generate and download the service account key as `service.json`
5. Place the `service.json` file in the project root directory

#### 3. Set Up Database

1. Create a PostgreSQL database for BubbleShare
2. Run the database setup script or manually create the required tables
3. Make note of your database credentials for the environment setup

#### 4. Set Up Redis Server

1. Install Redis on your local machine
2. Start the Redis server
3. Verify Redis is running correctly with `redis-cli ping`

#### 5. Configure Environment

1. Copy the example environment file: `cp .env.example .env`
2. Update the `.env` file with your database, Redis, and Google Drive credentials

#### 6. Run the Application

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

If you have any questions or feedback, please open an issue or reach out at sanjeshrg9@gmail.com.

---

Made with ❤️ by R.G Sanjesh
