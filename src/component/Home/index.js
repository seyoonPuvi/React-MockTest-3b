import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courseList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const option = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, option)

    if (response.ok) {
      const data = await response.json()
      this.onSuccessDataFetch(data.courses)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSuccessDataFetch = data => {
    const formattedList = data.map(each => ({
      id: each.id,
      name: each.name,
      logoUrl: each.logo_url,
    }))

    this.setState({
      courseList: formattedList,
      apiStatus: apiStatusConstants.success,
    })
  }

  onRenderSuccess = () => {
    const {courseList} = this.state

    return (
      <div className="course-container">
        <h1 className="heading">Courses</h1>
        <ul className="courseListContainer">
          {courseList.map(each => (
            <Link to={`/courses/${each.id}`} key={each.id}>
              <li className="courseListItem">
                <img className="logo" src={each.logoUrl} alt={each.name} />
                <p className="name">{each.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  onRenderFailure = () => (
    <div className="failureContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureDescription">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retryButton" type="button" onClick={this.fetchData}>
        Retry
      </button>
    </div>
  )

  onRenderLoader = () => (
    <div className="loaderContainer" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  onRenderApiViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.onRenderLoader()
      case apiStatusConstants.success:
        return this.onRenderSuccess()
      case apiStatusConstants.failure:
        return this.onRenderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">{this.onRenderApiViews()}</div>
      </>
    )
  }
}

export default Home
