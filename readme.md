# Example School API

Containerized Express/Node application with PostgresDB and Keycloak Authentication. For practice API testing.

## Prerequisites

### Mac

```bash
# If homebrew is not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

# If docker is not installed
brew cask install docker

# Required so that the token issuer matches what the node app expects
echo 127.0.0.1 keycloak >> /etc/hosts
```

## Application

(ports 3000 & 8080 must be open on your localhost)

```bash
docker compose up -d
```

API documentation will be present at: http://localhost:3000/api-docs
API Base URL: http://localhost:3000/api
Keycloak Base URL: http://keycloak:8080/auth/ credentials:(admin:admin)
Default Credentials: principal_user:password

## Usage

### Get Principal Access Token
```bash
curl --location --request POST 'http://keycloak:8080/auth/realms/school_demo/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=school_demo_nodejs' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'username=principal_user' \
--data-urlencode 'password=password'
```

### Add a Student
```bash
curl --location --request POST 'http://localhost:3000/api/students' \
--header 'Authorization: Bearer <INSERT_ACCESS_TOKEN>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "New Student",
    "grade": 10,
    "student_number": "330436780"
}'
```

A new keycloak user with role: student and credentials: new_student:password will be present
