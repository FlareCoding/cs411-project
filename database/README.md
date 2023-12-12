# Database Documentation

## Overview
This MySQL database serves as the backend storage for user information and their GitHub repositories. It is designed to work in tandem with the front-end application, allowing users to manage their GitHub repositories through a user-friendly interface.

## Database Structure
- **Tables**: The database consists of a primary table to store user data.
- **User Table**: This table includes fields such as `user_name`, `user_email`, and `repo_link`.
- **Primary Key**: The `user_email` field serves as a primary key for user identification.

## Key Features
- **User Identification**: Uses email addresses as unique identifiers for users.
- **Repository Linking**: Stores links to users' GitHub repositories.
- **Data Retrieval**: The front end retrieves user information and repository links based on the email address.

