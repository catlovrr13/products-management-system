<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return Inertia::render("products/index", [
            "products" => $products
        ]);
    }
    public function create()
    {
        return Inertia::render("products/create", []);
    }

    public function store()
    {
        $validator = validator(request()->all(), [
            "GTIN" => "required",
            "name" => "required",
            "description" => "required",
            "description_fr" => "required",
            "name_fr" => "required",
            "brand_name" => "required",
            "country_of_origin" => "required",
            "gross_weight" => "required",
            "net_content_weight" => "required",
            "weight_unit" => "required",
            "category" => "required",
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $validated = $validator->validated();

        $product = Product::create($validated);

        return redirect("/products");
    }

    public function update(Request $request, Product $product)
    {
        $validator = validator($request->all(), [
            "GTIN" => "sometimes",
            "name" => "sometimes",
            "description" => "sometimes",
            "description_fr" => "sometimes",
            "name_fr" => "sometimes",
            "brand_name" => "sometimes",
            "country_of_origin" => "sometimes",
            "gross_weight" => "sometimes",
            "net_content_weight" => "sometimes",
            "weight_unit" => "sometimes",
            "category" => "sometimes",
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $validated = $validator->validated();

        $product->update($validated);

        return redirect("/products");
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'company' => $product,
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', [
            'company' => $product,
        ]);
    }
}
