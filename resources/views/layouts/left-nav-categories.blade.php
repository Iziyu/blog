@if(isset($categories) && count($categories))
    <div class="nav-card">
        <div class="nav-card-head">
            <div class="nav-card-title">分类</div>
        </div>
        <div class="nav-card-content">
            <ul class="nav-card-content-list">
                @foreach($categories as $category)
                    <li>
                        <a href="/category/{{ $category->name }}">{{ $category->display_name }}</a>
                        <span>{{ $category->articles()->count() }}</span>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endif