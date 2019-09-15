const config = {
    tileSize : 64,
    speedFactor: 2,
    stepTime : 1000,
}

const dir2vec = {
    right: {
        x: 1,
        y: 0
    },
    left: {
        x: -1,
        y: 0
    },
    down: {
        x: 0,
        y: 1
    },
    up: {
        x: 0,
        y: -1
    },
};
export {config, dir2vec}