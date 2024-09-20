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

class CourseItemDetails extends Component {
  state = {
    courseDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.fetchData()
  }

  onSuccessDataFetch = data => {
    const formattedDetails = {
      id: data.id,
      name: data.name,
      imageUrl: data.image_url,
      description: data.description,
    }

    this.setState({
      courseDetails: formattedDetails,
      apiStatus: apiStatusConstants.success,
    })
  }

  fetchData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const option = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, option)

    if (response.ok) {
      const data = await response.json()
      this.onSuccessDataFetch(data.course_details)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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

  onRenderSuccess = () => {
    const {courseDetails} = this.state

    return (
      <div className="courseContainer">
        <img
          className="courseImage"
          src={courseDetails.imageUrl}
          alt={courseDetails.name}
        />
        <div className="info">
          <h1 className="course-name">{courseDetails.name}</h1>
          <p className="course-description">{courseDetails.description}</p>
        </div>
      </div>
    )
  }

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
        <div className="course-details-container">
          {this.onRenderApiViews()}
        </div>
      </>
    )
  }
}

export default CourseItemDetails
