const containerOfPoems = document.querySelector('.poems-container')
const templatePoem = document.querySelector('#template-poem')
const form = document.querySelector('.form')
// Проверка на наличие ОДНОГО слова
function searchPoems(word1, setOfPoems) {
  const filterObj = setOfPoems.filter((item) => {
    return item.fields.text.includes(word1)
  })
  const result = filterObj.map((item) => { return item.fields.text })
  return result
}

const requestURL = 'http://buymebuyme.xyz'
const xhr = new XMLHttpRequest()
xhr.responseType = 'json'
//GET запрос
function outputPoem(evt) {
  evt.preventDefault()
  xhr.open('GET', requestURL)
  xhr.onload = () => {
    if (xhr.status >= 400) {
      console.error('ошибка')
    } else {
      const firstWord = document.querySelector('.form__input').value
      console.log(searchPoems(firstWord, xhr.response))
    }
  }
  xhr.onerror = () => { console.log('ошибка') }
  xhr.send()
  // renderPoemsInContainer()
  // // console.log(createPoem())
}

// При нажатии на кнопку формы
form.addEventListener('submit', outputPoem)
// function createPoem() {
//   const poem = templatePoem.content.cloneNode(true)
//   const poemText = poem.querySelector('.poem__text')
//   poemText.textContent = searchPoems(searchWord1, xhr.response)
//   return poem
// }

// function addPoemsInContainer(arrOfPoems, containerOfPoems) {
//   const newPoem = createPoem()
//   newPoem.append
// }