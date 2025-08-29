# Database Schema and Sample Data

This document outlines the database schema and sample data for the loyalty program project, as defined in the `app/models.py` file.

## Database Schema

### 1. `members` Table
**Purpose**: Stores information about members, including their name, mobile number, verification status, and total points.

| Column       | Data Type        | Constraints                     |
|--------------|------------------|---------------------------------|
| id           | INT              | PRIMARY KEY                     |
| name         | VARCHAR(120)     |                                 |
| mobile       | VARCHAR(20)      | UNIQUE, NOT NULL                |
| is_verified  | BOOLEAN          | DEFAULT False                   |
| points       | INT              | DEFAULT 0                       |
| created_at   | DATETIME         |                                 |

### 2. `otps` Table
**Purpose**: Stores one-time passwords (OTPs) used for mobile number verification.

| Column       | Data Type        | Constraints                     |
|--------------|------------------|---------------------------------|
| id           | INT              | PRIMARY KEY                     |
| member_id    | INT              | FOREIGN KEY, NOT NULL           |
| code         | VARCHAR(6)       | NOT NULL                        |
| created_at   | DATETIME         |                                 |
| is_used      | BOOLEAN          | DEFAULT False                   |

### 3. `points_txns` Table
**Purpose**: Tracks records of points transactions, such as points earned from purchases.

| Column        | Data Type        | Constraints                     |
|---------------|------------------|---------------------------------|
| id            | INT              | PRIMARY KEY                     |
| member_id     | INT              | FOREIGN KEY, NOT NULL           |
| rupees        | INT              | NOT NULL                        |
| points_added  | INT              | NOT NULL                        |
| created_at    | DATETIME         |                                 |

### 4. `coupons` Table
**Purpose**: Stores information about redeemed coupons.

| Column        | Data Type        | Constraints                     |
|---------------|------------------|---------------------------------|
| id            | INT              | PRIMARY KEY                     |
| member_id     | INT              | FOREIGN KEY, NOT NULL           |
| code          | VARCHAR(32)      | UNIQUE, NOT NULL                |
| value_rupees  | INT              | NOT NULL                        |
| points_spent  | INT              | NOT NULL                        |
| created_at    | DATETIME         |                                 |

## Sample Data

### 1. `members` Table
| id | name  | mobile      | is_verified | points | created_at          |
|----|-------|-------------|-------------|--------|---------------------|
| 1  | Sumit | 9876543210  | 1           | 150    | 2025-08-29 21:00:00 |
| 2  | Aman  | 9988776655  | 1           | 0      | 2025-08-29 21:05:00 |

### 2. `otps` Table
| id | member_id | code   | created_at          | is_used |
|----|-----------|--------|---------------------|---------|
| 1  | 1         | 123456 | 2025-08-29 21:00:10 | 1       |
| 2  | 2         | 123456 | 2025-08-29 21:05:15 | 1       |

### 3. `points_txns` Table
| id | member_id | rupees | points_added | created_at          |
|----|-----------|--------|--------------|---------------------|
| 1  | 1         | 1000   | 100          | 2025-08-29 21:10:00 |
| 2  | 1         | 500    | 50           | 2025-08-29 21:12:00 |

### 4. `coupons` Table
| id | member_id | code           | value_rupees | points_spent | created_at          |
|----|-----------|----------------|--------------|--------------|---------------------|
| 1  | 1         | CPN-ABC-123-XYZ | 50           | 500          | 2025-08-29 21:15:00 |

---

This document is generated based on the `app/models.py` file for the project.