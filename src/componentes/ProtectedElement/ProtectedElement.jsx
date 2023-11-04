import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

const ProtectedElement = ({mustBeBedel, mustBeDecano, children}) =>{

    //esBedel, esDecano están definidos en UserContext
    const {isLoggedIn, esBedel, esDecano} = useContext(UserContext);

    //Si no está logeado o debe ser bedel y no es bedel, entonces no muestra nada
    if(!isLoggedIn() || (mustBeBedel && !esBedel())){
        return <></>
    }
    //la misma condición para decano, si no esta logeado y debe ser decano y no lo es
    if(!isLoggedIn() || (mustBeDecano && !esDecano())){
        return <></>
    };

    return(children);
}

export {ProtectedElement};