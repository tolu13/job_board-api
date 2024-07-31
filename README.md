# Job Board API

## Description
The Job Board API allows users to post job listings, apply for jobs, and manage their profiles. This API is designed to facilitate the interaction between job seekers and employers.

## Features
- **Post Job Listings**: Employers can create and manage job postings.
- **User Management**: creating and updating of User profiles- jobseekers only.
- **Apply for Jobs**: Users can apply for jobs directly through the API.
- **User Authentication**: Secure user registration and login.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node package manager)
- A MongoDB database (can be hosted on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or locally)

## Installation

1. **Clone the repository**
   git clone https://github.com/tolu13/job_board-api.git
   cd job-board-api
2. **Install dependencies**
    npm install
3. **Create a .env file** 
    In the root directory with this format 
    JWT_SECRET=
    MONGODB_URI=

4. **Start the application**
    npm start

5. **Navigate to browser**
    http://localhost:5000


## API ENDPOINTS
    **Auth**
    -- POST/api/auth/register: registers a new usertype jobseeker or company
    __ POST/api/auth/login: authenticate users and generate jwt token
    
    **Jobs**
    -- GET/api/jobs: retrieves job listings
    -- POST/api/jobs: create new job listings(requires authentication )
    -- GET/api/jobs/:job_id: retrieves details of a specific job by its id 
    --DELETE/api/jobs/:job_id: deletes a specific job listing (requires authentication)

    **Applications**
    -- POST/api/jobs/:job_id/apply: allow candidates to apply for a job.
    -- GET/api/jobs/:job_id/applications: gets all the applications for a specific job listing

    **User Profile**
    -- POST/api/user/profile: this creates a new user profile for jobseekers to showcase skills relevant to their job hunt
    -- PUT/api/user/update/profile/:id-> this allow user to update their profile 
    -- GET/api/user/profile: this get the list of all user profiles
    -- GET/api/user/profile/:id -> this endpoint get a user by its id

    **Company profile**
    -- GET/api/company/:id/jobs -> this endpoint allow users to get a specific job posted by them
    -- GET/api/company -> this gets the list of all company users
    -- POST/api/company -> this creates a usertype with company tag their profile.

## USAGE 
    -- Test using an API client like Postman to test the endpoints 
    -- ensure to use the jwt token generated at login for protected routes

## Contibution
    -- if you would like to contribute to this project, please fork and create a pull request

