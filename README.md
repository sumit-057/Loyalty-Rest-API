# Loyalty Rewards API

> A Flask-based REST API to manage member registrations, reward points, and coupon redemption.

---

##  Table of Contents
- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
- [API Endpoints](#api-endpoints)  
- [Project Structure](#project-structure)  
- [Running Tests](#running-tests)  
- [Contributing](#contributing)  
- [License](#license)  
---

## About
Loyalty Rewards API helps businesses manage rewards systems: members register via mobile + OTP, earn points on purchases, and redeem coupons when they accumulate enough points.

---

## Features
- Member registration with mobile number and dummy OTP verification  
- JWT-based authentication  
- Points earning based on purchase amount  
- Points checking and coupon redemption  
- View owned coupons  

---

## Tech Stack
- **Flask** – Lightweight Python web framework  
- **Flask-SQLAlchemy** – ORM for managing MySQL database  
- **Flask-Migrate / Alembic** – Database migrations  
- **Flask-JWT-Extended** – JWT-based authentication  

---

## Getting Started

### Prerequisites
- Python 3.10+  
- MySQL (with database `rewards_db`)  
- (Optional) Postman for API testing  

### Installation
```bash
git clone [https://github.com/your-username/loyalty-rewards-api.git](https://github.com/sumit-057/Loyalty-Rest-API.git)
cd Loyalty-Rest-API
python -m venv venv
venv\Scripts\Activate.ps1        # on Windows PowerShell
pip install -r requirements.txt

