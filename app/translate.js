const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  exchangeBtn = document.querySelector(".exchange"),
  selectTag = document.querySelectorAll("select"),
  translateBtn = document.querySelector(".btn"),
  icons = document.querySelectorAll(".row .fas"),
  from = document.querySelector(".from"),
  to = document.querySelector(".to")

selectTag.forEach((tag, id) => {
  for (const countryCode in countries) {
    let selected
    if (id == 0 && countryCode == "en-GB") {
      selected = "selected"
    } else if (id == 1 && countryCode == "tr-TR") {
      selected = "selected"
    }
    let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>`
    tag.insertAdjacentHTML("beforeend", option)
  }
})

exchangeBtn.addEventListener("click", () => {
  let tempText = fromText.value
  let tempLang = selectTag[0].value
  fromText.value = toText.value
  selectTag[0].value = selectTag[1].value
  toText.value = tempText
  selectTag[1].value = tempLang
})

translateBtn.addEventListener("click", () => {
  let text = fromText.value
  let translateFrom = selectTag[0].value
  let translateTo = selectTag[1].value

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`

  if (fromText.value == "") {
    toText.value = "Please enter text"
  } else {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        toText.value = data.responseData.translatedText
      })
  }
})

icons.forEach((btns) => {
  btns.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-volume-up")) {
      let utterance
      if (target.id == "from") {
        utterance = new SpeechSynthesisUtterance(fromText.value)
        utterance.lang = selectTag[0].value
        console.log(utterance)
      } else {
        utterance = new SpeechSynthesisUtterance(toText.value)
        utterance.lang = selectTag[1].value
        console.log(utterance)
      }
      speechSynthesis.speak(utterance)
    } else {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value)
      } else {
        navigator.clipboard.writeText(toText.value)
      }
    }
  })
})
