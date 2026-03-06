package main

import (
	"log"

	"github.com/iziyu/cms-backend/config"
	"github.com/iziyu/cms-backend/models"
	"github.com/iziyu/cms-backend/routes"
)

func main() {
	cfg := config.Load()

	models.InitDB(cfg)

	r := routes.Setup(cfg)

	log.Printf("Server starting on :%s", cfg.ServerPort)
	if err := r.Run(":" + cfg.ServerPort); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
