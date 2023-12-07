import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListagemFIlme {
    id: number;
    imagem: string | undefined;
    titulo: string;
    diretor: string;
    ano: string;
    sinopse: string;
}

export interface IDetalheFilme {
    id?: number;
    ano: string;
    titulo: string;
    diretor: string;
    sinopse: string;
}

type TFilmesComTotalCount = {
    data: IListagemFIlme[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TFilmesComTotalCount | Error> => {
    try {

        const urlRelativa = `/filmes?_page=${page}&_limit=${Environment.LIMITE_DE_FILMES_POR_PAGINA}&titulo_like=${filter}`;
       
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_FILMES_POR_PAGINA),
            };
        }

        return new Error('Erro ao listar os Filmes!');

    } catch (error) {

        console.log(error);

        return new Error((error as {message: string}).message || 'Erro ao listar os Filmes!');        
    }
};

const getById = async (id: number ): Promise<IDetalheFilme | Error> => {
    try {

        const { data } = await Api.get(`/filmes/${id}`);

        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o Filme!');

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao consultar o Filme!');
    }
};

const create = async ( dados: Omit<IDetalheFilme, 'id'>): Promise< number | Error> => {
    try {

        const { data } = await Api.post<IDetalheFilme>('/filmes', dados);

        if (data && typeof data.id === 'number') {
            return data.id;
        } else {
            return new Error('Erro ao adicionar/criar o Filme!');
        }

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao adicionar/criar o Filme!');
    }
};

const updateById = async (id: number, dados: IDetalheFilme): Promise<void | Error> => {
    try {

        await Api.put(`/filmes/${id}`, dados); 

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao atualizar o Filme!');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/filmes/${id}`);

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao apagar o Filme!');
    }
};


export const FilmesService = {

    getAll,
    getById,
    create,
    updateById,
    deleteById,

};