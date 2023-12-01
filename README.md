# SAC Fullnet

## Table of Contents

- [About](#about)
- [Backend Information](#backend-information)
- [React Frontend Information](#react-frontend-information)
- [PostgreSQL Information](#postgresSQL-Information)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

The SAC Fullnet project is a full-stack application developed with React and Java 17 Spring for a SAC (Service Access Center). Its primary purpose is to provide a central platform for managing customer service interactions and support requests.

## Backend Information <a name = "backend-information"></a>

### Project Structure

The backend of the SAC Fullnet project is based on Spring Boot, and its `pom.xml` file specifies the project's dependencies, including Java 17 and various Spring Boot starters.

#### Backend Dependencies

- `spring-boot-starter-web`: For setting up a Spring-based web application.
- `jackson-databind`: The Jackson data-binding library for JSON processing.
- `spring-boot-starter-security`: Provides security features for the Spring Boot application.
- `spring-boot-starter-test`: Includes testing tools for Spring Boot applications.
- `java-jwt`: Provides support for JSON Web Tokens (JWT).
- `postgresql`: A PostgreSQL database driver.

### Prerequisites

Before you begin with the backend portion of this project, ensure that you have the required prerequisites installed:

- [Java 17](https://www.oracle.com/java/technologies/javase-downloads.html)
- [Maven](https://maven.apache.org/download.cgi)

You can verify that these prerequisites are installed using the following commands:

### Check java Version

```
java -version
```

### Check Maven Version
```
mvn -v
```

### Installing

Follow these steps to set up the backend development environment:

Clone the Repository: Clone this project repository to your local machine.

```
git clone https://github.com/Chamfrado/Fullnet
```
Navigate to the Backend Directory:

```
cd  sacfullnet/Backend/
```

Build the Backend: Build the backend application using Maven.

```
mvn clean install
```

Run the Backend: Start the Spring Boot backend.

```
mvn spring-boot:run
```
Access the Backend: The backend API can be accessed at http://localhost:8080. You can explore the available endpoints and test the API using tools like Postman or curl.


## React Frontend Information <a name = "react-frontend-information"></a>

### Project Structure
The frontend of the SAC Fullnet project is developed using React and managed by npm. The package.json file specifies the project's dependencies and scripts.

### Frontend Dependencies
axios: A promise-based HTTP client for making API requests.
react-icons: Icons library for React applications.
react-router-dom: Provides routing and navigation for React applications.
reactstrap: A UI component library for React.

### Prerequisites
Before you begin with the React frontend, ensure that you have Node.js and npm installed on your system.

You can verify that these prerequisites are installed using the following commands:

```
# Check Node.js version
node -v

# Check npm version
npm -v
```
### Installing

Follow these steps to set up the React frontend development environment:

If you already got the project, ignore this part, Clone the Repository: Clone this project repository to your local machine.

```
git clone https://github.com/Chamfrado/Fullnet
```

Navigate to the Frontend Directory: Change your current working directory to the frontend directory.

```
cd sacfullnet/Frontend/sac-fullnet
```

Install Dependencies: Install the required project dependencies.

```
npm install
```


Start the Frontend: Start the React frontend application.

```
npm start
```

Access the Frontend: The React frontend can be accessed at http://localhost:3000 in your web browser. You can interact with the user interface and explore the features of the application.

## PostgreSQL Information <a name = "postgresSQL-Information"></a>

### Installing
Follow these steps to set up the PostgreSQL database for the fullnet application:

Install PostgreSQL: If you haven't already, you can download and install PostgreSQL from the official website: PostgreSQL Downloads.

Create the Database:

Open a terminal or command prompt and log in to PostgreSQL using the psql command with a user that has the necessary privileges:

```
psql -U your_postgres_user
```

Replace your_postgres_user with the actual PostgreSQL username you want to use.

Run DDL and DML Scripts:

Navigate to the directory where you have stored the DDL and DML SQL scripts (e.g., Fullnet/Utilitys/BD).

Use the psql command to run the DDL and DML scripts to create and populate the fullnet database:

```
psql -U your_postgres_user -d fullnet -a -f ddl_script.sql
psql -U your_postgres_user -d fullnet -a -f dml_script.sql
```
Replace your_postgres_user with your PostgreSQL username and ddl_script.sql and dml_script.sql with the actual names of your DDL and DML SQL script files.

Verify Database Creation:

You can verify that the fullnet database has been created and populated by connecting to it:

```
psql -U your_postgres_user -d fullnet
```
This should open the PostgreSQL command-line interface for the fullnet database.

After this just go to Backend\src\java\br\com\sacfullnet\sacfullnet\repository\connection and configure with your credentials

Now, you have successfully installed the PostgreSQL database, created the fullnet database, and executed the DDL and DML scripts.

### In App Credentials
The default credentials is:

```
ADMIN ROLE: user: admin and password: 1524
USER ROLE: user: user and password: 1524
```

### Contributing
If you would like to contribute to our project, please refer to our Contributing Guidelines for more information.

We welcome contributions from the community and appreciate your support in making our project even better.

Lohran Cintra aka Chamfrado - Project Maintainer
