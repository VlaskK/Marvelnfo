import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
        this.setState({
            error: true
        })
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// import { Component, useState } from 'react';
// import { useEffect } from 'react/cjs/react.development';

// import ErrorMessage from '../errorMessage/ErrorMessage';

// const ErrorBoundary = (props) => {
//     const [error, setError] = useState(false);

//     // componentDidCatch(error, errorInfo){
//     //     console.log(error, errorInfo);
//     //     setState({
//     //         error: true
//     //     });
//     // }
//     useEffect((error, errorInfo) => {
//         console.log(error, errorInfo);
//         setError(true);
//     },[error])

//     if (error){
//         return <ErrorMessage/>
//     }
//     return props.children;

// }

// export default ErrorBoundary;

