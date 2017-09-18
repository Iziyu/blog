<?php

namespace App\Http\Controllers\FrontEend\Cms;

use App\Http\Controllers\Controller;
use App\Models\CmsArticle;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        try {
            $builder = CmsArticle::query();
            return view("front-end.cms.index", []);
        } catch (\Exception $e) {
            info(__METHOD__ . "\n" . $e->getTraceAsString());
            info($e->getCode() . " | " . $e->getMessage());
            throw $e;
        }
    }
}