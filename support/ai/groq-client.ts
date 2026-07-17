import 'dotenv/config';
import Groq from 'groq-sdk';

// API key .env dosyasından okunuyor, kodun içine asla yazılmıyor.
const apiKey = process.env.GROQ_API_KEY;

let groqClient: Groq | null = null;

if (apiKey) {
    groqClient = new Groq({ apiKey });
} else {
    console.warn('[groq-client] UYARI: GROQ_API_KEY bulunamadı. .env dosyasını kontrol et. RCA analizi devre dışı kalacak.');
}

/**
 * Groq Llama modeline bir prompt gönderir ve yanıtı metin olarak döndürür.
 *
 * SAFE-FAIL: Bu fonksiyon KESİNLİKLE hata fırlatmaz (throw etmez). API key
 * eksikse, Groq servisi yanıt vermezse, rate limit'e takılırsa ya da başka
 * herhangi bir sorun olursa, sessizce `null` döner. Bunun sebebi: RCA analizi
 * testin ana akışının bir parçası DEĞİL, yardımcı bir katman. AI analizi
 * başarısız olduğu için asıl testin (PASSED/FAILED) sonucu etkilenmemeli.
 *
 * @param systemPrompt Modelin rolünü/görevini tanımlayan sistem talimatı
 * @param userPrompt Analiz edilecek asıl içerik (hata detayları, loglar vs.)
 * @returns Modelin ürettiği metin, ya da bir sorun olduysa null
 */
export async function askGroq(systemPrompt: string, userPrompt: string): Promise<string | null> {
    if (!groqClient) {
        return null;
    }

    try {
        const completion = await groqClient.chat.completions.create({
            model: 'openai/gpt-oss-120b', // NOT: llama-3.3-70b-versatile deprecated edildi (Haziran 2026), yerine bu önerildi
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.2, // Düşük temperature: tutarlı, "yaratıcı olmayan" teşhis istiyoruz
            max_tokens: 300,  // Kısa ve öz analiz yeterli, uzun rapor istemiyoruz
        });

        return completion.choices[0]?.message?.content ?? null;
    } catch (error) {
        console.warn('[groq-client] Groq API çağrısı başarısız oldu, RCA analizi bu test için atlanıyor:', error);
        return null;
    }
}