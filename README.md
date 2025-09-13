# NGO Bridge — Prototype

## Prereqs
- Node.js 18+
- npm or yarn
- MongoDB Atlas (or local MongoDB)

## Backend setup
cd backend
cp .env.example .env
# Edit .env with MONGO_URI and JWT_SECRET
npm install
npm run seed   # optional: create demo data
npm run dev    # starts server on port 5000

## Frontend setup
cd frontend
npm install
# set API base if needed:
# create .env with VITE_API_BASE=http://localhost:5000/api
npm run dev    # starts on http://localhost:5173

Open the frontend in browser. Register an NGO account then create a request.
