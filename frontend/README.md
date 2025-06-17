Mini Task Manager

A simple full-stack CRUD application to manage tasks, built with:

Frontend: Next.js + Tailwind CSS  
Backend: Express.js  
Database: PostgreSQL  

Description

This project is a beginner-friendly task manager app that demonstrates:

Creating, reading, updating, and deleting tasks (CRUD)
Full-stack integration with persistent storage
Basic responsive UI with Tailwind CSS
Database-backed REST API with Express and PostgreSQL

Table of Contents

1. Requirements
2. Setup(Backend and Frontend) and Installation
3. Usage

1.Requirements

Make sure you have the following installed:

Node.js : https://nodejs.org/ (v16+)
npm : https://www.npmjs.com/
PostgreSQL : https://www.postgresql.org/

2.Setup & Installation

Clone the repository:

git clone https://github.com/yourusername/mini-task-manager.git
cd mini-task-manager

Setup Backend:

Step 1: cd backend
npm install
Step 2: Create a .env file in backend folder with contents:
	DB_USER=admin
DB_PASSWORD=admin
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tasksdb
SERVER_PORT=4000
Step 3: Install Postgresql
	As I used brew to install postgresql: brew install postgresql
	Ensure postgresql is running: brew services start postgresql 
Step 4: Initialize the database:
	psql -h localhost -U postgres -d postgres -c "CREATE ROLE admin WITH LOGIN PASSWORD 'admin' CREATEDB;"
createdb -h localhost -U admin tasksdb
psql -h localhost -U admin -d tasksdb -c "CREATE TABLE IF NOT EXISTS tasks (
 	id SERIAL PRIMARY KEY,
  	title TEXT NOT NULL,
  	status TEXT NOT NULL DEFAULT 'pending',
  	created_at TIMESTAMP NOT NULL DEFAULT NOW()
);"
Step 5: Start backend 
	 node app.js

Setup Frontend:

Step 1: Open a new terminal(Directory project folder) and run the below commands.
cd frontend
npm install
npm run dev
Step 2: Open this in your browser: http://localhost:3000

3.Usage

Add a new task — enter title & click Add
Edit an existing task — click Edit and enter a new title
Toggle status — click Mark Done / Mark Pending
Delete a task — click Delete


Data is stored in PostgreSQL and persists across restarts