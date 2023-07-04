import './index.css'

const TagItem = props => {
  const {tagItemDetails, isTabActive, onChangeActiveTab} = props
  const {optionId, displayText} = tagItemDetails

  const onClickChangeTab = () => {
    onChangeActiveTab(optionId)
  }

  const activeBtn = isTabActive ? 'selected-button' : null

  return (
    <li className="tag-item">
      <button
        type="button"
        className={`tag-button ${activeBtn}`}
        onClick={onClickChangeTab}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
