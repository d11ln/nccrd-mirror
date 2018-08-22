import React from 'react'

export function stripURLParam(paramKey) {
  let i = location.toString().indexOf("?")
  let l = location.toString().length
  let queryString = location.toString().substr(i, l - i)

  if (queryString === ("?" + paramKey)) {
    location = location.toString().replace(("?" + paramKey), "")
  }
  else if (queryString.includes("?" + paramKey + "&")) {
    location = location.toString().replace(paramKey + "&", "")
  }
  else if (queryString.includes("&" + paramKey)) {
    location = location.toString().replace("&" + paramKey, "")
  }
}

export function GetUID() {
  return Math.random().toString().substr(2, 9)
}

export function StringToHTML(strVal) {

  if (typeof strVal === 'undefined') {
    return <div><p></p></div>
  }
  else if (strVal.includes("\n")) {
    return (
      <div>
        {strVal.split("\n").map(x => <p>{x}</p>)}
      </div>
    )
  }
  else {
    return (
      <div>
        <p>{strVal}</p>
      </div>
    )
  }
}

export function isLocalhost() {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return true
  }
  else {
    return false
  }
}