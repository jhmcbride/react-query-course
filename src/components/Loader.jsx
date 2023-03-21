import { FaSpinner} from 'react-icons/fa';

export default function Loader({ isLoading, children }) {
    return <FaSpinner  className='loader'/>
}