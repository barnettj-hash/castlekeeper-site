# Castle Keeper

Marketing site for Castle Keeper, a cozy living kingdom simulator by Josh Barnett.

- GitHub Pages: https://barnettj-hash.github.io/castlekeeper-site/
- Canonical site: https://castlekeeper.org/

Publishing source: default branch `main`, folder `/`. The root `CNAME` file is `castlekeeper.org`. Gallery art is in `assets/images/`, and the browser build is in `castle-keeper-webgl/`.

Page links and assets are relative, so the same files work at the project URL and at https://castlekeeper.org/ after DNS points at GitHub Pages.

## Homepage music

The homepage sound control stays off until a visitor turns it on. It plays `assets/audio/menu-loop.ogg`, then `assets/audio/menu-loop.mp3` if the browser needs a fallback. No music file is committed here.

Drop in a seamless loop you have the rights to use commercially. The shortlist’s first recommendations:

- [Cozy Fantasy Music — Spaceyyy (itch.io)](https://aquumgifts.itch.io/cozy-fantasy-music) — cozy castle and village loops, including calm versions. Re-check that listing’s commercial license before you ship it.
- [Medieval Fantasy RPG Music Pack Vol. 3 – Tavern & Village Atmospheres (Unity Asset Store)](https://assetstore.unity.com/packages/audio/ambient/medieval-fantasy-rpg-music-pack-vol-3-tavern-village-atmospheres-382584) — village and tavern beds that drop into Unity.

Encode the menu loop as Ogg Vorbis and save it as `assets/audio/menu-loop.ogg`. An MP3 at `assets/audio/menu-loop.mp3` is optional.
