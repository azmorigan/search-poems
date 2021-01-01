const containerOfPoems = document.querySelector('.poems-container')
const templatePoem = document.querySelector('#template-poem')
const form = document.querySelector('.form')
const checkPoem = document.querySelector('.poem')

// Поиск до 4 слов и вывод всех строк со словами
function searchPoems(setOfPoems, word1, word2 = "", word3 = "", word4 = "") {
  const filterObj = setOfPoems.filter((item) => {
    return item.fields.text.includes(word1) && item.fields.text.includes(word2) && item.fields.text.includes(word3) && item.fields.text.includes(word4)
  })
  const result = filterObj.map((item) => {
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
      if (rowPoem) {
        console.log(rowPoem);
        return rowPoem
      } else {
        console.log("ничего не найдено")
      }
    })
    return poemSearchRow.join('')
  })
  return result
}

const requestURL = 'https://buymebuyme.xyz'
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
      renderPoemsList(searchPoems(xhr.response, word1, word2, word3, word4), containerOfPoems)
    }
  }
  xhr.onerror = () => { console.log('ошибка') }
  xhr.send()
}

// Создание карточки стиха
function createPoemCard(poemLine) {
  const poem = templatePoem.content.cloneNode(true)
  const poemText = poem.querySelector('.poem__text')
  poemText.textContent = poemLine
  return poem
}
// Вывод карточек стихов
function renderPoemsList(poemArr, containerToWritePoems) {
  const list = poemArr.map(createPoemCard)
  containerToWritePoems.append(...list)
}

// При нажатии на кнопку формы поиск и вывод стихов
form.addEventListener('submit', outputPoem)