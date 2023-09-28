import { createContext, useCallback, useContext, useState} from 'react';


//faz a tipagem das opções do menu lateral
interface IDrawerOptions {
    icon: string;
    path: string;
    label: string;
}

//faz a tipagem do contexto
interface IDrawerContextData {
   isDrawerOpen: boolean;
   drawerOptions: IDrawerOptions[];
   toggleDrawerOpen: () => void;
   setDrawerOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

//faz a tipagem das props do provider
interface IDrawerProviderProps {
    children: React.ReactNode;
}

//cria o contexto
const DrawerContext = createContext({} as IDrawerContextData);

//cria o hook
export const useDrawerContext = () => {
    return useContext(DrawerContext);

};

//cria o provider
export const DrawerProvider: React.FC<IDrawerProviderProps> = ({children}) => {
    //cria os estados
    const [ isDrawerOpen, setIsDrawerOpen] = useState(false);
    //cria o estado que armazena as opções do menu lateral
    const [ drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    //função que abre e fecha o menu lateral
    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen (oldDrawerOpen => !oldDrawerOpen);
    }, []); 
    
    //função que altera as opções do menu lateral
    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []); 

    return (
        //passa o valor do contexto
        <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions}}>
            {children}
        </DrawerContext.Provider>
    );
};
