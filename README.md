# File Upload Project

A comprehensive web application for uploading images and videos to the server and cloudinary platform . The application uses Express.js as the backend framework, `express-fileupload` middleware for handling file uploads, and integrates with the Cloudinary platform(media management platform ) for cloud storage. Files are stored both locally on the server and on Cloudinary. Additionally, an automated email notification is sent upon successful upload to the mail given in request.

## Features

- File Upload: Users can upload image and video files.
- Local Storage: Uploaded files are saved on the server for quick access.
- Cloud Storage: Files are uploaded to Cloudinary for reliable cloud-based storage.
- Email Notifications: Automated emails are sent to notify users of successful uploads.
- Robust Backend: Powered by Express.js and `express-fileupload` middleware for efficient handling of file uploads.

## Technologies Used

- **Backend Framework:** Express.js
- **File Upload Middleware:** express-fileupload
- **Cloud Storage:** Cloudinary
- **Email Service:** NodeMailer
- **Environment Management:** dotenv


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/chirania-kunal/FileUploaderBDprojecct.git
   cd FileUpload
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```env
   CLOUD_NAME = your-cloud-name
   API_KEY = your-api-key
   API_SECRET = your-api-secret
   PORT = 3000
   MONGODB_URL =  ""
   EMAIL_SERVICE=your-email-service-provider
   EMAIL_USER=your-email@example.com
   EMAIL_PASSWORD=your-email-password
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Upload File
- **Endpoint:** `POST /upload`
- **Description:** Uploads an image or video file to the server and Cloudinary.
- **Request:**
  - `file`: Multipart file (image or video)
- **Response:**
  - Success message with file details and Cloudinary URL.

## Directory Structure
## Directory Structure
```
file-upload-project/
├── public/               # Directory for local file storage
├── routes/
│   └── FileUpload.js     # Route for handling file uploads
├── config/
│   ├── database.js       # Database connection with MongoDB
│   └── cloudinary.js     # Cloudinary configuration and integration
├── controllers/
│   ├── ImageUpload.js          # Controller for handling image uploads
│   ├── VideoUpload.js          # Controller for handling video uploads
│   ├── ImageReduceUpload.js    # Controller for handling image reduction and upload
│   └── LocalFileUpload.js      # Controller for handling local file uploads
├── .env                  # Environment variables
├── index.js              # Main application file 
├── package.json          # Node.js dependencies and scripts
└── README.md             # Project documentation
```

## Implementation Details

1. **File Upload:**
   - Files are uploaded through an API endpoint using `express-fileupload` middleware.
   - Validation is performed to ensure that only images and videos are accepted.

2. **Local Storage:**
   - Files are saved in the `public/` directory on the server.

3. **Cloudinary Integration:**
   - Cloudinary API is used to upload files to the cloud.
   - Returns a secure URL for the uploaded file.

4. **Email Notification:**
   - After a successful upload, an email is sent to the user with details of the upload and the Cloudinary URL.
   - NodeMailer is used for sending emails.

## Example Response

**Success Response:**
```json
{
  "message": "File uploaded successfully",
  "localFilePath": "public/uploads/filename.jpg",
  "cloudinaryUrl": "https://res.cloudinary.com/your-cloud-name/image/upload/v123456789/filename.jpg"
}
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Cloudinary](https://cloudinary.com/)
- [NodeMailer](https://nodemailer.com/)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
