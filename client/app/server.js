// Old token
//var token = 'eyJpZCI6MTIzNDU2Nzh9';

// New mongodb token
var token = 'eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAxMjM0NTY3OCJ9';

/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // Tell ESLint to chill
  /* global InspireError */
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    }
    else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      InspireError('Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
    InspireError('Could not ' + verb + " " + resource + ": Could not connect to the server.");
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    InspireError('Could not ' + verb + " " + resource + ": Request timed out.");
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

export function getStudentInfo(id, cb) {
  sendXHR('GET', '/students/'+id, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText))
  });
}

export function getProfessorInfo(id, cb) {
  sendXHR('GET', '/professor/'+id, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getEnrolledCourses(id, cb) {
  sendXHR('GET', 'students/'+id+'/enrolled', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText))
  });
}

export function enrollInClass(studentId, courseId, cb) {
  sendXHR('POST', '/addclass?student=' + studentId + '&course=' + courseId, undefined, () => {
    cb()
  });
}

export function dropClass(studentId, courseId, cb) {
  sendXHR('POST', '/dropclass?student=' + studentId + '&course=' + courseId, undefined, () => {
    cb();
  });
}

export function getShoppingCart(userId, cb) {
  sendXHR('GET', '/students/'+ userId + '/cart', undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function dropCourseFromCart(userId, courseId, cb) {
  sendXHR('POST', '/dropfromcart', { userId:userId, courseId:courseId }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function addCourseToCart(userId, courseId, cb) {
  sendXHR('POST', '/addtocart', { userId:userId, courseId:courseId }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getCourseInfo(courseId, cb) {
  sendXHR('GET', '/courses/' + courseId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function getSearchResults(searchOptions, cb) {
  sendXHR('POST', '/search', searchOptions, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

// gets available courses
export function getAvailableCourses(day, start, end, cb) {
  sendXHR('GET', '/courses/available/' + day + '/' + start + '/' + end, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}
