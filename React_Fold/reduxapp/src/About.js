import { useSelector } from "react-redux";
import Header from "./Header";

const About = () => {
    // const counterVal = useSelector((state) => state.counter);
    const myDetails = useSelector((state) => state.myDetails);

    return(
        <div> 
            <Header />
            <div> This the About page</div>
            <h1> Your name: {myDetails.name} </h1>
            <h1> Your email: {myDetails.email}</h1>
        </div>
    )
};

export default About;