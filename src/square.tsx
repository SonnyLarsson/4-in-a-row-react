import { ReactElement } from 'react';
import './index.css';

function Square(props: any): ReactElement {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {
                props.value
            }
        </button>
    );
}

export default Square;