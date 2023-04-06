export const customSideBarEffect = (language, id) => {
  if (!document.getElementById('active-section')) {
    let div = document.createElement('div');
    div.id = 'active-section';

    div.innerHTML = `
    <span id="toggle-sidebar">
      <svg id="hide-sidebar"
        xmlns="http://www.w3.org/2000/svg" width="26" height="26"
        fill="currentColor" class="bi bi-box-arrow-in-left"
        viewBox="0 0 16 16">

        <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0
          0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5
          1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5
          2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>

        <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5
          0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5
          0 0 1-.708.708l-3-3z"/>
      </svg>

      <svg id ="show-sidebar"
        xmlns="http://www.w3.org/2000/svg" width="25" height="25"
        fill="currentColor" class="bi bi-box-arrow-right"
        viewBox="0 0 16 16">

        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0
          1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1
          0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5
          14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>

        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0
          0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0
          1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
      </svg>
    </span>

    <h1></h1>`;

    document.body.appendChild(div);

    setTimeout(() => {
      document.getElementById('toggle-sidebar')
      .addEventListener('click', () => {
        document.querySelectorAll('.blocklyToolboxDiv')[0]
        .classList.toggle('hidden');

        document.getElementById('active-section').classList.toggle('hidden');
        document.getElementById('topbar').classList.toggle('hidden');
        document.getElementById('toolbox').classList.toggle('hidden');

        document.querySelectorAll('.dashboard').forEach((element) => {
          element.classList.toggle('hidden');
        });
      });
    }, 2500);
  }
  
  let activeSection = document.getElementById('active-section');

  //if (id === 'panel') {
  //  activeSection.classList.add('panel');
  //  document.getElementById('user-data').classList.add('panel');
  //} else {
  //  activeSection.classList.remove('panel');
  //  document.getElementById('user-data').classList.remove('panel');
  //}

  activeSection.querySelector('h1').innerHTML = language[id];
};
