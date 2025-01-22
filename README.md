# FAO Project Management System

This is a simple project management system developed as part of an interview for the FAO (Food and Agriculture Organization). It allows users to create, update, retrieve, and delete projects using a backend API and a frontend interface. The backend is built with Laravel, and the frontend is built using React. The system provides a way to manage a collection of projects, and it includes additional features like importing and exporting project data in Excel format.

## Project Overview

Below is the architecture diagram of the project showcasing the frontend, backend, and database integration:
![image](https://github.com/user-attachments/assets/085ddbf5-4a7f-43d1-abfe-988cba9323fb)

## Features

- **Create a Project**: Add a new project with name, description, and status.
- **View Projects**: Display a list of projects with their name, description, status, and timestamps.
- **Update a Project**: Edit an existing project by updating its name, description, or status.
- **Delete a Project**: Remove a project from the database.
- **Import and Export**: Import project data via Excel files.

## Tech Stack

- **Backend**: Laravel (PHP)
- **Frontend**: React
- **Database**: MySQL
- **API**: [https://iamismaill.com/api/api/projects](https://iamismaill.com/api/api/projects)
- **File Handling**: Excel import functionality

## Features Overview

- **Project Form**: A form to create a new project with fields for name, description, and status (active, inactive, completed).
- **Project Table**: Displays a table with all projects, showing their name, description, status, and timestamps (created_at/updated_at).
- **CRUD Operations**: Users can perform CRUD (Create, Read, Update, Delete) operations on projects via the frontend.
- **Import/Export**: Users can import project data from Excel.

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

4. Set up the database configuration in the `.env` file. Ensure your database credentials are correct:
   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

5. Run the migrations to create the necessary database tables:
   ```bash
   php artisan migrate
   ```


9. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

   The backend API should now be accessible at `http://localhost:8000` or at the URL provided in your `.env` file.
   # Access the API
If you prefer not to run the Laravel API locally, you can directly access the hosted API at: https://iamismaill.com/api/api/projects
### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
### Using npm
2. Install the required dependencies using npm:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

### Using yarn
2. Install the required dependencies using yarn:
   ```bash
   yarn
   ```
3. Start the React development server:
   ```bash
   yarn start
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

- **Import**: You can upload an Excel file to import project data into the system (the file must contain Name,Description,Status).

## Screenshots
   List of Projects Screenshot
  ![image](https://github.com/user-attachments/assets/0f4b3952-d708-4cb1-a058-535abac6d26b)
  Add new project screenshot
  ![image](https://github.com/user-attachments/assets/d66f257d-7bcb-4455-895a-f327ce9135da)
  Update project screenshot
  ![image](https://github.com/user-attachments/assets/53ac7944-0cfe-481e-bbb3-8a2df76a40fa)
  ![image](https://github.com/user-attachments/assets/8ddaef5d-136a-4627-a5c0-b2cb8cc7a1d3)
  Delete project screenshot
![image](https://github.com/user-attachments/assets/d39dd90b-c239-46be-b2e3-e23b02ce6fb6)


## Additional Information

- The frontend is currently being deployed to my host and will be available soon.
- For more information, feel free to reach out to (https://iamismaill.com).
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
