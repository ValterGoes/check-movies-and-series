import { Environment } from '../../../environment';
import { Api } from '../axios-config';


interface IListagemFIlme {
    id: number;
    nomeFilme: string;
    diretor: string;
    ano: number;
}

interface IDetalheFilme {
    id: number;
    nomeFilme: string;
    diretor: string;
    ano: number;
}

type TFilmesComTotalCount = {
    data: IListagemFIlme[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TFilmesComTotalCount | Error> => {
    try {

        const urlRelativa = `/filmes?_page=${page}&_limit=${Environment.LIMITE_DE_FILMES_POR_PAGINA}&nomeFilme_like=${filter}`;
       
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_FILMES_POR_PAGINA),
            }
        }

        return new Error('Erro ao listar os Filmes!');

    } catch (error) {

        console.log(error);
        
        return new Error((error as {message: string}).message || 'Erro ao listar os Filmes!');        
    }
};

const getById = async (): Promise<any> => {};

const create = async (): Promise<any> => {};

const updateById = async (): Promise<any> => {};

const deleteById = async (): Promise<any> => {};


export const FilmesService = {

    getAll,
    getById,
    create,
    updateById,
    deleteById,

};