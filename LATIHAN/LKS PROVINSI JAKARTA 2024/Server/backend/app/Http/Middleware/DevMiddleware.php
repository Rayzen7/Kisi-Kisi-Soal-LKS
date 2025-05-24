<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DevMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $dev = Auth::user();
        $username = preg_replace('/\d+/', '', $dev->username);

        if ($username !== 'dev') {
            return response()->json([
                'status' => 'Forbidden',
                'message' => 'You are not the game author'
            ], 403);
        }
        
        return $next($request);
    }
}
