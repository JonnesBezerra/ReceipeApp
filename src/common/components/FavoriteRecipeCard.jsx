import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import LikeButton from './LikeButton';
import store, { setFetchOnDone } from '../../context/store';

import { mealInfo, drinkInfo } from '../../functions';

export default function FavoriteRecipeCard({ recipe, index,
  handleLikeClick }) { // descontrução de props
  const { setRecipes } = useContext(store);

  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;

  return (
    <div className="fav-card">
      <Link
        to={ `/${type}s/${id}` }
        onClick={ () => setRecipes(setFetchOnDone(true)) }
      >
        <img
          className="fav-image"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="card"
        />
      </Link>
      <div className="fav-content">
        <div className="fav-card-text">
          { type === 'comida'
            ? mealInfo(index, area, category)
            : drinkInfo(index, alcoholicOrNot) }
          <Link to={ `/${type}s/${id}` }>
            <div
              className="done-name"
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </div>
          </Link>
        </div>
        <div className="fav-buttons">
          <ShareButton id={ id } type={ type } index={ index } path />
          <LikeButton
            recipe
            captureFavorited={ () => console.log('nothing') }
            clickFavBtn={ handleLikeClick }
            id={ id }
            favPage
            index={ index }
          />
        </div>
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
};
