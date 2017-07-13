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
var allCampers=listOfCampers(allMonthUrl);
console.log(allCampers);
var CampersList = React.createClass({
  getInitialState: function () {
    console.log('kkh');
    return {
      members:allCampers,
      //sortBy: false
    }
  },
  //sortMembers: function(){
  //
  //  return
  //}
  render:function(){
    const members=this.state.members;
    console.log(this.state);
    const showMembers=members.map(function(element){
      return 'https://www.freecodecamp.com/' + element['username']
    });
    const listElements = members.map(function (member, index) {
        return (
          <tr key={index}>
            <td className='member'>{index + 1}
            </td>
            <td className='username'>
              <a href={showMembers[index]}>
            <img src={member['img']}/>{member['username']}
              </a>
            </td>
            <td className='alltimePoints'>{member['alltime']}
            </td>
            <td className='recentPoints'>{member['recent']}
            </td>
          </tr>)
      });
    return (
      <tbody>
        {listElements}
      </tbody>
    )
  }
})
ReactDOM.render(
  <CampersList />,
  document.querySelector('.root')
);