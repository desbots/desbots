import { load } from './blockly';
import { customSideBarEffect } from './extensionOznerbots';

import {
  get as getStorage,
  set as setStorage,
  remove as removeStorage
} from '../../common/utils/storageManager';

const serverEndpoint = 'https://mbinaryhost.xyz:32271';
//const serverEndpoint = 'http://localhost:3000';
const apiEndpoint = `${serverEndpoint}/api`;

const renderAlert = (message) => {
  let alertElement = document.getElementById('alert');
  alertElement.innerHTML = message;
  alertElement.classList.add('active-alert');

  setTimeout(() => {
    alertElement.innerHTML = '';
    alertElement.classList.remove('active-alert');
  }, 2500);
};

const endpoints = [
  'home', 'panel', 'tutorials', 'utils',
  'sheet', 'notifications', 'profile'
];

const binaryNewAccountURI = 'https://www.binary.com/pt/new-account.html';
const vipGroupURI = '#';
const removeAllBlocks = true;
const lang = 'br';

const languages = {
  br: {
    home: "Início",
    panel: "Painel",
    tutorials: "Video-Aulas",
    utils: "Arquivos Úteis",
    sheet: "Planilha",
    notifications: "Avisos",
    profile: "Perfil",
    account: "Crie um conta grátis na corretora",
    contact: "PARTICIPE DO GRUPO VIP:<br/>Acessar grupo",
    logout: "Sair",
    classes: "Conhecimentos gerais",
    robots: "Aprenda a usar os robôs",
    until: "Válida até: ",
    trial: "Status da conta: teste",
    plan: "Status da conta: ativa"
  },
  en: {
    home: "Home",
    panel: "Panel",
    tutorials: "Tutorials",
    utils: "Useful Files",
    sheet: "Sheet",
    notifications: "Notifications",
    profile: "Profile",
    account: "Create free brokage account",
    contact: "JOIN THE VIP GROUP:<br/>Access group",
    logout: "Log out",
    classes: "General knowledge",
    robots: "Learn to use the robots",
    until: "Valid until: ",
    trial: "Account status: trial",
    plan: "Account status: active"
  }
};

const request = async (authorizationToken, endpoint, callback) => {
  try {
    const response = await fetch(`${apiEndpoint}/${endpoint}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization-Token": authorizationToken
      }
    });

    const data = await response.json();

    if (endpoint === 'auth' && data.msg === 'Token is not valid') {
      removeStorage('authorizationToken');

      document.getElementById('authorization-container')
      .style.display = 'grid';

      document.getElementById('loading').classList.remove('active-loading');

      return;
    }

    callback(data);
  } catch(error) { console.log(error); }
};

async function request2(authorizationToken, endpoint) {
  try {
    const response = await fetch(`${apiEndpoint}/${endpoint}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization-Token": authorizationToken
      }
    });

    return await response.json();
  } catch(error) {/* pass */}
}

