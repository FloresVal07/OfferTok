package models

type User struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"-"` // "-" means "never send this back to the frontend"
	Zip       string `json:"zipcode"`
}
