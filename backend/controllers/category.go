package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iziyu/cms-backend/models"
)

type CategoryController struct{}

func (cc *CategoryController) List(c *gin.Context) {
	var categories []models.Category
	models.DB.Where("active = ?", 1).Order("id ASC").Find(&categories)
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func (cc *CategoryController) Show(c *gin.Context) {
	id := c.Param("id")
	var category models.Category
	if err := models.DB.First(&category, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "分类不存在"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": category})
}
