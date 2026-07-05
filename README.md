# 🎙️ Speak2Dine – Voice-Based Restaurant Booking App

## Overview

Speak2Dine is a full-stack MERN application that allows users to book a restaurant table using their voice.
The app guides the user through a natural step-by-step conversation, collecting all necessary booking details like number of guests, date, time, cuisine preference, and any 
special requests.

It also checks the real-time weather for the chosen date and suggests indoor or outdoor seating accordingly. Once the user confirms the booking, the details are saved in the 
database and a confirmation email is sent automatically.

For admins, Speak2Dine provides a simple Admin Dashboard where they can view all bookings, track analytics such as total bookings, popular cuisines, and peak booking hours, and 
export the booking data to CSV for offline use.

This project demonstrates voice interaction, backend integration, real-world API usage, and clean data handling, making it fully functional and assessment-ready.

---

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)
![Author](https://img.shields.io/badge/Author-Prerak%20Bhatt-orange.svg)

---

## ✨ Features

### 🎙️ Voice Interaction Logic
- **Speech-to-Text (Input):** Uses the Web Speech API to transcribe user voice into real-time text data.
- **Text-to-Speech (Output):** Uses the browser’s SpeechSynthesis interface to generate the Agent’s verbal responses.
- **Natural Language Input:** Users can speak naturally (e.g., "Table for two tomorrow evening") instead of using rigid commands.


### 🗓️ Smart Date & Number Handling
- Converts spoken dates like “tomorrow” or “next Monday” into real dates using chrono-node.
- Converts spoken numbers like “two guests” into numeric values before saving.

### 🌦️ Weather-Aware Seating Suggestions
- **Fetches** real weather data from **OpenWeatherMap**.
- If rain is expected, the assistant suggests indoor seating.
- If the weather is clear, it suggests outdoor seating.
- Weather suggestions are spoken to the user as part of the conversation.

### 💾 Booking Management
- Bookings are stored in MongoDB.
- **REST APIs** support:
  - Create booking
  - Get all bookings
  - Get booking by ID
  - Cancel booking
 
### 📧 Booking Confirmation
- Email confirmation sent using Nodemailer (test SMTP)

### 📊 Admin Insights
- View all bookings in one place.
- **Analytics** for:
  - Total Bookings
  - Popular cuisines
  - Peak booking hours
- **Export** booking data to **CSV**.

---

## 🧰 Tech Stack

### 💻 Frontend
- React.js
- Web Speech API
- react-speech-recognition
- Axios
- Chart.js
- CSS (for styling components and layout)

### ⚙️ Backend
- Node.js
- Express.js

### 🗄️ Database 
- MongoDB Atlas
- Mongoose

### 🌐 External APIs 
- OpenWeatherMap API

### 🛠️ Tools

- Git + GitHub
- Postman (API testing)
- npm

---

## 📦 Installation & Setup

To get started with **Speak2Dine**, follow these steps:

### 1. Clone the repository

  ```bash
  git clone https://github.com/<prerak1910>/Speak2Dine.git
  cd Speak2Dine
  ```

### 2. Backend Setup
   
   Navigate to the `backend` directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   OPEN_WEATHER_API_KEY=your_openweathermap_key
   ```
   Run the server:

   ```bash
   npm run dev
   ```

### 3. Frontend Setup

   Navigate to the `frontend` directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

   Start the React development server:

   ```bash
   npm start
   ```

### ✅ Notes

- After running the frontend, open your browser at [http://localhost:3000](http://localhost:3000) (React default) to access the app.  
- Make sure the backend server is running before using the frontend.

---

## 🎯 Quick Test

- Click Start Booking
- Allow microphone access
- Speak naturally and follow the voice prompts
- Confirm the booking at the end

---

## 🏗 App Structure

```bash
Speak2Dine/
│
├── backend/                  # Server-side code
│   ├── server.js             # Main Express server file, sets up routes and middleware
│   ├── config/               # Configuration files
│   │   ├── db.js             # MongoDB connection setup
│   │   └── weather.js        # Fetches weather data from OpenWeatherMap API
│   ├── models/               # Database schemas
│   │   └── booking.model.js  # Booking schema for MongoDB
│   ├── controllers/          # Functions handling API logic
│   │   └── booking.controller.js # Create, read, delete bookings. Send confirmation mails using nodemailer
│   ├── routes/               # API route definitions
│   │   ├── weather.route.js  # Route for weather data (used by frontend)
│   │   ├── index.js          # Aggregates all routes
│   │   └── booking.route.js  # Routes for bookings (CRUD)
│   ├── .env                  # Environment variables (API keys, DB URI)
│   └── package.json          # Backend dependencies and scripts
│
├── frontend/                 # Client-side React app
│   ├── public/               # Static files (HTML, images, favicon)
│   └── src/
│       ├── components/       # Reusable UI components
│       │   ├── AgentBubble.js       # Displays assistant's messages
│       │   ├── BookingSummary.js    # Shows booking summary before confirmation
│       │   ├── LoadingIndicator.js  # Small Loading dynamic text while processing
│       │   └── VoiceAssistant.js    # Handles speech recognition and microphone input
│       ├── services/         # API calls to backend
│       │   └── api.js        # Axios functions for bookings and weather
│       ├── pages/            # Main pages of the app
│       │   ├── AdminDashboard.js    # View all bookings and analytics
│       │   └── Home.js              # Main voice booking page
│       ├── App.js            # Main React app
│       └── index.js          # ReactDOM render entry point
│
├── README.md                 # Approach, Project description, setup instructions, overview
└── .gitignore                # Files/folders to ignore in Git
```

---

## 🗨️ Conversation Flow

  1. Check for Booking Intent
  2. Ask number of guests
  3. Ask booking date
  4. Fetch weather for that date
  5. Suggest indoor / outdoor seating
  6. Ask booking time
  7. Ask cuisine preference
  8. Ask EmailId (not mandatory)
  9. Ask special requests
  10. Confirm and save booking
  11. Send confirmation mail with booking details to EmailID (if provided)

> The assistant never skips steps and handles both positive and negative responses.

---

## 📝 My Approach

When building Speak2Dine, I wanted the app to be **easy to use** and the **code easy to read and maintain**. Here’s how I handled the main parts of the project:

### Step-Based Conversation Flow
- Implemented a step-by-step system (state machine) for the voice interaction.
- The conversation starts at Step 1 and only moves forward when the app receives the required input.
- This ensures the assistant doesn’t skip important details, like the number of guests, and keeps the flow logical and predictable.

### Handling Dates Naturally
- People don’t always say exact dates like “January 26th.”
- Used `chrono-node` to interpret phrases like “tomorrow” or “next Friday.”
- This allows the app to store dates in a proper format that the database understands.

### Real Weather Integration
- The backend fetches **real-time weather data** using **OpenWeather API** instead of using static labels.
- The agent uses this information to give **spoken suggestions** for indoor or outdoor seating.
- Different sentences are chosen based on the forecast, giving users a more natural and helpful conversation.

### Keeping Data Clean
- Voice inputs are normalized before saving: numbers, dates, and times are stored in consistent formats.
- Ensures accurate records and avoids errors in the database.

### Organized Code Structure
- Backend logic is in **Controllers** and frontend API calls are in a single **Service file**.
- This separation makes the code easier to maintain, debug, and extend in the future.

### Custom CSS Design
- Custom CSS was written instead of using libraries/frameworks like Tailwind CSS or Material-UI.
- Keeps the app lightweight and demonstrates my ability to **create clean, modern layouts from scratch** (e.g., soft UI cards, balanced spacing).

### Tool Choices
- **Web Speech API**: free, browser-native, simple for voice input/output.
- **chrono-node**: interprets natural date phrases for consistent database storage.
- **MongoDB + Mongoose**: flexible and easy to work with for storing bookings.

---

## ⚠️ Limitations

- Voice recognition depends on browser support and microphone permissions.
- Weather forecasts are limited to the next 5 days due to API restrictions.
- Speech accuracy may vary with background noise or accents.

---

## 🏁 Conclusion

Building Speak2Dine was a great way to connect different parts of the **MERN stack** while integrating modern voice and API technologies. I focused on making the voice assistant feel helpful and intuitive, using real weather data to guide the user’s booking choices.

This project demonstrates my ability to:

- Build a full-stack MERN application from scratch.
- Work with real-time voice input/output and external APIs.
- Write clear and maintainable code for a practical use case, such as a voice-based restaurant booking system.

---

## 📈 Future Enhancements

- 🤖 **Advanced NLP Integration**  
  Moving beyond basic state management to use the OpenAI GPT API for more intelligent, free-flowing conversations.

- 🗣️ **Smart Intent Handling**  
  Improving the system's ability to handle complex variations in user input (e.g., "Book a table" vs. "Table for 2 tomorrow").

- 🇮🇳 **Multi-language Support**  
  Adding support for Hindi + English voice commands.

- 🔀 **Code-Switching Capability**  
  Allowing the AI to understand "Hinglish" (mixing Hindi and English) seamlessly during a single conversation.

- 💬 **SMS & WhatsApp Confirmations**  
  Integrating Twilio or WhatsApp APIs to send real-time booking receipts and location pins.

- 🍱 **Live Menu Integration**  
  Connecting to the restaurant's POS system to check dish availability during the voice call.

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for more info.

---

## ❤️ Built With Love

**Speak2Dine** was built with ❤️ by **Prerak Bhatt**  

Thank you for checking out the project! 🙌

---
