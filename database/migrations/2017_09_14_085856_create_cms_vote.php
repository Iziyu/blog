<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsVote extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('cms_vote')) {
            Schema::create('cms_vote', function (Blueprint $table) {
                $table->increments('id');
                $table->integer('user_id')->comment('点赞用户');
                $table->integer('article_id')->comment('点赞文章');
                $table->tinyInteger('active')->comment('是否生效：[ 0,无效; 1,有效 ]');
                $table->timestamps();
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
        Schema::dropIfExists('cms_vote');
    }
}
