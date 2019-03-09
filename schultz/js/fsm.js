let gameSettings = {
  size: 3,
  cellSize: 10,
  difficulty: "strait",
  border: 1,

  rate: 0,
  allClicks: 0,
  errorClicks: 0,
  pTime: "",

  level: 0,

}

const LevelProgress = [{
    id: 1,
    size: 3,
    cellSize: 10,
    difficulty: "strait",
  },
  {
    size: 4,
    cellSize: 10,
    difficulty: "strait",
  },
  {
    size: 3,
    cellSize: 10,
    difficulty: "rotation",
  },
  {
    size: 4,
    cellSize: 10,
    difficulty: "rotation",
  },
  {
    size: 3,
    cellSize: 10,
    difficulty: "multicolour",
  },
  {
    size: 4,
    cellSize: 10,
    difficulty: "multicolour",
  },
]



var fsm = new StateMachine({
  init: 'titleScreen',
  transitions: [{
      name: 'exitToTitle',
      from: '*',
      to: 'titleScreen'
    },
    {
      name: 'playNewGame',
      from: 'titleScreen',
      to: 'chooseLevelScreen'
    },
    {
      name: 'playNewGame',
      from: 'GameScreen',
      to: 'chooseLevelScreen'
    },
    {
      name: 'continueGame',
      from: 'titleScreen',
      to: 'GameScreen'
    },
    {
      name: 'startGame',
      from: 'chooseLevelScreen',
      to: 'GameScreen'
    },
    {
      name: 'pauseGame',
      from: 'GameScreen',
      to: 'pauseScreen'
    },
    {
      name: 'resumeGame',
      from: 'pauseScreen',
      to: 'GameScreen'
    },
    {
      name: 'exitLevel',
      from: 'pauseScreen',
      to: 'chooseLevelScreen'
    },
    {
      name: 'exitLevel',
      from: 'statisticsScreen',
      to: 'chooseLevelScreen'
    },
    {
      name: 'toTitleScreen',
      from: 'pauseScreen',
      to: 'titleScreen'
    },
    {
      name: 'toTitleScreen',
      from: 'statisticsScreen',
      to: 'titleScreen'
    },
    {
      name: 'levelFinished',
      from: 'GameScreen',
      to: 'statisticsScreen'
    },
    {
      name: 'nextLevel',
      from: 'statisticsScreen',
      to: 'GameScreen'
    },
    {
      name: 'restartLevel',
      from: 'statisticsScreen',
      to: 'GameScreen'
    },
    {
      name: 'restartLevel',
      from: 'GameScreen',
      to: 'GameScreen'
    },

  ],
  methods: {
    onPlayNewGame: function () {
      chooseLevelScreen();
    },
    onStartGame: function () {
      startGame();
    },
    onLevelFinished: function () {
      finishGame();
    },
    onExitToTitle: function () {
      finishGame();
    },
    onExitLevel: function () {
      chooseLevelScreen();
    },
    onRestartLevel: function () {
      startGame();
    },
    onNextLevel: function () {
      startGame(next = true);
    }
  }
});