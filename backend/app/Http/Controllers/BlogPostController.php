<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('user')->orderBy('updated_at', 'desc')->get()->makeHidden('user_id');
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/images');
            $imageUrl = Storage::url($path);
        }

        $post = new BlogPost();
        $post->title = $request->title;
        $post->content = $request->content;
        $post->image_url = $imageUrl ?? null;
        $post->user_id = Auth::id();
        $post->save();

        return response()->json($post);
    }

    public function show(string $id)
    {
        $post = BlogPost::with('user')->findOrFail($id)->makeHidden($id);
        if($post) {
        return response()->json($post);
        } else {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }


    public function update(Request $request, string $id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        if ($post->user_id != Auth::id()) {
            return response()->json(['message' => 'This is not your post'], 403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $post->title = $request->title;
        $post->content = $request->content;
        $post->user_id = Auth::id();

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/images');
            $post->image_url = Storage::url($path);
        }

        $post->save();

        return response()->json($post);
    }

    public function destroy(string $id)
    {
        $post = BlogPost::findOrFail($id);

        if ($post && $post->user_id == Auth::id()) {
            $post->delete();
            return response()->json(['message' => 'Post has been deleted']);
        } else {
            return response()->json(['message' => 'Post not found'], 404);
        }
    }
}
