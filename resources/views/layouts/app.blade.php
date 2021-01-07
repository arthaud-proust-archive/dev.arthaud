@php

$themeColor = "#101010";
$siteurl = "arthaud.dev";
$sitename = "Arthaud Proust";
$pagename = $title ?? 'Accueil';
$titleU = $pagename.' - '.$sitename;
$desc = "Étudiant autodidacte en développement web à Bordeaux, je suis passionné depuis l'enfance par la création - Arthaud Proust";
@endphp
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" data-theme="dark">
<head prefix="og: http://ogp.me/ns#">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="robots" content="all">
    <meta name="target" content="all">
    <meta name="author" content="Arthaud Proust">
    <meta name="owner" content="Arthaud Prout">
    <meta name="language" content="fr">

    <meta http-equiv="content-language" content="fr" />
    <meta name="url" content="{{ $siteurl }}">
    <meta name="identifier-URL" content="{{ $siteurl }}">
    <link rel="canonical" href="{{ $siteurl }}" />

    <title>{{ $titleU }}</title>
    <meta name="subject" content="informatic">
    <meta name="description" content="{{ $desc }}" />
    <meta name="keywords" content="arthaud proust, bordeaux, developpeur, informatique">
    <meta name="theme-color" content="{{ $themeColor }}">

    <meta property="og:title" content="{{ $pagename }}" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="{{ $desc }}" />
    <meta property="og:site_name" content="{{ $sitename }}" />
    <meta property="og:url" content="{{ $siteurl }}" />
    <meta property="og:locale" content="fr" />
    <meta property="og:image" content="https://{{ $siteurl }}/assets/img/apple/apple-touch-icon-180x180.png" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="{{ $titleU }}" />
    <meta name="twitter:description" content="{{ $desc }}" />
    <meta name="twitter:site" content="{{ $siteurl }}" />
    <meta name="twitter:image" content="https://{{ $siteurl }}/assets/img/apple/apple-touch-icon-180x180.png" />

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="{{ $titleU }}" />
    <meta name="apple-mobile-web-app-status-bar-style" content="{{ $themeColor }}">

    <!-- Apple meta -->
    <meta name="apple-mobile-web-app-title" content="{{ $titleU }}" />
    <link rel="apple-touch-icon" href="/assets/img/apple/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/img/apple/apple-touch-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/assets/img/apple/apple-touch-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple/apple-touch-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/assets/img/apple/apple-touch-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/assets/img/apple/apple-touch-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/assets/img/apple/apple-touch-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/assets/img/apple/apple-touch-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple/apple-touch-icon-180x180.png" />

    <link rel="icon" href="/assets/img/favicon.ico">

    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "{{ $sitename }}",
            "url": "{{ $siteurl }}",
            "address": "489 Avenue du Maréchal de Lattre de Tassigny",
            "sameAs": [
                "https://www.doctolib.fr/psychologue/bordeaux/rachel-bourgeois-bordeaux"
            ]
        }
    </script>


    <!-- Scripts -->
    @if (config('app.env') =='production')
        @foreach($requirementsJs as $requirement)
            <script src="{{ asset('js/'.$requirement.'.min.js') }}" defer></script>
        @endforeach

        <link href="{{ asset('css/app.min.css') }}" rel="stylesheet">
    @else
        @foreach($requirementsJs as $requirement)
            <script src="{{ asset('js/'.$requirement.'.js') }}" defer></script>
        @endforeach

        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    @endif


    <script>
    Object.defineProperty(String.prototype, 'encoded', {
        get: function() {
            return this
                .replace(/&/g, "&amp;")
                .replace(/\n/g, '&NewLine;')
                .replace(/"/g, "&quot;")
                .replace(/`/g, "&grave;")
                .replace(/'/g, "&apos;")
                .replace(/>/g, "&gt;")
                .replace(/</g, "&lt;")
        }
    })
    Object.defineProperty(String.prototype, 'decoded', {
        get: function() {
            return this
                .replace(/&amp;/g, "&")
                .replace(/&NewLine;/g, '\n')
                .replace(/&quot;/g, "\"")
                .replace(/&grave;/g, "`")
                .replace(/&apos;/g, "'")
                .replace(/&gt;/g, ">")
                .replace(/&lt;/g, "<")
        }
    });
    window.onload= function() {
        try {
            const url = "{{ asset('css/') }}"
            const requirementCss = [
                @foreach($requirementsCss as $requirement)
                "{{ $requirement }}",
                @endforeach
            ];
            for (let i=0; i<requirementCss.length; i++) {
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = url+(window.screen.width<768?'/mobile-':'/large-')+requirementCss[i]+'.css';
                document.getElementsByTagName('head')[0].appendChild(link);
                link.addEventListener('load', function () {document.querySelector('body').setAttribute('class', '')});
            }
            
        } catch (e) {
            document.querySelector('body').setAttribute('class', '')
        }
    };
    </script>
    <style>
        body.loading::before {
            font-family: Arial, Helvetica, sans-serif;
            z-index: 20000;
            font-size: 3rem;
            content: 'Arthaud Proust';
            background: #121215;
            color: #eea180;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
        }
    </style>
    <noscript>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </noscript>
</head>
<body class="loading">
    <div id="app">
        @include('layouts.nav')

        @yield('view')

        <div id="popup-box">
            <div class="popupHidder"><br></div>
            <div id="popup" class="col-11 col-md-12">
                <svg class="popupClose" style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="dark" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                <h3 class="popupTitle"></h3>
                <div class="popupContent"></div>
                <a class="popupLink"></a>
            </div>
        </div>

        <footer>
            <a class="credit" href="https://arthaud.dev">Développé par <u>Arthaud Proust</u></a>
            <span class="copyright">&copy 2020 Tous droits réservés</span>
            <a class="admin" href="{{ route('login') }}"><u>Accès administrateur</u></a>
        </footer>
    </div>
</body>
</html>
