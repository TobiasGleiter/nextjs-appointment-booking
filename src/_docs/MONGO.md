# 🤴🏿 MongoDb

## ❓ Frequently Asked Questions

- **How do I connect to a MongoDb collection?**
- **What collection are used in the MongoDb?**

---

## How do I connect to a MongoDb collection?

I implemented the MongoDb using the NativeDriver.
This allows to be completly indepentent.
One alterantive is "Mongoose" that uses Schemas.

What you need to know at the beginning:

-

## What collection are used in the MongoDb?

Collection:

- Appointment

Appointment collection explainted:

| Appointment | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| bookedAt    | Date   | Appointment start date                 |
| email       | String | Email of the Customer                  |
| name        | String | Name of the Customer                   |
| notes       | String | Any additional notes from the Customer |
