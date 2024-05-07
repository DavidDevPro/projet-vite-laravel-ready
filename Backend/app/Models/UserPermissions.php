<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPermissions extends Model
{
    protected $table = 'userPermissions ';
    protected $primaryKey = 'idUserPermissions';
    protected $fillable = ['labelUserPermissions'];
    public $timestamps = false;
}

