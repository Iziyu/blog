@extends("layouts.app")

@section("content")
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                @include("layouts.left-nav-categories")
            </div>
            <div class="col-md-8">
                <div class="nav-location"><a href="/" >首页</a>&nbsp;<small>>></small>&nbsp;<small>{{ $article->title }}</small></div>
                <div class="content">
                    <div class="show-content-title">{{ $article->title }}</div>
                    <div class="show-content-copyright">
                        <span>{{ $article->created_at }}</span>&nbsp;
                        @if($article->category)
                            <span>来自于分类：<a href="/category/{{ $article->category->name }}">{{ $article->category->display_name }}</a></span>&nbsp;
                        @endif
                        @if($article->user)
                            <span>作者：[<span class="text-red">{{ $article->user ? $article->user->name : "" }}</span>]</span>
                        @endif
                    </div>
                    <div class="show-content-content">{!! $article->content !!}</div>
                </div>
            </div>
        </div>
    </div>
@stop