<?php

namespace App\Http\Controllers\FrontEnd\Cms;

use App\Http\Controllers\Controller;
use App\Models\CmsArticle;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        try {
            $builder = CmsArticle::query()->with(["category"]);
            $search = $request->get("search");
            if ($search) {
                $search = explode(" ", $search);
                $builder->search($search, ["title"]);
            }
            $articles = $builder->paginate(10);
            return view("front-end.cms.index", [
                "articles" => $articles,
            ]);
        } catch (\Exception $e) {
            info(__METHOD__ . "\n" . $e->getTraceAsString());
            info($e->getCode() . " | " . $e->getMessage());
            throw $e;
        }
    }
}