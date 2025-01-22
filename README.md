# FAO Project Management System

This is a simple project management system developed as part of an interview for the FAO (Food and Agriculture Organization). It allows users to create, update, retrieve, and delete projects using a backend API and a frontend interface. The backend is built with Laravel, and the frontend is built using React. The system provides a way to manage a collection of projects, and it includes additional features like importing and exporting project data in Excel format.

## Features

- **Create a Project**: Add a new project with name, description, and status.
- **View Projects**: Display a list of projects with their name, description, status, and timestamps.
- **Update a Project**: Edit an existing project by updating its name, description, or status.
- **Delete a Project**: Remove a project from the database.
- **Import and Export**: Import and export project data via Excel files.

## Tech Stack

- **Backend**: Laravel (PHP)
- **Frontend**: React
- **Database**: MySQL
- **API**: [https://iamismaill.com/api/api/projects](https://iamismaill.com/api/api/projects)
- **File Handling**: Excel import and export functionality

## Features Overview

- **Project Form**: A form to create a new project with fields for name, description, and status (active, inactive, completed).
- **Project Table**: Displays a table with all projects, showing their name, description, status, and timestamps (created_at/updated_at).
- **CRUD Operations**: Users can perform CRUD (Create, Read, Update, Delete) operations on projects via the frontend.
- **Import/Export**: Users can import project data from Excel and export the project list to Excel.

## API Endpoints

- **GET** `/api/projects`: Retrieve the list of projects.(https://iamismaill.com/api/api/projects)

- **POST** `/api/projects`: Create a new project.(https://iamismaill.com/api/api/projects)
   - name,desc,status are required 

- **PUT** `/api/projects/{id}`: Update an existing project by ID. (https://iamismaill.com/api/api/projects/{id})

- **DELETE** `/api/projects/{id}`: Delete a project by ID. (https://iamismaill.com/api/api/projects/{id})

## Setup Instructions

### Backend Setup (Laravel)

1. Clone the repository:
   ```bash
   git clone https://github.com/iamismail/iamismailiamismail.git
   cd iamismailiamismail
   ```

2. Install the required PHP dependencies using Composer:
   ```bash
   composer install
   ```

3. Set up the environment configuration by copying the example `.env` file:
   ```bash
   cp .env.example .env
   ```

4. Generate the application key:
   ```bash
   php artisan key:generate
   ```

5. Set up the database configuration in the `.env` file. Ensure your database credentials are correct:
   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

6. Run the migrations to create the necessary database tables:
   ```bash
   php artisan migrate
   ```

7. (Optional) If you want to seed the database with sample data, run:
   ```bash
   php artisan db:seed
   ```

8. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

   The backend API should now be accessible at `http://localhost:8000` or at the URL provided in your `.env` file.

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the frontend directory and add the following to point to the backend API:
   ```bash
   REACT_APP_API_URL=http://localhost:8000/api/projects
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

5. Visit `http://localhost:3000` to interact with the application. Make sure the backend API is running to allow the frontend to connect properly.

### API Integration

- The backend API is hosted at [https://iamismaill.com/api/api/projects](https://iamismaill.com/api/api/projects), which allows you to manage projects via HTTP requests.
- The frontend makes requests to this API for CRUD operations, which include creating, updating, and deleting projects.

## Database Schema

```sql
CREATE TABLE `projects` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `status` ENUM('active', 'inactive', 'completed') NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Import and Export Functionality

- **Import**: You can upload an Excel file to import project data into the system.
- **Export**: You can export the project list to an Excel file for offline use.

## Screenshots

  ![image](https://github.com/user-attachments/assets/8ddaef5d-136a-4627-a5c0-b2cb8cc7a1d3)
  ![image](https://github.com/user-attachments/assets/53ac7944-0cfe-481e-bbb3-8a2df76a40fa)
  ![image](https://github.com/user-attachments/assets/d66f257d-7bcb-4455-895a-f327ce9135da)
  ![image](https://github.com/user-attachments/assets/0f4b3952-d708-4cb1-a058-535abac6d26b)
  ![image](https://github.com/user-attachments/assets/81347eda-7c82-4323-9b8e-3b305d6f009d)

## Additional Information

- The frontend is currently being deployed to my host and will be available soon.
- For more information, feel free to reach out to (https://iamismaill.com).
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
