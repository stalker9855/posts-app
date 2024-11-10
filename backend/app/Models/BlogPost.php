<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    public function user() {
        return $this->belongsTo(User::class);
    }
    use HasFactory;
}
