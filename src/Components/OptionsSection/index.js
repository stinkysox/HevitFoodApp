import './index.css'

const Options = ({dishDetails, setActiveDish, activeDish}) => (
  <ul className="options-container">
    {dishDetails.map(eachItem => (
      <li key={eachItem.menuCategory}>
        <button
          onClick={() => setActiveDish(eachItem.menuCategoryId)}
          className={`menu-btn ${
            activeDish === eachItem.menuCategoryId ? 'active' : ''
          }`}
          type="button"
        >
          {eachItem.menuCategory}
        </button>
      </li>
    ))}
  </ul>
)

export default Options
