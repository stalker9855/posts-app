<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BlogPostController;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\Rule;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->put('/user', function (Request $request) {
    $user = $request->user();

    $validatedData = $request->validate([
        'name' => 'string|max:255',
        'email' => [
            'email',
            'max:255',
            Rule::unique('users')->ignore($user->id),
        ],
        'password' => 'nullable|string|min:8|confirmed',
    ]);

    $user->fill($validatedData);
    if (!empty($validatedData['password'])) {
        $user->password = bcrypt($validatedData['password']);
    }
    $user->save();

    return response()->json($user);
});

Route::middleware('auth:sanctum')->get('/userPosts', function (Request $request) {
    $user = $request->user();
    $posts = $user->blogPost()->with('user')->get()->makeHidden('user_id');
    return response()->json($posts);
});

Route::middleware('auth:sanctum')->resource('/posts', BlogPostController::class);

Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout'])->name('logout');
