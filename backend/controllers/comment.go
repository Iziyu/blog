package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iziyu/cms-backend/models"
	"gorm.io/gorm"
)

type CommentController struct{}

func (cc *CommentController) Create(c *gin.Context) {
	userID, _ := c.Get("userID")
	articleID := c.Param("id")

	var article models.Article
	if err := models.DB.First(&article, articleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	var input struct {
		Content   string `json:"content" binding:"required"`
		CommentID int    `json:"comment_id"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请求参数无效"})
		return
	}

	comment := models.Comment{
		UserID:    int(userID.(uint)),
		ArticleID: int(article.ID),
		Content:   input.Content,
		CommentID: input.CommentID,
	}

	if err := models.DB.Create(&comment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "创建评论失败"})
		return
	}

	models.DB.Model(&article).UpdateColumn("comment_cnt", gorm.Expr("comment_cnt + 1"))
	models.DB.Preload("User").First(&comment, comment.ID)

	c.JSON(http.StatusCreated, gin.H{"data": comment})
}

func (cc *CommentController) List(c *gin.Context) {
	articleID := c.Param("id")
	var comments []models.Comment
	models.DB.Where("article_id = ?", articleID).
		Preload("User").
		Order("created_at DESC").
		Find(&comments)
	c.JSON(http.StatusOK, gin.H{"data": comments})
}
