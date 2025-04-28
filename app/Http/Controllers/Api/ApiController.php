<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\HttpResponse;

abstract class ApiController extends Controller
{
  use HttpResponse;
}
