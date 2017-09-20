<?php

namespace App\Providers;

use App\Models\CmsCategory;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $categories = CmsCategory::query()
            ->where("active", 1)
            ->get();
        view()->composer("layouts.left-nav-categories", function ($view) use ($categories) {
            $view->with("categories", $categories);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
