import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'https://api.myapp.com'], ' ');

  return element;
}

document.body.appendChild(component());
