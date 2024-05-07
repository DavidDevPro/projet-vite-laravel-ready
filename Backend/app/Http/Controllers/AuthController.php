<?php
// AuthController
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Models\UtilisateurListe; // Assurez-vous d'importer votre modèle personnalisé
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;
use OpenApi\Annotations as OA;
use Illuminate\Support\Facades\Log;

/**
* @OA\Info(
*     title="API Projet vide Vite Laravel",
*     version="1.0.0",
*     description="Une description de votre API",
*     @OA\Contact(
*       email="support@votre-domaine.com",
*       name="Support Technique",
*       url="https://www.votre-domaine.com/contact"
*     )
*   )
*/

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/login",
     *     summary="Se connecter",
     *     operationId="login",
     *     tags={"Authentification"},
     *     @OA\RequestBody(
     *         description="Informations d'identification nécessaires pour le login",
     *         required=true,
     *         @OA\JsonContent(
     *             required={"identifiant","password"},
     *             @OA\Property(property="identifiant", type="string", example="identifiant"),
     *             @OA\Property(property="password", type="string", format="password", example="password")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="token", type="string", example="token"),
     *             @OA\Property(property="idUser", type="integer", example=1),
     *             @OA\Property(property="identifiant", type="string", example="John Doe"),
     *             @OA\Property(property="urlPictureProfil", type="string", example="/profile_images/johndoe.jpg")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non autorisé"
     *     )
     * )
     */
    public function login(Request $request)
    {
        $request->validate([
            'identifiant' => 'required',
            'password' => 'required',
        ]);

        $user = User::where('identifiant', $request->identifiant)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        // Mettez à jour les champs lors de la connexion
        $user->dateLastConnexion = now();
        $user->deconnexion = null;
        $user->token = explode('|', $token)[1];
        $user->statutConnexion = 1;
        $user->updatedAt = now();
        $user->save();

        return response()->json([
            'success' => true,
            'idUser' => $user->idUser,
            'identifiant' => $user->identifiant,
            'token' => explode('|', $token)[1], // Renvoie seulement la partie token sans l'ID
            'urlPictureProfil' => $user->urlPictureProfil
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/register",
     *     summary="S'inscrire",
     *     operationId="register",
     *     tags={"Authentification"},
     *     @OA\RequestBody(
     *         description="Informations nécessaires pour l'inscription",
     *         required=true,
     *         @OA\JsonContent(
     *             required={"identifiant", "password","email", "userRights"},
     *             @OA\Property(property="identifiant", type="string", example="nouvelutilisateur"),
     *             @OA\Property(property="email", type="string", example="email@email.fr"),
     *             @OA\Property(property="password", type="string", format="password", example="password"),
     *             @OA\Property(property="userRights", type="string", example="admin")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inscription réussie",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true),
     *             @OA\Property(property="token", type="string", example="token"),
     *             @OA\Property(property="idUser", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Données invalides"
     *     )
     * )
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'identifiant' => 'required|string|max:255',
            'password' => 'required|string|min:4',
            'userRights' => 'required|string|in:1,2,3',
            'profileImage' => 'image|nullable|max:10240|mimes:jpg,jpeg,png'
        ]);

        $user = User::create([
            'identifiant' => $request->identifiant,
            'password' => Hash::make($request->password),
            'Droit' => $request->UserRights,
        ]);
    
        // Gestion de l'image de profil
        if ($request->hasFile('profileImage')) {
            if ($request->file('profileImage')->isValid()) {
                $originalFilename = $request->file('profileImage')->getClientOriginalName();
                $extension = $request->file('profileImage')->getClientOriginalExtension();
                $fileNameToStore = 'profil_' . $user->idUser . '.' . $extension;  // Construction du nouveau nom de fichier
        
                $path = $request->file('profileImage')->storeAs('public/profile_images', $fileNameToStore);
        
                // Mettre à jour le chemin de l'image dans la base de données si une image est téléchargée
                $user->urlPictureProfil = $fileNameToStore;
                $user->save();
            } else {
                return response()->json(['message' => 'Invalid file upload'], 422);
            }
        } else {
            return response()->json(['message' => 'No image uploaded'], 422);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'success' => true,            
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/logout",
     *     summary="Se déconnecter",
     *     operationId="logout",
     *     tags={"Authentification"},
     *     security={{"sanctum": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Déconnexion réussie",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=true)
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Non autorisé",
     *         @OA\JsonContent(
     *             @OA\Property(property="success", type="boolean", example=false),
     *             @OA\Property(property="message", type="string", example="Unauthenticated.")
     *         )
     *     )
     * )
     */
    public function logout(Request $request)
    {
        // Récupère l'utilisateur authentifié et révoque son token
        $user = $request->user(); // ou auth()->user() pour obtenir l'utilisateur authentifié
        if ($user) {
            // Mettez à jour les champs lors de la déconnexion
            $user->dateLastConnexion = null;
            $user->statutConnexion = 0;
            $user->token = null;
            $user->updatedAt = now();
            $user->Deconnexion = now();
            $user->save();

            $user->currentAccessToken()->delete();
            // Réponse JSON de succès
            return response()->json(['success' => true]);
        }

        // Si l'utilisateur n'est pas trouvé ou n'est pas authentifié, retournez success false sans message
        return response()->json(['success' => false], 401);
    }
}