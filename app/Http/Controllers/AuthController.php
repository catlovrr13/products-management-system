<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function editAvatar(Request $request)
    {
        return Inertia::render('users/profile', [
            'user' => $request->user(),
        ]);
    }
    public function updateAvatar(Request $request, User $user)
    {
        abort_unless($request->user()->id === $user->id, 403);

        $validated = $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $path = $request->file('avatar')->store('avatars', 'public');

        $user->update(['avatar' => $path]);

        return back();
    }

    public function removeAvatar(Request $request, User $user)
    {
        abort_unless($request->user()->id === $user->id, 403);

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        $user->update(['avatar' => null]);

        return back();
    }
}
