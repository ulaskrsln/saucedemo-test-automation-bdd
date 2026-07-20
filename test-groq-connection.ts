// Bu dosya geçici bir doğrulama scripti — Groq bağlantısı çalıştığını
// gördükten sonra silinebilir, asıl test suitine dahil değil.
import { askGroq } from './support/ai/groq-client';

async function main() {
    console.log('Groq bağlantısı test ediliyor...');

    const result = await askGroq(
        'Sen yardımsever bir asistansın.',
        'Tek cümleyle: Playwright nedir?'
    );

    if (result === null) {
        console.log('❌ Groq bağlantısı BAŞARISIZ oldu. .env dosyasındaki GROQ_API_KEY değerini kontrol et.');
    } else {
        console.log('✅ Groq bağlantısı BAŞARILI. Yanıt:');
        console.log(result);
    }
}

main();