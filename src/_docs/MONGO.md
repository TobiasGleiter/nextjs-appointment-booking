# 🤴🏿 MongoDb

## ❓ Frequently Asked Questions

- **How do I connect to a MongoDb collection?**
- **What collection are used in the MongoDb?**

---

## How do I connect to a MongoDb collection?

I implemented the MongoDb using the NativeDriver.
This allows to be completly indepentent.
One alterantive is "Mongoose" that uses Schemas.

## What collection are used in the MongoDb?

Collection:

- sellers (1-N)
- appointments (0-N)
- opening-time
- (local-holidays <- where do I get them?)

Sellers collection explained:

| Seller       | Type     | Description                      |
| ------------ | -------- | -------------------------------- |
| \_id         | ObjectId |                                  |
| availability | Number[] | Represents the weekdays from 0-6 |
| sellerName   | String   | Email of the seller              |

Appointments collection explainted:

| Appointment | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| \_id        | ObjectId |                                      |
| bookedAt    | Date     | Appointment start date               |
| clientEmail | String   | Email of the Client                  |
| clientName  | String   | Name of the Client                   |
| clientNotes | String   | Any additional notes from the Client |
| sellerId    | ObjectId | Reference to the seller              |

Opening-Times collection explainted:

| Opening-Time  | Type     | Description           |
| ------------- | -------- | --------------------- |
| \_id          | ObjectId |                       |
| opening-days  | Number[] | Weekdays from 0-6     |
| opening-hours | Object[] | Open- and close-times |
