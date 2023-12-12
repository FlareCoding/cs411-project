# Backend Documentation

## Overview
This project is an Express server application that integrates various functionalities, including user authentication, database interaction, GitHub repository manipulation, and automated comment generation using ChatGPT API. It's designed to streamline the developer workflow by providing easy access to GitHub repositories and automated documentation generation.

## Features
- **User Repository Management**: Allows users to manage their GitHub repositories, including adding, fetching, and deleting repository links from a MySQL database.
- **GitHub Repository Interaction**: Enables users to fetch repository contents and specific file contents from GitHub.
- **Automated Comment Generation**: Uses ChatGPT API to generate comments for code files in GitHub repositories.
- **User Authentication**: Users can authenticate and manage their data securely.

## API Endpoints

### `/users`
- **Method**: GET
- **Description**: Fetches all user repositories from the database.

### `/api/read_repo`
- **Method**: GET
- **Description**: Fetches contents of a GitHub repository.

### `/api/read_file_content`
- **Method**: GET
- **Description**: Retrieves content of a specific file from a GitHub repository.

### `/api/update_user`
- **Method**: POST
- **Description**: Updates user information and saves it in the database.

### `/api/get_repos_for_user`
- **Method**: GET
- **Description**: Retrieves all repository links associated with a user's email.

### `/api/remove_repo`
- **Method**: POST
- **Description**: Deletes a repository link from the database for a specific user.

### `/api/document_file`
- **Method**: GET
- **Description**: Generates documentation for a file in a GitHub repository using the ChatGPT API.

