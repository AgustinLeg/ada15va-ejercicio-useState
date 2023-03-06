import { useState } from 'react';
import { questions } from '../../data/PreguntasYRespuestas';

import './style.css';

export const PreguntasYRespuestas = () => {
	const [optionSelected, setOptionSelected] = useState('');
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [finish, setFinish] = useState(false);

	const { question, answers } = questions[currentQuestion];

	const onSuccess = () => {
		setError('');
		setOptionSelected('');
		setSuccess('FELICITACIONES');

		setTimeout(() => {
			setSuccess('');
		}, 2000);
	};

	const validateAnswer = (e) => {
		e.preventDefault();
		if (!optionSelected) {
			setError('seleccione una opcion');
			return;
		}

		// find me devuelve el elemento o undefined con la condicion dada
		const answer = answers.find((a) => a.id === optionSelected);

		if (answer.correct) {
			onSuccess();
			if (currentQuestion + 1 === questions.length) {
				setFinish(true);
			}

			if (currentQuestion + 1 < questions.length) {
				setCurrentQuestion(currentQuestion + 1);
			}
		} else {
			setError('La opcion es incorrecta 😢');
		}
	};

	return (
		<div>
			<h2>Preguntas y Respuestas</h2>
			<h3>{question}</h3>
			{finish && <h4>FIN🔚 </h4>}

			{!finish && (
				<form onSubmit={validateAnswer}>
					<select
						onChange={(e) => {
							setOptionSelected(e.target.value);
						}}
						value={optionSelected}
					>
						<option>Select...</option>
						{answers.map((answer) => (
							<option value={answer.id} key={answer.id}>
								{answer.text}
							</option>
						))}
					</select>

					{Boolean(error) && <div className="alert">{error}</div>}

					<button type="submit">Enviar</button>
				</form>
			)}

			{Boolean(success) && <div className="success">{success}</div>}
		</div>
	);
};
