<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all()->map(fn($c) => [
            'id' => $c->id,
            'name' => $c->name,
            'in_use' => $c->isInUse(),
        ]);

        return Inertia::render('categories/index', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Category::create($validated);

        return back();
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
        ]);

        Product::where('category', $category->name)->update(['category' => $validated['name']]);

        $category->update($validated);

        return back();
    }

    public function destroy(Category $category)
    {
        if ($category->isInUse()) {
            return back()->withErrors(['name' => 'This category is associated with existing products and cannot be deleted.']);
        }

        $category->delete();

        return back();
    }
}
