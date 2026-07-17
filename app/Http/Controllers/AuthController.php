<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login()
    {
        $validator = validator(request()->all(), [
            "email" => "required",
            "password" => "required"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        if (!auth()->guard()->attempt($validator->validated())) {
            return $this->Unauthenticated($validator->errors());
        }

        $user = auth()->user();

        return $this->OK($user, "User logged in successfully");
    }

    public function register()
    {
        $validator = validator(request()->all(), [
            "email" => "required|unique:users,email|email",
            "name" => "required|max:255",
            "password" => "required|min:8|max:255",
            "role" => User::find(1) ? "user" : "admin"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $user = User::create($validator->validated());

        return $this->Created($user, "User registered successfully");
    }
}
