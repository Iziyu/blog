@extends("layouts.app")

@section("content")
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                @include("layouts.left-nav-categories")
            </div>
            <div class="col-md-8 list-group">
                @foreach($articles as $article)
                    <div class="list-item">
                        <div class="content-title"><a href="/article/{{$article->id}}">{{ $article->title }}</a></div>
                        <div class="content-copyright">
                            <span>{{ $article->created_at }}</span>&nbsp;
                            @if($article->category)
                                <span>来自于分类：<a href="/category/{{ $article->category->name }}">{{ $article->category->display_name }}</a></span>&nbsp;
                            @endif
                            @if($article->user)
                                <span>作者：[<span class="text-red">{{ $article->user ? $article->user->name : "" }}</span>]</span>
                            @endif
                        </div>
                        <div class="content-content">{!! $article->brief !!}</div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@stop