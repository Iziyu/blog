<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsComment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('cms_comment')) {
            Schema::create('cms_comment', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('comment_id')->default(0)->comment('对哪个评论的评论');
                $table->integer('user_id')->comment('评论用户');
                $table->integer('article_id')->comment('评论文章');
                $table->string('content', 256)->comment('评论内容');
                $table->timestamps();
                $table->timestamp('deleted_at')->nullable();
                $table->index('comment_id');
                $table->index('user_id');
                $table->index('article_id');
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
        Schema::dropIfExists('cms_comment');
    }
}
