<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable("user_info")) {
            Schema::create("user_info", function (Blueprint $table) {
                $table->increments("id");
                $table->string("name")->nullable();
                $table->string("email")->unique()->nullable();
                $table->string("mobile", 16)->unique()->nullable();
                $table->string("password");
                $table->tinyInteger("sex")->nullable();
                $table->rememberToken();
                $table->timestamps();
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
        Schema::dropIfExists("user_info");
    }
}
