<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'comment' => 'required|string|max:200',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $product->reviews()->create([
            'user_id' => $request->user()->id,
            ...$validated,
        ]);

        return back();
    }
}