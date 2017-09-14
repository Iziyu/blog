<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsArticle extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('cms_article')) {
            Schema::create('cms_article', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id')->nullable()->comment('文章创建者ID');
                $table->integer('cate_id')->comment('文章所属分类');
                $table->string('title', 256)->comment('文章标题');
                $table->string('brief', 1024)->comment('文章摘要');
                $table->longText('content')->comment('文章内容');
                $table->integer('view_cnt')->default(0)->comment('文章浏览数');
                $table->integer('vote_cnt')->default(0)->comment('文章点赞数');
                $table->integer('comment_cnt')->default(0)->comment('文章评论数');
                $table->tinyInteger("active")->comment('是否激活：[ 0,未激活; 1,已激活 ]');
                $table->timestamps();
                $table->timestamp('deleted_at')->nullable();
                $table->index('user_id');
                $table->index('cate_id');
            });
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cms_article');
    }
}
