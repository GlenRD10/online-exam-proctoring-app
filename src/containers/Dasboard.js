import './Dashboard.css';
import profile_image from './man.png';
import menu_icon from './menu.png';
import ExamCard from './ExamCard';

function Dashboard() {

    return(
        <div className="main-div">
            <nav className="side-bar">
                <table className="legend-table">
                    <tr>
                        <td><span class="dot-one"></span></td>  
                        <td>Completed</td>
                        <td>02</td>  
                    </tr>   
                    <tr>
                        <td><span class="dot-two"></span></td>  
                        <td>Scheduled</td>
                        <td>02</td>  
                    </tr> 
                    <tr>
                        <td><span class="dot-three"></span></td>  
                        <td>Resume</td>
                        <td>02</td>  
                    </tr> 
                    <tr>
                        <td><span class="dot-four"></span></td>  
                        <td>Abandoned</td>
                        <td>02</td>  
                    </tr>  
                    <tr>
                        <td><span class="dot-five"></span></td>  
                        <td>Error</td>
                        <td>02</td>  
                    </tr> 
                </table>  
            </nav>
            <nav className="top-bar">
                <div className="profile-pic">
                    <img className="profile" src={profile_image} alt="profile" />
                </div>
                <div className="profile-bio">
                    <p>Glen Romario Dsouza</p><br className="small-line-br"/>
                    <p>glen123dsouza@gmail.com</p>
                </div>
                <div className="profile-menu">
                    <img className="menu_icon" src={menu_icon} alt="menu" />
                </div>
            </nav>
            <div className="exam-cards">
                <section className="schedule">
                    <ExamCard status='ongoing'/>
                    <ExamCard status='expired'/>
                    <ExamCard status='expired'/>
                    <ExamCard status='yet-to-start'/>
                    <ExamCard status='ongoing'/>
                    <ExamCard status='completed'/>
                </section>  
            </div>
        </div>
    );
}

export default Dashboard;