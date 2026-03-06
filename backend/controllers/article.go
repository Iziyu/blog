package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/iziyu/cms-backend/models"
	"gorm.io/gorm"
)

type ArticleController struct{}

func (ac *ArticleController) List(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "10"))
	search := c.Query("search")
	cateID := c.Query("cate_id")

	if page < 1 {
		page = 1
	}
	if pageSize < 1 || pageSize > 50 {
		pageSize = 10
	}

	query := models.DB.Model(&models.Article{}).
		Preload("Category").
		Preload("User").
		Where("active = ?", 1)

	if search != "" {
		query = query.Where("title LIKE ?", "%"+search+"%")
	}
	if cateID != "" {
		query = query.Where("cate_id = ?", cateID)
	}

	var total int64
	query.Count(&total)

	var articles []models.Article
	query.Order("created_at DESC").
		Offset((page - 1) * pageSize).
		Limit(pageSize).
		Find(&articles)

	c.JSON(http.StatusOK, gin.H{
		"data":      articles,
		"total":     total,
		"page":      page,
		"page_size": pageSize,
	})
}

func (ac *ArticleController) Show(c *gin.Context) {
	id := c.Param("id")
	var article models.Article
	err := models.DB.
		Preload("Category").
		Preload("User").
		Preload("Comments", func(db *gorm.DB) *gorm.DB {
			return db.Preload("User").Order("created_at DESC")
		}).
		First(&article, id).Error

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	models.DB.Model(&article).UpdateColumn("view_cnt", gorm.Expr("view_cnt + 1"))

	c.JSON(http.StatusOK, gin.H{"data": article})
}

func (ac *ArticleController) Create(c *gin.Context) {
	userID, _ := c.Get("userID")

	var input struct {
		CateID  int    `json:"cate_id" binding:"required"`
		Title   string `json:"title" binding:"required"`
		Brief   string `json:"brief"`
		Content string `json:"content" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请求参数无效", "details": err.Error()})
		return
	}

	uid := userID.(uint)
	article := models.Article{
		UserID:  &uid,
		CateID:  input.CateID,
		Title:   input.Title,
		Brief:   input.Brief,
		Content: input.Content,
		Active:  1,
	}

	if err := models.DB.Create(&article).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "创建文章失败"})
		return
	}

	models.DB.Preload("Category").Preload("User").First(&article, article.ID)
	c.JSON(http.StatusCreated, gin.H{"data": article})
}

func (ac *ArticleController) Update(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var article models.Article
	if err := models.DB.First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	if article.UserID == nil || *article.UserID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "无权修改此文章"})
		return
	}

	var input struct {
		CateID  *int    `json:"cate_id"`
		Title   *string `json:"title"`
		Brief   *string `json:"brief"`
		Content *string `json:"content"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请求参数无效"})
		return
	}

	updates := map[string]interface{}{}
	if input.CateID != nil {
		updates["cate_id"] = *input.CateID
	}
	if input.Title != nil {
		updates["title"] = *input.Title
	}
	if input.Brief != nil {
		updates["brief"] = *input.Brief
	}
	if input.Content != nil {
		updates["content"] = *input.Content
	}

	models.DB.Model(&article).Updates(updates)
	models.DB.Preload("Category").Preload("User").First(&article, article.ID)
	c.JSON(http.StatusOK, gin.H{"data": article})
}

func (ac *ArticleController) Delete(c *gin.Context) {
	id := c.Param("id")
	userID, _ := c.Get("userID")

	var article models.Article
	if err := models.DB.First(&article, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	if article.UserID == nil || *article.UserID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "无权删除此文章"})
		return
	}

	models.DB.Delete(&article)
	c.JSON(http.StatusOK, gin.H{"message": "文章已删除"})
}
