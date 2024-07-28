<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function dashboard(): Response
    {
        return Inertia::render('Tickets/Dashboard');
    }
}
