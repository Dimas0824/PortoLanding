<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactMail;

class ContactController extends Controller
{
    /**
     * Receive contact form submission and send an email.
     */
    public function send(Request $request)
    {
        $data = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'nullable|string',
        ]);

        // Destination email — change this to your desired recipient
        $to = env('CONTACT_RECIPIENT_EMAIL', 'dimassmadapas@gmail.com');

        Mail::to($to)->send(new ContactMail($data));

        return response()->json(['success' => true]);
    }
}
