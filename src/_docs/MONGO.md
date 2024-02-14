# 🤴🏿 MongoDb

## ❓ Frequently Asked Questions

- **How do I connect to a MongoDb collection?**
- **What collections are used in the MongoDb?**

---

## How do I connect to a MongoDb collection?

The MongoDb implementation in this project utilizes the NativeDriver, providing complete independence. An alternative approach is using "Mongoose," which incorporates schemas.

## What collections are used in the MongoDb?

### Sellers Collection

| Field        | Type     | Description              |
| ------------ | -------- | ------------------------ |
| \_id         | ObjectId | Unique identifier        |
| availability | Number[] | Weekdays available (0-6) |
| sellerName   | String   | Name of the seller       |

The Sellers collection contains information about the sellers, including their availability on weekdays. If a weekday is set, the seller is available on that date.

### Appointments Collection

| Field       | Type     | Description                                |
| ----------- | -------- | ------------------------------------------ |
| \_id        | ObjectId | Unique identifier                          |
| bookedAt    | Date     | Appointment start date                     |
| clientEmail | String   | Email of the client                        |
| clientName  | String   | Name of the client                         |
| clientNotes | String   | Additional notes from the client           |
| sellerId    | ObjectId | Reference to the seller associated with it |

The Appointments collection stores information about booked appointments, including the date and time, client details, and the associated seller.

### Opening-Times Collection

| Field        | Type     | Description                              |
| ------------ | -------- | ---------------------------------------- |
| \_id         | ObjectId | Unique identifier                        |
| openingDays  | Number[] | Weekdays when the booking system is open |
| openingHours | Object[] | Open and close times for each day        |

The Opening-Times collection specifies the days and hours during which the appointment booking system is open. It helps determine the validity of selected dates and hours for booking appointments.
