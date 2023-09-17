let urlYes = chrome.runtime.getURL('img/yesdrop.png')
let urlNo = chrome.runtime.getURL('img/nodrop.png')
// iterate document and all iframes contained in the page
// const array = [document, ...Array.from(document.querySelectorAll('iframe')).map((x) => x.contentDocument)]
function addEvents(array: Document[]) {
  let currentImage: HTMLImageElement | null = null // Track the current image element
  let dragCount = 0
  for (const doc of array) {
    doc.addEventListener('dragenter', function (e) {
      //@ts-ignore
      // console.log('dragenter', e.defaultPrevented, e.target.tagName)

      if (e.currentTarget === doc) {
        dragCount += 1
      }
      //   console.log(this, e);
      //@ts-ignore
      let src =
        e.defaultPrevented ||
        (e.target.tagName.toUpperCase() == 'INPUT' && e.target.type === 'file')
          ? urlYes
          : urlNo
      //   ? 'https://i.ibb.co/dgCKs2z/yesdrop.png'
      //   : 'https://i.ibb.co/Z1Fy57h/nodrop.png'
      // if (e.defaultPrevented) {
      //e.dataTransfer.dropEffect = "move";
      //if (currentImage) {
      //    document.body.removeChild(currentImage);
      //     currentImage = null;
      // }
      //} else {
      //e.dataTransfer.dropEffect = "none";
      // Check if an image already exists and remove it
      if (currentImage) {
        if (currentImage.src != src) currentImage.src = src
        currentImage.style.left = e.clientX - currentImage.width / 2 + 'px' // Adjust position based on image dimensions
        currentImage.style.top = e.clientY - currentImage.height / 2 + 'px' // Adjust position based on image dimensions
        // document.body.removeChild(currentImage);
        return
      }

      // Create and append an image element
      var image = doc.createElement('img')
      image.style.all = 'unset'
      image.src = src // Replace with the URL of your image
      image.style.position = 'fixed'
      image.style.left = e.clientX - image.width / 2 + 'px' // Adjust position based on image dimensions
      image.style.top = e.clientY - image.height / 2 + 'px' // Adjust position based on image dimensions
      image.style.zIndex = '9999999'
      image.style.pointerEvents = 'none'
      doc.body.appendChild(image)

      // Set the current image
      currentImage = image
      // }
      return
    })
    doc.addEventListener('dragover', function (e) {
      // console.log('dragover', e.defaultPrevented, e.target.tagName)
      //@ts-ignore
      let src =
        e.defaultPrevented ||
        (e.target.tagName.toUpperCase() == 'INPUT' && e.target.type === 'file')
          ? urlYes
          : urlNo
      //   ? 'https://i.ibb.co/dgCKs2z/yesdrop.png'
      //   : 'https://i.ibb.co/Z1Fy57h/nodrop.png'
      // if (e.defaultPrevented) {
      //e.dataTransfer.dropEffect = "move";
      //if (currentImage) {
      //    document.body.removeChild(currentImage);
      //     currentImage = null;
      // }
      //} else {
      //e.dataTransfer.dropEffect = "none";
      // Check if an image already exists and remove it
      if (currentImage) {
        if (currentImage.src != src) currentImage.src = src
        currentImage.style.left = e.clientX - currentImage.width / 2 - doc.body.scrollLeft + 'px' // Adjust position based on image dimensions
        currentImage.style.top = e.clientY - currentImage.height / 2 - doc.body.scrollTop + 'px' // Adjust position based on image dimensions
        // document.body.removeChild(currentImage);
        return
      }

      // Create and append an image element
      var image = doc.createElement('img')
      image.style.all = 'unset'
      image.src = src // Replace with the URL of your image
      image.style.position = 'fixed'
      image.style.left = e.clientX - image.width / 2 + 'px' // Adjust position based on image dimensions
      image.style.top = e.clientY - image.height / 2 + 'px' // Adjust position based on image dimensions
      image.style.zIndex = '9999999'
      image.style.pointerEvents = 'none'
      doc.body.appendChild(image)

      // Set the current image
      currentImage = image
      // }
      return
    })

    doc.addEventListener('dragleave', function (e) {
      // console.log('dragleave', e.currentTarget)
      if (e.currentTarget === doc && dragCount > 0) {
        dragCount -= 1
      }

      if (dragCount === 0) {
        // Handle drag leave.
        if (currentImage) {
          doc.body.removeChild(currentImage)
          currentImage = null
        }
      }

      //  e.dataTransfer.dropEffect = "uninitialized";
      return
    })

    doc.addEventListener('dragend', function (e) {
      if (e.currentTarget === doc && dragCount > 0) {
        dragCount -= 1
      }

      if (dragCount === 0) {
        // Handle drag leave.
        if (currentImage) {
          doc.body.removeChild(currentImage)
          currentImage = null
        }
      }

      //  e.dataTransfer.dropEffect = "uninitialized";
      return
    })

    doc.addEventListener('drop', function (e) {
      if (e.currentTarget === doc && dragCount > 0) {
        dragCount -= 1
      }

      if (dragCount === 0) {
        // Handle drag leave.
        if (currentImage) {
          doc.body.removeChild(currentImage)
          currentImage = null
        }
      }

      //  e.dataTransfer.dropEffect = "uninitialized";
      return
    })
  }
}
// console.log('adding events')
addEvents([document])
// console.log(document.readyState)
window.addEventListener('load', function () {
  // console.log('loaded')
  this.setTimeout(() => {
    const array = [
      ...Array.from(document.querySelectorAll('iframe') ?? [])
        .filter((x) => x.contentDocument != null)
        .map((x) => x.contentDocument as Document),
    ]
    // console.log(array)
    addEvents(array)
  }, 3000)
})
// })
export {}
