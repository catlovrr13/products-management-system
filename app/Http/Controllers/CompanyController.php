<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Contact;
use App\Models\Owner;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();

        return Inertia::render("companies/index", [
            "companies" => $companies
        ]);
    }
    public function create()
    {
        return Inertia::render("companies/create", []);
    }

    public function store()
    {
        $validator = validator(request()->all(), [
            "name" => "required",
            "address" => "required",
            "telephone_number" => "required",
            "email_address" => "required",
            "owner_name" => "required",
            "owner_mobile_number" => "required",
            "owner_email_address" => "required",
            "contact_name" => "required",
            "contact_mobile_number" => "required",
            "contact_email_address" => "required",
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $validated = $validator->validated();

        $company = Company::create($validated);

        return redirect("/companies");
    }

    public function update(Request $request, Company $company)
    {
        $validator = validator($request->all(), [
            "name" => "sometimes",
            "address" => "sometimes",
            "telephone_number" => "sometimes",
            "email_address" => "sometimes",
            "owner_name" => "sometimes",
            "owner_mobile_number" => "sometimes",
            "owner_email_address" => "sometimes",
            "contact_name" => "sometimes",
            "contact_mobile_number" => "sometimes",
            "contact_email_address" => "sometimes",
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $validated = $validator->validated();

        $company->update($validated);

        return redirect("/companies");
    }

    public function edit(Company $company)
    {
        return Inertia::render('companies/edit', [
            'company' => $company,
        ]);
    }

    public function show(Company $company)
    {
        return Inertia::render('companies/show', [
            'company' => $company->load('products'),
        ]);
    }

    public function deactivate(Company $company)
    {
        $company->update(['is_active' => false]);
        return redirect("/companies");
    }

    // public function destroy(Company $company)
    // {
    //     $company->delete();

    //     return redirect("/companies");
    // }
}