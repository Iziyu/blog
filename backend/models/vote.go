package models

import (
	"time"
)

type Vote struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    int       `json:"user_id" gorm:"index"`
	ArticleID int       `json:"article_id" gorm:"index"`
	Active    int8      `json:"active"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	User    *User    `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Article *Article `json:"article,omitempty" gorm:"foreignKey:ArticleID"`
}

func (Vote) TableName() string {
	return "cms_vote"
}
