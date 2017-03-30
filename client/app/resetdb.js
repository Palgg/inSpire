import React from 'react';

 /* Reset database button.
 */
 export class ResetDatabase extends React.Component {
   render() {
     return (
       <div>
       <a href="#" onClick={() => {
         var xhr = new XMLHttpRequest();
         xhr.open('POST', '/resetdb');
         xhr.addEventListener('load', function() {
           window.alert("Database reset! Refreshing the page now...");
           document.location.reload(false);
         });
         xhr.send();
     }} style={{color: 'red'}}>Reset DB</a></div>
     );
   }
 }
