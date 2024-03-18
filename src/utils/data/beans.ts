const chapitrec = {
    idChapitre: 2,
    titre: 'Titre chapitre',
    urlVideo: '',
    urlImage: '',
    urlPdf: '',
    texte: "",
    preanbule: '',
    objectif: ['objectif_1', 'objectif_2', 'objectif_3'],
    conclusion: '',

    blocs: [
        {
            titre: '',
            texte: '',
            urlVideo: null,
            urlImage: null,
            listePoint: [],
            sousBlocs: [
                {
                    titre: '',
                    texte: '',
                    urlVideo: null,
                    urlImage: null,
                    listePoint: [],
                }
            ],
        },
    ]
}


export interface sousBloc {
    titre: string;
    texte: string;
    listPoint: string[];
    urlVideo: string;
    urlImage: string;
    preanbule: string;
    conclusion: string;
}

export interface bloc {
    titre: string;
    texte: string;
    listPoint: string[];
    urlVideo: string;
    urlImage: string;
    preanbule: string;
    conclusion: string;
    sousBlocs: sousBloc[];
}



export interface Chapitre {
    idChapitre: number;
    titre: string;
    urlVideo: string;
    urlImage: string;
    urlPdf: string;
    texte: string;
    preanbule: string;
    objectifs: string[];
    blocs: bloc[];
    conclusion: string;
}

