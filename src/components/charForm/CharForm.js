import './charForm.scss';
import useMarvelService from '../../services/MarvelService';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CharForm = () => {
  const [error, setError] = useState('');
  const [char, setChar] = useState(null);
  const { getCharacterByName } = useMarvelService();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { findCharInputValue: '' },
  });

  const onSubmit = (data) => {
    setError('');
    setChar('');
    const { findCharInputValue } = data;

    getCharacterByName(findCharInputValue)
      .then((res) => {
        setChar(res);
        console.log(res);
        reset()
      })
      .catch((error) => setError(error.message));
  };

  return (
    <form className="search-char-form" onSubmit={handleSubmit(onSubmit)}>
      <p className="search-char-form__text">Or find a character by name:</p>
      <label className="visually-hidden" htmlFor="search-char-form__input">
        Search character
      </label>
      <div className="search-char-form__wrapper">
        <div className="search-char-form__input-wrapper">
          <input
            className="search-char-form__input"
            name="search-char-form__input"
            type="text"
            placeholder="Enter name"
            id="search-char-form__input"
            {...register('findCharInputValue', {
              required: 'This field is required',
              onChange: () => {
                setError('');
              },
            })}
          />
          {errors.findCharInputValue && (
            <div role="alert" className="error">
              {errors.findCharInputValue.message}
            </div>
          )}
          {error && (
            <div role="alert" className="error">
              {error}
            </div>
          )}
          {char && <div className="success">{`There is! Visit ${char.name} page?`}</div>}
        </div>

        <div className="search-char-form__button-wrapper">
          <button className="button button__main">
            <div className="inner">FIND</div>
          </button>
          {char && (
            <Link to={`/z/${char.id}`} className="button button__secondary">
              <div className="inner">TO PAGE</div>
            </Link>
          )}
        </div>
      </div>
    </form>
  );
};

export default CharForm;
