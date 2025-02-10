# FormBot

FormBot is a dynamic form builder application that allows users to create, manage, and store forms effortlessly. It features user authentication, form grouping, and a responsive UI that works across both desktop and mobile platforms.

## Features

- **User Authentication**: Secure user registration and login system with JWT-based authentication.
- **Form Creation**: Users can create custom forms with various field types.
- **Form Grouping**: Group forms into folders for better organization.
- **Form Editing/Deletion**: Edit and delete existing forms or folders.
- **Mobile/Desktop Responsiveness**: Optimized for seamless experience on both mobile and desktop devices.
- **Form Responses**: View and analyze form responses in real-time.

## Tech Stack

- **Frontend**: React.js, React Router, JSX, CSS Modules.
- **Backend**: Node.js, Express.js, JWT Authentication.
- **Database**: MongoDB for storing user and form data.
- **Deployment**: Hosted on Vercel for frontend and Render for backend.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/ponnanna-6/form-bot-frontend.git
   git clone https://github.com/ponnanna-6/form-bot-backend.git
   ```
2. Install dependencies for both frontend and backend:
   - For frontend and backend:
     ```bash
     npm install
     ```
3. Configure environment variables for the backend (e.g., database connection, JWT secret).

5. Run the app:
   - For frontend and backend:
     ```bash
     npm run dev
     ```

## Usage

- Register/Login to start using the form builder.
- Create, group, and manage your forms and folders.
- View and manage responses in real-time.
