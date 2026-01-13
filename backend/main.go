package main

import "github.com/gin-gonic/gin"

func tester(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "Offertok backend is running!",
	})
}

func main() {
	r := gin.Default()
	r.GET("/ping", tester)
	r.Run("0.0.0.0:8080")
}
