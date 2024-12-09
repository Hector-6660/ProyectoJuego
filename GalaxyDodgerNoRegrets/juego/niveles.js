import { Plataforma } from './plataformas.js';

let niveles = [
    {
        imagenFondo: "url(assets/srpites/fondos/fondo1.png)",
        plataformas: [
            new Plataforma(0, 540, 278, 60), // Suelo 1
            new Plataforma(0, 326, 218, 40), // Plataforma 1
            new Plataforma(380, 436, 220, 170), // Plataforma 2
            new Plataforma(388, 186, 220, 50) // Plataforma 3
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 50, y: 466 },
        puntoFinal: { x: 560, y: 0, width: 40, height: 186 }
    },
    {
        imagenFondo: "url(assets/srpites/fondos/fondo2.png)",
        plataformas: [
            new Plataforma(0, 186, 128, 50), // Plataforma 1
            new Plataforma(0, 410, 220, 170), // Plataforma 2
            new Plataforma(470, 490, 130, 110) // Plataforma 3
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 20, y: 112 },
        puntoFinal: { x: 560, y: 0, width: 40, height: 490 }
    },
    {
        imagenFondo: "url(assets/srpites/fondos/fondo3.png)",
        plataformas: [
            new Plataforma(0, 490, 600, 110), // Plataforma 1
            new Plataforma(200, 334, 198, 20), // Plataforma 2
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 50, y: 416 },
        puntoFinal: { x: 560, y: 0, width: 40, height: 490 }
    },
    {
        imagenFondo: "url(assets/srpites/fondos/fondo4.png)",
        plataformas: [
            new Plataforma(0, 490, 130, 110), // Plataforma 1
            new Plataforma(250, 402, 148, 32), // Plataforma 2
            new Plataforma(498, 316, 102, 32), // Plataforma 3
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 50, y: 416 },
        puntoFinal: { x: 560, y: 0, width: 40, height: 316 }
    },
    {
        imagenFondo: "url(assets/srpites/fondos/fondo5.png)",
        plataformas: [
            new Plataforma(0, 548, 102, 32), // Plataforma 1
            new Plataforma(166, 498, 108, 102), // Plataforma 2
            new Plataforma(386, 446, 138, 154), // Plataforma 3
            new Plataforma(528, 304, 72, 58), // Plataforma 4
            new Plataforma(68, 178, 372, 74), // Plataforma 5
        ],
        enemigos: [],
        posicionInicialPersonaje: { x: 20, y: 474 },
        puntoFinal: { x: 68, y: 0, width: 264, height: 176 }
    }
];

export { niveles };