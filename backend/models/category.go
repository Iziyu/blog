package models

import (
	"time"

	"gorm.io/gorm"
)

type Category struct {
	ID          uint           `json:"id" gorm:"primaryKey"`
	CateID      int            `json:"cate_id" gorm:"default:0"`
	Name        string         `json:"name" gorm:"size:16;uniqueIndex"`
	DisplayName string         `json:"display_name" gorm:"size:32"`
	Cover       *string        `json:"cover" gorm:"size:256"`
	Active      int8           `json:"active"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `json:"-" gorm:"index"`

	Articles []Article `json:"articles,omitempty" gorm:"foreignKey:CateID"`
	Children []Category `json:"children,omitempty" gorm:"foreignKey:CateID"`
}

func (Category) TableName() string {
	return "cms_category"
}
