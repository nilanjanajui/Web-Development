# SkillConnect API Contract

## POST /api/bookings

Request:
{
  "serviceId": "clx1a2b3c",
  "bookingDate": "2026-09-15",
  "startTime": "10:00",
  "notes": "Need help with React hooks"
}

Server-side derivation logic (belongs in booking.service.ts):
1. Look up service.durationMinutes. If null and priceType !== FIXED, reject 422.
2. Combine bookingDate + startTime -> startAt (UTC). Add durationMinutes -> endAt.
3. Look up provider's Availability for that dayOfWeek. Reject 400 if outside window.
4. Query existing CONFIRMED/PENDING bookings overlapping [startAt, endAt). Reject 409 on overlap.
5. Create with status: PENDING.

Response (201):
{
  "success": true,
  "message": "Booking created successfully",
  "data": { "id": "clx9z8y7x", "status": "PENDING", "startAt": "2026-09-15T10:00:00.000Z", "endAt": "2026-09-15T11:00:00.000Z" }
}

Error (409, slot taken):
{ "success": false, "message": "This time slot is no longer available", "error": { "code": "BOOKING_SLOT_CONFLICT" } }

## PATCH /api/bookings/:id/status

Request:
{ "status": "CONFIRMED" }

State machine:
PENDING   -> CONFIRMED, REJECTED, CANCELLED
CONFIRMED -> COMPLETED, CANCELLED
REJECTED  -> (terminal)
COMPLETED -> (terminal)
CANCELLED -> (terminal)

Invalid transition -> 400 INVALID_STATUS_TRANSITION

## POST /api/reviews

Request:
{ "bookingId": "clx9z8y7x", "rating": 5, "comment": "Excellent work" }

Validation order:
1. Booking exists -> 404 BOOKING_NOT_FOUND
2. booking.customerId === req.user.id -> 403 NOT_YOUR_BOOKING
3. booking.status === COMPLETED -> 400 BOOKING_NOT_COMPLETED
4. No existing review for this bookingId -> 409 REVIEW_ALREADY_EXISTS
5. 1 <= rating <= 5 -> 422