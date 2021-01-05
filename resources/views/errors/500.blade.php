@extends('layouts.app', ['title'=>'Erreur 500', 'requirementsJs' => ['app'], 'requirementsCss' => ['master']])

@section('view')

<main class="container">


    <section class="section text col-md-12" id="0">
        <h2 class="col-11 col-md-12 col-lg-8 section-title">Erreur serveur</h2>

            <p class="col-11 col-md-12 col-lg-8 section-content">
                Une erreur est survenue au niveau du site, l'accès devrait être rétablit sous peu.
                Essayez d'aller sur d'autres pages, celle-ci est peut-être sujette à un bogue.
            </p>

            <p class="col-11 col-md-12 col-lg-8 section-links">
                <a class="section-link" href="/">Page principale</a>
            </p>
    </section>
</main>
@endsection
