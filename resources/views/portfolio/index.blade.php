@extends('layouts.app')

@section('title', 'Personal Portfolio - ' . $profile['name'])

@section('content')
    <div class="w-full max-w-7xl mx-auto px-6 lg:px-8">
        {{-- Hero Section --}}
        @include('portfolio.sections.hero', ['profile' => $profile])

        {{-- Portfolio Section --}}
        @include('portfolio.sections.portfolio', ['portfolios' => $portfolios])

        {{-- Skills Section --}}
        @include('portfolio.sections.skills', ['skills' => $skills])

        {{-- Contact Section --}}
        @include('portfolio.sections.contact')
    </div>
@endsection
