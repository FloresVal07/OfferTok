package main

import (
	"fmt"
	"net/http"
	"reflect"

	"github.com/FloresVal07/OfferTok/models"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func printUser(user *models.User) {
	v := reflect.Indirect(reflect.ValueOf(user))
	typeOfS := v.Type()

	for i := 0; i < v.NumField(); i++ {
		fmt.Printf("Field: %s\t Value: %v\n", typeOfS.Field(i).Name, v.Field(i).Interface())
	}
}

func tester(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Offertok backend is running!",
	})
}

func testingSignup(c *gin.Context) {
	// Create an instance of your User model
	var newUser models.User

	// Bind the incoming JSON from React Native to the struct
	if err := c.ShouldBindJSON(&newUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	print("Success!")

	printUser(&newUser)

	// Now you can access newUser.Email, newUser.Username, etc.
	c.JSON(http.StatusOK, gin.H{"status": "received", "user": newUser.Username})
}

func main() {
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
	r.POST("/signup", testingSignup)
	r.Run("0.0.0.0:8080")
}
