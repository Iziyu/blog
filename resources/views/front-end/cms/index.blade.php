@extends("layouts.app")

@section("content")
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                @include("layouts.left-nav-categories")
            </div>
            <div class="col-md-8">
                @foreach($articles as $article)
                    <div class="content">
                        <div class="content-title"><a href="/article/{{$article->id}}">{{ $article->title }}</a></div>
                        <div class="content-content">{!! $article->brief !!}</div>
                        <div class="content-foot">
                            <span>{{ $article->created_at }}</span>
                            @if($article->category)
                                <span>来自于分类：<a href="/article/{{ $article->category->name }}">{{ $article->category->display_name }}</a></span>
                            @endif
                            <span>{{ $article->user ? $article->user->name : "" }}</span>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@stop