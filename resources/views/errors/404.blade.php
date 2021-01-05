@extends('layouts.app', ['title'=>'Page introuvable', 'requirementsJs' => ['app'], 'requirementsCss' => ['master']])

@section('view')

<main class="container">


    <section class="section text col-md-12" id="0">
        <h2 class="col-11 col-md-12 col-lg-8 section-title">Page introuvable</h2>

            <p class="col-11 col-md-12 col-lg-8 section-content">
                Cette page n'existe pas. Vérifiez si l'url est correcte, sinon revenez sur la page principale.
            </p>

            <p class="col-11 col-md-12 col-lg-8 section-links">
                <a class="section-link" href="/">Page principale</a>
        </p>
    </section>
</main>
@endsection
