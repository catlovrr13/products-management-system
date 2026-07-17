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
            "status" => [Rule::in(["active", "inactive"])]
        ]);

        if ($validator->fails()) {
            return $this->BadRequest($validator->errors());
        }

        $validated = $validator->validated();

        $owner = Owner::create([
            "name" => $validated["owner_name"],
            "email_address" => $validated["owner_email_address"],
            "mobile_number" => $validated["owner_mobile_number"],
        ]);

        $contact = Contact::create([
            "name" => $validated["contact_name"],
            "email_address" => $validated["contact_email_address"],
            "mobile_number" => $validated["contact_mobile_number"],
        ]);

        $company = Company::create([
            "name" => $validated["name"],
            "address" => $validated["address"],
            "telephone_number" => $validated["telephone_number"],
            "email_address" => $validated["email_address"],
            "owner_id" => $owner->id,
            "contact_id" => $contact->id
        ]);

        return redirect("/companies");
    }
}