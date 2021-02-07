@extends('layouts.app', ['title'=>'Développeur à Bordeaux', 'requirementsJs' => ['app'], 'requirementsCss' => ['master']])

@section('view')

<main class="container">

    @foreach($sections as $section)
        @if($section->type=="text" && $section->image_url)
            <section class="section text withImage col-md-6" id="section{{$section->order}}">
                <h2 class="col-11 col-md-12 section-title">{{$section->title}}</h2>
                <p class="col-11 col-md-12 section-content withImage">
                    <img class="section-image" src="{{asset('img/'.$section->image_url)}}" alt=" "/>
                    {!!$section->content!!}
                </p>
            </section>
        @else
            <section class="section {{$section->type}} @if($section->type=="list")col-md-6 @else col-md-12 @endif" id="section{{$section->order}}">
                <h2 class="col-11 col-md-12 col-lg-8 section-title">{{$section->title}}</h2>

                @if($section->type=="text")
                    <p class="col-11 col-md-12 col-lg-8 section-content">
                        {!! $section->content !!}
                    </p>
                @elseif($section->type=="cards")
                    <div class="col-11 col-md-12 col-lg-8 section-content">
                        <div class="card-spacer"></div>
                        @foreach(json_decode($section->content, true) as $card)
                        <div class="card">
                            <h3 class="card-title">{{$card[0]}}</h3>
                            <p class="card-content">{!!$card[1]!!}</p>
                        </div>
                        @endforeach
                        <div class="card-spacer"></div>
                    </div>
                @elseif($section->type=="items")
                    <p class="col-11 col-md-12 col-lg-8 section-content">
                        {{ $section->content }}
                    </p>
                    <div class="col-11 col-md-12 col-lg-8 section-items">
                        @foreach(json_decode($section->items, true) as $item)
                        <a class="item" data-href="{{$item[1]}}" data-title="{{$item[2]}}" data-desc="{{$item[3]}}">
                            <div class="popper">
                                <img class="item-image" src="{{$item[0]}}" alt="{{$item[2]}}">
                            </div>
                        </a>
                        @endforeach
                    </div>
                @endif
                @if($section->links)
                <p class="col-11 col-md-12 col-lg-8 section-links">
                    @foreach(json_decode($section->links, true) as $link)
                        <a class="section-link" href="{{ $link[1] }}">{{ $link[0]}}</a>
                    @endforeach
                </p>
                @endif
            </section>
        @endif
    @endforeach
</main>
@endsection
