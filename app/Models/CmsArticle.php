<?php

namespace App\Models;

use App\Services\ScopeSearchTrait;
use Illuminate\Database\Eloquent\Model;

class CmsArticle extends Model
{
    use ScopeSearchTrait;

    protected $table = "cms_article";
    protected $guarded = ["id"];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function category()
    {
        return $this->belongsTo(CmsCategory::class, "user_id");
    }

    public function comments()
    {
        return $this->hasMany(CmsComment::class, "article_id");
    }

    public function votes()
    {
        return $this->hasMany(CmsVote::class, "article_id");
    }

    public function views()
    {
        return $this->hasMany(CmsView::class, "article_id");
    }
}