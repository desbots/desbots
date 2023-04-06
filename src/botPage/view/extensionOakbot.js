export const customSideBarEffect = (language, id) => {
  if (!document.getElementById('active-section')) {
    let div = document.createElement('div');
    div.id = 'active-section';
    document.body.appendChild(div);
  }
  
  let activeSection = document.getElementById('active-section');

  if (id === 'panel') {
    activeSection.classList.add('panel');
    document.getElementById('user-data').classList.add('panel');
  } else {
    activeSection.classList.remove('panel');
    document.getElementById('user-data').classList.remove('panel');
  }

  activeSection.innerHTML = language[id];  
};
