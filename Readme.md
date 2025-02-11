# Discord Backend 

A full-featured Discord clone built using the MERN stack (MongoDB, Express.js, React, Node.js) with additional features like server creation, real-time messaging, file uploads via AWS S3, and video calling using WebRTC.

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [Contact](#contact)

## Features
- **Server Creation:** Create and manage multiple servers.
- **Real-time Messaging:** Chat in real-time with other users.
- **File Uploads:** Upload and share files using AWS S3.
- **Video Calling:** Make video calls using WebRTC.

## Screenshots
![image upload](<./images/Screenshot 2025-02-10 232659.png>) 
![signin](<./images/Screenshot 2025-02-10 232208.png>) 
![create server](<./images/Screenshot 2025-02-10 232236.png>) 
![home page](<./images/Screenshot 2025-02-10 232328.png>) 
![video calling](<./images/Screenshot 2025-02-10 232521.png>) 
![create channels](<./images/Screenshot 2025-02-10 232553.png>)
![realtime chat](<./images/Screenshot 2025-02-10 232738.png>) 
![options](<./images/Screenshot 2025-02-10 232813.png>) 
![user invite](<./images/Screenshot 2025-02-10 232820.png>)


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AdityaBhojane/Discord-Backend.git
   cd Discord-Backend
   npm install

   ```  
2. Create a .env file in the root directory and add the following environment variables:

   ``` 
    MONGO_URL = 
    JWT_SECRET = 
    REDIS_URL = 
    REDIS_PORT =
    MAIL_ID = 
    MAIL_APP_PASSWORD =
    AWS_REGION=
    AWS_ACCESS_KEY_ID=
    AWS_ACCESS_SECRET_ID=
    AWS_BUCKET_NAME=

   ``` 
3. Start the backend server:

   ```
   cd Discord-Backend
   npm start

    // Same steps for frontend and 
    cd Discord-Frontend
    npm start

   ``` 

## Usage
Open your browser and navigate to http://localhost:3000.

Create an account or log in with existing credentials.

Start creating servers, chatting, uploading files, and making video calls.

## Technologies Used
Backend: Node.js, Express.js, MongoDB, AWS
Real-time Communication: Socket.IO etc

## Future Improvements
- Enhanced Video Calling: Add support for group video calls.and pubs sub model (advanced)
- Push Notifications: Implement push notifications for new messages and calls.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.


## Contact
Name: Aditya Bhojane
Email: adityabhojane66@gmail.com
GitHub: AdityaBhojane