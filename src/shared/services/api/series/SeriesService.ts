import { Environment } from '../../../environment';
import { Api } from '../axios-config';


interface IListagemSeries {
    id: number;
    titulo: string;
    diretor: string;
    ano: number;
}

interface IDetalheSeries {
    id: number;
    titulo: string;
    diretor: string;
    ano: number;
}

type TSeriesComTotalCount = {
    data: IListagemSeries[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TSeriesComTotalCount | Error> => {
    try {

        const urlRelativa = `/series?_page=${page}&_limit=${Environment.LIMITE_DE_SERIES_POR_PAGINA}&titulo_like=${filter}`;
       
        const { data, headers } = await Api.get(urlRelativa);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_SERIES_POR_PAGINA),
            };
        }

        return new Error('Erro ao listar os Filmes!');

    } catch (error) {

        console.log(error);

        return new Error((error as {message: string}).message || 'Erro ao listar os Filmes!');        
    }
};

const getById = async (id: number ): Promise<IDetalheSeries | Error> => {
    try {

        const { data } = await Api.get(`/series/${id}`);

        if (data) {
            return data;
        }

        return new Error('Erro ao consultar o Filme!');

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao consultar o Filme!');
    }
};

const create = async ( dados: Omit<IDetalheSeries, 'id'>): Promise< number | Error> => {
    try {

        const { data } = await Api.post<IDetalheSeries>('/series', dados);

        if (data) {
            return data.id;
        }

        return new Error('Erro ao adicionar/criar o Filme!');

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao adicionar/criar o Filme!');
    }
};

const updateById = async (id: number, dados: IDetalheSeries): Promise<void | Error> => {
    try {

        await Api.put(`/series/${id}`, dados); 

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao atualizar o Filme!');
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {

        await Api.delete(`/series/${id}`);

    } catch (error) {

        console.log(error);

        return new Error((error as { message: string }).message || 'Erro ao apagar o Filme!');
    }
};


export const SeriesService = {

    getAll,
    getById,
    create,
    updateById,
    deleteById,

};