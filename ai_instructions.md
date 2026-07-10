# Test Automation Architecture Rules

1. **Design Pattern:** Projede kesinlikle Page Object Model (POM) kullanılacaktır.
2. **State Management:** Senaryolar arası veri veya tarayıcı (browser/page) paylaşımı için `export/import` KULLANILMAYACAKTIR. Test izolasyonunu sağlamak için Cucumber `World` nesnesi (this.page, this.browser) kullanılacaktır.
3. **Locators:** Element seçimlerinde öncelikle `data-test` attributeleri, yoksa text veya CSS selector kullanılacaktır. Locator'lar sayfa sınıflarında `private readonly` olarak tanımlanmalıdır.
4. **Assertions:** Sayfa sınıfları (Pages) içinde KESİNLİKLE `expect` kullanılmayacaktır. Doğrulamalar sadece Step Definition dosyalarında yapılacaktır.
5. **Language:** Gherkin senaryoları İngilizce, kod içi yorum satırları Türkçe veya İngilizce olabilir.