package models

/**
This structure is just a User before the crypt hashing, once thats done with the User struct is used
*/
type SignupRequest struct {
	FirstName string `json:"firstName" binding:"required"`
	LastName  string `json:"lastName" binding:"required"`
	Username  string `json:"username" binding:"required"`
	Email     string `json:"email" binding:"required"`
	Password  string `json:"password" binding:"required"` // Validates min length
	Zip       string `json:"zipcode"`
}

// The json:"-" tag guarantees the password hash is never accidentally sent back.
type User struct {
	ID        uint   `json:"id"` // Highly recommended if using a DB like PostgreSQL/MySQL
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"-"` // SECURITY GUARD
	Zip       string `json:"zipcode"`
}
