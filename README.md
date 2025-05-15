# AI Avatar Dashboard

A responsive React application that displays AI-generated avatars with a clean, modern UI.

## Features

- Welcome header with dynamic user greeting based on time of day
- Card-based section displaying 3 dummy avatars from Reqres API
- Each avatar card shows name, preview image, and an "Edit" button
- Floating "Create New Avatar" button that opens a modal
- Fully responsive and mobile-friendly design
- Smooth animations and transitions for a polished user experience
- Dark mode support based on system preferences

## Tech Stack

- Vite - Fast build tool and development server
- React - UI library
- Tailwind CSS - Utility-first CSS framework
- Reqres API - For fetching dummy user data

## Installation

1. Clone the repository:

```bash
git clone https://github.com/vishnuu5/-AI-Avatar-Dashboard.git
cd ai-avatar-dashboard
```

## Installation Instructions

To set up and run this project:

2. Create a new Vite project with React:

```bash
npm create vite@latest ai-avatar-dashboard -- --template react
cd ai-avatar-dashboard
```

3. Install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. Install the project dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm run dev
```
