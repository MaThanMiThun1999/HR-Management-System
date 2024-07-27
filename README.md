## ProHR: Human Resource Management System

ProHR is a comprehensive web application designed to streamline and simplify human resource management tasks for businesses. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), ProHR offers a user-friendly interface and robust features for managing employee data, attendance, and salaries.

### Features:

**Employee Management:**

- **Create and manage employee profiles:** Add, edit, and delete employee records with detailed information such as name, email, role, contact number, address, date of joining, and profile picture.
- **Upload employee documents:** Store essential documents like Aadhar card, PAN card, and driving license for each employee. This ensures easy access and eliminates the need for physical files.
- **View employee details:** Access individual employee profiles with all their information and uploaded documents in a centralized location.
- **Search and filter employees:** Easily search and filter employees by name, role, department, or other criteria for quick information retrieval.
- **Employee Performance Tracking:** Implement a system to track employee performance metrics, allowing for better performance evaluation and development.

**Attendance Management:**

- **Record attendance:** Mark employees as present, absent, or on leave (casual or medical) with clear distinction for different attendance statuses.
- **Track leave requests:** Manage leave applications, track employee leave balances, and automatically calculate remaining leave days for each employee.
- **Generate attendance reports:** Create detailed attendance reports for individual employees or the entire organization, allowing for easy tracking of attendance patterns.
- **Visualize attendance data:** Use interactive charts (like bar charts and line charts) to analyze attendance trends and patterns over time.
- **Automated Attendance Reminders:** Set up automatic reminders for employees who have not marked their attendance for the day, ensuring consistent attendance records.

**Salary Management:**

- **Create salary reports:** Input employee salaries, calculate deductions (like taxes, PF, and insurance premiums), and generate payslips with detailed salary breakdowns.
- **Manage salary adjustments:** Update employee salaries, track salary changes over time, and implement automatic salary increments for promotions or appraisals.
- **Generate salary summaries:** View salary summaries for specific periods, including gross salary, deductions, and net salary, facilitating accurate financial reporting.
- **Visualize salary data:** Analyze salary trends and employee compensation with interactive charts, providing insights into salary distribution and compensation strategies.
- **Salary Advance Requests:** Allow employees to request salary advances with a simple approval system.

**Other Features:**

- **Secure authentication:** Protect sensitive HR data with user login and password security, ensuring data privacy and access control.
- **User-friendly dashboard:** Access important information and charts at a glance for quick insights into key HR metrics.
- **Responsive design:** Ensure optimal viewing and functionality on various devices, enabling convenient access for all users.
- **File upload and storage:** Upload and store documents securely within the application, eliminating the need for external storage.

### Diagrams:

**System Architecture:**

```
                                       +-----------------+
                                       | Frontend (React) |
                                       +-----------------+
                                           |          |
                                           |          |  API calls
                                           |          |
                                           |          v
                                       +-----------------+
                                       | Backend (Node.js) |
                                       +-----------------+
                                           |          |
                                           |          |  Database interactions
                                           |          |
                                           v          |
                                  +-----------------+     +-----------------+
                                  | MongoDB (Data)  |-----| File Storage      |
                                  +-----------------+     +-----------------+
```

**Employee Management Workflow:**

```
           +-------------------+        +-------------------+
           | Create Employee   |-------->| Update Employee     |
           +-------------------+        +-------------------+
                  |                   |
                  |                   |
                  v                   v
           +-------------------+        +-------------------+
           | View Employee     |-------->| Delete Employee    |
           +-------------------+        +-------------------+
                  |
                  |
                  v
           +-------------------+
           | Employee Details  |
           +-------------------+
```

### API Documentation

**Authentication:**

- **`POST /auth/register`:** Register a new user.
  - Request body:
    ```json
    {
      "name": "MaThanMiThun",
      "email": "mathanmithun8838@gmail.com",
      "password": "Password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully"
    }
    ```
- **`POST /auth/login`:** Login an existing user.
  - Request body:
    ```json
    {
      "email": "mathanmithun8838@gmail.com",
      "password": "Password123"
    }
    ```
  - Response:
    ```json
    {
      "token": "jwt-token",
      "user": {
        "id": "user-id",
        "name": "MaThanMiThun"
      }
    }
    ```
- **`GET /auth/profile`:** Get user profile details.
  - Response:
    ```json
    {
      "user": {
        "id": "user-id",
        "name": "MaThanMiThun"
      }
    }
    ```
- **`POST /auth/logout`:** Log out the current user.

**Employees:**

- **`GET /v1/employees`:** Get a list of all employees.
- **`GET /v1/employees/:id`:** Get details of a specific employee.
- **`POST /v1/employees`:** Create a new employee.
  - Request body:
    ```json
    {
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "role": "Software Engineer",
      "address": "123 Main Street",
      "contactNumber": "1234567890",
      "proofs": {
        "aadhar": "123456789012",
        "pan": "ABCDE1234F"
      },
      "joinedDate": "2023-10-26"
    }
    ```
- **`PUT /v1/employees/:id`:** Update details of a specific employee.
- **`DELETE /v1/employees/:id`:** Delete a specific employee.

**Attendance:**

- **`GET /v1/attendance`:** Get a list of all attendance records.
- **`GET /v1/attendance/:employeeId`:** Get attendance records for a specific employee.
- **`POST /v1/attendance`:** Create a new attendance record.
  - Request body:
    ```json
    {
      "employeeId": "employee-id",
      "date": "2023-10-26",
      "status": "present"
    }
    ```
- **`PUT /v1/attendance/:id`:** Update details of a specific attendance record.
- **`DELETE /v1/attendance/:id`:** Delete a specific attendance record.

**Salaries:**

- **`GET /v1/salaries`:** Get a list of all salary reports.
- **`GET /v1/salaries/:id`:** Get details of a specific salary report.
- **`POST /v1/salaries`:** Create a new salary report.
  - Request body:
    ```json
    {
      "employeeId": "employee-id",
      "baseSalary": 50000,
      "month": 10,
      "year": 2023
    }
    ```
- **`PUT /v1/salaries/:id`:** Update details of a specific salary report.
- **`DELETE /v1/salaries/:id`:** Delete a specific salary report.

**Other APIs:**

- **`GET /attendance/weekly`:** Get weekly attendance data for visualization.

### Technologies Used:

- **Frontend:** React.js, React Router, Tailwind CSS, Chart.js, react-chartjs-2, react-hot-toast, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Database:** MongoDB

### Getting Started:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MaThanMiThun1999/HR-Management-System.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd HR-Management-System
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Create a `.env` file:**
   ```bash
   touch .env
   ```
5. **Add your environment variables:**
   ```
   PORT=8080
   MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.hudry3b.mongodb.net/pro-hr?retryWrites=true&w=majority&appName=Cluster0
   NODE_ENV=development
   JWT_SECRET=your_secret_key
   API_VERSION=v1
   ```
   **Note:**
   - Replace `<your-username>`, `<your-password>` with your actual MongoDB credentials.
   - Replace `your_secret_key` with a strong, unique secret key for JWT authentication.
6. **Start the backend server:**
   ```bash
   npm start
   ```
7. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

### Contributing:

Contributions are welcome! Please feel free to submit pull requests or open issues for bug reports or feature requests.