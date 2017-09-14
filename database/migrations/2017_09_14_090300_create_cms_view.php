<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cms_view', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->comment('浏览用户');
            $table->integer('article_id')->comment('浏览文章');
            $table->tinyInteger('active')->comment('是否生效：[ 0,无效; 1,有效 ]');
            $table->timestamps();
            $table->index('user_id');
            $table->index('article_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cms_view');
    }
}
