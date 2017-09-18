<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsCategory extends Model
{
    protected $table = "cms_category";
    protected $guarded = ["id"];

    public function articles()
    {
        return $this->hasMany(CmsArticle::class, "cate_id");
    }

    public function parent()
    {
        return $this->belongsTo(static::class, "cate_id");
    }

    public function children()
    {
        return $this->hasMany(static::class, "cate_id");
    }
}