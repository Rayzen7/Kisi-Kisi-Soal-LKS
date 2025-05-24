<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class PlayerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        $username = preg_replace('/\d+$/', '', $user->username);
        
        if ($username != 'player') {
            return response()->json([
                'status' => 'Forbidden',
                'message' => 'Your not the player'
            ], 403);
        }
        return $next($request);
    }
}
