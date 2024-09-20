import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="failureContainer">
      <img
        className="failureImage"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="failureHeading">Page Not Found</h1>
      <p className="failureDescription">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
