# 🤴🏿 MongoDb

## ❓ Frequently Asked Questions

- **How do I connect to a MongoDb collection?**
- **What collections are used in the MongoDb?**

---

## How do I connect to a MongoDb collection?

In this project, the MongoDb implementation utilizes the NativeDriver for seamless connection, ensuring complete independence. Alternatively, you can opt for "Mongoose," which integrates schemas for added convenience.

## What collections are used in the MongoDb?

### Sellers Collection

| Field        | Type     | Description                | Implemented |
| ------------ | -------- | -------------------------- | ----------- |
| \_id         | ObjectId | Unique identifier          | 🟢          |
| availability | Object   | Availability of the Seller | 🔴          |
| sellerName   | String   | Name of the seller         | 🟢          |

The Sellers collection stores information about sellers, including their availability on weekdays. Each weekday availability can be managed separately.

### Appointments Collection

| Field       | Type     | Description                        | Implemented |
| ----------- | -------- | ---------------------------------- | ----------- |
| \_id        | ObjectId | Unique identifier                  | 🟢          |
| bookedAt    | Date     | Appointment start date             | 🟢          |
| clientEmail | String   | Email of the client                | 🟢          |
| clientName  | String   | Name of the client                 | 🟢          |
| clientNotes | String   | Additional notes from the client   | 🔴          |
| sellerId    | ObjectId | Reference to the associated seller | 🟢          |

The Appointments collection records booked appointments, including date, time, and client details.

### Opening-Times Collection

| Field    | Type     | Description                             | Implemented |
| -------- | -------- | --------------------------------------- | ----------- |
| \_id     | ObjectId | Unique identifier                       | 🟢          |
| open     | boolean  | Flag indicating if the business is open | 🟢          |
| day      | Number   | Weekdays from 0-6 (Mon-Sun)             | 🟢          |
| timeSlot | Object   | Array of possible time slots            | 🟢          |

The Opening-Times collection manages the business's operating hours, including weekdays and time slots.
