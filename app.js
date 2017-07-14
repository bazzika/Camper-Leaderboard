/**
 * Created by Даша on 07.07.2017.
 */
var monthUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
var allMonthUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
function listOfCampers(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  return JSON.parse(xhr.responseText);
}
var allCampers=listOfCampers(monthUrl);
console.log(allCampers);
var CampersList = React.createClass({
  getInitialState: function () {
    console.log('kkh');
    return {
      members:allCampers,
      //sortBy: false
    }
  },
  sortByRecentTimeMembers: function(e){
    //e.preventDefault();
    const sortedRecent=this.state.members.sort(function(a,b){
      return b.recent-a.recent
    });
    this.setState({
      members:sortedRecent
    });
  },
  sortByAllTimeMembers: function(e){
    //e.preventDefault();
    const sortedAll=this.state.members.sort(function(a,b){
      return b.alltime-a.alltime
    });
    this.setState({
      members:sortedAll
    });
  },
  render:function(){
    const members=this.state.members;
    console.log(this.state);
    const showMembers=members.map(function(element){
      return 'https://www.freecodecamp.com/' + element['username']
    });
    const listElements = members.map(function (member, index) {
        return (
          <tr key={index}>
            <td className='number'>{index + 1}
            </td>
            <td className='username'>
              <a href={showMembers[index]}>
            <img src={member['img']}/>{member['username']}
              </a>
            </td>
            <td className='recentPoints'>{member['recent']}
            </td>
            <td className='alltimePoints'>{member['alltime']}
            </td>
          </tr>)
      });
    return (
      <tbody>
        <tr class='title'>
          <td className='number'>#</td>
          <td className='user'>Camper Name</td>
          <td className='recentPoints' onClick={this.sortByRecentTimeMembers}><a href='#'>Points in past 30 days</a></td>
          <td className='alltimePoints' onClick={this.sortByAllTimeMembers}><a href='#'>All time points</a></td>
        </tr>
        {listElements}
      </tbody>
    )
  }
})
ReactDOM.render(
  <CampersList />,
  document.querySelector('.root')
);