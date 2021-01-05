<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    // use HasFactory;

    public $timestamps = false;
    protected $table = "sections";


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'order',
        'content',
        'anchor',
        'type',
        'image_url',
        'links',
        'items',
        'pages'
    ];

    protected $casts = [
        'anchor' => 'boolean',
    ];

}
