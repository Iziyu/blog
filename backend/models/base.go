package models

import (
	"fmt"
	"log"

	"github.com/iziyu/cms-backend/config"
	"gorm.io/driver/mysql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB(cfg *config.Config) {
	var err error
	var dialector gorm.Dialector

	switch cfg.DBDriver {
	case "mysql":
		dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
			cfg.DBUser, cfg.DBPass, cfg.DBHost, cfg.DBPort, cfg.DBName)
		dialector = mysql.Open(dsn)
	default:
		dialector = sqlite.Open(cfg.DBPath)
	}

	DB, err = gorm.Open(dialector, &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect database: %v", err)
	}

	err = DB.AutoMigrate(
		&User{},
		&Category{},
		&Article{},
		&Comment{},
		&Vote{},
		&View{},
	)
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
}
