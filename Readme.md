
# Cine_Star

Cine_Star is a cinema management system built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). The project is focused on managing cinema operations such as movie sessions, seat reservations, CRUD operations for movies, sessions, and seats, and handling authentication for different user roles (admin and client). Currently, the frontend is under development, but the backend is functional with various endpoints.

## Key Actors
- **Admin**: Responsible for managing movies, sessions, and seats.
- **Client**: Can view and make seat reservations for different movie sessions.

## Core Features
- **CRUD Operations**: Admins can create, read, update, and delete movies, seats, and sessions.
- **Reservation System**: Clients can make reservations for specific movie sessions and seats.
- **Authentication**: Role-based authentication with JWT (JSON Web Token) for securing routes and access control.

## Project Structure

```bash
CINE_STAR
├── config
│   ├── database.js           
│   └── jwt.js                
├── controllers               
├── dao                      
├── errors                  
├── middleware                
│   ├── authMiddleware.js      
│   └── roleMiddleware.js     
├── models                     
├── repositories
│   └── implementations
│   │   └── authRepository.js 
│   └──interfaces
│       └── authInterface.js  
├              
├── schema                     
├── services                   
├── tests                      
├── app.js                     
├── .dockerignore              
├── .env                       
├── .gitignore               
├── docker-compose.yaml       
└── package.json              
```

## API Endpoints

### Authentication
1. **Register Admin**:
   - `POST /auth/register`
   - Request Body:
   ```json
   {
       "email": "admin@example.com",
       "password": "hashedpassword",
       "role": "admin"
   }
   ```
   - Response Example:
   ```json
   {
       "email": "admin454589@gmail.com",
       "password": "$2b$10$POq.BP52xHGezZ6hc1Ix5Ohl5p1Xk75GDhAeY6QSJUdyWKwMc18r2",
       "role": "admin",
       "_id": "66f6f804331cc94dd7f6d85a",
       "createdAt": "2024-09-27T18:23:00.467Z",
       "updatedAt": "2024-09-27T18:23:00.467Z"
   }
   ```

### Sessions
2. **Create a Movie Session**:
   - `POST /session/create`
   - Request Body:
   ```json
   {
       "film_id": "66f5f0c6c96642e5aad9f7fa",
       "room_id": "66f5f5d8097440186a967fe2",
       "hour": "13:00",
       "date": "2023-09-15T00:00:00.000Z"
   }
   ```
   - Response Example:
   ```json
   {
       "film_id": "66f5f0c6c96642e5aad9f7fa",
       "room_id": "66f5f5d8097440186a967fe2",
       "admin_id": "66f6f804331cc94dd7f6d85c",
       "hour": "13:00",
       "date": "2023-09-15T00:00:00.000Z",
       "_id": "66f6f865331cc94dd7f6d864"
   }
   ```
   - **Authentication**: Requires Bearer Token in Authorization header:
   ```
   Authorization: Bearer <your-token-here>
   ```

## Setting Up the Project

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/OUMAIMAtakrour/Cine_star.git>
   cd cine_star
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the project and configure your environment variables:
   ```bash
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/cine_star
   JWT_SECRET=your_jwt_secret
   ```

### Running the Project

#### Using Node.js:
1. Start the application:
   ```bash
   npm start
   ```
   The backend server will run on `http://localhost:3000`.

#### Using Docker:

1. Build and run the Docker container:
   ```bash
   docker-compose up --build
   ```

   This will spin up the app using Docker, running on `http://localhost:3000`.

### Dockerfile

The project is containerized using the  `Dockerfile`:

### Testing

To run unit tests:
```bash
npm test
```
