# Praxislager — Netlify-ə yükləmə təlimatı

Bu layihə tam hazırdır. Verilənlər indi **Netlify Blobs** ilə saxlanılır (Netlify-in öz
pulsuz, kartsız yaddaş xidməti) — Firebase və ya başqa xarici xidmətə ehtiyac yoxdur.

## 1. Node.js quraşdırın (bir dəfəlik)

https://nodejs.org ünvanından "LTS" versiyasını yükləyib quraşdırın.

## 2. Layihəni komputerinizdə açın

Bu qovluğu (bütün fayllarla birlikdə) komputerinizə köçürün, terminalda (əmr sətri)
qovluğun içinə keçin və yazın:

```
npm install
```

Bu, lazım olan bütün kitabxanaları yükləyəcək (bir dəfə edilir).

## 3. Lokal olaraq sınayın (məsləhətdir)

Netlify Blobs-u lokal test etmək üçün Netlify CLI lazımdır:

```
npm install -g netlify-cli
netlify dev
```

Bu, brauzerdə `http://localhost:8888` ünvanını açacaq — proqram tam işlək halda
(yaddaş daxil) test edilə bilər.

## 4. Netlify-ə yükləyin

**Ən sadə yol (GitHub olmadan):**

```
netlify deploy --prod
```

Sual verəndə "Create & configure a new project" seçin, "publish directory" üçün
`dist` yazın (əvvəlcə `npm run build` işlədin ki, `dist` qovluğu yaransın).

**Tövsiyə olunan yol (dəyişiklikləri sonradan asan yeniləmək üçün):**

1. Bu qovluğu bir GitHub reposuna yükləyin
2. https://app.netlify.com → "Add new site" → "Import an existing project" →
   GitHub reponuzu seçin
3. Netlify avtomatik olaraq `netlify.toml` faylını oxuyacaq — build əmri və
   funksiyalar özü tənzimlənəcək, sizdən heç nə soruşulmayacaq
4. "Deploy" düyməsinə basın

Bir neçə dəqiqə sonra proqramınız `https://sizin-adiniz.netlify.app` ünvanında
canlı olacaq — istənilən cihazdan (telefon, planşet, kompüter) eyni linkə daxil
olan hər kəs eyni məlumatları görəcək, dəyişiklik 2 saniyə ərzində digər
cihazlarda əks olunacaq.

## Qeyd

- Kart lazım deyil — Netlify-in pulsuz planı (300 kredit/ay) bu ölçüdə bir
  proqram üçün kifayət qədər genişdir.
- Əgər öz domenizi (məs. lager.zahnaerzte-adam.de) bağlamaq istəsəniz, Netlify
  Console-da "Domain settings" bölməsindən edə bilərsiniz.
- Dəyişiklik etmək istəsəniz: `src/App.jsx` faylını redaktə edin, `git push`
  edin (və ya yenidən `netlify deploy --prod` işlədin) — sayt avtomatik yenilənir.
