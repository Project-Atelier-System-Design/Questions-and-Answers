# Questions-and-Answers
Server side and Database system creation got Hack Reactors SDC sprint. This repository is one part of the entire system and utilizes other repos.

[Project Atelier System Design Homepage](https://github.com/Project-Atelier-System-Design "Project-Atelier-System-Design")

[Project Atelier System Design Client Repo](https://github.com/Project-Atelier-System-Design/supernova-retail-app "Project-Atelier-System-Design Supernova Retail App")

## All terminal commands are run in Ubuntu Linux (either WSL or Linux terminal)

## File System Setup

First pull all relevant repos:

```bash
git clone https://github.com/Project-Atelier-System-Design/supernova-retail-app.git

git clone https://github.com/Project-Atelier-System-Design/Questions-and-Answers.git
```

then upload any existing data:
```bash
\\put relevant upload instructions here
```

## Postgress Installation

```bash
sudo apt -y install postgresql-14
```

## Database Setup

From your terminal, run these commands in order:

```bash
sudo service postgresql start

sudo -u postgres psql

psql postgres < QASchema.sql
```
Don't forget to redo the copy paths in the QASchema.sql document!
  
## Dependencies
Axios, ESLint, Express, Nodemon, PG, Underscore

## Usage

```bash
sudo service postgresql start    // To Start PostgreSQL 

sudo -u postgres psql    // Enter shell 

sudo service postgresql stop   // Stop PostgreSQL
```

```
\list  // Displays table of DBs

\dt    // Displays tables in DB

SELECT * FROM product;  // Displays all contents of specified (product) table
```


