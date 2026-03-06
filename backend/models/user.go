package models

import (
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID            uint           `json:"id" gorm:"primaryKey"`
	Name          string         `json:"name" gorm:"size:255"`
	Email         *string        `json:"email" gorm:"size:64;uniqueIndex"`
	Mobile        *string        `json:"mobile" gorm:"size:16;uniqueIndex"`
	Password      string         `json:"-" gorm:"size:255"`
	Sex           *int8          `json:"sex"`
	RememberToken string         `json:"-" gorm:"size:100"`
	CreatedAt     time.Time      `json:"created_at"`
	UpdatedAt     time.Time      `json:"updated_at"`
}

func (User) TableName() string {
	return "user_info"
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	hashed, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashed)
	return nil
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
	return err == nil
}
