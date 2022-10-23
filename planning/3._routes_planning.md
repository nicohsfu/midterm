# Routes
- User management  / Authentication
- Order management
- Food management
- Admin add/delete
- Status management


- (GETs typically comes with POSTs)

## User management  / Authentication
- User GET /

## Order management 
- User POST /cart
- User PATCH /cart/:cartid/edit
- User DELETE /cart/:cartid/delete
- User POST /order_status
- User GET /order_status

## Food management
- Admin GET /foods/admin
- Admin POST /foods/admin
- Admin GET /foods/admin/:foodid
- Admin PATCH /foods/admin/:foodid/edit
- Admin DELETE /foods/admin/:foodid/delete

## Status management
- Admin PATCH /order_status/admin/:order_id/edit

