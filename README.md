# **Project Proposal for SalonSync**

## **Introduction**

In today's fast-paced world, managing appointments and customer queues efficiently has become essential, especially in service-based industries like salons. The project "SalonSync" aims to create an online platform to automate the appointment scheduling and management process for barbers and customers. This system will simplify the communication between barbers and their clients, providing convenience and improving customer satisfaction.


## **Scope**

The scope of this project is to develop a web-based application that allows customers to set up hair-cutting appointments and enables barbers to manage these appointments effectively. The system will send email notifications at each action point, such as appointment confirmation, rejection, and reminders before the haircut. Additionally, the system will provide a feature for customers to select their desired hairstyle or get suggestions based on their face shape using machine learning.

The primary stakeholders of this system are:

- **Customers**: Individuals who want to book hair-cutting appointments and manage their hairstyle preferences.

- **Barbers**: Professionals who will manage customer queues, accept or reject appointments, and view analytics.

The project's scope is limited to managing the appointment process and providing hairstyle suggestions. It does not include payment transactions or in-depth customer relationship management features.

<sub>Next page →</sub>

**Overview of the System**

This section describes the features and use cases of the system we will develop, named “SalonSync”.


### **Users and Their Roles**

There will be two main types of users in the system with different responsibilities and permissions:

- **Customers**: Individuals who book appointments and receive hairstyle suggestions.

- **Barbers**: Professionals who manage the appointments and view customer-related analytics.


### **Use Cases of the System**

1. **Account Creation**:

   - Actors: Customer, Barber, System

   - Description: Users (both customers and barbers) can create accounts by providing the necessary information. This will allow them to access the system's features.

2. **Login**:

   - Actors: Customer, Barber, System

   - Description: Existing users can access their dashboards and manage their activities.

3. **Setting Appointments**:

   - Actors: Customer, System

   - Description: Customers can schedule appointments by selecting a date, time, and desired hairstyle. They can also upload their pictures for hairstyle suggestions.

4. **Managing Appointments**:

   - Actors: Barber, System

   - Description: Barbers can view, accept, or reject appointment requests. They can also set the time for the haircut and send notifications to customers.

<sub>Next page →</sub>

5. **Email Notifications**:

   - Actors: System

   - Description: The system will send email notifications to customers for appointment confirmation, rejection, and reminders before the haircut.

6. **Hairstyle Suggestions**:

   - Actors: Customer, System

   - Description: Using machine learning, customers can either manually select their desired hairstyle or upload a picture to get suggestions based on their face shape.

7. **Viewing Analytics**:

   - Actors: Barber, System

   - Description: Barbers can view analytics on their dashboard, including the number of customers per day and the most popular hairstyles.


## **Technology Stack**

To develop "SalonSync", we will use the following technologies:

- **Backend**: Java Spring Boot for handling the core functionalities and business logic.

- **Frontend**: React JS for building a responsive and interactive user interface.

- **Machine Learning**: Python Flask and Roboflow for providing hairstyle suggestions based on face shape.

- **Database:** MongoDB NoSQL Database, for faster query and data fetching.




**User flow diagram**

<sub><sub>![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfk1azEffOVinRIO3hxnPyIvAjK9n8MizOB_3QGPa4wLNylKaKKfHf2lO6bXOhlNnrllRjFNOWRZ0wq4AYTZ2JVCl5W0fj3f0f37EMcVqaMavZjBKF1Jva4WnVY7T9Ne1tlLXO08ZuhWRZgQIdVbbemUIcm?key=PfOWEvfI8gsS40CffSYADQ)</sub></sub>


****![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXecJpJOCVQ-LXkXf_M7fpU2MXnBp_JiYEXBmq6fCHOdKHdiPFxZEwC-2V18LL_p44GQKeBblVcJu5FKUB64jaJky-ST1Fro3vTimLp7HkpSCGxLz4sMGpFwzVkSmZZC2I1uDPTqmpB62W-yRvLfwWiRkhzH?key=PfOWEvfI8gsS40CffSYADQ)****


**ER Diagram**

![Blank diagram](https://github.com/user-attachments/assets/02c32b1e-2f94-44eb-aded-37162336cc94)


<sub>

</sub>
