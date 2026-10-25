# Sapphire Wednesday Deluxe

Your local Pokémon arcade, plus an original interactive story and an upgraded chat-adventure engine.

## Play

1. Double-click **Launch Sapphire Wednesday.command**.
2. Keep the Terminal window open while playing.
3. Choose **Play Sapphire** or the **Ruby** cartridge, then **START GAME**.

The address is **http://127.0.0.1:8743**. Everything is bundled for offline play. The launcher uses the Python 3 already installed on this Mac. It serves only this folder, on this computer. No account, subscription, or paid service is needed.

To stop a Terminal-launched server, press Control+C in its window. If the hub is already running, launching again opens the existing instance. Keep the complete folder together if you move it. Opening index.html directly does not start the emulator server.

## Controls

| Action | Key |
|---|---|
| Move | Arrow keys |
| A / Confirm | Z |
| B / Back | X |
| Start | Enter |
| Select | Shift |
| L / R | A / S |
| Quick save / quick load | 1 / 2 |
| Change state slot | 3 |
| Fast forward | F |

Click inside the game first. The emulator toolbar includes remapping, fullscreen, audio, save states, and save-file import/export. Controller support is provided by EmulatorJS; hardware controllers have not been tested in this setup.

## Keep your progress

Use the game’s SAVE menu and wait for it to finish. Also export a state or save file from the emulator toolbar as a backup. Browser saves are tied to the browser and the exact local address. Clearing browser data can delete them. Ruby and Sapphire use distinct game names and IDs. Loading an older state replaces the current session.

Story mode autosaves its own eight-chapter adventure in localStorage. Its JSON export/import does not convert to a GBA save. The archived Hall of Fame party comes from the original fictional journal; it is not injected into the cartridges.

## Included

- Arcade with both supplied ROMs and a bundled EmulatorJS 4.2.3 / mGBA engine.
- Eight-chapter original side story with three endings, three choices per scene, inventory, HP, money, autosave, and validated save import/export.
- Revised 13-chapter adventure journal and an untouched copy of the original.
- Deluxe chat-engine prompt with consistent rules, state checks, portable saves, and bounded autoplay.
- Keyboard guide, local fonts and sprites, responsive layout, reduced-motion support, focus indicators, and exit confirmation during active play.

## Troubleshooting

- **Launcher needed:** open the .command file rather than index.html.
- **Port is busy:** another program is using port 8743. Close that program and relaunch. Keeping the same port preserves the browser storage origin.
- **Blank game:** close the player, reopen it, and click START GAME. Use Chrome if the current browser has graphics or audio problems.
- **No sound:** click inside the player and check the emulator’s mute and volume controls.
- **Missing progress:** use the same browser and address, or import your exported backup.
- **Story import rejected:** choose a JSON export from Story mode, not a GBA save or the chat-engine save format.

## Credits and implementation

[EmulatorJS 4.2.3](https://github.com/EmulatorJS/EmulatorJS/releases/tag/v4.2.3), using the mGBA core. Setup follows the [official embedding documentation](https://emulatorjs.org/docs/getting-started/). Its GPL license is bundled at emulator/LICENSE. The bundled JavaScript has one local modification: its version check points to the bundled version.json to avoid an external update request. Upstream source: https://github.com/EmulatorJS/EmulatorJS/tree/v4.2.3. mGBA source: https://github.com/mgba-emu/mgba.

VT323 and IBM Plex Mono use their bundled Open Font Licenses. Sprites originate from [PokeAPI’s sprite repository](https://github.com/PokeAPI/sprites); Pokémon art and names belong to their respective owners. The landscape illustration, interface, and side story were created for this local project. Your supplied ROMs are copied locally and are not uploaded or published.
