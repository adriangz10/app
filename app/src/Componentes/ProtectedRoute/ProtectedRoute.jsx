import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext} from '../UserContext/UserContext';

const ProtectedRoute = ({mustBeBedel, children})=>{

    //utiliza el contexto de usuario para saber si está logeado y si es bedel o decano
    const {isLoggedIn, esBedel} = useContext(UserContext);

    //si no cumple con estar logeado o no es bedel redirije al inicio
    if(!isLoggedIn() || (mustBeBedel && !esBedel())){
        return <Navigate to="/" replace/>
    }

    //si la condición anterior no se cumple retornamos los hijos
    return (children);
}

export {ProtectedRoute};