(function() {
    'use strict';
    
    // Inicialización de Firebase
    firebase.initializeApp({
        apiKey: "AIzaSyAnX5bcwjQCzXLfchLtmI5aUh52_qr1Dew",
        authDomain: "polla-mundialista-pruebas.firebaseapp.com",
        databaseURL: "https://polla-mundialista-pruebas-default-rtdb.firebaseio.com",
        projectId: "polla-mundialista-pruebas",
        storageBucket: "polla-mundialista-pruebas.firebasestorage.app",
        messagingSenderId: "207407192052",
        appId: "1:207407192052:web:bedce053d3099ba81d8ba1"
    });
    const db = firebase.database();

    // Constantes del Torneo
    const GROUPS = {
        A: ['México', 'Sudáfrica', 'Corea del Sur', 'Chequia'], B: ['Canadá', 'Bosnia y Herzegovina', 'Catar', 'Suiza'],
        C: ['Brasil', 'Marruecos', 'Haití', 'Escocia'], D: ['Estados Unidos', 'Paraguay', 'Australia', 'Turquía'],
        E: ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'], F: ['Países Bajos', 'Japón', 'Suecia', 'Túnez'],
        G: ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'], H: ['España', 'Cabo Verde', 'Arabia Saudita', 'Uruguay'],
        I: ['Francia', 'Senegal', 'Irak', 'Noruega'], J: ['Argentina', 'Argelia', 'Austria', 'Jordania'],
        K: ['Portugal', 'República Democrática del Congo', 'Uzbekistán', 'Colombia'], L: ['Inglaterra', 'Croacia', 'Ghana', 'Panamá']
    };
    const FLAGS = {
        'México': '🇲🇽', 'Sudáfrica': '🇿🇦', 'Corea del Sur': '🇰🇷', 'Chequia': '🇨🇿', 'Canadá': '🇨🇦', 'Bosnia y Herzegovina': '🇧🇦', 'Catar': '🇶🇦', 'Suiza': '🇨🇭',
        'Brasil': '🇧🇷', 'Marruecos': '🇲🇦', 'Haití': '🇭🇹', 'Escocia': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'Estados Unidos': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Turquía': '🇹🇷',
        'Alemania': '🇩🇪', 'Curazao': '🇨🇼', 'Costa de Marfil': '🇨🇮', 'Ecuador': '🇪🇨', 'Países Bajos': '🇳🇱', 'Japón': '🇯🇵', 'Suecia': '🇸🇪', 'Túnez': '🇹🇳',
        'Bélgica': '🇧🇪', 'Egipto': '🇪🇬', 'Irán': '🇮🇷', 'Nueva Zelanda': '🇳🇿', 'España': '🇪🇸', 'Cabo Verde': '🇨🇻', 'Arabia Saudita': '🇸🇦', 'Uruguay': '🇺🇾',
        'Francia': '🇫🇷', 'Senegal': '🇸🇳', 'Irak': '🇮🇶', 'Noruega': '🇳🇴', 'Argentina': '🇦🇷', 'Argelia': '🇩🇿', 'Austria': '🇦🇹', 'Jordania': '🇯🇴',
        'Portugal': '🇵🇹', 'República Democrática del Congo': '🇨🇩', 'Uzbekistán': '🇺🇿', 'Colombia': '🇨🇴', 'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Croacia': '🇭🇷', 'Ghana': '🇬🇭', 'Panamá': '🇵🇦'
    };
    const ALL_TEAMS = Object.values(GROUPS).flat();
    
    // Base de Datos de Partidos
    const ALL_MATCHES = [
        { id: 1,  grupo: "A", local: "México",              visitante: "Sudáfrica",                       kickoff: "2026-06-11T14:00:00-05:00", fechaStr: "Jue 11 Jun 14:00" },
        { id: 2,  grupo: "A", local: "Corea del Sur",       visitante: "Chequia",                         kickoff: "2026-06-11T21:00:00-05:00", fechaStr: "Jue 11 Jun 21:00" },
        { id: 3,  grupo: "B", local: "Canadá",              visitante: "Bosnia y Herzegovina",            kickoff: "2026-06-12T14:00:00-05:00", fechaStr: "Vie 12 Jun 14:00" },
        { id: 4,  grupo: "D", local: "Estados Unidos",      visitante: "Paraguay",                        kickoff: "2026-06-12T20:00:00-05:00", fechaStr: "Vie 12 Jun 20:00" },
        { id: 5,  grupo: "B", local: "Catar",               visitante: "Suiza",                           kickoff: "2026-06-13T14:00:00-05:00", fechaStr: "Sáb 13 Jun 14:00" },
        { id: 6,  grupo: "C", local: "Brasil",              visitante: "Marruecos",                       kickoff: "2026-06-13T17:00:00-05:00", fechaStr: "Sáb 13 Jun 17:00" },
        { id: 7,  grupo: "C", local: "Haití",               visitante: "Escocia",                         kickoff: "2026-06-13T20:00:00-05:00", fechaStr: "Sáb 13 Jun 20:00" },
        { id: 8,  grupo: "D", local: "Australia",           visitante: "Turquía",                         kickoff: "2026-06-13T23:00:00-05:00", fechaStr: "Sáb 13 Jun 23:00" },
        { id: 9,  grupo: "E", local: "Alemania",            visitante: "Curazao",                         kickoff: "2026-06-14T12:00:00-05:00", fechaStr: "Dom 14 Jun 12:00" },
        { id: 10, grupo: "F", local: "Países Bajos",        visitante: "Japón",                           kickoff: "2026-06-14T15:00:00-05:00", fechaStr: "Dom 14 Jun 15:00" },
        { id: 11, grupo: "E", local: "Costa de Marfil",     visitante: "Ecuador",                         kickoff: "2026-06-14T18:00:00-05:00", fechaStr: "Dom 14 Jun 18:00" },
        { id: 12, grupo: "F", local: "Suecia",              visitante: "Túnez",                           kickoff: "2026-06-14T21:00:00-05:00", fechaStr: "Dom 14 Jun 21:00" },
        { id: 13, grupo: "H", local: "España",              visitante: "Cabo Verde",                      kickoff: "2026-06-15T11:00:00-05:00", fechaStr: "Lun 15 Jun 11:00" },
        { id: 14, grupo: "G", local: "Bélgica",             visitante: "Egipto",                          kickoff: "2026-06-15T14:00:00-05:00", fechaStr: "Lun 15 Jun 14:00" },
        { id: 15, grupo: "H", local: "Arabia Saudita",      visitante: "Uruguay",                         kickoff: "2026-06-15T17:00:00-05:00", fechaStr: "Lun 15 Jun 17:00" },
        { id: 16, grupo: "G", local: "Irán",                visitante: "Nueva Zelanda",                   kickoff: "2026-06-15T20:00:00-05:00", fechaStr: "Lun 15 Jun 20:00" },
        { id: 17, grupo: "I", local: "Francia",             visitante: "Senegal",                         kickoff: "2026-06-16T14:00:00-05:00", fechaStr: "Mar 16 Jun 14:00" },
        { id: 18, grupo: "I", local: "Irak",                visitante: "Noruega",                         kickoff: "2026-06-16T17:00:00-05:00", fechaStr: "Mar 16 Jun 17:00" },
        { id: 19, grupo: "J", local: "Argentina",           visitante: "Argelia",                         kickoff: "2026-06-16T20:00:00-05:00", fechaStr: "Mar 16 Jun 20:00" },
        { id: 20, grupo: "J", local: "Austria",             visitante: "Jordania",                        kickoff: "2026-06-16T23:00:00-05:00", fechaStr: "Mar 16 Jun 23:00" },
        { id: 21, grupo: "K", local: "Portugal",            visitante: "República Democrática del Congo", kickoff: "2026-06-17T12:00:00-05:00", fechaStr: "Mié 17 Jun 12:00" },
        { id: 22, grupo: "L", local: "Inglaterra",          visitante: "Croacia",                         kickoff: "2026-06-17T15:00:00-05:00", fechaStr: "Mié 17 Jun 15:00" },
        { id: 23, grupo: "L", local: "Ghana",               visitante: "Panamá",                          kickoff: "2026-06-17T18:00:00-05:00", fechaStr: "Mié 17 Jun 18:00" },
        { id: 24, grupo: "K", local: "Uzbekistán",          visitante: "Colombia",                        kickoff: "2026-06-17T21:00:00-05:00", fechaStr: "Mié 17 Jun 21:00" },
        { id: 25, grupo: "A", local: "Chequia",             visitante: "Sudáfrica",                       kickoff: "2026-06-18T11:00:00-05:00", fechaStr: "Jue 18 Jun 11:00" },
        { id: 26, grupo: "B", local: "Suiza",               visitante: "Bosnia y Herzegovina",            kickoff: "2026-06-18T14:00:00-05:00", fechaStr: "Jue 18 Jun 14:00" },
        { id: 27, grupo: "B", local: "Canadá",              visitante: "Catar",                           kickoff: "2026-06-18T17:00:00-05:00", fechaStr: "Jue 18 Jun 17:00" },
        { id: 28, grupo: "A", local: "México",              visitante: "Corea del Sur",                   kickoff: "2026-06-18T20:00:00-05:00", fechaStr: "Jue 18 Jun 20:00" },
        { id: 29, grupo: "D", local: "Estados Unidos",      visitante: "Australia",                       kickoff: "2026-06-19T14:00:00-05:00", fechaStr: "Vie 19 Jun 14:00" },
        { id: 30, grupo: "C", local: "Escocia",             visitante: "Marruecos",                       kickoff: "2026-06-19T17:00:00-05:00", fechaStr: "Vie 19 Jun 17:00" },
        { id: 31, grupo: "C", local: "Brasil",              visitante: "Haití",                           kickoff: "2026-06-19T19:30:00-05:00", fechaStr: "Vie 19 Jun 19:30" },
        { id: 32, grupo: "D", local: "Turquía",             visitante: "Paraguay",                        kickoff: "2026-06-19T23:00:00-05:00", fechaStr: "Vie 19 Jun 23:00" },
        { id: 33, grupo: "F", local: "Países Bajos",        visitante: "Suecia",                          kickoff: "2026-06-20T12:00:00-05:00", fechaStr: "Sáb 20 Jun 12:00" },
        { id: 34, grupo: "E", local: "Alemania",            visitante: "Costa de Marfil",                 kickoff: "2026-06-20T15:00:00-05:00", fechaStr: "Sáb 20 Jun 15:00" },
        { id: 35, grupo: "E", local: "Ecuador",             visitante: "Curazao",                         kickoff: "2026-06-20T19:00:00-05:00", fechaStr: "Sáb 20 Jun 19:00" },
        { id: 36, grupo: "F", local: "Túnez",               visitante: "Japón",                           kickoff: "2026-06-20T23:00:00-05:00", fechaStr: "Sáb 20 Jun 23:00" },
        { id: 37, grupo: "H", local: "España",              visitante: "Arabia Saudita",                  kickoff: "2026-06-21T11:00:00-05:00", fechaStr: "Dom 21 Jun 11:00" },
        { id: 38, grupo: "G", local: "Bélgica",             visitante: "Irán",                            kickoff: "2026-06-21T14:00:00-05:00", fechaStr: "Dom 21 Jun 14:00" },
        { id: 39, grupo: "H", local: "Uruguay",             visitante: "Cabo Verde",                      kickoff: "2026-06-21T17:00:00-05:00", fechaStr: "Dom 21 Jun 17:00" },
        { id: 40, grupo: "G", local: "Nueva Zelanda",       visitante: "Egipto",                          kickoff: "2026-06-21T20:00:00-05:00", fechaStr: "Dom 21 Jun 20:00" },
        { id: 41, grupo: "J", local: "Argentina",           visitante: "Austria",                         kickoff: "2026-06-22T12:00:00-05:00", fechaStr: "Lun 22 Jun 12:00" },
        { id: 42, grupo: "I", local: "Francia",             visitante: "Irak",                            kickoff: "2026-06-22T16:00:00-05:00", fechaStr: "Lun 22 Jun 16:00" },
        { id: 43, grupo: "I", local: "Noruega",             visitante: "Senegal",                         kickoff: "2026-06-22T19:00:00-05:00", fechaStr: "Lun 22 Jun 19:00" },
        { id: 44, grupo: "J", local: "Jordania",            visitante: "Argelia",                         kickoff: "2026-06-22T22:00:00-05:00", fechaStr: "Lun 22 Jun 22:00" },
        { id: 45, grupo: "K", local: "Portugal",            visitante: "Uzbekistán",                      kickoff: "2026-06-23T12:00:00-05:00", fechaStr: "Mar 23 Jun 12:00" },
        { id: 46, grupo: "L", local: "Inglaterra",          visitante: "Ghana",                           kickoff: "2026-06-23T15:00:00-05:00", fechaStr: "Mar 23 Jun 15:00" },
        { id: 47, grupo: "L", local: "Panamá",              visitante: "Croacia",                         kickoff: "2026-06-23T18:00:00-05:00", fechaStr: "Mar 23 Jun 18:00" },
        { id: 48, grupo: "K", local: "Colombia",            visitante: "República Democrática del Congo", kickoff: "2026-06-23T21:00:00-05:00", fechaStr: "Mar 23 Jun 21:00" },
        { id: 49, grupo: "B", local: "Suiza",               visitante: "Canadá",                          kickoff: "2026-06-24T14:00:00-05:00", fechaStr: "Mié 24 Jun 14:00" },
        { id: 50, grupo: "B", local: "Bosnia y Herzegovina",visitante: "Catar",                           kickoff: "2026-06-24T14:00:00-05:00", fechaStr: "Mié 24 Jun 14:00" },
        { id: 51, grupo: "C", local: "Escocia",             visitante: "Brasil",                          kickoff: "2026-06-24T17:00:00-05:00", fechaStr: "Mié 24 Jun 17:00" },
        { id: 52, grupo: "C", local: "Marruecos",           visitante: "Haití",                           kickoff: "2026-06-24T17:00:00-05:00", fechaStr: "Mié 24 Jun 17:00" },
        { id: 53, grupo: "A", local: "Chequia",             visitante: "México",                          kickoff: "2026-06-24T20:00:00-05:00", fechaStr: "Mié 24 Jun 20:00" },
        { id: 54, grupo: "A", local: "Sudáfrica",           visitante: "Corea del Sur",                   kickoff: "2026-06-24T20:00:00-05:00", fechaStr: "Mié 24 Jun 20:00" },
        { id: 55, grupo: "E", local: "Curazao",             visitante: "Costa de Marfil",                 kickoff: "2026-06-25T15:00:00-05:00", fechaStr: "Jue 25 Jun 15:00" },
        { id: 56, grupo: "E", local: "Ecuador",             visitante: "Alemania",                        kickoff: "2026-06-25T15:00:00-05:00", fechaStr: "Jue 25 Jun 15:00" },
        { id: 57, grupo: "F", local: "Japón",               visitante: "Suecia",                          kickoff: "2026-06-25T18:00:00-05:00", fechaStr: "Jue 25 Jun 18:00" },
        { id: 58, grupo: "F", local: "Túnez",               visitante: "Países Bajos",                    kickoff: "2026-06-25T18:00:00-05:00", fechaStr: "Jue 25 Jun 18:00" },
        { id: 59, grupo: "D", local: "Turquía",             visitante: "Estados Unidos",                  kickoff: "2026-06-25T21:00:00-05:00", fechaStr: "Jue 25 Jun 21:00" },
        { id: 60, grupo: "D", local: "Paraguay",            visitante: "Australia",                       kickoff: "2026-06-25T21:00:00-05:00", fechaStr: "Jue 25 Jun 21:00" },
        { id: 61, grupo: "I", local: "Noruega",             visitante: "Francia",                         kickoff: "2026-06-26T14:00:00-05:00", fechaStr: "Vie 26 Jun 14:00" },
        { id: 62, grupo: "I", local: "Senegal",             visitante: "Irak",                            kickoff: "2026-06-26T14:00:00-05:00", fechaStr: "Vie 26 Jun 14:00" },
        { id: 63, grupo: "H", local: "Cabo Verde",          visitante: "Arabia Saudita",                  kickoff: "2026-06-26T19:00:00-05:00", fechaStr: "Vie 26 Jun 19:00" },
        { id: 64, grupo: "H", local: "Uruguay",             visitante: "España",                          kickoff: "2026-06-26T19:00:00-05:00", fechaStr: "Vie 26 Jun 19:00" },
        { id: 65, grupo: "G", local: "Egipto",              visitante: "Irán",                            kickoff: "2026-06-26T22:00:00-05:00", fechaStr: "Vie 26 Jun 22:00" },
        { id: 66, grupo: "G", local: "Nueva Zelanda",       visitante: "Bélgica",                         kickoff: "2026-06-26T22:00:00-05:00", fechaStr: "Vie 26 Jun 22:00" },
        { id: 67, grupo: "L", local: "Panamá",              visitante: "Inglaterra",                      kickoff: "2026-06-27T16:00:00-05:00", fechaStr: "Sáb 27 Jun 16:00" },
        { id: 68, grupo: "L", local: "Croacia",             visitante: "Ghana",                           kickoff: "2026-06-27T16:00:00-05:00", fechaStr: "Sáb 27 Jun 16:00" },
        { id: 69, grupo: "K", local: "Colombia",            visitante: "Portugal",                        kickoff: "2026-06-27T18:30:00-05:00", fechaStr: "Sáb 27 Jun 18:30" },
        { id: 70, grupo: "K", local: "República Democrática del Congo", visitante: "Uzbekistán",          kickoff: "2026-06-27T18:30:00-05:00", fechaStr: "Sáb 27 Jun 18:30" },
        { id: 71, grupo: "J", local: "Argelia",             visitante: "Austria",                         kickoff: "2026-06-27T21:00:00-05:00", fechaStr: "Sáb 27 Jun 21:00" },
        { id: 72, grupo: "J", local: "Jordania",            visitante: "Argentina",                       kickoff: "2026-06-27T21:00:00-05:00", fechaStr: "Sáb 27 Jun 21:00" }
    ];

    const KNOCKOUT_DEFS = [
        { id: 73,  round: 'dieciseisavos', local: '2A',        visitor: '2B',        kickoff: "2026-06-28T14:00:00-05:00", fechaStr: "Dom 28 Jun 14:00" },
        { id: 74,  round: 'dieciseisavos', local: '1E',        visitor: 'Best3',     kickoff: "2026-06-29T15:30:00-05:00", fechaStr: "Lun 29 Jun 15:30" },
        { id: 75,  round: 'dieciseisavos', local: '1F',        visitor: '2C',        kickoff: "2026-06-29T20:00:00-05:00", fechaStr: "Lun 29 Jun 20:00" },
        { id: 76,  round: 'dieciseisavos', local: '1C',        visitor: '2F',        kickoff: "2026-06-29T12:00:00-05:00", fechaStr: "Lun 29 Jun 12:00" },
        { id: 77,  round: 'dieciseisavos', local: '1I',        visitor: 'Best3',     kickoff: "2026-06-30T16:00:00-05:00", fechaStr: "Mar 30 Jun 16:00" },
        { id: 78,  round: 'dieciseisavos', local: '2E',        visitor: '2I',        kickoff: "2026-06-30T12:00:00-05:00", fechaStr: "Mar 30 Jun 12:00" },
        { id: 79,  round: 'dieciseisavos', local: '1A',        visitor: 'Best3',     kickoff: "2026-06-30T20:00:00-05:00", fechaStr: "Mar 30 Jun 20:00" },
        { id: 80,  round: 'dieciseisavos', local: '1L',        visitor: 'Best3',     kickoff: "2026-07-01T11:00:00-05:00", fechaStr: "Mié 01 Jul 11:00" },
        { id: 81,  round: 'dieciseisavos', local: '1D',        visitor: 'Best3',     kickoff: "2026-07-01T19:00:00-05:00", fechaStr: "Mié 01 Jul 19:00" },
        { id: 82,  round: 'dieciseisavos', local: '1G',        visitor: 'Best3',     kickoff: "2026-07-01T15:00:00-05:00", fechaStr: "Mié 01 Jul 15:00" },
        { id: 83,  round: 'dieciseisavos', local: '2K',        visitor: '2L',        kickoff: "2026-07-02T18:00:00-05:00", fechaStr: "Jue 02 Jul 18:00" },
        { id: 84,  round: 'dieciseisavos', local: '1H',        visitor: '2J',        kickoff: "2026-07-02T14:00:00-05:00", fechaStr: "Jue 02 Jul 14:00" },
        { id: 85,  round: 'dieciseisavos', local: '1B',        visitor: 'Best3',     kickoff: "2026-07-02T20:00:00-05:00", fechaStr: "Jue 02 Jul 20:00" },
        { id: 86,  round: 'dieciseisavos', local: '1J',        visitor: '2H',        kickoff: "2026-07-03T15:00:00-05:00", fechaStr: "Vie 03 Jul 15:00" },
        { id: 87,  round: 'dieciseisavos', local: '1K',        visitor: 'Best3',     kickoff: "2026-07-03T20:30:00-05:00", fechaStr: "Vie 03 Jul 20:30" },
        { id: 88,  round: 'dieciseisavos', local: '2D',        visitor: '2G',        kickoff: "2026-07-03T13:00:00-05:00", fechaStr: "Vie 03 Jul 13:00" },
        { id: 89,  round: 'octavos',       local: 'Winner74',  visitor: 'Winner77',  kickoff: "2026-07-04T16:00:00-05:00", fechaStr: "Sáb 04 Jul 16:00" },
        { id: 90,  round: 'octavos',       local: 'Winner73',  visitor: 'Winner75',  kickoff: "2026-07-04T12:00:00-05:00", fechaStr: "Sáb 04 Jul 12:00" },
        { id: 91,  round: 'octavos',       local: 'Winner76',  visitor: 'Winner78',  kickoff: "2026-07-05T15:00:00-05:00", fechaStr: "Dom 05 Jul 15:00" },
        { id: 92,  round: 'octavos',       local: 'Winner79',  visitor: 'Winner80',  kickoff: "2026-07-05T19:00:00-05:00", fechaStr: "Dom 05 Jul 19:00" },
        { id: 93,  round: 'octavos',       local: 'Winner83',  visitor: 'Winner84',  kickoff: "2026-07-06T14:00:00-05:00", fechaStr: "Lun 06 Jul 14:00" },
        { id: 94,  round: 'octavos',       local: 'Winner81',  visitor: 'Winner82',  kickoff: "2026-07-06T19:00:00-05:00", fechaStr: "Lun 06 Jul 19:00" },
        { id: 95,  round: 'octavos',       local: 'Winner86',  visitor: 'Winner88',  kickoff: "2026-07-07T11:00:00-05:00", fechaStr: "Mar 07 Jul 11:00" },
        { id: 96,  round: 'octavos',       local: 'Winner85',  visitor: 'Winner87',  kickoff: "2026-07-07T15:00:00-05:00", fechaStr: "Mar 07 Jul 15:00" },
        { id: 97,  round: 'cuartos',       local: 'Winner89',  visitor: 'Winner90',  kickoff: "2026-07-09T15:00:00-05:00", fechaStr: "Jue 09 Jul 15:00" },
        { id: 98,  round: 'cuartos',       local: 'Winner93',  visitor: 'Winner94',  kickoff: "2026-07-10T14:00:00-05:00", fechaStr: "Vie 10 Jul 14:00" },
        { id: 99,  round: 'cuartos',       local: 'Winner91',  visitor: 'Winner92',  kickoff: "2026-07-11T16:00:00-05:00", fechaStr: "Sáb 11 Jul 16:00" },
        { id: 100, round: 'cuartos',       local: 'Winner95',  visitor: 'Winner96',  kickoff: "2026-07-11T20:00:00-05:00", fechaStr: "Sáb 11 Jul 20:00" },
        { id: 101, round: 'semis',         local: 'Winner97',  visitor: 'Winner98',  kickoff: "2026-07-14T14:00:00-05:00", fechaStr: "Mar 14 Jul 14:00" },
        { id: 102, round: 'semis',         local: 'Winner99',  visitor: 'Winner100', kickoff: "2026-07-15T14:00:00-05:00", fechaStr: "Mié 15 Jul 14:00" },
        { id: 103, round: 'tercero',       local: 'Losers101', visitor: 'Losers102', kickoff: "2026-07-18T16:00:00-05:00", fechaStr: "Sáb 18 Jul 16:00" },
        { id: 104, round: 'final',         local: 'Winner101', visitor: 'Winner102', kickoff: "2026-07-19T14:00:00-05:00", fechaStr: "Dom 19 Jul 14:00" }
    ];

    const BRACKET_LAYOUT = [
        { round: 'dieciseisavos', title: 'Dieciseisavos', matches: [74, 77, 73, 75, 83, 84, 81, 82, 76, 78, 79, 80, 86, 88, 85, 87] },
        { round: 'octavos', title: 'Octavos', matches: [89, 90, 93, 94, 91, 92, 95, 96] },
        { round: 'cuartos', title: 'Cuartos', matches: [97, 98, 99, 100] },
        { round: 'semis', title: 'Semifinales', matches: [101, 102] },
        { round: 'final', title: 'Fase Final', matches: [104] }
    ];
    const KO_POINTS = { dieciseisavos: 1, octavos: 2, cuartos: 3, semis: 4, final: 5, tercero: 2 };

    const STATE = {
        users: {}, predictions: {}, specials: {}, officialResults: {}, officialSpecials: {},
        knockoutPreds: {}, officialKnockout: {}, officialKnockoutMatches: {}, status: 'open',
        myId: null, currentUser: null, currentSelectedGroup: 'A',
        currentTablesView: 'groups', adminConnected: sessionStorage.getItem('p26adm') === '1',
        faseFinalEnabled: false, predictionsVisible: true, gruposLock: false, registrosLock: false,
        settings: { predictionsLocked: false },
        tableSource: 'simulated'
    };
    
    try { STATE.myId = localStorage.getItem('polla_myId'); } catch(e) {} // Protección contra navegación privada
    
    let toastTimeout;
    const DOM = { get: id => document.getElementById(id), q: sel => document.querySelector(sel), qAll: sel => document.querySelectorAll(sel) };

    // ========== ACTUALIZACIÓN VISUAL DE BOTONES ADMIN ==========
    function updateAdminButtonsUI() {
        if (!STATE.adminConnected) return;
        const btnOpen = DOM.get('btnAdminStatusOpen');
        const btnClosed = DOM.get('btnAdminStatusClosed');
        if (btnOpen && btnClosed) {
            if (STATE.settings.specialsOpen !== false) {
                btnOpen.style.background = 'var(--green)'; btnOpen.style.color = '#06201C';
                btnClosed.style.background = 'transparent'; btnClosed.style.color = '#EF4444';
            } else {
                btnOpen.style.background = 'transparent'; btnOpen.style.color = 'var(--text-muted)';
                btnClosed.style.background = '#EF4444'; btnClosed.style.color = '#fff';
            }
        }
        const btnFFVis = DOM.get('btnAdminFFVisible');
        const btnFFHid = DOM.get('btnAdminFFHidden');
        if (btnFFVis && btnFFHid) {
            btnFFVis.style.background = STATE.faseFinalEnabled ? 'var(--green)' : 'transparent';
            btnFFVis.style.color = STATE.faseFinalEnabled ? '#06201C' : 'var(--text-muted)';
            btnFFHid.style.background = !STATE.faseFinalEnabled ? 'var(--green)' : 'transparent';
            btnFFHid.style.color = !STATE.faseFinalEnabled ? '#06201C' : 'var(--text-muted)';
        }
        const btnPredVis = DOM.get('btnAdminPredsVisible');
        const btnPredHid = DOM.get('btnAdminPredsHidden');
        if (btnPredVis && btnPredHid) {
            btnPredVis.style.background = STATE.predictionsVisible ? 'var(--green)' : 'transparent';
            btnPredVis.style.color = STATE.predictionsVisible ? '#06201C' : 'var(--text-muted)';
            btnPredHid.style.background = !STATE.predictionsVisible ? 'var(--green)' : 'transparent';
            btnPredHid.style.color = !STATE.predictionsVisible ? '#06201C' : 'var(--text-muted)';
        }
    }

    function isQuinielaClosed() {
        return STATE.settings.predictionsLocked || STATE.status === 'closed';
    }

    function isMatchClosed(matchId) {
        if (STATE.adminConnected) return false;
        let match = ALL_MATCHES.find(m => m.id === matchId);
        if (!match) match = KNOCKOUT_DEFS.find(m => m.id === matchId);
        if (!match || !match.kickoff) return false;
        const cutoff = new Date(new Date(match.kickoff).getTime() - 15 * 60 * 1000);
        return new Date() >= cutoff;
    }

    db.ref('/').on('value', snap => {
        const data = snap.val() || {};
        STATE.users = data.users || {}; STATE.predictions = data.predictions || {}; STATE.specials = data.specials || {};
        STATE.officialResults = data.official_results || {}; STATE.officialSpecials = data.official_specials || {};
        STATE.knockoutPreds = data.knockout_preds || {}; STATE.officialKnockout = data.official_knockout || {};
        STATE.officialKnockoutMatches = data.official_knockout_matches || {}; STATE.status = data.status || 'open';
        STATE.faseFinalEnabled = data.fase_final_enabled !== undefined ? data.fase_final_enabled : false;
        STATE.predictionsVisible = data.predictions_visible !== undefined ? data.predictions_visible : true;
        STATE.gruposLock = !!data.grupos_lock; STATE.registrosLock = !!data.registros_lock;
        STATE.settings.predictionsLocked = !!(data.settings && data.settings.predictionsLocked);
        STATE.settings.specialsOpen = data.settings?.specialsOpen !== false;
        if (STATE.myId && STATE.users[STATE.myId]) STATE.currentUser = STATE.users[STATE.myId];
        calculatePointsEngine(); updateProgress(); refreshUIAfterData();
        const activeScreenId = document.querySelector('.screen.active')?.id || 'screenWelcome';
        goToScreen(activeScreenId);
    }, error => {
        console.error("Error cargando Firebase:", error);
        const userBadge = DOM.get('userBadge'); if (userBadge) userBadge.textContent = "⚠️ Error de Red";
    });

    function triggerToast(msg = 'Sincronizado con la Nube') {
        const t = DOM.get('toast'); if (!t) return;
        t.textContent = msg; t.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => t.classList.remove('show'), 1500);
    }

    function updateUIForLockState() {
        const closed = isQuinielaClosed(); // Para la fase final y grupos
        
        // --- LÓGICA DE COMODINES CORREGIDA ---
        const mySpec = STATE.myId && STATE.specials[STATE.myId] ? STATE.specials[STATE.myId] : {};
        
        // 1. ¿El admin cerró los comodines desde el panel?
        const comodinesGlobalCerrados = STATE.settings && STATE.settings.specialsOpen === false;
        // 2. ¿El usuario ya selló sus comodines con el botón?
        const comodinesSellaosUsuario = mySpec.is_locked === true;
        
        // Se bloquean si pasa cualquiera de las dos cosas
        const lockSpecials = comodinesGlobalCerrados || comodinesSellaosUsuario;

        const bannerFaseFinal = DOM.get('closureBannerFaseFinal');
        if (bannerFaseFinal) bannerFaseFinal.style.display = closed ? 'block' : 'none';
        
        const bannerSpecial = DOM.get('closureBannerSpecial');
        if (bannerSpecial) {
            if (comodinesGlobalCerrados) {
                bannerSpecial.style.display = 'block';
                bannerSpecial.textContent = '🔒 Los comodines están cerrados por el administrador';
            } else if (comodinesSellaosUsuario) {
                bannerSpecial.style.display = 'block';
                bannerSpecial.textContent = '🔒 Ya registraste tus comodines. No se pueden modificar.';
            } else {
                bannerSpecial.style.display = 'none';
            }
        }

        const bannerPreds = DOM.get('closureBannerPredictions');
        if (bannerPreds) bannerPreds.style.display = 'none';

        // Aplica el bloqueo a los inputs y al botón
        document.querySelectorAll('#screenSpecial select, #screenSpecial input').forEach(el => {
            el.disabled = lockSpecials && !STATE.adminConnected;
        });
        
        const btnGuardarSpecial = DOM.get('btnGuardarIrFF');
        if (btnGuardarSpecial) {
            btnGuardarSpecial.disabled = lockSpecials && !STATE.adminConnected;
        }

        // Aplica el bloqueo a la Fase Final
        if (closed) {
            document.querySelectorAll('#screenFaseFinal .ko-team-btn').forEach(btn => { btn.disabled = true; btn.classList.add('disabled'); });
        } else {
            document.querySelectorAll('#screenFaseFinal .ko-team-btn').forEach(btn => {
                const isPlaceholder = ['Ganador', 'Mejor', 'Perdedor', 'Por definir'].some(p => btn.dataset.team?.startsWith(p));
                if (!isPlaceholder) { btn.disabled = false; btn.classList.remove('disabled'); }
            });
        }
    }
    
    function updateProgress() {
        if (!STATE.myId) return;
        const userPreds = STATE.predictions[STATE.myId] || {}; let count = 0;
        ALL_MATCHES.forEach(m => {
            const p = userPreds[m.id];
            if (p && p.gl !== '' && p.gv !== '' && p.gl !== undefined && p.gv !== undefined && p.gl !== null && p.gv !== null && !isNaN(p.gl) && !isNaN(p.gv)) count++;
        });
        const pct = Math.round((count / 72) * 100);
        const pText = DOM.get('progressText'); const pBar = DOM.get('progressBar');
        if (pText) pText.textContent = `Pronósticos completados: ${count} / 72 partidos`;
        if (pBar) pBar.style.width = `${pct}%`;
    }

    const _desgloseCache = {};
    const REGLAS_POLLA = { PUNTOS_EXACTO: 3, PUNTOS_TENDENCIA: 1, PUNTOS_NADA: 0 };

    function evaluarPuntosPartido(pred, real) {
        if (!real || real.goles_local === undefined || real.goles_visitante === undefined || real.goles_local === null || real.goles_visitante === null || real.goles_local === '' || real.goles_visitante === '') {
            return { puntos: REGLAS_POLLA.PUNTOS_NADA, motivo: 'Sin resultado oficial', tipo: 'pendiente' };
        }
        if (!pred || pred.goles_local === undefined || pred.goles_visitante === undefined || pred.goles_local === null || pred.goles_visitante === null || pred.goles_local === '' || pred.goles_visitante === '') {
            return { puntos: REGLAS_POLLA.PUNTOS_NADA, motivo: 'No pronosticado', tipo: 'no_pronosticado' };
        }
        const pL = parseInt(pred.goles_local, 10); const pV = parseInt(pred.goles_visitante, 10);
        const rL = parseInt(real.goles_local, 10); const rV = parseInt(real.goles_visitante, 10);
        if (isNaN(pL) || isNaN(pV) || isNaN(rL) || isNaN(rV)) return { puntos: REGLAS_POLLA.PUNTOS_NADA, motivo: 'Dato inválido', tipo: 'pendiente' };
        if (pL === rL && pV === rV) return { puntos: REGLAS_POLLA.PUNTOS_EXACTO, motivo: `Marcador exacto (+${REGLAS_POLLA.PUNTOS_EXACTO} pts)`, tipo: 'exacto' };
        if (Math.sign(pL - pV) === Math.sign(rL - rV)) return { puntos: REGLAS_POLLA.PUNTOS_TENDENCIA, motivo: `Ganador/empate correcto (+${REGLAS_POLLA.PUNTOS_TENDENCIA} pt)`, tipo: 'tendencia' };
        return { puntos: REGLAS_POLLA.PUNTOS_NADA, motivo: 'Pronóstico incorrecto (0 pts)', tipo: 'incorrecto' };
    }

    function calcularRankingGeneral(usuariosArray) {
        if (!usuariosArray || !Array.isArray(usuariosArray)) return [];
        const ranking = usuariosArray.map(usuario => {
            const uid = usuario.id || usuario.uid;
            const prediccionesUsuario = STATE.predictions[uid] || {};
            let exactosContador = 0; const desgloseHistorial = [];
            ALL_MATCHES.forEach(partido => {
                const resultadoOficial = STATE.officialResults[partido.id];
                const prediccionRaw = prediccionesUsuario[partido.id];
                const predAdapted = (prediccionRaw && prediccionRaw.gl !== undefined) ? { goles_local: prediccionRaw.gl, goles_visitante: prediccionRaw.gv } : null;
                const realAdapted = (resultadoOficial && resultadoOficial.gl !== undefined) ? { goles_local: resultadoOficial.gl, goles_visitante: resultadoOficial.gv } : null;
                const evaluacion = evaluarPuntosPartido(predAdapted, realAdapted);
                if (evaluacion.tipo === 'exacto') exactosContador++;
                if (evaluacion.tipo !== 'pendiente' || predAdapted !== null) {
                    desgloseHistorial.push({ partidoId: partido.id, infoPartido: partido, prediccion: predAdapted, resultadoReal: realAdapted, evaluacion: evaluacion });
                }
            });
            return { id: uid, nombre: usuario.nombre_apodo || 'Usuario Anónimo', puntos: usuario.total_puntos || 0, exactos: exactosContador, fecha_registro: usuario.date_registered || 0, desglose: desgloseHistorial };
        });
        ranking.sort((a, b) => {
            if (b.puntos !== a.puntos) return b.puntos - a.puntos;
            if (b.exactos !== a.exactos) return b.exactos - a.exactos;
            const timeA = new Date(a.fecha_registro).getTime(); const timeB = new Date(b.fecha_registro).getTime();
            if (timeA !== timeB) return timeA - timeB;
            return a.nombre.localeCompare(b.nombre);
        });
        return ranking.map((item, index) => { return { posicion: index + 1, ...item }; });
    }
    
    function abrirModalDesglose(desglose, nombreParticipante) {
        const cuerpo = DOM.get('modalDesgloseCuerpo'); const titulo = DOM.get('modalDesgloseTitulo'); const modal  = DOM.get('modalDesglose');
        if (!cuerpo || !titulo || !modal) return;
        titulo.textContent = `Puntos de: ${nombreParticipante}`; cuerpo.innerHTML = '';
        const itemsVisibles = desglose.filter(item => item.evaluacion.tipo !== 'pendiente' || item.prediccion !== null);
        if (itemsVisibles.length === 0) {
            cuerpo.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:24px;">Este participante no tiene pronósticos registrados aún.</p>`;
        } else {
            const ordenados = [...itemsVisibles].sort((a, b) => {
                const tieneResultA = a.resultadoReal ? 0 : 1; const tieneResultB = b.resultadoReal ? 0 : 1;
                if (tieneResultA !== tieneResultB) return tieneResultA - tieneResultB;
                return a.partidoId - b.partidoId;
            });
            ordenados.forEach(item => {
                const part = item.infoPartido; const pred = item.prediccion; const real = item.resultadoReal; const eval_ = item.evaluacion;
                const colorBorde = eval_.tipo === 'exacto' ? 'var(--gold)' : eval_.tipo === 'tendencia' ? 'var(--green)' : eval_.tipo === 'incorrecto' ? 'var(--coral)' : 'var(--border)';
                const predStr = pred ? `${pred.goles_local} - ${pred.goles_visitante}` : '—';
                const realStr = real ? `${real.goles_local} - ${real.goles_visitante}` : 'Pendiente';
                const div = document.createElement('div'); div.className = 'desglose-item'; div.style.borderLeft = `4px solid ${colorBorde}`;
                div.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px;">
                        <span class="desglose-match-name">${FLAGS[part.local]||'🏳️'} ${part.local} vs ${part.visitante} ${FLAGS[part.visitante]||'🏳️'} · Gr.${part.grupo}</span>
                        <span class="desglose-motivo" style="color:${colorBorde};">${eval_.motivo}</span>
                    </div>
                    <div class="desglose-scores">
                        <div><span class="desglose-score-label">Tu pronóstico: </span><span class="desglose-score-val" style="color:var(--text-main);">${predStr}</span></div>
                        <div><span class="desglose-score-label">Resultado real: </span><span class="desglose-score-val" style="color:${real ? 'var(--green)' : 'var(--text-muted)'};">${realStr}</span></div>
                    </div>`;
                cuerpo.appendChild(div);
            });
        }
        modal.style.display = 'flex';
    }

    function cerrarModalDesglose() {
        const modal = DOM.get('modalDesglose'); if (modal) modal.style.display = 'none';
    }
    document.getElementById('modalDesglose').addEventListener('click', function(e) { if (e.target === this) cerrarModalDesglose(); });

    function goToScreen(id) {
        if (!STATE.adminConnected) {
            if (id === 'screenPredictions' && !STATE.predictionsVisible) { goToScreen('screenMenu'); return; }
            if (id === 'screenFaseFinal' && !STATE.faseFinalEnabled) { goToScreen('screenMenu'); return; }
        }
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(id); if (target) target.classList.add('active');
        document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => btn.classList.remove('active'));
        const navBtn = document.querySelector(`.bottom-nav .nav-item[onclick*="${id}"]`);
        if (navBtn) navBtn.classList.add('active');
        if (id === 'screenPredictions') { renderPredictions(); updateUIForLockState(); }
        if (id === 'screenTables') renderTables();
        if (id === 'screenSpecial') { populateSpecials(); updateUIForLockState(); }
        if (id === 'screenRanking') renderRanking();
        if (id === 'screenLogin') populateExistingUsers();
        if (id === 'screenAdmin' && STATE.adminConnected) adminLoadResults();
        if (id === 'screenFaseFinal') {
            if (!STATE.faseFinalEnabled) { goToScreen('screenMenu'); return; }
            renderFaseFinal(); updateUIForLockState();
        }
        const barraSticky = DOM.get('miPosicionSticky');
        if (barraSticky) barraSticky.style.display = (id === 'screenRanking' && STATE.myId) ? 'flex' : 'none';
        const ub = DOM.get('userBadge'); if (ub) ub.textContent = STATE.currentUser ? `👤 ${STATE.currentUser.nombre_apodo}` : '👤 Sin sesión';
        const cw = DOM.get('closureWarning'); 
        if (cw && id === 'screenWelcome') cw.textContent = STATE.status === 'closed' ? '⚽ ¡El mundial ya comenzó! Los partidos se bloquean individualmente según su horario de juego.' : '';
        applyVisibility();
        if (!['screenWelcome','screenLogin','screenRegister'].includes(id) && !STATE.currentUser) goToScreen('screenWelcome');
    }

    function applyVisibility() {
        const faseEnabled = STATE.faseFinalEnabled; const predVisible = STATE.predictionsVisible;
        const btnFF = DOM.get('btnFaseFinalMenu'); if (btnFF) btnFF.style.display = faseEnabled ? 'flex' : 'none';
        const navFF = DOM.get('navItemFaseFinal'); if (navFF) navFF.style.display = faseEnabled ? 'flex' : 'none';
        const navPred = DOM.get('navItemPredictions'); if (navPred) navPred.style.display = predVisible ? 'flex' : 'none';
        const btnPredMenu = DOM.get('btnPredMenu'); if (btnPredMenu) btnPredMenu.style.display = predVisible ? 'flex' : 'none';
        const tabBracket = DOM.get('tabBracketView');
        if (tabBracket) {
            if (!faseEnabled && STATE.currentTablesView === 'bracket') {
                STATE.currentTablesView = 'groups';
                DOM.get('tabGroupsView')?.classList.add('active'); tabBracket.classList.remove('active');
                const gb = DOM.get('tablesGroupsBlock'); const bb = DOM.get('tablesBracketBlock');
                if (gb) gb.style.display = 'block'; if (bb) bb.style.display = 'none';
            }
        }
        const btnGoFF = DOM.get('btnGuardarIrFF');
        if (btnGoFF) btnGoFF.textContent = faseEnabled ? '💾 Guardar e ir a Fase Final' : '💾 Guardar y volver al Menú';
    }

    function registerUser() {
        if (STATE.registrosLock) { alert('Los registros están cerrados.'); return; }
        if (isQuinielaClosed() && !STATE.adminConnected) { alert('La Polla Mundialista está cerrada.'); return; }
        const nick = DOM.get('inputNickname').value.trim(); if (!nick) { alert('Ingresa un apodo familiar.'); return; }
        if (Object.values(STATE.users).some(u => u.nombre_apodo.toLowerCase() === nick.toLowerCase())) { alert('Este nombre ya existe.'); return; }
        const newId = 'u_' + Date.now();
        const userObj = { id: newId, nombre_apodo: nick, total_puntos: 0, exacts: 0, date_registered: new Date().toISOString() };
        db.ref('users/' + newId).set(userObj).then(() => {
            localStorage.setItem('polla_myId', newId); STATE.myId = newId; STATE.currentUser = userObj;
            goToScreen('screenInstructions');
        }).catch(err => { console.error(err); alert('Error al registrar.'); });
    }

    function populateExistingUsers() {
        const s = DOM.get('selectExistingUser'); if (!s) return;
        s.innerHTML = '<option value="">Busca tu nombre familiar...</option>';
        Object.values(STATE.users).forEach(u => s.innerHTML += `<option value="${u.id}">${u.nombre_apodo}</option>`);
    }

    function loginExistingUser() {
        const selectedId = DOM.get('selectExistingUser').value; if (!selectedId) return;
        localStorage.setItem('polla_myId', selectedId); STATE.myId = selectedId; STATE.currentUser = STATE.users[selectedId];
        goToScreen('screenMenu');
    }

    function logout() { localStorage.removeItem('polla_myId'); STATE.myId = null; STATE.currentUser = null; goToScreen('screenWelcome'); }

    function renderPredictions() {
        if (!STATE.currentUser) return;
        const container = DOM.get('matchesContainer'); if (!container) return;
        const screen = DOM.get('screenPredictions'); const scrollBefore = screen ? screen.scrollTop : 0;
        const focused = document.activeElement;
        if (focused && focused.classList.contains('score-box') && container.contains(focused)) { updateProgress(); return; }
        let html = ''; const myPreds = STATE.predictions[STATE.myId] || {};
        ALL_MATCHES.forEach(m => {
            const p = myPreds[m.id] || { gl: '', gv: '' };
            const matchClosed = isMatchClosed(m.id); const dis = matchClosed ? 'disabled' : '';
            const tag = matchClosed ? '<span class="match-status locked">🔒 Cerrado</span>' : '<span class="match-status open">🟢 Abierto</span>';
            html += `
            <div class="match-row">
                <div class="match-date"><span>📅 ${m.fechaStr} (Grupo ${m.grupo})</span> ${tag}</div>
                <div class="match-teams">
                    <div class="team"><span class="flag">${FLAGS[m.local] || '🏳️'}</span> <span>${m.local}</span></div>
                    <div class="score-inputs">
                        <input type="number" inputmode="numeric" pattern="[0-9]*" class="score-box" data-mid="${m.id}" value="${p.gl !== undefined ? p.gl : ''}" oninput="APP.saveScoreCloud(${m.id},'gl',this.value)" ${dis}>
                        <span class="divider">-</span>
                        <input type="number" inputmode="numeric" pattern="[0-9]*" class="score-box" data-mid="${m.id}" value="${p.gv !== undefined ? p.gv : ''}" oninput="APP.saveScoreCloud(${m.id},'gv',this.value)" ${dis}>
                    </div>
                    <div class="team right"><span>${m.visitante}</span> <span class="flag">${FLAGS[m.visitante] || '🏳️'}</span></div>
                </div>
            </div>`;
        });
        container.innerHTML = html;
        if (screen) requestAnimationFrame(() => { screen.scrollTop = scrollBefore; });
    }

    function saveScoreCloud(mid, side, val) {
        if (isMatchClosed(mid)) { triggerToast('🔒 La quiniela está cerrada'); return; }
        if (val.length > 2) val = val.slice(0, 2);
        const v = val === '' ? '' : parseInt(val); if (v < 0) return;
        db.ref(`predictions/${STATE.myId}/${mid}/${side}`).set(v).then(() => {
            if (!STATE.predictions[STATE.myId]) STATE.predictions[STATE.myId] = {};
            if (!STATE.predictions[STATE.myId][mid]) STATE.predictions[STATE.myId][mid] = {};
            STATE.predictions[STATE.myId][mid][side] = v;
            updateProgress(); triggerToast('✅ Guardado');
        }).catch(err => { console.error(err); triggerToast('❌ Error'); });
    }

    function renderTables() {
        const isBracket = STATE.currentTablesView === 'bracket';
        DOM.get('tabGroupsView')?.classList.toggle('active', !isBracket);
        DOM.get('tabBracketView')?.classList.toggle('active', isBracket);
        const groupsBlock = DOM.get('tablesGroupsBlock'); const bracketBlock = DOM.get('tablesBracketBlock');
        if (groupsBlock) groupsBlock.style.display = isBracket ? 'none' : 'block';
        if (bracketBlock) bracketBlock.style.display = isBracket ? 'block' : 'none';
        DOM.get('tabSourceSimulated')?.classList.toggle('active', STATE.tableSource === 'simulated');
        DOM.get('tabSourceReal')?.classList.toggle('active', STATE.tableSource === 'real');
        const container = DOM.get('groupTabsContainer');
        if (container) container.innerHTML = Object.keys(GROUPS).map(g => `<button class="group-tab ${STATE.currentSelectedGroup === g ? 'active' : ''}" onclick="APP.setTableGroupActive('${g}')">Grupo ${g}</button>`).join('');
        let sourceData = STATE.tableSource === 'real' ? (STATE.officialResults || {}) : (STATE.predictions[STATE.myId] || {});
        const standings = DOM.get('liveGroupStandings');
        if (standings) standings.innerHTML = buildGroupStandings(STATE.currentSelectedGroup, sourceData);
        if (isBracket) renderTablesBracket();
    }

    function setTableGroupActive(g) { STATE.currentSelectedGroup = g; STATE.currentTablesView = 'groups'; renderTables(); }
    function setTablesView(view) { STATE.currentTablesView = view === 'bracket' ? 'bracket' : 'groups'; renderTables(); }
    function setTableSource(source) { STATE.tableSource = source; renderTables(); }

    function buildGroupStandings(grupo, source) {
        const teams = GROUPS[grupo]; const matrix = {};
        teams.forEach(t => matrix[t] = { name: t, flag: FLAGS[t] || '🏳️', pj:0, pg:0, pe:0, pp:0, gf:0, gc:0, dg:0, pts:0 });
        ALL_MATCHES.filter(m => m.grupo === grupo).forEach(m => {
            const p = source[m.id];
            if (p && p.gl !== '' && p.gv !== '' && p.gl !== undefined && p.gv !== undefined && !isNaN(p.gl) && !isNaN(p.gv)) {
                const gl = parseInt(p.gl); const gv = parseInt(p.gv);
                const tl = matrix[m.local]; const tv = matrix[m.visitante];
                if (!tl || !tv) return;
                tl.pj++; tv.pj++; tl.gf += gl; tl.gc += gv; tv.gf += gv; tv.gc += gl;
                if (gl > gv) { tl.pg++; tl.pts += 3; tv.pp++; } else if (gl < gv) { tv.pg++; tv.pts += 3; tl.pp++; } else { tl.pe++; tv.pe++; tl.pts++; tv.pts++; }
            }
        });
        Object.values(matrix).forEach(t => t.dg = t.gf - t.gc);
        const sorted = Object.values(matrix).sort((a,b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        let html = `<div class="standings-container"><table class="standings">
            <tr><th style="text-align:left;">Equipo</th><th>PTS</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>DG</th></tr>`;
        sorted.forEach((t, index) => {
            let rowClass = index === 0 || index === 1 ? 'row-qualified' : (index === 2 ? 'row-best-third' : '');
            html += `<tr class="${rowClass}">
                <td class="st-team"><span class="flag">${t.flag}</span> <span>${t.name}</span></td>
                <td style="color:var(--gold); font-weight:bold; font-size:0.9rem;">${t.pts}</td>
                <td>${t.pj}</td><td>${t.pg}</td><td>${t.pe}</td><td>${t.pp}</td>
                <td>${t.gf}</td><td>${t.gc}</td>
                <td style="color:${t.dg>0?'var(--green)':t.dg<0?'#EF4444':'inherit'}">${t.dg>0?'+'+t.dg:t.dg}</td>
            </tr>`;
        });
        return html + '</table></div>';
    }

    function renderRanking() {
        const rankingProcesado = calcularRankingGeneral(Object.values(STATE.users));
        const contenedor = DOM.get('rankingContent'); if (!contenedor) return;
        if (rankingProcesado.length === 0) { contenedor.innerHTML = `<p style="text-align:center; padding:24px; color:var(--text-muted);">Aún no hay participantes registrados.</p>`; return; }
        rankingProcesado.forEach(u => { _desgloseCache[u.id] = u.desglose; });
        let html = '';
        rankingProcesado.forEach(usuario => {
            const esMiFila = usuario.id === STATE.myId;
            let posIcon = usuario.posicion === 1 ? '🥇' : usuario.posicion === 2 ? '🥈' : usuario.posicion === 3 ? '🥉' : `<span style="font-size:0.9rem; color:var(--text-muted);">#${usuario.posicion}</span>`;
            const nombreSafe = usuario.nombre.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
            html += `<div class="ranking-row${esMiFila ? ' mi-fila' : ''}" onclick="APP.mostrarDesglose('${usuario.id}', '${nombreSafe}')" role="button" tabindex="0" aria-label="Ver desglose de ${usuario.nombre}">
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:1.1rem; width:32px; text-align:center;">${posIcon}</span>
                    <span style="color:${esMiFila ? 'var(--green)' : 'var(--text-main)'}; font-weight:${esMiFila ? '800' : '600'};">${usuario.nombre}${esMiFila ? ' ⭐' : ''}</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:0.78rem; color:var(--text-muted); background:var(--bg-card-soft); padding:2px 7px; border-radius:4px;" title="Marcadores exactos">🎯 ${usuario.exactos}</span>
                    <span style="font-weight:800; color:var(--gold); font-size:1rem;">${usuario.puntos} pts</span>
                    <span style="color:var(--text-muted); font-size:0.85rem;">›</span>
                </div>
            </div>`;
        });
        contenedor.innerHTML = html;
        const barraSticky = DOM.get('miPosicionSticky');
        if (barraSticky && STATE.myId) {
            const miData = rankingProcesado.find(u => u.id === STATE.myId);
            if (miData) {
                DOM.get('stickyMiRango').textContent = `#${miData.posicion}`; DOM.get('stickyMiPuntos').textContent = `${miData.puntos} pts`; barraSticky.style.display = 'flex';
            } else barraSticky.style.display = 'none';
        }
    }

    function showRankingRulesModal() {
        const container = DOM.get('dynamicModalContainer'); if (!container) return;
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-card">
                <h3>📜 ¿Cómo se ganan los puntos?</h3>
                <ul>
                    <li><span>🎯 Marcador exacto</span><span class="pts">3 pts</span></li>
                    <li><span>✅ Ganador correcto</span><span class="pts">1 pt</span></li>
                    <li><span>🥇 Primero de grupo</span><span class="pts">2 pts</span></li>
                    <li><span>🥈 Segundo de grupo</span><span class="pts">2 pts</span></li>
                    <li><span>🥉 Mejor tercero</span><span class="pts">1 pt</span></li>
                    <li><span>🔥 Pronósticos Fase Final</span><span class="pts">+1 a +5 pts</span></li>
                    <li><span>🌟 Revelación / 😱 Decepción</span><span class="pts">5 pts c/u</span></li>
                    <li><span>🇪🇨 Ecuador (etapa final)</span><span class="pts">10 pts</span></li>
                    <li><span>👑 Campeón / ⚽ Goleador</span><span class="pts">10 pts c/u</span></li>
                </ul>
                <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">Entendido 👍</button>
            </div>`;
        overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
        container.appendChild(overlay);
    }

    function calculatePointsEngine() {
        Object.keys(STATE.users).forEach(uid => {
            let pts = 0; let exacts = 0; const uPreds = STATE.predictions[uid] || {}; const uSpec = STATE.specials[uid] || {};
            ALL_MATCHES.forEach(m => {
                const off = STATE.officialResults[m.id]; const pr = uPreds[m.id];
                if (off && pr && off.gl !== undefined && off.gv !== undefined && pr.gl !== undefined && pr.gv !== undefined) {
                    const ogl = parseInt(off.gl), ogv = parseInt(off.gv); const pgl = parseInt(pr.gl), pgv = parseInt(pr.gv);
                    if (!isNaN(ogl) && !isNaN(ogv) && !isNaN(pgl) && !isNaN(pgv)) {
                        if (ogl === pgl && ogv === pgv) { pts += 3; exacts++; } else if (Math.sign(ogl - ogv) === Math.sign(pgl - pgv)) pts += 1;
                    }
                }
            });
            const oSp = STATE.officialSpecials || {};
            if (oSp.revelacion && uSpec.seleccion_revelacion === oSp.revelacion) pts += 5;
            if (oSp.decepcion && uSpec.seleccion_decepcion === oSp.decepcion) pts += 5;
            if (oSp.ecuador && uSpec.posicion_ecuador === oSp.ecuador) pts += 10;
            if (oSp.campeon && uSpec.campeon_mundial === oSp.campeon) pts += 10;
            if (oSp.goleador && uSpec.goleador_mundial && uSpec.goleador_mundial.trim().toLowerCase() === oSp.goleador.trim().toLowerCase()) pts += 10;
            const uKo = STATE.knockoutPreds[uid] || {};
            Object.keys(STATE.officialKnockout || {}).forEach(mid => {
                const officialWinner = STATE.officialKnockout[mid]; const userPick = uKo[mid];
                if (officialWinner && userPick && userPick === officialWinner) {
                    const def = KNOCKOUT_DEFS.find(d => d.id === parseInt(mid)); if (def) pts += (KO_POINTS[def.round] || 0);
                }
            });
            pts += calcularPuntosClasificacion(uid);
            STATE.users[uid].total_puntos = pts; STATE.users[uid].exacts = exacts;
        });
    }

    function calcularPuntosClasificacion(uid) {
        let pts = 0; const userPreds = STATE.predictions[uid] || {};
        const realGrouped = computeStandingsFromResults(STATE.officialResults);
        const userResults = {};
        ALL_MATCHES.forEach(m => {
            const p = userPreds[m.id];
            if (p && p.gl !== '' && p.gv !== '' && p.gl !== undefined && p.gv !== undefined && !isNaN(p.gl) && !isNaN(p.gv)) { userResults[m.id] = { gl: parseInt(p.gl), gv: parseInt(p.gv) }; }
        });
        const userGrouped = computeStandingsFromResults(userResults);
        const gruposCompletos = Object.keys(GROUPS).every(g => { const arr = realGrouped[g] || []; return arr.length === 4 && arr.every(t => t.pj === 3); });
        if (!gruposCompletos) return 0;
        
        Object.keys(GROUPS).forEach(g => {
            const real = realGrouped[g] || []; const user = userGrouped[g] || [];
            if (real[0] && user[0] && real[0].team === user[0].team) pts += 2;
            if (real[1] && user[1] && real[1].team === user[1].team) pts += 2;
        });
        const realThirds = [];
        Object.keys(GROUPS).forEach(g => { const arr = realGrouped[g] || []; if (arr[2]) realThirds.push({ team: arr[2].team, pts: arr[2].pts, dg: arr[2].dg, gf: arr[2].gf }); });
        realThirds.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        const top8Thirds = realThirds.slice(0, 8).map(x => x.team);
        
        const userThirds = [];
        Object.keys(GROUPS).forEach(g => { const arr = userGrouped[g] || []; if (arr[2]) userThirds.push({ team: arr[2].team, pts: arr[2].pts, dg: arr[2].dg, gf: arr[2].gf }); });
        userThirds.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        const userTop8Thirds = userThirds.slice(0, 8).map(x => x.team);
        userTop8Thirds.forEach(team => { if (top8Thirds.includes(team)) pts += 1; });
        return pts;
    }
    
    function computeStandingsFromResults(resultsMap) {
        const standings = {};
        Object.keys(GROUPS).forEach(g => { GROUPS[g].forEach(t => { standings[t] = { team: t, group: g, pj:0, pts:0, gf:0, gc:0, dg:0, pg:0, pe:0, pp:0 }; }); });
        ALL_MATCHES.forEach(m => {
            const res = resultsMap[m.id];
            if (res && res.gl !== undefined && res.gv !== undefined && res.gl !== null && res.gv !== null && !isNaN(res.gl) && !isNaN(res.gv)) {
                const gl = parseInt(res.gl), gv = parseInt(res.gv); const tl = standings[m.local], tv = standings[m.visitante];
                if (!tl || !tv) return;
                tl.pj++; tv.pj++; tl.gf += gl; tl.gc += gv; tv.gf += gv; tv.gc += gl;
                if (gl > gv) { tl.pg++; tl.pts += 3; tv.pp++; } else if (gl < gv) { tv.pg++; tv.pts += 3; tl.pp++; } else { tl.pe++; tv.pe++; tl.pts++; tv.pts++; }
            }
        });
        const grouped = {};
        Object.keys(GROUPS).forEach(g => {
            grouped[g] = Object.values(standings).filter(s => s.group === g); grouped[g].forEach(t => t.dg = t.gf - t.gc);
            grouped[g].sort((a,b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        });
        return grouped;
    }

    function computeBestThirds(groupedStandings) {
        const thirds = []; Object.keys(groupedStandings).forEach(g => { const arr = groupedStandings[g]; if (arr && arr[2]) thirds.push({ group: g, team: arr[2] }); });
        thirds.sort((a,b) => b.team.pts - a.team.pts || b.team.dg - a.team.dg || b.team.gf - a.team.gf);
        return thirds.map(x => x.team.team);
    }

    function buildKnockoutFromStandings(grouped, bestThirds) {
        const best3Queue = bestThirds.slice();
        function resolveToken(token) {
            if (!token) return ''; if (token === 'Best3') return best3Queue.length ? best3Queue.shift() : 'Mejor 3°';
            if (token.startsWith('1')) { const g = token.slice(1); return (grouped[g] && grouped[g][0]) ? grouped[g][0].team : `1${g}`; }
            if (token.startsWith('2')) { const g = token.slice(1); return (grouped[g] && grouped[g][1]) ? grouped[g][1].team : `2${g}`; }
            return token;
        }
        return KNOCKOUT_DEFS.map(def => {
            let local = def.local, visitor = def.visitor;
            if (def.round === 'dieciseisavos') { local = resolveToken(local); visitor = resolveToken(visitor); }
            else { if (/^[12][A-L]$/.test(local)) local = resolveToken(local); if (/^[12][A-L]$/.test(visitor)) visitor = resolveToken(visitor); }
            return { id: def.id, round: def.round, local, visitor };
        });
    }

    function generateOfficialBracketAndSave() {
        const grouped = computeStandingsFromResults(STATE.officialResults); const best3 = computeBestThirds(grouped);
        const matches = buildKnockoutFromStandings(grouped, best3); const mapping = {};
        matches.forEach(m => mapping[m.id] = { local: m.local, visitor: m.visitor, round: m.round });
        db.ref('official_knockout_matches').set(mapping).then(() => { triggerToast('✅ Bracket oficial generado'); }).catch(err => console.error(err));
    }

    function getUserGeneratedKnockoutMatches() {
        let userResults = {};
        if (STATE.tableSource === 'real') { userResults = STATE.officialResults || {}; }
        else {
            const userPreds = STATE.predictions[STATE.myId] || {};
            ALL_MATCHES.forEach(m => {
                const p = userPreds[m.id];
                if (p && p.gl !== '' && p.gv !== '' && !isNaN(p.gl) && !isNaN(p.gv)) userResults[m.id] = { gl: parseInt(p.gl), gv: parseInt(p.gv) };
            });
        }
        const grouped = computeStandingsFromResults(userResults); const best3 = computeBestThirds(grouped);
        return { grouped, best3, matches: buildKnockoutFromStandings(grouped, best3) };
    }

    function resolveBracketTokenGeneral(token, matches, myKo, grouped, best3Queue) {
        if (!token) return ''; if (token === 'Best3') return best3Queue.length ? best3Queue.shift() : 'Mejor 3°';
        if (/^[12][A-L]$/.test(token)) { const g = token.slice(1); const pos = parseInt(token[0], 10) - 1; return (grouped[g] && grouped[g][pos]) ? grouped[g][pos].team : `Por definir (${token})`; }
        if (token.startsWith('Winner')) { const refId = token.replace('Winner', ''); return myKo[refId] || `Ganador M${refId}`; }
        if (token.startsWith('Losers')) {
            const refId = token.replace('Losers', ''); const parentMatch = matches.find(x => x.id === parseInt(refId, 10)); if (!parentMatch) return `Perdedor M${refId}`;
            const pLocal = resolveBracketTokenGeneral(parentMatch.local, matches, myKo, grouped, best3Queue); const pVisitor = resolveBracketTokenGeneral(parentMatch.visitor, matches, myKo, grouped, best3Queue);
            const winner = myKo[refId]; if (!winner || winner.startsWith('Ganador') || winner.startsWith('Por definir')) return `Perdedor M${refId}`;
            return winner === pLocal ? pVisitor : pLocal;
        }
        return token;
    }

    function renderTablesBracket() {
        const root = DOM.get('tablesBracketRoot'); if (!root) return;
        const data = getUserGeneratedKnockoutMatches();
        renderBracketInto(root, data.matches, data.grouped, data.best3, STATE.knockoutPreds[STATE.myId] || {}, false);
        const picked = Object.keys(STATE.knockoutPreds[STATE.myId] || {}).length;
        const count = DOM.get('bracketCountText'); if (count) count.textContent = `${picked}/32 selecciones`;
    }

    function renderBracketInto(root, matches, grouped, best3, myKo, interactive) {
        root.innerHTML = ''; const resolvedNames = {}; const best3NumQueue = [...best3]; const sortedMatches = [...matches].sort((a, b) => a.id - b.id);
        sortedMatches.forEach(m => { resolvedNames[m.id] = { local: resolveBracketTokenGeneral(m.local, matches, myKo, grouped, best3NumQueue), visitor: resolveBracketTokenGeneral(m.visitor, matches, myKo, grouped, best3NumQueue) }; });
        BRACKET_LAYOUT.forEach(colDef => {
            const col = document.createElement('div'); col.className = 'round';
            const title = document.createElement('div'); title.className = 'round-title'; title.textContent = colDef.title;
            col.appendChild(title);
            if (colDef.round !== 'final') {
                colDef.matches.forEach(matchId => { const m = matches.find(x => x.id === matchId); if (m) col.appendChild(createMatchSlot(m, resolvedNames[m.id], myKo, interactive)); });
            } else {
                const finalMatch = matches.find(m => m.id === 104);
                if (finalMatch) {
                    const finalSlot = createMatchSlot(finalMatch, resolvedNames[104], myKo, interactive, '👑 GRAN FINAL');
                    finalSlot.querySelector('.match').classList.add('bracket-champion'); col.appendChild(finalSlot);
                }
                const thirdMatch = matches.find(m => m.id === 103);
                if (thirdMatch) {
                    const thirdContainer = document.createElement('div'); thirdContainer.className = 'match-third-container';
                    const thirdCard = document.createElement('div'); thirdCard.className = 'match'; thirdCard.dataset.matchId = 103;
                    thirdCard.innerHTML = `<div style="font-size:0.65rem; color:var(--sky); font-weight:900; text-align:center; margin-bottom:4px; letter-spacing:1px;">🥉 TERCER PUESTO</div><div class="match-meta"><span>Partido 103</span></div>`;
                    const lName = resolvedNames[103].local; const vName = resolvedNames[103].visitor; const closed = isQuinielaClosed();
                    const lDis = !interactive || lName.startsWith('Ganador') || lName.startsWith('Mejor') || lName.startsWith('Perdedor') || lName.startsWith('Por definir') || (closed && !STATE.adminConnected);
                    const vDis = !interactive || vName.startsWith('Ganador') || vName.startsWith('Mejor') || vName.startsWith('Perdedor') || vName.startsWith('Por definir') || (closed && !STATE.adminConnected);
                    thirdCard.appendChild(createKoButton(103, lName, myKo[103] === lName, lDis)); thirdCard.appendChild(createKoButton(103, vName, myKo[103] === vName, vDis));
                    thirdContainer.appendChild(thirdCard); col.appendChild(thirdContainer);
                }
            }
            root.appendChild(col);
        });
    }

    function createMatchSlot(m, resolvedNames, myKo, interactive, customTitle) {
        const slot = document.createElement('div'); slot.className = 'match-slot';
        const card = document.createElement('div'); card.className = 'match'; card.dataset.matchId = m.id;
        if (customTitle) {
            const tag = document.createElement('div'); tag.style.cssText = 'font-size:0.65rem; color:var(--gold); font-weight:900; text-align:center; margin-bottom:4px; letter-spacing:1px;';
            tag.textContent = customTitle; card.appendChild(tag);
        }
        const meta = document.createElement('div'); meta.className = 'match-meta'; meta.innerHTML = `<span>Partido ${m.id}</span>`; card.appendChild(meta);
        const lName = resolvedNames.local; const vName = resolvedNames.visitor; const closed = isQuinielaClosed();
        const lDis = !interactive || lName.startsWith('Ganador') || lName.startsWith('Mejor') || lName.startsWith('Perdedor') || lName.startsWith('Por definir') || (closed && !STATE.adminConnected);
        const vDis = !interactive || vName.startsWith('Ganador') || vName.startsWith('Mejor') || vName.startsWith('Perdedor') || vName.startsWith('Por definir') || (closed && !STATE.adminConnected);
        card.appendChild(createKoButton(m.id, lName, myKo[m.id] === lName, lDis));
        card.appendChild(createKoButton(m.id, vName, myKo[m.id] === vName, vDis));
        slot.appendChild(card); return slot;
    }

    function renderFaseFinal() {
        const root = DOM.get('bracketRoot'); if (!root) return;
        const userResults = {}; const userPreds = STATE.predictions[STATE.myId] || {}; let filledCount = 0;
        ALL_MATCHES.forEach(m => { const p = userPreds[m.id]; if (p && p.gl !== '' && p.gv !== '' && !isNaN(p.gl) && !isNaN(p.gv)) { userResults[m.id] = { gl: parseInt(p.gl), gv: parseInt(p.gv) }; filledCount++; } });
        if (filledCount === 0) {
            root.innerHTML = `<div style="text-align:center; padding:32px 16px; color:var(--text-muted); width:100%; grid-column:1/-1;">
                <div style="font-size:3rem; margin-bottom:12px;">⚽</div>
                <p style="font-weight:700; color:var(--text-main); margin-bottom:8px;">El bracket aún no tiene equipos</p>
                <p style="font-size:0.85rem;">Completa los pronósticos de la <strong style="color:var(--gold);">Fase de Grupos</strong> primero.</p>
                <button class="btn secondary" style="margin-top:16px; max-width:220px; margin-left:auto; margin-right:auto;" onclick="APP.goToScreen('screenPredictions')">Ir a Pronósticos ⚽</button>
            </div>`;
            root.onclick = null; return;
        }
        const data = getUserGeneratedKnockoutMatches();
        renderBracketInto(root, data.matches, data.grouped, data.best3, STATE.knockoutPreds[STATE.myId] || {}, true);
        root.onclick = function(e) { const btn = e.target.closest('.ko-team-btn'); if (!btn || btn.disabled) return; APP.saveKo(parseInt(btn.dataset.matchId, 10), btn.dataset.team); };
        root.onkeydown = function(e) {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            const active = document.activeElement; if (!active || !active.classList.contains('ko-team-btn') || active.disabled) return;
            e.preventDefault(); APP.saveKo(parseInt(active.dataset.matchId, 10), active.dataset.team);
        };
    }

    function createKoButton(matchId, teamName, selected, disabled) {
        const btn = document.createElement('button'); btn.type = 'button';
        btn.className = 'ko-team-btn' + (selected ? ' selected' : '') + (disabled ? ' disabled' : '');
        if (disabled) btn.disabled = true;
        btn.dataset.matchId = matchId; btn.dataset.team = teamName;
        const isPlaceholder = teamName.startsWith('Ganador') || teamName.startsWith('Perdedor') || teamName.startsWith('Por definir') || teamName.startsWith('Mejor');
        const flagIcon = isPlaceholder ? '🏴‍☠️' : (FLAGS[teamName] || '🏳️');
        btn.innerHTML = `<span class="team-left"><span class="flag">${flagIcon}</span><span class="team-name">${teamName}</span></span><span class="ko-icon">✅</span>`;
        return btn;
    }

    async function saveKo(mid, team) {
        if (isQuinielaClosed()) { triggerToast('🔒 La quiniela está cerrada'); return; }
        if (!STATE.myId) { triggerToast('Inicia sesión'); return; }
        try {
            if (!STATE.knockoutPreds[STATE.myId]) STATE.knockoutPreds[STATE.myId] = {};
            STATE.knockoutPreds[STATE.myId][mid] = team;
            const data = getUserGeneratedKnockoutMatches(); const myKo = STATE.knockoutPreds[STATE.myId];
            const resolvedNames = {}; const best3NumQueue = [...data.best3];
            const sortedMatches = [...data.matches].sort((a,b) => a.id - b.id);
            sortedMatches.forEach(m => { resolvedNames[m.id] = { local: resolveBracketTokenGeneral(m.local, data.matches, myKo, data.grouped, best3NumQueue), visitor: resolveBracketTokenGeneral(m.visitor, data.matches, myKo, data.grouped, best3NumQueue) }; });
            const orderOfMatches = KNOCKOUT_DEFS.map(d => d.id).sort((a,b) => a - b);
            orderOfMatches.forEach(id => {
                const currentPick = myKo[id]; if (!currentPick) return;
                if (currentPick !== resolvedNames[id].local && currentPick !== resolvedNames[id].visitor) delete myKo[id];
            });
            await db.ref(`knockout_preds/${STATE.myId}`).set(myKo); STATE.knockoutPreds[STATE.myId] = myKo;
            renderFaseFinal();
            if (mid === 104) showChampionCelebration(team); else triggerToast('✅ Guardado');
        } catch (e) { console.error(e); triggerToast('❌ Error'); }
    }

    function showChampionCelebration(team) {
        const flag = FLAGS[team] || '🏆';
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.style.cssText = `position:fixed; left:${Math.random()*100}vw; top:-10px; font-size:${1+Math.random()}rem; z-index:9999; pointer-events:none; animation:confettiFall ${2+Math.random()*2}s linear ${Math.random()*0.5}s forwards;`;
            el.textContent = ['🎉','⭐','✨','🥇','⚽','🏆'][Math.floor(Math.random()*6)]; document.body.appendChild(el); setTimeout(() => el.remove(), 4000);
        }
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed; inset:0; z-index:10000; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px);';
        modal.innerHTML = `<div style="background:linear-gradient(135deg,#1e293b,#0f172a); border:2px solid var(--gold); border-radius:20px; padding:32px 24px; text-align:center; max-width:340px; width:90%; box-shadow:0 0 60px rgba(251,191,36,0.4);">
            <div style="font-size:4rem; margin-bottom:8px; animation:welcomeFloat 1s ease-in-out infinite;">${flag}</div>
            <div style="font-size:1.8rem; font-weight:900; background:linear-gradient(135deg,#ffd84d,#FBBF24,#c99a00); -webkit-background-clip:text; background-clip:text; color:transparent; margin-bottom:4px;">¡CAMPEÓN DEL MUNDO!</div>
            <div style="font-size:1.3rem; font-weight:800; color:#fff; margin-bottom:16px;">${team}</div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:20px;">Has completado tu bracket. ¡Que se cumpla tu pronóstico! 🙏</p>
            <button onclick="this.closest('[style*=fixed]').remove(); APP.goToScreen('screenMenu');" style="background:var(--gold); color:#000; font-weight:800; border:none; padding:12px 28px; border-radius:12px; font-size:1rem; cursor:pointer;">¡A esperar el Mundial! 🏆</button>
        </div>`;
        document.body.appendChild(modal);
    }

    function saveAllKoDrafts() {
        if (isQuinielaClosed()) { triggerToast('🔒 La quiniela está cerrada'); return; }
        const root = DOM.get('bracketRoot'); if (!root) return;
        const toSave = {};
        root.querySelectorAll('.ko-team-btn.selected').forEach(b => {
            const mid = b.dataset.matchId; const team = b.dataset.team;
            if (mid && team && !team.startsWith('Ganador') && !team.startsWith('Perdedor')) toSave[mid] = team;
        });
        const promises = Object.keys(toSave).map(mid => db.ref(`knockout_preds/${STATE.myId}/${mid}`).set(toSave[mid]));
        Promise.all(promises).then(() => {
            STATE.knockoutPreds[STATE.myId] = STATE.knockoutPreds[STATE.myId] || {}; Object.assign(STATE.knockoutPreds[STATE.myId], toSave);
            triggerToast('✅ Selecciones guardadas'); renderFaseFinal();
        }).catch(err => { console.error(err); triggerToast('❌ Error'); });
    }

    function adminLoadResults() {
        let html = '';
        ALL_MATCHES.forEach(m => {
            const r = STATE.officialResults[m.id] || { gl: '', gv: '' };
            html += `<div class="match-row" style="background:var(--bg-input); margin-bottom:8px;">
                <div class="match-date">📅 Encuentro N°${m.id} — ${m.fechaStr} (Grupo ${m.grupo})</div>
                <div class="match-teams">
                    <div class="team" style="font-size:0.85rem;">${m.local}</div>
                    <div class="score-inputs">
                        <input type="number" inputmode="numeric" class="score-box adm-gl" data-mid="${m.id}" value="${r.gl !== undefined && r.gl !== null ? r.gl : ''}">
                        <span class="divider">-</span>
                        <input type="number" inputmode="numeric" class="score-box adm-gv" data-mid="${m.id}" value="${r.gv !== undefined && r.gv !== null ? r.gv : ''}">
                    </div>
                    <div class="team right" style="font-size:0.85rem;">${m.visitante}</div>
                </div>
            </div>`;
        });
        html += `<button class="btn" style="margin-top:12px;" onclick="APP.saveAdmMatchesCloud()">💾 Guardar Resultados Oficiales</button>`;
        DOM.get('adminContent').innerHTML = html;
        let htmlK = '';
        KNOCKOUT_DEFS.forEach(d => {
            const defOfficialMatch = (STATE.officialKnockoutMatches && STATE.officialKnockoutMatches[d.id]) ? STATE.officialKnockoutMatches[d.id] : null;
            const local = defOfficialMatch ? defOfficialMatch.local : d.local; const visitor = defOfficialMatch ? defOfficialMatch.visitor : d.visitor;
            htmlK += `<div class="match-row" style="background:var(--bg-input); margin-bottom:8px;">
                <div class="match-date">📅 Partido N°${d.id} — ${d.round}</div>
                <div style="font-size:0.9rem; color:var(--text-muted); margin-bottom:6px;">${local}  vs  ${visitor}</div>
                <div style="display:flex; gap:8px;">
                    <select class="input-field ko-official-select" data-id="${d.id}">
                        <option value="">-- Selecciona ganador oficial --</option>
                        <option value="${local}">${local}</option>
                        <option value="${visitor}">${visitor}</option>
                    </select>
                    <button class="btn" onclick="APP.saveOfficialKoFromInput(${d.id})">Guardar</button>
                </div>
            </div>`;
        });
        htmlK += `<button class="btn secondary" onclick="APP.generateOfficialBracket()">Generar Bracket Oficial desde resultados de grupos</button>`;
        DOM.get('adminKnockoutContent').innerHTML = htmlK;
        renderAdminUsers(); populateAdminSpecialsOptions(); updateAdminButtonsUI(); 
    }

    function saveAdmMatchesCloud() {
        const matrix = {};
        DOM.qAll('.adm-gl').forEach(el => { if(!matrix[el.dataset.mid]) matrix[el.dataset.mid]={}; matrix[el.dataset.mid].gl = el.value === '' ? null : parseInt(el.value); });
        DOM.qAll('.adm-gv').forEach(el => { if(!matrix[el.dataset.mid]) matrix[el.dataset.mid]={}; matrix[el.dataset.mid].gv = el.value === '' ? null : parseInt(el.value); });
        db.ref('official_results').set(matrix).then(() => {
            STATE.officialResults = matrix; calculatePointsEngine();
            const updates = {}; Object.keys(STATE.users).forEach(uid => { updates[`users/${uid}/total_puntos`] = STATE.users[uid].total_puntos; updates[`users/${uid}/exacts`] = STATE.users[uid].exacts; });
            db.ref('/').update(updates).then(() => { alert('Resultados actualizados.'); generateOfficialBracketAndSave(); triggerToast('Resultados guardados'); });
        }).catch(err => { console.error(err); alert('Error al guardar'); });
    }

    function saveOfficialKoFromInput(matchId) {
        const sel = document.querySelector(`.ko-official-select[data-id="${matchId}"]`); if (!sel) return;
        const winner = sel.value; if (!winner) { alert('Selecciona un ganador'); return; }
        db.ref(`official_knockout/${matchId}`).set(winner).then(() => { triggerToast('Ganador oficial guardado'); }).catch(err => { console.error(err); });
    }

    function generateOfficialBracket() { generateOfficialBracketAndSave(); }

    function renderAdminUsers() {
        const container = DOM.get('adminUsersList'); if (!container) return; container.innerHTML = '';
        Object.values(STATE.users).forEach(u => {
            const div = document.createElement('div'); div.className = 'admin-user';
            const meta = document.createElement('div'); meta.className = 'meta';
            const name = document.createElement('div'); name.textContent = u.nombre_apodo;
            const info = document.createElement('div'); info.className = 'small'; info.textContent = `Registrado: ${u.date_registered ? (new Date(u.date_registered).toLocaleString()) : 'N/A'} — Pts: ${u.total_puntos || 0}`;
            meta.appendChild(name); meta.appendChild(info);
            const actions = document.createElement('div'); actions.style.display='flex'; actions.style.gap='8px';
            const btnDel = document.createElement('button'); btnDel.className='btn-icon'; btnDel.textContent='🗑️'; btnDel.title='Eliminar usuario'; btnDel.onclick = () => { if(confirm('¿Eliminar usuario y sus datos?')) APP.adminDeleteUser(u.id); };
            const btnReset = document.createElement('button'); btnReset.className='btn-icon'; btnReset.textContent='♻️'; btnReset.title='Reiniciar usuario'; btnReset.onclick = () => { if(confirm('¿Reiniciar usuario?')) APP.adminResetUser(u.id); };
            actions.appendChild(btnReset); actions.appendChild(btnDel); div.appendChild(meta); div.appendChild(actions); container.appendChild(div);
        });
    }

    async function adminDeleteUser(uid) {
        try {
            await db.ref(`users/${uid}`).remove(); await db.ref(`predictions/${uid}`).remove(); await db.ref(`specials/${uid}`).remove(); await db.ref(`knockout_preds/${uid}`).remove();
            delete STATE.users[uid]; delete STATE.predictions[uid]; delete STATE.specials[uid]; delete STATE.knockoutPreds[uid];
            renderAdminUsers(); triggerToast('✅ Usuario eliminado');
        } catch (e) { console.error(e); triggerToast('❌ Error'); }
    }

    async function adminResetUser(uid) {
        try {
            await db.ref(`predictions/${uid}`).remove(); await db.ref(`specials/${uid}`).remove(); await db.ref(`knockout_preds/${uid}`).remove(); await db.ref(`users/${uid}/total_puntos`).set(0); await db.ref(`users/${uid}/exacts`).set(0);
            delete STATE.predictions[uid]; delete STATE.specials[uid]; delete STATE.knockoutPreds[uid];
            if (STATE.users[uid]) { STATE.users[uid].total_puntos = 0; STATE.users[uid].exacts = 0; }
            renderAdminUsers(); triggerToast('✅ Usuario reiniciado');
        } catch (e) { console.error(e); triggerToast('❌ Error'); }
    }

    function saveOfficialSpecials() {
        const revel = DOM.get('officialRevelacion').value; const decep = DOM.get('officialDecepcion').value;
        const campeon = DOM.get('officialCampeon').value; const goleador = DOM.get('officialGoleador').value.trim(); const ecu = DOM.get('officialEcuador').value;
        const payload = { revelacion: revel || null, decepcion: decep || null, campeon: campeon || null, goleador: goleador || null, ecuador: ecu || null };
        db.ref('official_specials').set(payload).then(() => triggerToast('Especiales oficiales guardados')).catch(err => console.error(err));
    }

    function populateSpecials() {
        if (!STATE.currentUser) return;
        const mySpec = STATE.specials[STATE.myId] || {};
        const flagOpts = ALL_TEAMS.map(t => `<option value="${t}">${(FLAGS[t] || '🏳️')} ${t}</option>`).join('');
        const base = '<option value="">Selecciona selección...</option>' + flagOpts;
        
        const elRev = DOM.get('selRevelacion'); 
        const elDec = DOM.get('selDecepcion'); 
        const elCam = DOM.get('selCampeon');
        const elGol = DOM.get('txtGoleador'); 
        const elEcu = DOM.get('selEcuadorPos');

        if (elRev) { elRev.innerHTML = base; elRev.value = mySpec.seleccion_revelacion || ''; }
        if (elDec) { elDec.innerHTML = base; elDec.value = mySpec.seleccion_decepcion || ''; }
        if (elCam) { elCam.innerHTML = base; elCam.value = mySpec.campeon_mundial || ''; }
        if (elGol) elGol.value = mySpec.goleador_mundial || '';
        if (elEcu) elEcu.value = mySpec.posicion_ecuador || '';

        // 1. Condición global del administrador
        const globalLocked = STATE.settings && STATE.settings.specialsOpen === false;
        
        // 2. NUEVA LÓGICA: Bloqueo por usuario (si ya tiene datos guardados en la nube)
        // Evaluamos si el objeto 'mySpec' ya contiene las propiedades llenas.
        const userAlreadyFilled = !!(
            mySpec.seleccion_revelacion || 
            mySpec.seleccion_decepcion || 
            mySpec.posicion_ecuador || 
            mySpec.campeon_mundial || 
            mySpec.goleador_mundial
        );

        // Determinamos si se debe congelar la pantalla. El administrador siempre mantiene acceso de edición.
        const shouldDisable = (globalLocked || userAlreadyFilled) && !STATE.adminConnected;
        
        [elRev, elDec, elCam, elGol, elEcu].forEach(el => {
            if(el) el.disabled = shouldDisable;
        });
        
        // Alternar el banner visual de advertencia
        const banner = DOM.get('closureBannerSpecial');
        if(banner){
            if (shouldDisable) {
                banner.style.display = 'block';
                banner.textContent = userAlreadyFilled ? '🔒 Ya has registrado tus comodines (Sección Bloqueada)' : '🔒 Los comodines están cerrados';
            } else {
                banner.style.display = 'none';
            }
        }

        // Opcional: Ocultar o desactivar el botón de guardar si ya está lleno
        const btnGuardar = DOM.get('btnGuardarIrFF');
        if (btnGuardar && !STATE.adminConnected) {
            btnGuardar.disabled = shouldDisable;
            if (userAlreadyFilled) {
                btnGuardar.textContent = 'Fase de Comodines Completada ✓';
                btnGuardar.style.background = 'rgba(255,255,255,0.05)';
                btnGuardar.style.color = 'var(--text-muted)';
                // Nos aseguramos que al menos puedan avanzar dándole clic al botón alternativo o saliendo al menú.
                btnGuardar.onclick = () => goToScreen('screenMenu');
            } else {
                btnGuardar.textContent = STATE.faseFinalEnabled ? '💾 Guardar e ir a Fase Final' : '💾 Guardar y volver al Menú';
                btnGuardar.style.background = '';
                btnGuardar.style.color = '';
                btnGuardar.onclick = () => APP.saveAndGoFaseFinal();
            }
        }
    }
        
    function populateAdminSpecialsOptions() {
        const selOpts = ALL_TEAMS.map(t => `<option value="${t}">${(FLAGS[t] || '🏳️')} ${t}</option>`).join('');
        const elRev = DOM.get('officialRevelacion'); if (elRev) elRev.innerHTML = '<option value="">--</option>' + selOpts;
        const elDec = DOM.get('officialDecepcion'); if (elDec) elDec.innerHTML = '<option value="">--</option>' + selOpts;
        const elCam = DOM.get('officialCampeon'); if (elCam) elCam.innerHTML = '<option value="">--</option>' + selOpts;
        if (STATE.officialSpecials) {
            if (elRev) elRev.value = STATE.officialSpecials.revelacion || '';
            if (elDec) elDec.value = STATE.officialSpecials.decepcion || '';
            if (elCam) elCam.value = STATE.officialSpecials.campeon || '';
            if (DOM.get('officialGoleador')) DOM.get('officialGoleador').value = STATE.officialSpecials.goleador || '';
            if (DOM.get('officialEcuador')) DOM.get('officialEcuador').value = STATE.officialSpecials.ecuador || '';
        }
    }

    function toggleFaseFinalVisibility(enable) {
        STATE.faseFinalEnabled = !!enable; applyVisibility();
        const activeId = document.querySelector('.screen.active')?.id;
        if (!enable && activeId === 'screenFaseFinal') goToScreen('screenMenu');
        db.ref('fase_final_enabled').set(!!enable).then(() => { triggerToast(enable ? 'Fase Final visible' : 'Fase Final oculta'); updateAdminButtonsUI(); });
    }

    function togglePredictionsVisibility(visible) {
        STATE.predictionsVisible = !!visible; applyVisibility();
        const activeId = document.querySelector('.screen.active')?.id;
        if (!visible && activeId === 'screenPredictions') goToScreen('screenMenu');
        db.ref('predictions_visible').set(!!visible).then(() => { triggerToast(visible ? 'Pronósticos visibles' : 'Pronósticos ocultos'); updateAdminButtonsUI(); });
    }

    function saveOfficialKnockoutBatch(map) { db.ref('official_knockout').update(map).then(() => triggerToast('Resultados fase final guardados')).catch(err => console.error(err)); }

    async function loadOfficialSpecials() {
        const snap = await db.ref('official_specials').get(); const data = snap.val() || {};
        if (data) { STATE.officialSpecials = data; populateAdminSpecialsOptions(); triggerToast('Especiales cargados'); }
    }

    function startCountdown() {
        const deadline = new Date('2026-06-10T23:59:59-05:00');
        function tick() {
            const now = new Date(); const diff = deadline - now;
            if (diff <= 0) { ['cdDays','cdHours','cdMins','cdSecs'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = '00'; }); return; }
            const days = Math.floor(diff / 86400000); const hours = Math.floor((diff % 86400000) / 3600000); const mins = Math.floor((diff % 3600000) / 60000); const secs = Math.floor((diff % 60000) / 1000);
            const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = String(val).padStart(2,'0'); };
            set('cdDays', days); set('cdHours', hours); set('cdMins', mins); set('cdSecs', secs);
        }
        tick(); setInterval(tick, 1000);
    }
    
    startCountdown();

    function refreshUIAfterData() {
        const ub = DOM.get('userBadge'); if (ub) ub.textContent = STATE.currentUser ? `👤 ${STATE.currentUser.nombre_apodo}` : '👤 Sin sesión';
        const btnCrear = DOM.get('btnCrearUsuario'); if (btnCrear) btnCrear.style.display = STATE.registrosLock ? 'none' : '';
        applyVisibility();
        if (STATE.adminConnected) renderAdminUsers();
        updateUIForLockState(); updateAdminButtonsUI();
    }

    if (STATE.myId) goToScreen('screenMenu'); else goToScreen('screenWelcome');

    // ========== DEFINICIÓN FINAL DE APP ==========
    window.APP = {
        goToScreen: goToScreen,
        registerUser: registerUser,
        loginExistingUser: loginExistingUser,
        logout: logout,
        saveScoreCloud: saveScoreCloud,
        setTableGroupActive: setTableGroupActive,
        setTablesView: setTablesView,
        setTableSource: setTableSource,
        showRankingRulesModal: showRankingRulesModal,
        cerrarDesglose: cerrarModalDesglose,
        adminLoadResults: adminLoadResults,
        generateOfficialBracket: generateOfficialBracket,
        saveOfficialSpecials: saveOfficialSpecials,
        loadOfficialSpecials: loadOfficialSpecials,
        toggleFaseFinalVisibility: toggleFaseFinalVisibility,
        togglePredictionsVisibility: togglePredictionsVisibility,
        adminDeleteUser: adminDeleteUser,
        adminResetUser: adminResetUser,
        saveAdmMatchesCloud: saveAdmMatchesCloud,
        saveOfficialKoFromInput: saveOfficialKoFromInput,
        saveOfficialKnockoutBatch: saveOfficialKnockoutBatch,
        mostrarDesglose: function(uid, nombre) {
            const desglose = _desgloseCache[uid];
            if (!desglose) { triggerToast('Sin datos de desglose disponibles'); return; }
            abrirModalDesglose(desglose, nombre);
        },
        saveSpecial: function(field, val) {
            const mySpec = STATE.specials[STATE.myId] || {};
            const comodinesGlobalCerrados = STATE.settings && STATE.settings.specialsOpen === false;
            if ((comodinesGlobalCerrados || mySpec.is_locked) && !STATE.adminConnected) { 
                triggerToast('🔒 Tus comodines ya están sellados'); 
                populateSpecials();
                return; 
            }
            db.ref(`specials/${STATE.myId}/${field}`).set(val)
              .then(() => triggerToast('✅ Guardado'))
              .catch(err => { console.error(err); triggerToast('❌ Error'); });
        },
        saveAndGoFaseFinal: function() {
            const comodinesGlobalCerrados = STATE.settings && STATE.settings.specialsOpen === false;
            if (comodinesGlobalCerrados && !STATE.adminConnected) { 
                triggerToast('🔒 Los comodines están cerrados'); 
                return; 
            }
            const fields = [
                { id: 'selRevelacion', key: 'seleccion_revelacion' }, 
                { id: 'selDecepcion', key: 'seleccion_decepcion' },
                { id: 'selEcuadorPos', key: 'posicion_ecuador' }, 
                { id: 'selCampeon', key: 'campeon_mundial' }, 
                { id: 'txtGoleador', key: 'goleador_mundial' }
            ];
            const promises = fields.map(f => {
                const el = DOM.get(f.id); 
                if (!el || !el.value.trim()) return Promise.resolve();
                return db.ref(`specials/${STATE.myId}/${f.key}`).set(el.value.trim());
            });
            promises.push(db.ref(`specials/${STATE.myId}/is_locked`).set(true));
            Promise.all(promises).then(() => { 
                triggerToast('✅ Comodines Sellados'); 
                if (STATE.faseFinalEnabled) {
                    goToScreen('screenFaseFinal');
                } else {
                    goToScreen('screenMenu');
                }
            }).catch(err => { console.error(err); triggerToast('❌ Error'); });
        },
        saveKo: saveKo,
        saveAllKoDrafts: saveAllKoDrafts,
        adminLogin: function() {
            const pwd = document.getElementById('adminPassword');
            if (pwd && pwd.value === 'admin2026') {
                STATE.adminConnected = true;
                sessionStorage.setItem('p26adm', '1');
                const loginForm = document.getElementById('adminLoginForm');
                const panel = document.getElementById('adminPanel');
                if (loginForm) loginForm.style.display = 'none';
                if (panel) panel.style.display = 'block';
                adminLoadResults();
            } else alert('PIN de seguridad inválido.');
        },
        adminResetMundial: function() {
            if (confirm('🚨 ATENCIÓN: Se borrarán los resultados oficiales cargados.')) {
                db.ref('official_results').remove();
                db.ref('official_specials').remove();
                db.ref('official_knockout').remove();
                db.ref('official_knockout_matches').remove();
                triggerToast('Reiniciado');
            }
        },
        setSpecialsStatus: function(isOpen) {
            STATE.settings.specialsOpen = isOpen;
            db.ref('settings/specialsOpen').set(isOpen)
              .then(() => {
                  triggerToast(isOpen ? '🌟 Comodines abiertos' : '🔒 Comodines cerrados');
                  updateUIForLockState();
              });
        },
        adminExportCSV: function() {
            let csv = 'Usuario,Puntos,Exactos,Comodine_Revelacion,Comodine_Decepcion,Ecuador_Etapa,Campeon_Mundial,Goleador_Mundial,';
            for(let i=1;i<=72;i++) csv += `P${i}_Local,P${i}_Visitante,`;
            csv += '\n';
            Object.values(STATE.users).forEach(u => {
                const p = STATE.predictions[u.id] || {}; const s = STATE.specials[u.id] || {};
                csv += `"${u.nombre_apodo}",${u.total_puntos || 0},${u.exacts || 0},"${s.seleccion_revelacion || ''}","${s.seleccion_decepcion || ''}","${s.posicion_ecuador || ''}","${s.campeon_mundial || ''}","${s.goleador_mundial || ''}",`;
                for(let i=1;i<=72;i++) csv += `${p[i] !== undefined && p[i].gl !== undefined && p[i].gl !== null ? p[i].gl : ''},${p[i] !== undefined && p[i].gv !== undefined && p[i].gv !== null ? p[i].gv : ''},`;
                csv += '\n';
            });
            const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Polla_Familiar_2026_Master_${new Date().toISOString().slice(0,10)}.csv`;
            link.click();
        }
    };
})();
</script>
