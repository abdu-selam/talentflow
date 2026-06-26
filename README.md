
# TalentFlow

> A simple, modern talent discovery and career tracking system built with vanilla web technologies.

TalentFlow helps users explore career opportunities, manage profiles, and interact with structured talent data through a clean and responsive web interface.

---

# Live Overview

TalentFlow is a lightweight full-stack web application built using:

- ***Frontend***: HTML, CSS, JavaScript  
- ***Backend***: PHP  
- ***Database***: MySQL  

It is designed for simplicity, speed, and clarity — without heavy frameworks.

---

# Features

## User Features
- Create and manage user profiles  
- View and explore talent listings  
- Update personal career information  
- Responsive UI for mobile and desktop  

## System Features
- Secure PHP-based backend API  
- MySQL relational database structure  
- Clean separation between client and server  
- Lightweight and fast performance  

---

# Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP |
| Database | MySQL |

---

# Project Structure

```bash
talentflow/
    ├── about           # about page
    ├── admin           # all admin pages goes here
    ├── api             # all backend logic apear in this folder
    │   ├── admin
    │   ├── auth        # auth related backend logics
    │   ├── client
    │   ├── composer.json
    │   ├── composer.lock
    │   ├── config      # email client configurations are here
    │   │   └── mail.php
    │   ├── db          # database connection configuration is here
    │   │   └── db.php
    │   ├── freelancer
    │   ├── index.php
    │   ├── models      # all php representation for database tables written here
    │   ├── services
    │   ├── start.php   # entry point to start the app
    │   ├── start.sql   # enstry schema to build tables and database
    │   └── utils       # utility functions written here
    ├── auth            # auth related frontend pages are here
    ├── client          # client dashboard pages 
    ├── favicon.ico
    ├── favicon.png
    ├── fonts
    ├── freelancer      # freelancer dashboard pages
    ├── images          # all static images are here
    ├── index.html
    ├── jobs            # jobs list and single job pages 
    ├── scripts         # all JavaScript files
    └── styles          # all css files
```

# Configuration

1. First add this project on xampp htdocs or any server that can serve php.
2. create **.env** file in the api folder and add essential environment variables in it (as the following)
```bash
DB_HOST_NAME=<'your_database_host'>
DB_NAME=<'your_database_name'>
DB_USER_NAME=<'your_database_username'>
DB_PASSWORD=<'your_database_user_password'>
DEV_ENV=<'development or production'>
EMAIL_USER_NAME=<'your_email'>
EMAIL_PASSWORD=<'your_email_app_password'>
```
3. install essential packages for accessing .env and sending email in the api folder
```bash
cd api
composer install
```
4. upload start.sql on your phpmyadmin or on your mysql database
5. then run start.sql one time on your browser

> http://localhost/talentflow/api/start.sql



