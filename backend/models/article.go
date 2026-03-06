package models

import (
	"time"

	"gorm.io/gorm"
)

type Article struct {
	ID         uint           `json:"id" gorm:"primaryKey"`
	UserID     *uint          `json:"user_id" gorm:"index"`
	CateID     int            `json:"cate_id" gorm:"index"`
	Title      string         `json:"title" gorm:"size:256"`
	Brief      string         `json:"brief" gorm:"size:1024"`
	Content    string         `json:"content" gorm:"type:longtext"`
	ViewCnt    int            `json:"view_cnt" gorm:"default:0"`
	VoteCnt    int            `json:"vote_cnt" gorm:"default:0"`
	CommentCnt int            `json:"comment_cnt" gorm:"default:0"`
	Active     int8           `json:"active"`
	CreatedAt  time.Time      `json:"created_at"`
	UpdatedAt  time.Time      `json:"updated_at"`
	DeletedAt  gorm.DeletedAt `json:"-" gorm:"index"`

	User     *User     `json:"user,omitempty" gorm:"foreignKey:UserID"`
	Category *Category `json:"category,omitempty" gorm:"foreignKey:CateID"`
	Comments []Comment `json:"comments,omitempty" gorm:"foreignKey:ArticleID"`
}

func (Article) TableName() string {
	return "cms_article"
}
