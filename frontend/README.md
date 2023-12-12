# Frontend Documentation

## Overview
This React-based front-end application integrates a backend server to manage GitHub repositories and automate code documentation. It offers a user-friendly interface for users to interact with their GitHub repositories and view automated code comments generated via the backend.

## Key Features
- **User Authentication**: Supports user login and logout functionality.
- **GitHub Repository Management**: Allows users to link, view, and unlink their GitHub repositories.
- **File Selection and Viewing**: Users can select files from a linked GitHub repository and view their contents.
- **Automated Comment Generation**: Displays automated comments generated for the selected code file.
- **Interactive UI Elements**: Includes a sidebar for repository management, a header component, and interactive list items for file selection.

## Components
- `HomeScreen`: The main component that handles user interactions and displays the content.
- `Header`: A component that displays the user's information and provides logout functionality.
- `Sidebar`: Allows users to manage their GitHub repositories.
- `db-api`: Contains functions to save or delete repository information to/from the database.

## Usage
- Log in using your credentials.
- Link your GitHub repository using the sidebar.
- Select a file from the repository to view its content.
- Toggle between the original and documented (commented) code views.

## Technologies Used
- React.js
- Prism.js for code syntax highlighting.