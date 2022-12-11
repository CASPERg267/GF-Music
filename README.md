<div id="top"></div>


[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Node Version][node-lts]][node-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/CASPERg267/GF-Music">
    <img src="https://cdn.discordapp.com/avatars/1000770158975000606/d164aab010ab3662a4cb731696d6d8cc.png" alt="Logo" width="130" height="130">
  </a>

<h3 align="center">GF Music [Discord Bot]</h3>

  <p align="center">
    A bot made with perfection in mind, with a unique dashboard and slashCommands
    <br />
    <a href="https://github.com/CASPERg267/GF-Music"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/CASPERg267/GF-Music">View Demo</a>
    ·
    <a href="https://github.com/CASPERg267/GF-Music/issues">Report Bug</a>
    ·
    <a href="https://github.com/CASPERg267/GF-Music/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<div align="center">
  <a href="https://github.com/CASPERg267/GF-Music">
    <img src="https://share.gfstatus.xyz/L5bvW2" alt="Logo">
  </a>
  </div>
  <br>
  <br>
  <div align="center">
  <a href="https://github.com/CASPERg267/GF-Music">
    <img src="https://share.gfstatus.xyz/fm0OO2" alt="Logo">
  </a>
  </div>
  <br>
  <br>
  <div align="center">
  <a href="https://github.com/CASPERg267/GF-Music">
    <img src="https://share.gfstatus.xyz/pNicKG" alt="Logo">
  </a>
  </div>
  <br>
  <br>
  <div align="center">
  <a href="https://github.com/CASPERg267/GF-Music">
    <img src="https://share.gfstatus.xyz/JUhQDv" alt="Logo">
  </a>
  </div>
  <br>
  <br>

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/)
* [Discord.js](https://discord.js.org/)
* [Discord-Dashboard](https://github.com/Assistants-Center/Discord-Dashboard)
* [Distube.js](https://distube.js.org/)
* [Genuis-Lyrics](https://www.npmjs.com/package/genius-lyrics)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

All you need to do is fill in the required params in the config.js file.

everything you need to change is in the config.js file.

Just make sure you have node version higher than 16.9.0

### Prerequisites


* npm
  ```sh
  npm install
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/CASPERg267/GF-Music.git
   ```

2. Get your bot ( token - client ID - client Secret ) from [Discord developer portal](https://discord.com/developers/applications/) **Remember to not share your token or client secret with anyone**
<div align="left">
  <a href="https://discord.com/developers/applications/">
    <img src="https://share.gfstatus.xyz/Gu2Ssc" alt="Logo">
  </a>
  </div>

3. for logging feature to your server, create **text channel** with the name **logs** go channel settings then integrations to create a new webhook you get a link with last 2 part (/webhookId/WebhookToken)

4. provide a clientId and client Secret for spotify songs from [here](https://developer.spotify.com/dashboard/applications/), its optional, if you don't provide it, bot will scrape songs from spotify but it will be slower and won't fetch all spotify playlist songs (plays first 100 song)

5. in order to use bot's dashboard you should get a licence through [Assistants Center](https://assistantscenter.com/licenses/opensource)

 [![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/import/github/CASPERg267/GF-Music)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/CASPERg267/GF-Music)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[![Run on Repl.it](https://repl.it/badge/github/CASPERg267/GF-Music)](https://repl.it/github/CASPERg267/GF-Music)
> Note: If you are hosting your bot in heroku, Please consider upgrading your dyno for running dashboard & bot simultaneously because in free dyno it'll run out of memory(as there are two workers). If you want to run only the bot, turn off the `web` dyno.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Adding emojis file to add it in bot responses
- [ ] Most played songs stats
- [ ] Translating the bot to mulitple languages
- [ ] Adding a saved playlists feature

See the [open issues](https://github.com/CASPERg267/GF-Music/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

[@CasperAg267](https://twitter.com/CasperAg267)

[Support Server](https://discord.gg/DFtRG4eAan)

<a href="https://www.buymeacoffee.com/GFbots"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=GFbots&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* Thanks you [Assistants Center](https://github.com/Assistants-Center) for the amazing discord dashboard [npm package](https://www.npmjs.com/package/discord-dashboard) and helping me debugging.
* Thank you [Adivise](https://github.com/Adivise) for inspiration and ideas
* Thank you [Tomato6966](https://github.com/Tomato6966) for [slash commands handler](https://github.com/Tomato6966/Discord-js-handler-slash-Commands)
* Thank you [Discord.js Community](https://discord.gg/djs) for banning me for bigotry
<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/CASPERg267/GF-Music.svg?style=for-the-badge
[contributors-url]: https://github.com/CASPERg267/GF-Music/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/CASPERg267/GF-Music.svg?style=for-the-badge
[forks-url]: https://github.com/CASPERg267/GF-Music/network/members
[stars-shield]: https://img.shields.io/github/stars/CASPERg267/GF-Music.svg?style=for-the-badge
[stars-url]: https://github.com/CASPERg267/GF-Music/stargazers
[issues-shield]: https://img.shields.io/github/issues/CASPERg267/GF-Music.svg?style=for-the-badge
[issues-url]: https://github.com/CASPERg267/GF-Music/issues
[license-shield]: https://img.shields.io/github/license/CASPERg267/GF-Music.svg?style=for-the-badge
[license-url]: https://github.com/CASPERg267/GF-Music/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[node-lts]: https://img.shields.io/node/v-lts/discord.js.svg?style=for-the-badge&logo=node&logoColor=white
[node-url]: https://nodejs.org/en/
