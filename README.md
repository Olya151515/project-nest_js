# Car Sales Platform API

This is a backend project built using the [NestJS](https://nestjs.com/) framework. The platform serves as a marketplace for selling and buying cars.

---

## Features Overview

### **1. User Roles**
The platform supports four primary roles with distinct permissions:

1. **Buyer**
    - Browses the platform.
    - Can contact sellers for test drives, inspections, etc.

2. **Seller**
    - Posts advertisements for selling cars.
    - Default account type is *Basic*, with an option to upgrade to *Premium*.

3. **Manager**
    - Manages platform content.
    - Can ban users, delete invalid advertisements, and review flagged ads.
    - Can only be created by an **Administrator**.

4. **Administrator**
    - Superuser with full control over the platform.
    - Only the client and their partners can have this role.


### **2. Account Types**

1. **Basic Account** (Default)
    - Sellers can post **only one car advertisement** at a time.

2. **Premium Account** (Paid)
    - Unlimited car advertisements.


---


#### **Ad Content Moderation**
- Automated checks for inappropriate language.
- Workflow:
    1. If inappropriate content is found, the seller can edit the ad (up to **3 attempts**).
    2. After 3 failed attempts, the ad becomes inactive and a manager is notified for review.

---
#### **Running the Application:**
1.  npm run start:dev	-   Starts the application in development mode with live reload.
2.  npm run start:debug  - 	Starts the application in debug mode with live reload.
3. npm run start:docker:local -	Starts the application in a Docker environment using the docker-compose.local.yaml file.
4. npm run migration:generate - 	Generates a new migration file based on changes in entities. Use with --name=<migration-name>.
5.  npm run migration:run -	Applies all pending migrations to the database.
6. npm run migration:revert -	Reverts the last applied migration.
