@extends('layouts.app', ['title'=>'Connexion', 'requirementsJs' => ['app'], 'requirementsCss' => ['master', 'admin']])

@section('view')
<main>
    <div class="loginLayout">
        <h4 class="title">Accès administrateur</h4>
        <form class="col-10" method="POST" action="{{ route('login') }}">
            @csrf

            <div class="form-group row">
                <input id="email" type="hidden" class="form-control @error('email') is-invalid @enderror" name="email" value="rbourgeois.psy@free.fr" required autocomplete="off">

                @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="form-group row">
                <input id="password" placeholder="Mot de passe" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="current-password" autofocus>

                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="form-group row mb-0">
                <button type="submit" id="action">
                    Connexion
                </button>

                <!-- @if (Route::has('password.request'))
                    <a class="btn btn-link" href="{{ route('password.request') }}">
                        {{ __('Forgot Your Password?') }}
                    </a>
                @endif -->
            </div>
        </form>
    </div>
</main>
@endsection
