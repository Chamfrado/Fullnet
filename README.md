# SAC Fullnet

## Table of Contents

- [About](#about)
- [Backend Information](#backend-information)
- [React Frontend Information](#react-frontend-information)
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

# Check java Version

```
java -version
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


## Usage <a name = "usage"></a>

Add notes about how to use the system.
