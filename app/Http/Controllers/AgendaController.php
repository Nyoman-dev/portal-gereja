<?php

namespace App\Http\Controllers;

use App\Models\Staf;
use App\Models\Agenda;
use Infobip\Api\SmsApi;
use Infobip\ApiException;
use Infobip\Configuration;
use Illuminate\Http\Request;
use Infobip\Model\SmsMessage;
use Infobip\Model\SmsRequest;
use Infobip\Model\SmsDestination;
use Infobip\Model\SmsTextContent;
use Illuminate\Support\Facades\Http;

class AgendaController extends Controller
{
    // public function sendSms(Request $request)
    // {
    //     $request->validate([
    //         'pesan' => 'required|string|max:160',
    //     ]);

    //     $pesan = urlencode($request->pesan); // pastikan aman untuk URL
    //     $user = 'gerejavera_api';
    //     $password = 'PQe32x4HGnpWBRm.';

    //     // Ambil semua nomor telepon dari database
    //     $stafs = Staf::select('telepon')->get();

    //     $results = [];

    //     foreach ($stafs as $staf) {
    //         $nomor = $staf->telepon;

    //         // Pastikan nomor tidak kosong dan format benar
    //         if (!empty($nomor) && preg_match('/^628\d{8,13}$/', $nomor)) {
    //             $url = "https://api.nusasms.com/api/v3/sendsms/plain?user=$user&password=$password&SMSText=$pesan&GSM=$nomor";

    //             $response = Http::get($url);

    //             $results[] = [
    //                 'nomor' => $nomor,
    //                 'response' => $response->body()
    //             ];

    //             // Tambahkan delay opsional agar tidak dianggap spam
    //             sleep(1);
    //         }
    //     }
    // }

    public function sendWatsapp(Request $request)
    {
        $request->validate([
            'pesan' => 'required|string|max:1000',
        ]);

        $API_KEY = '02F749DFA021DA0E2654EB214D1EFE3B';
        $BASE_URL = 'https://api.nusasms.com/nusasms_api/1.0/whatsapp/message';

        $stafs = Staf::select('telepon')->get();
        $pesan = $request->pesan;

        $results = [];

        foreach ($stafs as $staf) {
            $nomor = $staf->telepon;

            // Pastikan nomor valid
            if (!empty($nomor) && preg_match('/^628\d{8,13}$/', $nomor)) {
                $payload = [
                    'destination' => $nomor,
                    'message' => $pesan,
                    'include_unsubscribe' => true
                ];

                $response = Http::withHeaders([
                    'APIKey' => $API_KEY,
                    'Content-Type' => 'application/json'
                ])->post($BASE_URL, $payload);

                $results[] = [
                    'nomor' => $nomor,
                    'status' => $response->status(),
                    'response' => $response->json()
                ];

                // Jeda opsional
                sleep(1);
            }
        }

        // return response()->json([
        //     'message' => 'Pengiriman WhatsApp selesai',
        //     'results' => $results
        // ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Dashboard/agenda/index', [
            'data' => Agenda::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tanggal' => 'required|string',
            'tempat_ibadah' => 'required|string',
            'waktu_ibadah' => 'required|string',
            'pf' => 'required|string',
            'pi' => 'required|string',
        ]);
        Agenda::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Agenda $agenda)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Agenda $agenda)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Agenda $agenda)
    {
        $validated = $request->validate([
            'tanggal' => 'required|string',
            'tempat_ibadah' => 'required|string',
            'waktu_ibadah' => 'required|string',
            'pf' => 'required|string',
            'pi' => 'required|string',
        ]);
        Agenda::where('id', $agenda->id)->update($validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Agenda $agenda)
    {
        Agenda::destroy($agenda->id);
    }
}
