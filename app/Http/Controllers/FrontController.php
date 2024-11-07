<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FrontController extends Controller
{
    public function index(){
        if(auth()->check()){
            return redirect()->route('dashboard');
        }
        return Inertia::render('Front/Home');
    }

    public function home(){
        if(auth()->check()){

            $user = auth()->user();

            if($user->isAdmin()){
                return redirect()->route('admin.dashboard.index');
            } else {
                return redirect()->route('user.dashboard.index');
            }
        }
    }
}