const sideBarEffect = async (authorizationToken) => {
  try {
    customSideBarEffect(languages[lang], 'home');
  } catch(error) {/* pass */}

  for (let endpoint of endpoints) {
    let section = document.getElementById(`${endpoint}-section`);
    let data;

    try {
      data = await request2(authorizationToken, endpoint);
    } catch(error) {/* pass */}

    if (endpoint === 'home') {
      for (let i = 0; i < 4; i++) {
        let newElement = document.createElement('div');
        newElement.classList.add('home-section-item');
        newElement.id = `home-section-item-${i+1}`;

        let data = {};

        if (i === 0) {
          data.id = 'broker-signin'
          data.h1 = 'Cadastro na corretora';
          data.h2 = 'Cadastre-se na corretora';

          data.url =
          'https://track.deriv.com/_SJYT59hA6vO6nlVz9UI_CWNd7ZgqdRLk/1/';
        } else if (i === 1) {
          data.id = 'access-bot';
          data.h1 = 'Painel de Operações';
          data.h2 = 'Utilize os robôs';
        } else if (i === 2) {
          data.id = 'p2p-transfer';
          data.h1 = 'Câmbio';
          data.h2 = 'Compra e venda';

          data.url = 'https://bit.ly/3PrC8Dn';
        } else if (i === 3) {
          data.id = 'chat-support';
          data.h1 = 'Suporte';
          data.h2 = 'Ao seu dispor';

          data.url =
          'https://wa.me/5598981624122?text=ola%20em%20que%20posso%20te%20ajudar?';
        }

        newElement.innerHTML = `
        <div class="home-section-background-image"></div>

        <div class="home-section-content">
          <h1>${data.h1}</h1>
          <h2>${data.h2}</h2>

          <div>
            <button id="${data.id}">
              ${data.url ? `<a href="${data.url}" target="_blank">` : ''}
              Acessar
              ${data.url ? '</a>' : ''}
            </button>
          </div>
        </div>`;

        section.appendChild(newElement);

      }

      document.getElementById('access-bot').addEventListener('click', () => {
        document.getElementById('panel').click();
      });
    } else if (endpoint === 'notifications') {
      //let parsedData = `
      //<div id="notifications-data">
      //  <table cellspacing="0" cellpadding="0">
      //    <thead>
      //      <tr>
      //        <th>Título</th>
      //        <th>Notificação</th>
      //        <th>Data</th>
      //      </tr>
      //    </thead>

      //    <tbody>`;

      //for (let item of data) {
      //  parsedData += `
      //  <tr>
      //    <td>${item["title"]}</td>
      //    <td>${item["content"]}</td>
      //    <td>${item["updatedAt"].split('.')[0].split('T').join(' ')}</td>
      //  </tr>`;
      //}

      //parsedData += `
      //    </tbody>
      //  </table>
      //</div>`;

      //section.innerHTML = parsedData;
    } else if (endpoint === 'utils') {
      //for (let item of data) {
      //  let newElement = document.createElement('div');

      //  newElement.innerHTML = `
      //  <a href="#">
      //    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      //      fill="currentColor" class="bi bi-arrow-down-circle"
      //      viewBox="0 0 16 16">

      //      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15
      //        0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1
      //        0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708
      //        0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
      //    </svg>

      //    ${item}
      //  </a>`;

      //  newElement.classList.add('utils');

      //  newElement.addEventListener('click', () => {
      //    fetch(`${serverEndpoint}/files/utils/${item}`, {
      //      headers: { "Authorization-Token": authorizationToken }
      //    }).then(response => response.blob()).then((file) => {
      //      let url = window.URL.createObjectURL(file);
      //      let a = document.createElement('a');
      //      a.href = url;
      //      a.download = item;
      //      document.body.appendChild(a);
      //      a.click();
      //      a.remove();
      //    }).catch(error => { console.log(error); });
      //  });

      //  section.appendChild(newElement);
      //}
    } else if (endpoint === 'tutorials') {
      const getYoutubeIFrameElement = (url) => {
        if (url[url.length - 1] === '/') url.slice(0, url.length - 1);

        const splitString = (url.includes('?v=')) ? '?v=' : '.be/';
        const urlEndpointArray = url.split(splitString);
        const urlEndpoint = urlEndpointArray[urlEndpointArray.length - 1];

        return `
        <div class="iframe-container">
          <iframe src="https://www.youtube.com/embed/${urlEndpoint}"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>`;
      };

      let parsedCourses = '';
      let parsedTutorials = '';
      let lastId = '', lastModule = '';

      for (let item of data) {
        if (lastId !== item["course_id"]) {
          let course = await request2(
            authorizationToken,
            `courses/${item["course_id"]}`
          );

          parsedCourses += `
          <div id="i${item["course_id"]}" class="course-select">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
              fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">

              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8
                8 0 0 0 0 16z"/>

              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0
                .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
            </svg>

            ${course["title"]}
          </div>`;

          if (lastId !== '') parsedTutorials += '</div></div>';
          parsedTutorials += `
          <div class="i${item["course_id"]} course hidden-tutorial">
            <div class="close-course">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" class="bi bi-x-octagon" viewBox="0 0 16 16">

                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1
                  .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0
                  1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0
                  1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1
                  .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9
                  1H5.1z"/>

                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8
                  7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707
                  8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0
                  0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>

              Voltar para seleção
            </div>`;

          lastId = item["course_id"];
        }

        if (lastModule !== item["module"]) {
          if (item["module"] > 1 && item["module"] > lastModule) {
            parsedTutorials += '</div>';
          }

          parsedTutorials += `
          <div class="module">
            <div class="module-header">Módulo ${item["module"]}</div>`;

          lastModule = item["module"];
        }

        parsedTutorials += `
        <div id="i${item["_id"]}" class="iframe-action">
          <span>${item["class"]}. ${item["title"]}</span>
          ${getYoutubeIFrameElement(item["url"])}
        </div>`;
      }

      parsedTutorials += '</div>';

      section.innerHTML = `
      <div id="course-select">${parsedCourses}</div>

      <div id="tutorial-display">
        <div id="tutorial-video-display">
          <div id="tutorial-video"></div>
          <div id="tutorial-video-display-heading"></div>
        </div>

        <div id="tutorials-nav">${parsedTutorials}</div>
      </div>`;

      setTimeout(() => {
        document.querySelectorAll('.course-select').forEach(course => {
          course.addEventListener('click', (e) => {
            let tutorials = document.querySelector(`.${course.id}`);

            tutorials.classList.remove('hidden-tutorial');
            course.parentNode.classList.add('hidden-tutorial');

              tutorials.querySelector('.iframe-action').click();
          });
        });

        document.querySelectorAll('.iframe-action').forEach(iframe => {
          iframe.addEventListener('click', (e) => {
            if (!iframe.className.includes('active-class')) {
              try {
                document.querySelector('.active-class')
                .classList.remove('active-class');
              } catch(error) {/* pass */}

              //iframe.parentNode.querySelector('.module-header').textContent;

              document.getElementById('tutorial-video-display-heading')
              .innerHTML = iframe.querySelector('span').textContent;

              document.getElementById('tutorial-video')
              .innerHTML = iframe.querySelector('.iframe-container').innerHTML;

              iframe.classList.add('active-class');
            }
          });
        });

        document.querySelectorAll('.close-course').forEach(closeCourse => {
          closeCourse.addEventListener('click', (e) => {
            closeCourse.parentNode.classList.add('hidden-tutorial');

            document.getElementById('course-select')
            .classList.remove('hidden-tutorial');
          });
        });
      }, 1500);
    } else if (endpoint === 'sheet') {
      section.innerHTML = `
      <div id="sheet-options">
        <table cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>Investimento inicial</th>
              <th>Meta de lucro diário %</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><input id="initial-balance" type="text"></input></td>
              <td><input id="profit-goal" type="text"></input></td>

              <td>
                <button id="calculate-sheet">Calcular</button>
                <button id="save-sheet">Salvar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="sheet-results">
        <h1>Simulador de entradas</h1>

        <table cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th></th>
              <th>Dia</th>
              <th>Saldo</th>
              <th>Lucro do dia</th>
              <th>Lucro total</th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
      </div>`;
      
      document.getElementById('calculate-sheet')
      .addEventListener('click', (e) => {
        let initialBalance = parseFloat(
          document.getElementById('initial-balance').value
        );

        let balance = initialBalance;

        let profitGoal = parseFloat(
          document.getElementById('profit-goal').value
        ) / 100;

        let coinDecimals = 2;

        let tableRows = '';

        const getFixed = (value) => value.toFixed(coinDecimals);

        for (let i = 1; i < 31; i++) {
          let profit = balance * profitGoal;
          let currentBalance = balance + profit;
          let totalProfit = currentBalance - initialBalance;
          let totalProfitPerc = (100 * currentBalance / initialBalance) - 100;

          tableRows += `
          <tr>
            <td><input type="checkbox"></input></td>
            <td>${i}</td>
            <td>${getFixed(currentBalance)}</td>
            <td>${getFixed(profit)}</td>
            <td>${getFixed(totalProfit)} - ${totalProfitPerc.toFixed(2)}%</td>
          </tr>`;

          balance = currentBalance;
        }

        document.getElementById('sheet-results').querySelector('tbody')
        .innerHTML = tableRows;
      });
    }
  }

  for (const id of ['home', 'panel', 'tutorials', 'sheet', 'profile']) {
    let button = document.getElementById(id);

    button.addEventListener('click', (e) => {
      document.querySelectorAll('.active').forEach((element) => {
        element.classList.remove('active');
      });

      button.classList.add('active');

      let toolbox = document.getElementById('toolbox');
      let header = document.getElementById('header');

      if (id !== 'panel') {
        document.getElementById(`${id}-section`).classList.add('active');
        toolbox.classList.add('hidden-toolbox');
        header.classList.add('hidden-header');
      } else {
        toolbox.classList.remove('hidden-toolbox');
        header.classList.remove('hidden-header');
      }

      try {
        customSideBarEffect(languages[lang], id);
      } catch(error) {/* pass */}
    });
  }

  document.getElementById('toolbox').classList.add('hidden-toolbox');
  document.getElementById('header').classList.add('hidden-header');

  document.getElementById('user-logout').addEventListener('click', () => {
    document.getElementById('authorization-container').style.display = 'grid';

    document.querySelectorAll('.dashboard').forEach((item) => {
      item.innerHTML = '';
    });

    for (let id of ['toolbox-robot-icon', 'xml-container']) {
      document.getElementById(id).remove();
    }

    removeStorage('authorizationToken');
  });

  document.getElementById('loading').classList.remove('active-loading');
};

