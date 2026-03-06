package models

import (
	"time"

	"gorm.io/gorm"
)

type Comment struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CommentID int            `json:"comment_id" gorm:"default:0;index"`
	UserID    int            `json:"user_id" gorm:"index"`
	ArticleID int            `json:"article_id" gorm:"index"`
	Content   string         `json:"content" gorm:"size:256"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `json:"-" gorm:"index"`

	User    *User    `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Article *Article `json:"article,omitempty" gorm:"foreignKey:ArticleID"`
}

func (Comment) TableName() string {
	return "cms_comment"
}
