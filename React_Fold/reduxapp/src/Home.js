import { useDispatch, useSelector } from "react-redux";
import Header from './Header';

const Home = () => {
    const countVal = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const add = () => {
        dispatch({
            type: 'add',
        })
    };
    
    const sub = () => {
        dispatch({
            type: 'sub',
        })
    };

    return (
        <div >
            <Header/>
            <h1>This is the home page</h1>
            <h1> Your Counter value: {countVal}</h1>
            <input type="button" value="add"  onClick={add}/>
            <input type="button" value="sub"  onClick={sub}/>
        </div>
    );
    
};

export default Home;