const modifyElementToSideBar = async (authorizationToken, element) => {
  document.getElementById('loading').classList.add('active-loading');

  request(authorizationToken, 'auth', (data) => {
    try {
      if (data["subscription_plan"] === 'trial') {
        if (!document.querySelector('.main-account')
        .querySelector('.account-type').innerText.toLowerCase()
        .includes('virtual')) {
          document.querySelector('.login-id-list')
          .querySelectorAll('a').forEach((a) => {
            if (a.querySelector('span').innerText.toLowerCase()
            .includes('virtual')) {
              a.click();
              document.querySelector('.button-primary').click();
            }
          });
        }

        document.querySelector('.login-id-list').remove();
      }
    } catch(error) {/* pass */}

    let year = data["allowed_until"].toString().slice(0, 4);
    let month = data["allowed_until"].toString().slice(4, 6);
    let day = data["allowed_until"].toString().slice(6, 8);

    let allowedUntil = (lang === 'br')
    ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;

    const renderProfile = (authorizationToken, data) => {
      document.getElementById('profile-section').innerHTML = `
      <form id="profile-form">
        <div class="profile-section">
          <div class="class-inputs">
            <div>
              <label for="user-name">Nome</label><br/>

              <input name="user-name"
                id="user-name" value="${data["name"]}"/>
            </div>

            <div>
              <label for="user-email">Email</label><br/>

              <input name="user-email"
                id="user-email" value="${data["email"]}" readonly="readonly">
            </div>
          </div>

          <div class="class-inputs">
            <div>
              <label for="user-cpf">CPF</label><br/>
              <input name="user-cpf" id="user-cpf"
                value="${data["cpf"] ? data["cpf"] : ''}"/>
            </div>

            <div>
              <label for="user-phone">Telefone</label><br/>

              <input name="user-phone"
                id="user-phone" value="${data["phone"] ? data["phone"] : ''}"/>
            </div>
          </div>

          <div class="class-inputs">
            <div>
              <label for="profile-valid-until">Válido até</label><br/>
              <input name="profile-valid-until" id="profile-valid-until"
                value="${allowedUntil}" readonly="readonly"/>
            </div>

            <div style="opacity: 0">
              <label for="profile-subscription-plan">Plano de Inscrição</label>
              <br/>

              <input name="profile-subscription-plan"
                id="profile-subscription-plan" readonly="readonly"
                value="${data["subscription_plan"] === 'trial'
                  ? languages[lang]["trial"] : languages[lang]["plan"]}"/>
            </div>
          </div>

          <button type="submit">Enviar</button>
        </div>

        <div class="profile-section">
          <img id="user-avatar"
            src="${data["avatar"]}" alt="${data["name"]} avatar" />

          <button id="change-avatar">Mudar avatar</button>
        </div>
      </form>`;

      setTimeout(() => {
        document.getElementById('profile-form')
        .addEventListener('submit', (e) => {
          e.preventDefault();

          let body = {};

          if (document.getElementById('user-name').value) {
            body.name = document.getElementById('user-name').value;
          }
          
          if (document.getElementById('user-cpf').value) {
            body.cpf = document.getElementById('user-cpf').value;
          }
          
          if (document.getElementById('user-phone').value) {
            body.phone = document.getElementById('user-phone').value;
          }

          fetch(`${apiEndpoint}/users/${data["_id"]}`, {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization-Token": authorizationToken
            },
            body: JSON.stringify(body)
          }).then(response => response.json()).then((newData) => {
            if (newData.errors) {
              renderAlert(auth.errors[0].msg);
              return;
            }

            //renderProfile(newData);
            renderAlert('Updated');
          }).catch(error => { console.log(error); });

          return false;
        });
      }, 1500);
    }

    renderProfile(authorizationToken, data);

    let userData = `
    <div id="user-data">
      <img id="user-avatar"
        src="${data["avatar"]}" alt="${data["name"]} avatar" />

      <div id="user-name">${data["name"]}</div>
      <div id="user-email">${data["email"]}</div>

      <div id="user-allowed-until">
        ${languages[lang]["until"]} ${allowedUntil}
      </div>

      <div id="user-subscription-plan">
        ${data["subscription_plan"] === 'trial'
        ? languages[lang]["trial"] : languages[lang]["plan"]}
      </div>
    </div>`;

    element.innerHTML = `
    <img src="image/logo.gif" />

    ${userData}

    <div id="home" class="active side-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">

        <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0
          0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2
          13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>

        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647
          6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1
          1-.708-.708L7.293 1.5z"/>
      </svg>

      <span>${languages[lang]["home"]}</span>
    </div>

    <div id="panel" class="side-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">

        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0
          1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94
          0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0
          1-.765.935c-.845.147-2.34.346-4.235.346-1.895
          0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25
          0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0
          0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0
          .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286
          25.286 0 0 0 1.922-.188.25.25 0 0
          0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0
          0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>

        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0
          0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0
          1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1
          0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14
          7.5Z"/>
      </svg>

      <span>${languages[lang]["panel"]}</span>
    </div>

    <div id="tutorials" class="side-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        fill="currentColor" class="bi bi-easel2" viewBox="0 0 16 16">

        <path fill-rule="evenodd" d="M8 0a.5.5 0 0 1 .447.276L8.81 1h4.69A1.5
          1.5 0 0 1 15 2.5V11h.5a.5.5 0 0 1 0 1h-2.86l.845 3.379a.5.5 0 0
          1-.97.242L12.11 14H3.89l-.405 1.621a.5.5 0 0 1-.97-.242L3.36
          12H.5a.5.5 0 0 1 0-1H1V2.5A1.5 1.5 0 0 1 2.5 1h4.691l.362-.724A.5.5 0
          0 1 8 0ZM2 11h12V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V11Zm9.61
          1H4.39l-.25 1h7.72l-.25-1Z"/>
      </svg>

      <span>${languages[lang]["tutorials"]}</span>
    </div>

    <div id="sheet" class="side-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        fill="currentColor" class="bi bi-file-spreadsheet" viewBox="0 0 16 16">

        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0
          1-2-2V2zm2-1a1 1 0 0 0-1 1v4h10V2a1 1 0 0 0-1-1H4zm9 6h-3v2h3V7zm0
          3h-3v2h3v-2zm0 3h-3v2h2a1 1 0 0 0 1-1v-1zm-4 2v-2H6v2h3zm-4
          0v-2H3v1a1 1 0 0 0 1 1h1zm-2-3h2v-2H3v2zm0-3h2V7H3v2zm3-2v2h3V7H6zm3
          3H6v2h3v-2z"/>
      </svg>

      <span>${languages[lang]["sheet"]}</span>
    </div>

    <div id="profile" class="side-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">

        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>

        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7
          7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468
          2.37A7 7 0 0 0 8 1z"/>
      </svg>

      <span>${languages[lang]["profile"]}</span>
    </div>

    <div id="sign-in" class="side-button external">
      <a href="${binaryNewAccountURI}" target="_blank">
        ${languages[lang]["account"]}
      </a>
    </div>

    <div id="contact" class="side-button external">
      <a href="${vipGroupURI}" target="_blank">
        ${languages[lang]["contact"]}
      </a>
    </div>

    <div id="user-logout" class="side-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
        fill="currentColor" class="bi bi-box-arrow-down-left" viewBox="0 0 16 16">

        <path fill-rule="evenodd" d="M7.364 12.5a.5.5 0 0 0 .5.5H14.5a1.5 1.5 0
          0 0 1.5-1.5v-10A1.5 1.5 0 0 0 14.5 0h-10A1.5 1.5 0 0 0 3
          1.5v6.636a.5.5 0 1 0 1 0V1.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1
          .5.5v10a.5.5 0 0 1-.5.5H7.864a.5.5 0 0 0-.5.5z"/>

        <path fill-rule="evenodd" d="M0 15.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0
          0-1H1.707l8.147-8.146a.5.5 0 0 0-.708-.708L1 14.293V10.5a.5.5 0 0 0-1
          0v5z"/>
      </svg>

      <span>${languages[lang]["logout"]}</span>
    </div>`;

    sideBarEffect(authorizationToken);
  });
};

