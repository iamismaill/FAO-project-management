<?php 

use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/projects", [ProjectController::class,"index"]);
Route::get("/projects/{id}", [ProjectController::class,"show"]);
Route::post("/projects", [ProjectController::class,"store"]);
Route::put("/projects/{id}", [ProjectController::class,"update"]);
Route::delete("/projects/{id}", [ProjectController::class,"destroy"]);

// Route::get('/',function(){
//     return 'test';
// });
// Route::get('/', function () {
//     return response()->json(['message' => 'Terst']);
// });
