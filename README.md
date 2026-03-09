# User Updater Service

Guide

## What this system does

The User Updater Service allows you to:

Update user Name, Surname, Password and Status

View the responses from the backend

The system consists of:

A web interface (frontend) used to update user information

A backend API that processes the updates

Two databases where the user and logs information is stored

## How to access the system

Frontend (Web Interface)

[https://frontend-cm2-production.up.railway.app/](https://frontend-cm2-production.up.railway.app/)

Backend API repository (used by the frontend)

[https://github.com/juanjose8549/CM_2](https://github.com/juanjose8549/CM_2)

## Typical workflow

Open the frontend web interface

In "IDs Requeridos, field: ID de Usuario" type 1

In "IDs Requeridos, field: ID de quien actualiza" type 1

Fill "User Data to Update, section"

The changes will immediately update the system database.

You will see success or error messages bellow.

## When something goes wrong

Frontend not loading:

Check internet connection

Wait 5 min for the frontend app cold restart

Update fails:

Check internet connection

Wait 5 min for the backend server cold restart

Contact:
[https://github.com/juanjose8549](https://github.com/juanjose8549)

# System Overview

What pieces exist

## System Architecture

The system contains three components:
Frontend (React web application where users interact with the system)
Backend(FastAPI service that processes requests and updates the databases)
Databases(PostgreSQL database updating users records and MongoDB storing logs)

## Run the system locally in the development mode

Clone this repository to you local machine(make sure you are are using Node 18+)

### `npm install`

create a local .env file from .env.example and set the backend: REACT_APP_API_URL=

### `npm start`

