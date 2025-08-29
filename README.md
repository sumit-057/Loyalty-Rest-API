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
---

## About
Loyalty Rewards API helps businesses manage rewards systems: members register via mobile + OTP, earn points on purchases, and redeem coupons when they accumulate enough points.

---
## PostMan URL
https://sumitsolanki-3191248.postman.co/workspace/Sumit-Solanki's-Workspace~b7a50add-c90c-4483-867e-1e15b5e0db3d/collection/47928026-8235728f-8a48-49b5-8382-109d1cd1c95f?action=share&creator=47928026

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
```
### Initialize Database
```bash
flask db init
flask db migrate -m "initial migration"
flask db upgrade
```
### Run the Server
```bash
python run.py
```

### API Endpoints
| # | Endpoint                   | Method | Description                                     |
| - | -------------------------- | ------ | ----------------------------------------------- |
| 1 | `/api/member/register`     | POST   | Register member via mobile; returns `member_id` |
| 2 | `/api/member/verify`       | POST   | Verify OTP; returns `access_token`              |
| 3 | `/api/points/add`          | POST   | Add points based on rupees                      |
| 4 | `/api/points/<member_id>`  | GET    | View current points                             |
| 5 | `/api/coupons/redeem`      | POST   | Redeem points for coupon                        |
| 6 | `/api/coupons/<member_id>` | GET    | View member’s coupons                           |