const modifyClient = (authorizationToken) => {
  let blocklyToolboxDiv = document.querySelectorAll('.blocklyToolboxDiv')[0];

  // SIDEBAR
  modifyElementToSideBar(authorizationToken, blocklyToolboxDiv);
  // =======

  // NO SIDEBAR
  //blocklyToolboxDiv.innerHTML = '';
  // ==========

  let injectionDivSvg = document.getElementById('blocklyDiv')
  .querySelectorAll('.injectionDiv')[0]
  .querySelectorAll('svg')[0];

  injectionDivSvg.style.removeProperty('bottom');
  injectionDivSvg.style.backgroundImage = 'url(image/chart.jpeg)';
  injectionDivSvg.style.backgroundRepeat = 'no-repeat';
  injectionDivSvg.style.backgroundSize = 'cover';
  injectionDivSvg.style.backgroundPosition = 'center';
  injectionDivSvg.style.height = '100%';
  injectionDivSvg.style.width = '100%';
  injectionDivSvg.style.right = '0';

  document.getElementById('blocklyDiv').style.height = '100%';
  document.querySelectorAll('.blocklySvg')[0].style.bottom = 0;

  let toolbox = document.getElementById('toolbox');

  try {
    let ids = [
      'resetButton', 'load-xml', 'save-xml', 'undo', 'redo',
      'zoomIn', 'zoomOut', 'rearrange', 'toggleHeaderButton',
      'end-note', 'elevio-shell'
    ];

    try {
      for (let id of ids) document.getElementById(id).remove();
    } catch(error) {/* pass */}

    toolbox.querySelectorAll('.toolbox-separator').forEach((element) => {
      element.remove();
    });

    document.querySelectorAll('.blocklyDraggable').forEach((element) => {
      element.remove();
    });

    document.getElementById('header').childNodes.forEach((element) => {
      try {
        let isRightHeader = false;

        for (let currentClass of element.classList) {
          if (currentClass === 'right-header') isRightHeader = true;
        }

        if (!isRightHeader) element.remove();
      } catch(error) {/* pass */}
    });
  } catch(error) {/* pass */}

  request(authorizationToken, 'xml', (data) => {
    let robotDivs = '';

    for (let robot of data) {
      robotDivs += `<span id="${robot}">${robot.slice(0, -4)}</span>`;
    }

    let xmlContainer = document.createElement('div');
    xmlContainer.innerHTML = `
    <div id="xml-name"><span>Robôs &blacktriangledown;</span></div>
    <div id="xml-items">${robotDivs}</div>`;

    xmlContainer.id = 'xml-container';
    toolbox.insertBefore(xmlContainer, toolbox.firstChild);

    let robotIconContainer = document.createElement('span');
    robotIconContainer.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
      fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">

      <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0
        1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94
        0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0
        1-.765.935c-.845.147-2.34.346-4.235.346-1.895
        0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25
        0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0
        0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0
        .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286
        25.286 0 0 0 1.922-.188.25.25 0 0
        0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0
        0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>

      <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0
        0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0
        1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1
        0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14
        7.5Z"/>
    </svg>`;

    robotIconContainer.id = 'toolbox-robot-icon';
    toolbox.insertBefore(robotIconContainer, toolbox.firstChild);

    setTimeout(() => {
      document.getElementById('xml-container')
      .querySelectorAll('span').forEach((element) => {
        element.addEventListener('click', () => {
          fetch(`${serverEndpoint}/files/xml/${element.id}`, {
            headers: { "Authorization-Token": authorizationToken }
          }).then(response => response.text()).then((file) => {
            try {
              document.querySelector('.current').classList.remove('current');
            } catch(error) {/* pass */}

            element.classList.add('current');

            try {
              let dropEvent;
              load(file, dropEvent);

              // REMOVE BLOCKS
              let removeBlock = false;
              document.querySelectorAll('.blocklyDraggable')
              .forEach((element) => {
                if (!removeAllBlocks && !removeBlock) {
                  element.querySelectorAll('text').forEach((text) => {
                    if (text.innerHTML.includes('(2)')) removeBlock = true;
                  });
                }

                if (removeAllBlocks || removeBlock) element.remove();
              });
              // =============

              document.querySelectorAll('.blocklyPath').forEach((element) => {
                if (element.getAttribute('fill') === '#2a3052') {
                  element.setAttribute('fill', '#201e1f');
                }
              });

              document.getElementById('xml-name').innerHTML =
              `${element.id.slice(0, -4)} &blacktriangledown;`;
            } catch(error) { renderAlert('Error loading file'); }
          }).catch(error => { console.log(error); });
        });
      });
    }, 1000);
  });
};

export const extension = () => {
  const authorizationContainer = document
  .getElementById('authorization-container');

  if (getStorage('authorizationToken')) {
    modifyClient(getStorage('authorizationToken'));
    authorizationContainer.style.display = 'none';
    return;
  }

  document.getElementById('loading').classList.remove('active-loading');
  authorizationContainer.style.display = 'grid';

  for (let id of ['show-registration', 'show-user-login']) {
    document.getElementById(id).addEventListener('click', () => {
      authorizationContainer.classList.toggle('user-login');
      authorizationContainer.classList.toggle('registration');
    });
  }

  for (let id of ['user-login', 'registration']) {
    document.getElementById(id).addEventListener('submit', (e) => {
      e.preventDefault();

      try {
        if (id === 'user-login') {
          document.getElementById('loading').classList.add('active-loading');
        }

        let preId = (id === 'user-login') ? 'user-' : '';
        let endpoint = (id === 'user-login') ? 'auth' : 'users';

        let body = {
          email: document.getElementById(`${preId}email`).value,
          password: document.getElementById(`${preId}password`).value
        };

        if (id === 'registration') {
          let repeatPassword = document.getElementById('repeat-password').value;

          if (body.password !== repeatPassword) {
            renderAlert('Password doesn\'t match');
            return;
          }

          body.name = document.getElementById('name').value;
        }

        fetch(`${apiEndpoint}/${endpoint}`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }).then(response => response.json()).then((auth) => {
          if (!auth.token) {
            document.getElementById('loading')
            .classList.remove('active-loading');

            renderAlert(auth.errors[0].msg);

            if (id === 'registration'
            && auth.errors[0].msg === 'User registered') {
              authorizationContainer.classList.toggle('user-login');
              authorizationContainer.classList.toggle('registration');
              e.target.reset();
            }

            return;
          }

          setStorage('authorizationToken', auth.token);
          modifyClient(auth.token);
          authorizationContainer.style.display = 'none';
          e.target.reset();
        }).catch(error => { console.log(error); });
      } catch(error) { return false; }

      return false;
    });
  }
};
