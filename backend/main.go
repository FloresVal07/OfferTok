package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/FloresVal07/OfferTok/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

// hash el password
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func tester(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Offertok backend is running!",
	})
}

func testingSignup(c *gin.Context) {
	// Create an instance of your User model
	var req models.SignupRequest

	// Bind the incoming JSON from React Native to the struct
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//call the hashing function
	hashedPassword, err := HashPassword(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to secure password"})
		return
	}

	//map the created user to the signup info that has been passed along
	newUser := models.User{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Username:  req.Username,
		Email:     req.Email,
		Password:  hashedPassword,
		Zip:       req.Zip,
	}

	fmt.Printf("Successfully created secure user object for: %s\n", newUser.Username)

	// 5. Return success
	c.JSON(http.StatusOK, gin.H{"status": "received", "user": newUser.Username})
}

/*
*
@Param db: the database connection to be used for the query
@return: a gin.HandlerFunc that checks if the username or email already exists in the database, if it does it returns an error, otherwise it allows the request to continue to the next handler
*/
func signupUnique(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req models.UniqueProperty
		//bind body into a UniqueProperty struct
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid payload"})
			return
		}
		var usernameTaken bool
		var emailTaken bool

		//check username AND email seperately so that the front end can be more precise with the error message
		err := db.QueryRow(`SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)`, req.Username).Scan(&usernameTaken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query failed"})
			return
		}
		err = db.QueryRow(`SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`, req.Email).Scan(&emailTaken)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database query failed"})
			return
		}

		//this means either the username or email is already in use, we can specify which one is taken in the response message
		if usernameTaken || emailTaken {
			var usernameStatus string = "available"
			var emailStatus string = "available"
			if usernameTaken {
				usernameStatus = "taken"
			}
			if emailTaken {
				emailStatus = "taken"
			}
			// HTTP 409 Conflict indicates the data is already in use
			c.JSON(http.StatusConflict, gin.H{
				"available": false,
				"message": gin.H{
					"username": usernameStatus,
					"email":    emailStatus,
				},
			})
			return
		}

		// HTTP 200 OK indicates the user can proceed to the next screen
		c.JSON(http.StatusOK, gin.H{
			"available": true,
		})
	}
}

func main() {
	// load env
	godotenv.Load()

	// DB CONNECTION URI
	dbURI := os.Getenv("DB_URI")

	fmt.Println(dbURI)

	db, err := sql.Open("postgres", dbURI)
	if err != nil {
		panic(err)
	}

	rows, err := db.Query("Select * from users")
	if err != nil {
		panic(err)
	}

	fmt.Println("------DATABASE RETURNED------")
	for rows.Next() {
		//mapping response to variables
		var id int
		var username string
		var email string
		var firstName string
		var lastName string
		var zip string
		var password string
		var isActive bool
		var createdAt string
		err = rows.Scan(&id, &username, &email, &firstName, &lastName, &zip, &password, &isActive, &createdAt)
		if err != nil {
			panic(err)
		}

		//print out the user info to the console
		fmt.Printf("ID: %d, %s %s, (%s), Email: %s, Password: %s, Zip: %s, Is Active: %t, Created At: %s\n", id, firstName, lastName, username, email, password, zip, isActive, createdAt)
	}

	r := gin.Default()

	//setup cors config to restrict access
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allows any device to connect
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/ping", tester)
	r.POST("/api/signup", testingSignup)
	r.POST("/api/signupUnique", signupUnique(db))
	r.Run("0.0.0.0:8080")
	defer db.Close()
}
