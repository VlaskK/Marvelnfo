import { Component } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
    
    state = {
        list: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService
            .getAllCharacters(offset)
            .then(this.onListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }
    onListLoaded = (newList) => {
        let ended = false;
        if (newList.length < 9){
            ended = true;
        }

        this.setState(({list, offset}) => ({
            list: [...list, ...newList], 
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }));
    }

    marvelService = new MarvelService();

    renderList = (arr) => {
        const items = arr.map((item) => {
            let imgStyle = {
                'objectFit' : 'cover'
            }

            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'}
            }
            
            return (
                <li 
                    className="char__item"
                    key={item.id}
                    onClick={() => this.props.onCharSelected(item.id)}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            );
        });
        return (
            <ul
                className="char__grid">
                {items}
            </ul>
        );
    }

    render(){
        const {list, loading, error, newItemLoading, offset, charEnded} = this.state;
        const items = this.renderList(list);
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading? <Spinner/> : null;
        const content = !(loading || error)? items : null

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded? 'none': 'block'}}
                    onClick={() => this.onRequest(offset)}
                    >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}


export default CharList;