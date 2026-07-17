<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected function OK($data, $message = "OK")
    {
        return response()->json([
            "data" => $data,
            "message" => $message
        ], 200);
    }

    protected function Created($data, $message = "Created")
    {
        return response()->json([
            "data" => $data,
            "message" => $message
        ], 201);
    }

    protected function BadRequest($message = "Bad Request")
    {
        return response()->json([
            "message" => $message
        ], 400);
    }

    protected function NotFound($message = "Not Found")
    {
        return response()->json([
            "message" => $message
        ], 404);
    }

    protected function Unauthenticated($message = "Unauthenticated")
    {
        return response()->json([
            "message" => $message
        ], 401);
    }

    protected function Forbidden($message = "Forbidden")
    {
        return response()->json([
            "message" => $message
        ], 403);
    }
}
