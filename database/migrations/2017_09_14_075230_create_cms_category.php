<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable("cms_category")) {
            Schema::create("cms_category", function (Blueprint $table) {
                $table->increments("id");
                $table->integer("cate_id")->default(0);
                $table->string("name", 32)->comment("分类名称");
                $table->string("cover", 256)->nullable()->comment("图片");
                $table->tinyInteger("active")->comment("是否激活：[ 0,未激活; 1,已激活 ]");
                $table->timestamps();
                $table->timestamp("deleted_at")->nullabe();
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
        Schema::dropIfExists("cms_category");
    }
}
