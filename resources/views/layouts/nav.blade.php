<nav class="navbar navbar-expand-md navbar-dark fixed-top container mx-auto">
    <div class="container px-3 col-md-12">
        <a class="navbar-brand" href="{{ url('/') }}">
        Arthaud Proust
        </a>
        <!-- <a class="navbar-login collapse" id="navbarSupportedContent" href="{{ route('login') }}">Accès administration</a> -->
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav mr-auto">

            </ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto">
                <!-- Authentication Links -->
                

                @guest
                    @if(Route::is('home'))
                        @foreach(Session::get('sections_list'); as $section)
                        <li class="nav-item">
                            <a class="nav-link" href="#section{{ $section->order }}">{{ $section->title }}</a>
                        </li>
                        @endforeach
                    @else 
                        <li class="nav-item">
                            <a class="nav-link" href="/">Page principale</a>
                        </li>
                    @endif
                @else
                    @if(!Route::is('admin'))
                    <li class="nav-item">
                        <a class="nav-link nav-admin" href="{{ route('admin') }}">Modifier le site</a>
                    </li>
                    @else
                    <li class="nav-item">
                        <a class="nav-link nav-admin" href="/">Retour au site</a>
                    </li>
                    @endif
                    <li class="nav-item">
                        <a class="nav-link nav-admin" href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                            Se déconnecter
                        </a>

                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                            @csrf
                        </form>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>