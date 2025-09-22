# Smart AI Airline Reservation System

A modern, AI-powered airline reservation system built with Spring Boot, React.js, and Python Flask.

## Features

- Flight search and booking
- Dynamic pricing using AI
- Flight delay prediction
- User authentication
- Admin dashboard
- Responsive design

## Technology Stack

- **Backend**: Java Spring Boot
- **Frontend**: React.js with Bootstrap
- **AI Services**: Python Flask
- **Database**: MySQL
- **Build Tools**: Maven, npm

## Setup Instructions

### Prerequisites
- Java 17+
- Node.js 16+
- Python 3.8+
- MySQL 8.0+

### Backend Setup
1. Navigate to `backend/` directory
2. Configure database in `application.properties`
3. Run `mvn spring-boot:run`

### Frontend Setup
1. Navigate to `frontend/` directory
2. Run `npm install`
3. Run `npm start`

### AI Services Setup
1. Navigate to `ai-services/` directory
2. Run `pip install -r requirements.txt`
3. Run `python app.py`

### Database Setup
1. Create MySQL database
2. Run `schema.sql` to create tables
3. Import sample data

## Team Members

- Aka (You): Frontend & AI Integration
- Samson: Backend Development
- Others: Database, Testing, Documentation

## API Endpoints

- `GET /api/flights/search` - Search flights
- `POST /api/bookings` - Create booking
- `POST /api/ai/predict_price` - Get dynamic pricing
- `POST /api/ai/predict_delay` - Predict flight delays