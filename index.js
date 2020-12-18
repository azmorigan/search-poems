const containerOfPoems = document.querySelector('.poems-container')
const templatePoem = document.querySelector('#template-poem')
const form = document.querySelector('.form')
// Проверка на наличие ОДНОГО слова
function searchPoems(setOfPoems, word1, word2 = "", word3 = "", word4 = "") {
  const filterObj = setOfPoems.filter((item) => {
    return item.fields.text.includes(word1) && item.fields.text.includes(word2) && item.fields.text.includes(word3) && item.fields.text.includes(word4)
  })
  const result = filterObj.map((item) => {
    //   let regex = new RegExp("(.+(" + word1 + "|" + word2 + "|" + word3 + "|" + word4 + ").+)", "gm");
    //   let m = regex.exec(item.fields.text)
    let stringToArr = item.fields.text.split('\n')
    let poemSearchRow = stringToArr.map((row) => {
      let rowPoem = ""
      if (row.includes(word1) && word1 !== "") {
        rowPoem += row
      }
      if (row.includes(word2) && word2 !== "") {
        rowPoem += row
      }
      if (row.includes(word3) && word3 !== "") {
        rowPoem += row
      }
      if (row.includes(word4) && word4 !== "") {
        rowPoem += row
      }
      return rowPoem
    })
    return poemSearchRow.join('')
  })
  return result
}

const requestURL = 'http://buymebuyme.xyz'
const xhr = new XMLHttpRequest()
xhr.responseType = 'json'
//Запрос и вывод стихов
function outputPoem(evt) {
  evt.preventDefault()
  xhr.open('GET', requestURL)
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.error('ошибка')
    } else {
      let [word1, word2, word3, word4] = document.querySelector('.form__input').value.split(' ')
      console.log(searchPoems(xhr.response, word1, word2, word3, word4))
    }
  }
  xhr.onerror = () => { console.log('ошибка') }
  xhr.send()
}

// При нажатии на кнопку формы
form.addEventListener('submit', outputPoem)

function createPoem() {
  const poem = templatePoem.content.cloneNode(true)
  const poemText = poem.querySelector('.poem__text')
  poemText.textContent = searchPoems(searchWord1, xhr.response)
  return poem
}

function addPoemsInContainer(arrOfPoems, containerOfPoems) {
  const newPoem = createPoem()
  newPoem.append
}