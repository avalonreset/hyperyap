# Murmure

A privacy-first, open-source speech-to-text application that runs entirely on your machine, powered by a neural network via NVIDIA’s Parakeet model for fast, local transcription. Murmure turns your voice into text with no internet connection and zero data collection, and supports 25 European languages.

![demo](public/murmure-screenshot-beautiful.png)

## Features

- **Privacy First**: All processing happens locally on your device. No data ever leaves your computer.
- **No Telemetry**: Zero tracking, zero analytics. Your data stays yours, always.
- **Open Source**: Free and open source software. Inspect, modify, and contribute.
- **Powered by Parakeet**: NVIDIA’s state-of-the-art speech recognition model runs entirely on-device for fast, low-latency transcription.

## Supported Languages:

Bulgarian (bg), Croatian (hr), Czech (cs), Danish (da), Dutch (nl), English (en), Estonian (et), Finnish (fi), French (fr), German (de), Greek (el), Hungarian (hu), Italian (it), Latvian (lv), Lithuanian (lt), Maltese (mt), Polish (pl), Portuguese (pt), Romanian (ro), Slovak (sk), Slovenian (sl), Spanish (es), Swedish (sv), Russian (ru), Ukrainian (uk)

## Installation

### Windows

The Windows build is self-signed, as I'm not paying certification authorities just to remove the SmartScreen warning. Because of that, Windows may show a security message when you install it. The installer is safe, it will simply build its reputation over time as more users run it, and the warning will gradually disappear.

1. Download murmure_1.2.1_x64_en-US.msi from the [release](https://github.com/Kieirra/murmure/releases) page
2. Run the installer and follow the setup wizard.

### Linux

The experimental AppImage currently runs slower for transcription, and the update checker isn’t functional yet. A faster, improved version will be released in the coming days.

1. Download murmure-x86_64.AppImage from [release](https://github.com/Kieirra/murmure/releases) page
2. Make it executable: `chmod +x murmure-x86_64.AppImage`
3. Run the AppImage.

## Usage

Murmure provides a clean and focused speech-to-text experience.
Once launched, simply start recording your voice. The text appears instantly, processed directly on your computer.

Typical use cases include:

- Dictating to any AI prompt (Cursor, ChatGPT, Mistral, etc.)
- Writing notes hands-free
- Capturing creative ideas or dictation

Because all computation is local, no network connection is required.

## Technology

Murmure uses NVIDIA’s Parakeet TDT, a highly optimized, experimental transformer-based speech recognition model designed for low-latency, on-device inference. It combines fast transcription with strong accuracy across multiple languages, running efficiently on consumer GPUs or CPUs.

## Changelog

| Version       | Date       | Notes                                                                                                                                                                                                                                                                    |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `1.3.0`       | 2025-10-25 | **New Experimental HTTP API**: Connect Murmure to any software via a local API. **Linux fixes**: Overlay and update checker now work identically to Windows. **Bug fixes**: Memory leak resolved, 'v' letter bug in shortcut assignment fixed. **Minor UI improvements** |
| `1.2.1`       | 2025-10-17 | Fix overlay position + check for updates button + signed msi + Linux experimental AppImage                                                                                                                                                                               |
| `1.2.0-alpha` | 2025-10-14 | Add Overlay                                                                                                                                                                                                                                                              |
| `1.1.0-alpha` | 2025-10-13 | Add 'Past last transcript' shortcut                                                                                                                                                                                                                                      |
| `1.0.0-alpha` | 2025-10-13 | Initial version                                                                                                                                                                                                                                                          |

## Acknowledgments

- Thanks to NVIDIA for the Parakeet TDT model, Tauri for being an amazing tool, and to the open‑source community for their tools and libraries.

## License

Murmure is free and open source, released under the GNU GPL v3 License.
You can inspect, modify, and redistribute it freely as long as derivative works remain open source.

## Contributing

Contributions are welcome!
If you’d like to improve Murmure or report an issue:

Pre-requisite :

- (windows) Install Visual Studio Build Tools 2022 (Desktop C++ workload)
- (linux) Install Vulkan
- Install git lfs

1. Fork the repository
2. Create a feature branch (git checkout -b feature/new-feature)
3. Commit your changes (git commit -m "Add new feature")
4. Push and open a pull request

## Support Development

If you like Murmure and want to support its development: [Support on Tipeee](https://fr.tipeee.com/murmure-al1x-ai/)
