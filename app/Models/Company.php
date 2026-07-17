<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $guarded = [];

    public function owner(){
        return $this->hasOne(Owner::class);
    }

    public function contact(){
        return $this->hasOne(Contact::class);
    }
}
