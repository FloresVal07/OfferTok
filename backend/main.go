package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"os"

	"github.com/FloresVal07/OfferTok/models"
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

		fmt.Printf("ID: %d, %s %s, (%s), Email: %s, Password: %s, Zip: %s, Is Active: %t, Created At: %s\n", id, firstName, lastName, username, email, password, zip, isActive, createdAt)
	}
	defer db.Close()

	/*r := gin.Default()

	//setup cors config to restrict access
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"}, // Allows any device to connect
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.GET("/ping", tester)
	r.POST("/signup", testingSignup)
	r.Run("0.0.0.0:8080")
	*/
}
