<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Constants\Auth\MessagesResponse;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\Api\V1\Auth\RegisterRequest;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends ApiController
{
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        /** @var User $user */
        $user = $request->user();

        $token = $user->createToken(Str::lower(request('email')) . '|' . request()->ip())->plainTextToken;

        return $this->success(
            [
                'token' => $token,
                'user'  => new UserResource($user),
            ]
        );
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = DB::transaction(function () use ($request) {
            $user = User::create([
                'name'     => $request->name,
                'email'    => $request->email,
                'password' => Hash::make($request->string('password')),
            ]);


            event(new Registered($user));

            $token = $user->createToken(Str::lower(request('email')) . '|' . request()->ip())->plainTextToken;

            return [
                'token' => $token,
                'user'  => new UserResource($user),
            ];
        });

        if (!filled($data)) {
            return $this->error(
                MessagesResponse::FAILED_CREATE,
            );
        }

        return $this->success(
            $data,
            MessagesResponse::CREATED,
            Response::HTTP_CREATED,
        );
    }

    public function destroy(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success(message: MessagesResponse::TOKEN_REVOKED);
    }

    public function me(Request $request): JsonResponse
    {
        return $this->success(
            [
                'user' => new UserResource($request->user()),
            ]
        );
    }
}
