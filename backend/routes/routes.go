package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/iziyu/cms-backend/config"
	"github.com/iziyu/cms-backend/controllers"
	"github.com/iziyu/cms-backend/middleware"
)

func Setup(cfg *config.Config) *gin.Engine {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{cfg.FrontendURL, "http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	authCtrl := &controllers.AuthController{Cfg: cfg}
	articleCtrl := &controllers.ArticleController{}
	categoryCtrl := &controllers.CategoryController{}
	commentCtrl := &controllers.CommentController{}
	voteCtrl := &controllers.VoteController{}

	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authCtrl.Register)
			auth.POST("/login", authCtrl.Login)
			auth.GET("/me", middleware.JWTAuth(cfg), authCtrl.Me)
		}

		api.GET("/articles", articleCtrl.List)
		api.GET("/articles/:id", articleCtrl.Show)

		api.GET("/categories", categoryCtrl.List)
		api.GET("/categories/:id", categoryCtrl.Show)

		api.GET("/articles/:id/comments", commentCtrl.List)
		api.GET("/articles/:id/vote/status", middleware.OptionalJWTAuth(cfg), voteCtrl.Status)

		protected := api.Group("")
		protected.Use(middleware.JWTAuth(cfg))
		{
			protected.POST("/articles", articleCtrl.Create)
			protected.PUT("/articles/:id", articleCtrl.Update)
			protected.DELETE("/articles/:id", articleCtrl.Delete)
			protected.POST("/articles/:id/comments", commentCtrl.Create)
			protected.POST("/articles/:id/vote", voteCtrl.Toggle)
		}
	}

	return r
}
