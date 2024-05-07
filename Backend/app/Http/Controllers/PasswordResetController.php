<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB; // Importez le facade DB pour l'interaction avec la base de données
use App\Models\User; // Assurez-vous que le modèle User est correctement importé
use Illuminate\Support\Facades\Log;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'Email not found'], 404);
        }

        // Générer un token de réinitialisation
        $token = Str::random(60);

        // Stocker le token dans la table 'password_reset_tokens'
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            [
                'token' => $token,
                'created_at' => now() // Utilisez Carbon::now() si vous utilisez Carbon
            ]
        );

        // Préparer le lien de réinitialisation du mot de passe avec le token
        // $resetUrl = url('/password/reset/' . $token);
        Log::info('User email: ' . $email);
        $encodedEmail = base64_encode($email);
        Log::info('Encoded email: ' . $encodedEmail);
        $baseUrl = env('APP_URL');
        $resetUrl = $baseUrl . '/reset-password/' . $token . '/' . $encodedEmail;
        // $resetUrl = 'http://localhost:5173/reset-password/' . $token . '/' . $encodedEmail;
        // Logique pour préparer l'envoi de l'email à intégrer ici si nécessaire

        return response()->json(['status' => 'reset link sent', 'reset_url' => $resetUrl]);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:4',
        ]);

        $record = DB::table('password_reset_tokens')->where('email', $request->input('email'))->where('token', $request->input('token'))->first();

        if (!$record) {
            return response()->json(['message' => 'Invalid or expired token'], 422);
        }

        $user = User::where('email', $request->input('email'))->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->forceFill([
            'password' => Hash::make($request->input('password'))
        ])->save();

        // Optionnel : supprimer le token de la base de données après l'utilisation
        DB::table('password_reset_tokens')->where('email', $request->input('email'))->delete();

        return response()->json(['status' => 'password reset successful']);
    }

    public function showResetForm($token)
    {
        // Assurez-vous que le token existe et n'a pas expiré
        $record = DB::table('password_reset_tokens')->where('token', $token)->first();
    
        if (!$record) {
            return redirect('/error404'); // Rediriger vers une page d'erreur si le token n'est pas valide
        }
    
        return view('auth.reset_password', ['token' => $token]);
    }
}
