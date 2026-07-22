<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Env;
use Illuminate\Support\Facades\Storage;
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

    public function json()
    {
        $query = request()->input("query") ?? "";
        $page = request()->input("page") ?? 1;
        $PRODUCT_PER_PAGE = 10;
        $offset = ($page - 1) * $PRODUCT_PER_PAGE;
        $products = Product::all();

        $total_pages = round(count($products) / $PRODUCT_PER_PAGE, 0, PHP_ROUND_HALF_UP);
        $app_url = Env('APP_URL');
        if ($page >= $total_pages) {
            $next_url = null;
            $next_page = null;
        } else {
            $next_page = $page + 1;
            $next_url = "$app_url/products.json?page=" . $next_page;
        }

        if ($page <= 1) {
            $prev_url = null;
            $prev_page = null;
        } else {
            $prev_page = $page - 1;
            $prev_url = "$app_url/products.json?page=" . $prev_page;
        }
        $products = Product::whereLike("name", "%$query%")->orWhereLike("name_fr", "%$query%")->orWhereLike("description", "%$query%")->orWhereLike("description_fr", "%$query%")->limit($PRODUCT_PER_PAGE)->offset($offset)->get();


        return response()->json([
            "data" => $products,
            "pagination" => [
                "current_page" => $page,
                "per_page" => $PRODUCT_PER_PAGE,
                "total_pages" => $total_pages,
                "next_page_url" => $next_url,
                "prev_page_url" => $prev_url
            ]
        ]);

    }

    public function create()
    {
        return Inertia::render("products/create", []);
    }

    public function store()
    {
        $validator = validator(request()->all(), [
            "GTIN" => "required|max:14|min:13|unique:products,GTIN",
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
            "image" => "sometimes|image"
        ]);

        if ($validator->fails()) {
            return redirect("/products/create")->withErrors($validator->errors())->withInput(request()->all());
        }

        $validated = $validator->validated();

        $file = request()->file("image");
        $fileName = $file->getClientOriginalName();
        $gtin = $validated["GTIN"];
        Storage::disk('public')->putFileAs("products/$gtin", $file, $fileName);

        $product = Product::create([
            "GTIN" => $validated["GTIN"],
            "name" => $validated["name"],
            "description" => $validated["description"],
            "description_fr" => $validated["description_fr"],
            "name_fr" => $validated["name_fr"],
            "brand_name" => $validated["brand_name"],
            "country_of_origin" => $validated["country_of_origin"],
            "gross_weight" => $validated["gross_weight"],
            "net_content_weight" => $validated["net_content_weight"],
            "weight_unit" => $validated["weight_unit"],
            "category" => $validated["category"],
            "image" => $fileName
        ]);

        return redirect("/products");
    }

    public function update(Request $request, Product $product)
    {
        $validator = validator($request->all(), [
            "GTIN" => "sometimes",
            "image" => "sometimes|image"
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $validated = $validator->validated();
        $file = request()->file("image");
        $fileName = $file->getClientOriginalName();
        $gtin = $product->GTIN;
        Storage::disk('public')->putFileAs("products/$gtin", $file, $fileName);

        $product->update([
            "GTIN" => $validated["GTIN"],
            "image" => $fileName
        ]);

        return redirect("/products");
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'product' => $product,
        ]);
    }

    public function show($gtin)
    {
        $product = Product::where("GTIN", $gtin)->first();
        if (!$product) {
            return abort(404);
        }
        return Inertia::render('products/show', [
            'product' => $product,
        ]);
    }

    public function productJSON($gtin)
    {
        $product = Product::where("GTIN", $gtin)->first();

        if (!$product) {
            return abort(404);
        }

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect("/products");
    }

    public function find()
    {
        $validator = validator(request()->all(), [
            "GTIN" => "required"
        ]);
        if ($validator->fails()) {
            return redirect("/products/validate")->withErrors($validator->errors())->withInput(request()->all());
        }

        $validated = $validator->validated();
       
        $GTINs = explode("\n", $validated['GTIN']);
        
        $products = Product::whereIn("GTIN", $GTINs)->get();

        return Inertia::render("products/validate", [
            "products" => $products
        ]);
    }

    public function validate(Product $product)
    {
        return Inertia::render('products/validate', [
            'product' => $product,
        ]);
    }
}
