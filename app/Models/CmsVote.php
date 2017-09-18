<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsVote extends Model
{
    protected $table = "cms_vote";
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