import { h } from 'preact';
import { getProgressForSet } from '../../lib/flashcards'
import style from './style';

const Progress = ({currentSet}) => (
	<progress max="100" value={ getProgressForSet(currentSet) }></progress>
);

export default Progress;