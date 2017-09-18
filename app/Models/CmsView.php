<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsView extends Model
{
    protected $table = "cms_view";
    protected $guarded = ["id"];

    public function article()
    {
        return $this->belongsTo(CmsArticle::class, "article_id");
    }

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }
}