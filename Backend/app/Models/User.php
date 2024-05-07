<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    const UPDATED_AT = 'updatedAt';
    const CREATED_AT = 'createdAt';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'user';
    protected $primaryKey = 'idUser'; // Clé primaire
    
    protected $fillable = [
        'identifiant',
        'email',
        'password',
        'token',
        'urlPictureProfil',
        'idUserPermissions',
        'dateLastConnexion',
        'deconnexion',
        'statutConnexion'
    ];

    // Relations
    public function idUserPermissions()
    {
        return $this->belongsTo(UserPermissions::class, 'idUserPermissions');
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'dateLastConnexion' => 'datetime',
    ];

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->password;
    }
}
