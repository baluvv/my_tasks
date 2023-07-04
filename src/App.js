import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TagItem from './components/TagItem'

import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    selectedOption: tagsList[0].optionId,
    task: '',
    activeTabId: '',
    tasksList: [],
  }

  onChangeTagOption = event => {
    this.setState({selectedOption: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onChangeActiveTab = optionId => {
    const {activeTabId} = this.state
    if (activeTabId !== optionId) {
      this.setState({activeTabId: optionId})
    } else {
      this.setState({activeTabId: ''})
    }
  }

  onAddTask = event => {
    event.preventDefault()
    const {selectedOption, task} = this.state
    if (task !== '') {
      this.setState(prevState => ({
        tasksList: [
          ...prevState.tasksList,
          {id: uuidv4(), inputTask: task, tag: selectedOption.toLowerCase()},
        ],
        selectedOption: tagsList[0].optionId,
        task: '',
      }))
    }
  }

  render() {
    const {selectedOption, task, activeTabId, tasksList} = this.state
    let filteredTasksList
    if (activeTabId === '') {
      filteredTasksList = tasksList
    } else {
      filteredTasksList = tasksList.filter(
        eachTask => eachTask.tag.toUpperCase() === activeTabId,
      )
    }
    const count = filteredTasksList.length
    return (
      <div className="app-container">
        <div className="left-container">
          <h1 className="left-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onAddTask}>
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              value={task}
              className="input-field"
              type="text"
              id="task"
              placeholder="Enter the task here"
              onChange={this.onChangeTask}
            />
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select
              id="tag"
              value={selectedOption}
              className="input-field"
              onChange={this.onChangeTagOption}
            >
              {tagsList.map(eachOption => (
                <option value={eachOption.optionId} key={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="tags">Tags</h1>
          <ul className="tags_list-container">
            {tagsList.map(eachTag => (
              <TagItem
                tagItemDetails={eachTag}
                key={eachTag.optionId}
                isTabActive={activeTabId === eachTag.optionId}
                onChangeActiveTab={this.onChangeActiveTab}
              />
            ))}
          </ul>
          <h1 className="tags">Tasks</h1>
          {count === 0 ? (
            <div className="no-task-container">
              <p className="no-task-line">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-list-container">
              {filteredTasksList.map(eachTask => (
                <li className="task-item" key={eachTask.id}>
                  <p className="task-line">{eachTask.inputTask}</p>
                  <p className="tag-item-button-type">{eachTask.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
