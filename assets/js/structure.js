import { astero_cards } from "./data.js";

const menu = `
      <section class="menu-sec">
        <nav>
          <ul>
            <li id="choose">
              <span>
                <i class="fas fa-meteor"></i>
              </span>
              Asteroids
            </li>
            <li id="Import">
              <span>
                <i class="fas fa-upload"></i>
              </span>
              Import
            </li>
            <li id="Options">
              <span>
                <i class="fas fa-cogs"></i>
              </span>
              Options
            </li>
          </ul>
          <button type="button" name="back" id="back">
            <span class="obj">
              <i class="fas fa-sign-out-alt"></i>
            </span>
            To The Simulation
          </button>
        </nav>
        <main>
          <section>
            ${astero_cards
              .map((e) => {
                const card = `<article class="card" id="${e.id}">
                <img class="lol" src="${e.src}" alt="${e.name}" />
                <span>${e.title}</span>
              <span>Active</span>
              </article>`;

                return card;
              })
              .reduce((c, p) => c + p)}
          </section>
        </main>
      </section>

`;
$("#root").append(menu);
$(".menu-btn").click(() => {
  $(".menu-sec").fadeIn();
  $(".menu-sec").css({ display: "flex" });
});
$("#back").click(() => {
  $(".menu-sec").fadeOut();
});
