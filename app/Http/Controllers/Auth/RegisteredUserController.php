<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Str;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
       $validated = $request->validate([
            'name' => 'required|string|max:255|min:6',
            'username' => [
                'required',
                'string',
                'min:6',
                'max:30',
                'unique:' . User::class,
                'regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9_]+$/',
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'avatar' => "nullable|mimes:jpg,jpeg,png,gif|max:2048",
        ], [
            'username.regex' => 'Username must contain both letters and numbers.',
        ]);

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'avatar' => $avatarPath,
            'role' => User::count() === 0 ? 'admin' : 'user',
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
