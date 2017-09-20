<nav class="navbar navbar-default navbar-static-top">
    <div class="container">
        <div class="navbar-header">

            <!-- Collapsed Hamburger -->
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <!-- Branding Image -->
            <a class="navbar-brand" href="{{ url('/') }}">
                首页
            </a>
            <!-- Branding Image -->
            <a class="navbar-brand" href="{{ url('/category/note') }}">
                笔记
            </a>
            <!-- Branding Image -->
            <a class="navbar-brand" href="{{ url('/about') }}">
                关于
            </a>
        </div>

        <div class="navbar-search-group">
            <form action="/article/search" method="get">
                <input type="text" name="search" placeholder="搜索">
                <button>search</button>
            </form>
        </div>

        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <!-- Left Side Of Navbar -->
            <ul class="nav navbar-nav">
                &nbsp;
            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="nav navbar-nav navbar-right">
                <!-- Authentication Links -->
                @include("layouts.head-nav-user")
            </ul>
        </div>
    </div>
</nav>