const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');
const startButton = document.getElementById('start-btn');
const gameContainer = document.getElementById('game-container');

let state = {};

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.style.display = 'none';
  gameContainer.style.display = 'block';
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: '¿Darius debería ir al lugar peligroso?',
    options: [
      {
        text: 'Sí, debe ir por el tesoro.',
        nextText: 2
      },
      {
        text: 'No, ya que es peligroso para su vida.',
        nextText: -1
      },
      {
        text: 'Sí, pero no explorar tanto.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Darius escucha unos gritos. ¿Debería ir a ver qué pasa?',
    options: [
      {
        text: 'Sí, ya que alguien puede estar en peligro.',
        nextText: 3
      },
      {
        text: 'Sí, pero solo observar y no hacer nada.',
        nextText: 3
      },
      {
        text: 'No, porque podría ser una trampa.',
        nextText: -1
      }
    ]
  },
  {
    id: 3,
    text: '¿Darius debería entrar a la casa de Harry el mago?',
    options: [
      {
        text: 'Sí, ya que es el padre de Nova, por lo que no hay problema.',
        nextText: 4
      },
      {
        text: 'Dejar que Magnus decida por él.',
        nextText: 4
      },
      {
        text: 'No, porque puede ser una trampa entre Nova y su padre.',
        nextText: -1
      }
    ]
  },
  {
    id: 4,
    text: '¿Darius debería enfrentarse 1v1 contra Malachi?',
    options: [
      {
        text: 'Sí, porque al ganarle obtendrá el gran tesoro.',
        nextText: 5
      },
      {
        text: 'No, debería rendirse y volver a casa.',
        nextText: -1
      },
      {
        text: 'No, porque podría morir en el intento.',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: '¿Darius debería regalarle la piedra de esmeralda a Nova?',
    options: [
      {
        text: 'Sí, porque es un caballero.',
        nextText: 'final_feliz'
      },
      {
        text: 'No, porque todo su esfuerzo sería en vano.',
        nextText: -1
      },
      {
        text: 'No, debería venderlo y ganar mucho dinero por él.',
        nextText: -1
      }
    ]
  },
  {
    id: 'final_feliz',
    text: '¡Felicidades! Darius demostró ser un verdadero caballero y su valentía lo llevó a una vida llena de aventuras y éxito. ¡Gracias por jugar!',
    options: [
      {
        text: 'Reiniciar',
        nextText: 1
      }
    ]
  }
];

startGame(); // Llamar a startGame al cargar la página
