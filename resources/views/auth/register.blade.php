@extends('layouts.app', ['requirementsJs' => ['app'], 'requirementsCss' => ['master', 'admin']])

@section('view')
<main>
    <div class="loginLayout">
        <h4 class="title">Paramétrer le comptre</h4>
        <form class="col-10" method="POST" action="{{ route('register') }}">
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
                <label for="password" class="col-form-label text-md-right">Choisissez votre mot de passe</label>

                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password" autofocus>

                @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="form-group row">
                <label for="password-confirm" class="col-form-label text-md-right">Confirmez ce mot de passe</label>

                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                @error('password-confirm')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                @enderror
            </div>

            <div class="form-group row mb-0">
                <button type="submit" id="action">
                    Continuer
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
