const convertListToHTML = description => {
  const lines = description.split('\n')
  let html = '<ul>'
  lines.forEach(line => {
    html += `<li>${line}</li>`
  })
  html += '</ul>'
  return html
}

export default convertListToHTML