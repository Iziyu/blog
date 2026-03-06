package config

import (
	"os"
)

type Config struct {
	DBDriver string
	DBHost   string
	DBPort   string
	DBName   string
	DBUser   string
	DBPass   string
	DBPath   string // for SQLite

	JWTSecret     string
	ServerPort    string
	FrontendURL   string
}

func Load() *Config {
	cfg := &Config{
		DBDriver:   getEnv("DB_DRIVER", "sqlite"),
		DBHost:     getEnv("DB_HOST", "127.0.0.1"),
		DBPort:     getEnv("DB_PORT", "3306"),
		DBName:     getEnv("DB_NAME", "cms"),
		DBUser:     getEnv("DB_USER", "root"),
		DBPass:     getEnv("DB_PASS", ""),
		DBPath:     getEnv("DB_PATH", "./cms.db"),
		JWTSecret:  getEnv("JWT_SECRET", "iziyu-cms-secret-key-change-in-production"),
		ServerPort: getEnv("SERVER_PORT", "8080"),
		FrontendURL: getEnv("FRONTEND_URL", "http://localhost:5173"),
	}
	return cfg
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
