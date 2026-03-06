package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/iziyu/cms-backend/models"
	"gorm.io/gorm"
)

type VoteController struct{}

func (vc *VoteController) Toggle(c *gin.Context) {
	userID, _ := c.Get("userID")
	articleID := c.Param("id")

	var article models.Article
	if err := models.DB.First(&article, articleID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	var vote models.Vote
	err := models.DB.Where("user_id = ? AND article_id = ?", userID, article.ID).First(&vote).Error

	if err != nil {
		vote = models.Vote{
			UserID:    int(userID.(uint)),
			ArticleID: int(article.ID),
			Active:    1,
		}
		models.DB.Create(&vote)
		models.DB.Model(&article).UpdateColumn("vote_cnt", gorm.Expr("vote_cnt + 1"))
		c.JSON(http.StatusOK, gin.H{"voted": true, "vote_cnt": article.VoteCnt + 1})
	} else if vote.Active == 1 {
		models.DB.Model(&vote).Update("active", 0)
		models.DB.Model(&article).UpdateColumn("vote_cnt", gorm.Expr("vote_cnt - 1"))
		c.JSON(http.StatusOK, gin.H{"voted": false, "vote_cnt": article.VoteCnt - 1})
	} else {
		models.DB.Model(&vote).Update("active", 1)
		models.DB.Model(&article).UpdateColumn("vote_cnt", gorm.Expr("vote_cnt + 1"))
		c.JSON(http.StatusOK, gin.H{"voted": true, "vote_cnt": article.VoteCnt + 1})
	}
}

func (vc *VoteController) Status(c *gin.Context) {
	articleID := c.Param("id")
	userID, exists := c.Get("userID")

	voted := false
	if exists {
		var vote models.Vote
		err := models.DB.Where("user_id = ? AND article_id = ? AND active = 1", userID, articleID).First(&vote).Error
		voted = err == nil
	}

	c.JSON(http.StatusOK, gin.H{"voted": voted})
}
