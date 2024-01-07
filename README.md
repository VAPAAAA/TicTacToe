# Ristinolla Peli (Tic Tac Toe Game)

## Kuvaus
Tämä on yksinkertainen Ristinolla-peli toteutettu Express.js:n ja SQLite-tietokannan avulla. Peli tarjoaa yksinkertaisen RESTful-rajapinnan, jossa voit tarkastella ja päivittää pelilautaa.

## Asennus
1. Asenna riippuvuudet ajamalla `npm install`.
2. Luo `.env` -tiedosto pääkansioon ja määritä tarvittavat ympäristömuuttujat (esim. PORT, DB_PATH).
3. Käynnistä sovellus komennolla `node index.js`.

## RESTful Rajapinta

### `GET /board`
Palauttaa nykyisen pelilaudan tilan JSON-muodossa.

### `POST /play`
Pelaajan siirron käsittely. Lähetä JSON-tiedosto, joka määrittelee siirron tiedot (pos, symbol).

### `POST /reset`
Nollaa pelilauta alkutilaan.

## Ympäristömuuttujat (.env)
- `PORT`: Express-palvelimen porttinumero.
- `DB_PATH`: SQLite-tietokannan tiedostopolku.
- `BOARD_TABLE`: Pelilaudan tietokantataulu.
- `BOARD_ID`: Pelilaudan yksilöivä ID.

## Huomautukset
- Varmista, että tietokantataulu on luotu automaattisesti sovelluksen käynnistyessä.

Ole hyvä ja muokkaa ympäristömuuttujia tarpeen mukaan ja nauti Ristinolla-pelistäsi!

---

**Tekijä**: VAPAAAA
